const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require("../middleware/authenticate");
require('../db/connection');
const Post = require('../models/postSchema');

let _ = require('lodash');


router.get('/post',authenticate,(req,res)=>{
    Post.find()
    .populate("postedBy","_id username")
    .populate("comments.postedBy","_id username")
    .then(posts=>{
        res.json(posts)
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/feed',authenticate,(req,res)=>{
    Post.find({postedBy:{$in:req.rootUser.following}})
    .populate("postedBy","_id username")
    .populate("comments.postedBy","_id username")
    .then(posts=>{
        res.json(posts)
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/write',authenticate,async(req,res) =>{
    const{heading,confess,categories} = req.body;
    if(!heading || !confess ||!categories){
         return res.status(422).json({errror : "Fill all the coloumns"});
     }
    const post = new Post({
    heading: heading,
    categories: _.uniq(categories.split(',').map((item) => item.trim())),  
    confess: confess,
    postedBy: req.rootUser,
  });

  await post.save();
  res.status(201).json({message:"done"});
});

router.get('/myprofile',authenticate,(req,res)=>{
    Post.find({postedBy:req.rootUser._id})
    .populate("postedBy","_id username")
    .populate("comments.postedBy","_id username")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.put('/updatepost',authenticate,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId),{
        $set:req.body,
    },{
        new:true
    }.exec((err,result)=>{
        if(err){
            return res.status(422).json({errror:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:id',authenticate,(req,res)=>{
    Post.findOne({_id:req.params.id})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({errror:err})
        }
        if(post.postedBy._id.toString() === req.rootUser._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})

router.put('/post/like',authenticate,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.rootUser._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({errror:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/post/unlike',authenticate,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.rootUser._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({errror:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/post/comment',authenticate,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.rootUser._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy","_id username")
    .populate("postedBy","_id username")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({errror:err})
        }else{
            res.json(result)
        }
    })
})


router.get('/post/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
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
        next(err);
    }
})
   
router.get('/tags', async (req, res) => {
  try {
    const categories = await Post.aggregate([
      { $project: { categories: 1 } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});

router.get("/c/", async (req, res) => {
    const heading = req.query.heading;
    const tagName = req.query.tags;
    try {
      let posts;
      if (heading) {
        posts = await Post.find({ heading });
      } else if (tagName) {
        posts = await Post.find({
          categories: {
            $in: [tagName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 module.exports = router;