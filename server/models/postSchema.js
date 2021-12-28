const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    heading:{
        type:String,
        required: true
    },
    confess:{
        type: String,
        required:true
    },
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"USER"}],
    comments:[{
        text:String,
        postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"USER"}
    }],
   postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    categories: [{ type: String, required: true }]
});

const Post = module.exports = mongoose.model('POST', postSchema);
module.exports = Post;