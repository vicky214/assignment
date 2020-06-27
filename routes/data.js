const express = require('express');
const router = express.Router();
const User = require('../models/data');

router.post('/add',(req,res)=>{
    const {firstname,email,lastname,phone,url} = req.body ;
    if(!email || !lastname || !firstname || !phone|| !url){
       return res.status(422).json({error:"please add all the fields"})
    }
    const userData = {
        email,
        firstname,
        lastname,
        phone,
        image:url,
    }
    User.findOne({email:email})
    .then(user=>{
        if(!user){
                User.create(userData)
                    .then(user=>{
                        res.json({message: 'Data Registered Succesfully'})
                    })
                    .catch(err=>{
                        res.send({error:'error occured'})
                    })
        }
        else{
            res.json({error: 'Data already exists'})
        }
    })
    .catch(err=>{
        res.send('error: ' + err)
    })
})

router.get('/show',(req,res)=>{
    User.find()
    .then((data)=>{
        res.json({data})
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/delete/:id',(req,res)=>{
    var id = req.params.id;
    console.log(id)
    User.findByIdAndDelete(id)
    .then((deletedata)=>{
        res.json({message: 'Data has deleted '})
    }).catch(err=>{
        res.json(
            {error:'error'}
        )
    })
   
  });

module.exports=router;