import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import './showdata.css'

export default function ShowData() {
    const [value,setValue] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("/show",{
            method:"get",
            headers:{
                "Content-Type":"application/json",
            }
        }).then(res=>res.json())
        .then(result=>{
            setValue(result.data)
        })
    })
    const deleteData=(id)=>{
        fetch(`/delete/${id}`,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
            }
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                store.addNotification({
                    title: "Sorry",
                    message: result.error,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 2000
                      }
                })
             }
             else{
                store.addNotification({
                    title: "Congratulate",
                    message: result.message,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 2000
                      }
                })
                 history.push('/showdata')
             }      
        })
    }

    return (
        <div className="container-fluid show">
            <div className="row">
                <div className="col-md-12">
                    {
                    value.map(detail=>{
                        return(
                            <div class="card">
                            <img class="card-img-top" src={detail.image} alt="Card image cap" />
                            <div class="card-body">
                              <h6 class="card-title">Full Name: <span>{detail.firstname} {detail.lastname}</span></h6>
                              <p class="card-text">Email: {detail.email}</p>
                              <p class="card-text">Phone: {detail.phone}</p>
                              <button className="btn btn-primary ml-1" onClick={()=>{deleteData(detail._id)}}>Delete</button>
                            </div>
                          </div>
                      )
                        })
                    }
                </div>
            </div>
        </div>
    )

                }