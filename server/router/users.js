const express = require('express');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

const User = require("../models/userSchema");
const Post = require("../models/postSchema");

router.put('/update',authenticate,(req, res)=>{
  //  if(req.body.old_password == req.rootUser.password){ //Check this
        if(req.body.password!=req.body.cpassword){
            return res.status(422).json("Didn't match password and confirm password ")
        }else{
        User.findByIdAndUpdate(req.rootUser._id,{
            $set:req.body,
        },{
            new:true
    
            }).exec((err,result)=>{
            if(err){
                return res.status(422).json({errror:err})
            }else{
                res.json(result)
            }
        })
        }
  //  }else{
  //      return res.status(422).json("Wrong password")
   // }
    
})

router.delete('/delete',authenticate,async(req, res)=>{
const user = User.findById(req.rootUser._id)
{
    try{
        await Post.deleteMany({postedBy:req.rootUser._id})
        await User.findByIdAndDelete(req.rootUser._id)
        res.status(200).json(err);
    }catch(err){
        res.status(500).json(err);
    }
}
})

  router.get('/users/:id',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                errors: [
                    {
                        msg: "User not found",
                        status: "404",
                    },
                ],
            });
        }
        //next(err);
    }
})

router.get('/userprofile/:id',authenticate,async (req,res)=>{
     try{
        const post = await Post.find({postedBy:req.params.id});
        res.json(post);
    }catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                errors: [
                    {
                        msg: "Post not found",
                        status: "404",
                    },
                ],
            });
        }
        //next(err);
    }
})



router.put('/follow',authenticate,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.rootUser._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.rootUser._id,{
            $push:{following:req.body.followId}
        },{new:true}).select("-password").then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
})

router.put('/unfollow',authenticate,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.rootUser._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.rootUser._id,{
            $pull:{following:req.body.followId}
        },{new:true}).select("-password").then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
})

module.exports = router;