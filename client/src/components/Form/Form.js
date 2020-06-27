import React,{useState,useEffect} from 'react'
import {useHistory } from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import './form.css';

export default function Form() {
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [image,setImage] = useState('');
    const [url,setUrl] = useState('')
    const history = useHistory();

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    
        const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","assignment")
        data.append("cloud_name","derbbitpz")
        fetch("https://api.cloudinary.com/v1_1/derbbitpz/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
            }
       const uploadFields = ()=>{ 
        fetch("/add",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                firstname,
                lastname,
                email,
                phone,
                url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                store.addNotification({
                    title: "Sorry",
                    message: data.error,
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
                    message: data.message,
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
        .catch(err=>{
            console.log(err)
        })
        .catch(err=>{
            console.log(err)
        }) 
    }
    
    
       const PostData = ()=>{
            uploadPic()
            
        }
    
    


    return (
        <div className="container home">
            <div className="row">
                <div className="col-md-12">
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputEmail4">FirstName</label>
                <input type="text" class="form-control" value={firstname} onChange={(e)=>setFirstname(e.target.value)} placeholder="Enter Your FirstName"/>
                </div>
                <div class="form-group col-md-6">
                <label for="inputPassword4">LastName</label>
                <input type="text" class="form-control" value={lastname} onChange={(e)=>setLastname(e.target.value)}  placeholder="Enter Your LastName"/>
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">Email ID</label>
                <input type="email" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email ID" />
            </div>
            <div class="form-group">
                <label for="inputAddress2">Phone Number</label>
                <input type="text" class="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Your Phone Number" />
            </div>
            <div class="form-group">
                <label for="inputAddress2">Image</label>
                <input type="file" class="form-control" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
    
            <button type="submit" onClick={()=>PostData()} class="btn btn-primary">Submit</button>
        </div>
        </div>
        </div>
    )
}
