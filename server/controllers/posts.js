const post = require("../models/postsMessage");
const mongoose = require("mongoose");


exports.getPosts = async (req, res)=>{
    try{
        let allPosts = await post.find();
        res.status(200).json({
            response: allPosts
        });
    }catch(err){
        res.status(404).json({
            error: err.message
        });
    }
};

exports.postCreation = async (req, res)=>{
    req.body.tags = req.body.tags.split(' ');
    let newPost = new post({...req.body, creator: req.userId});
    try{
        let savingPost = await newPost.save();
        //created successfully
        res.status(201).json({
            post: savingPost
        });
    }catch(err){
        //can't be created
        res.status(409).json({
            error: err.message
        });
    }
}

exports.postUpdate = async (req, res)=>{
    const id = req.params.id;
    const post_ = req.body;
    console.log(id);
    console.log(req.body);
    if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({
            err: "id not found!"
        });
    const updatedPost = await post.findByIdAndUpdate(id, post_, {new: true});
    res.status(200).json({
        message: "updated successfully",
        post: updatedPost
    });
};


exports.postDelete = async (req, res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({
            err: "id not found!"
        });
    await post.findByIdAndDelete(id);
    res.status(200).json({
        message: `post with id(${id}) was deleted`
    });
};


exports.postLike = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({
            err: "id not found!"
        });
    if(!req.userId)
        res.status(401).json({
            message: "UnAuthenticated" 
        });
    let Post = await post.findById(id);
    const index = Post.likes.findIndex((i)=> i === String(req.userId));
    if(index === -1)
        Post.likes.push(req.userId);
    else
        Post.likes = Post.likes.filter((i)=> i !== req.userId);
    const updatedPost = await post.findByIdAndUpdate(id, Post);
    res.status(200).json({
        message: "add like to post with success",
        post: updatedPost
    });
}