const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');     
const authenticate = require("../middleware/authenticate");

require('../db/connection');  
const User = require('../models/userSchema');

router.get('/k',authenticate,(req,res) =>{
    res.send(`hi`);
} );

router.post('/signup',async(req,res) =>{
    const {username,email,password,cpassword} = req.body;
    
    if(!username ||!email || !password ||!cpassword){
        return res.status(422).send({errror : "Fill all the credentials"});
    }

    try{
        const userExist = await User.findOne({email:email})
        if(userExist){
             return res.status(422).send({error:"email is same"});
        }else if( password != cpassword){
            return res.status(422).send({error:"password not same"});
        }else{
            const user = new User({username,email,password,cpassword});
            await user.save();
             res.status(200).send({message:"done"});
            
        }
    
       
    }catch(err){
        console.log(err);
    }
        });

        
        router.post('/login',async(req,res)=>{
            try{
                const{email,password} = req.body;
                if(!email||!password){
                    return res.status(400).json({error:"Invalid credentials"});
                }

                const userlogin = await User.findOne({email:email});
                if(userlogin){
                    const isMatch = await bcrypt.compare(password,userlogin.password);
                    const token = await userlogin.genrateAuthToken();
                        console.log(token);
                         const {_id,username,email,followers,following} = userlogin
                        return res.json({token,user:{_id,username,email,followers,following}})
                    //      res.cookie("jwtoken",token,{
                    //     expires:new Date(Date.now()+25892000000),
                    //     httpOnly:true
                    // })
                    

                    if(!isMatch){
                       return res.json({error:"user error"});
                    }else{
                       return res.json({message:"done"});  
                    }
                }else{
                   return res.json({error:"done"});
                }
                

            }catch(err){
                console.log(err);
            }
        });

        router.get('/logout',(req,res)=>{
            //res.clearCookie('jwtoken',{path:'/'}); 
            res.status(200).send('User logout');
        })

        router.get('/read',authenticate,(req,res) =>{
            res.send(req.rootUser);
        } );

module.exports = router;