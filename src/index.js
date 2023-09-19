const mongoose = require("mongoose");
const express = require("express");

const jwt=require("jsonwebtoken");
const user = require("./user");

const app=express();
app.use(express.json());
const User=require("./user.js");
//app.use(body_parser.json());

mongoose.connect("mongodb://127.0.0.1:27017/App", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>
console.log("Connection Sucessfull!")).catch((err)=>console.log("Error occured!"));
const PORT=process.env.PORT || 8000;



app.post("/register",async (req,res)=>{
    
       
        
    const euser=  await User.findOne({email:req.body.email});
    if(euser){
        res.json({status:false,msg:"USER ALREADY EXISTS"});
    }else{
                const newuser=new User(req.body);
                const token= await newuser.generateAuthToken();
                const _id=newuser._id;
                await newuser.save().then(()=>{
                    res.json({status:true,msg:"Account created sucessfully",token:token,id:_id});
                }).catch(()=>{
                    res.json({status:false,msg:"Error in Signing Up"});
                    console.log("ERROR");
                });};
            })
                
                
            
       

    

app.post("/login",async (req,res)=>{
    
        const email=req.body.email;
        const password=req.body.password;
        
        const loginuser=  await User.findOne({email:email});
        if(!loginuser){
            res.json({status:false,msg:"USER DOES NOT EXISTS"});
        }
       
        
        else if(loginuser.password==password){
            const token= await loginuser.generateAuthToken();
            const _id=loginuser._id;
           
           
            
            res.json({status:true,msg:"Logged in",token:token,id:_id});
        }
        else{
            res.json({status:false,msg:"Invalid password"});
        }

    
})
app.get("/users/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const userdata=await User.find({_id:_id});
        if(!userdata){
            res.status({status:false});
        }
        else{
             res.json(userdata);
        }
    }catch(e){
        res.json({status:false,msg:"Error Occured"});
    }
})

app.listen(PORT,()=>{
    console.log("LISTENING ON PORT "+PORT);
})