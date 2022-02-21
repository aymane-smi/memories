const post = require("../models/postsMessage");


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
    let newPost = new post(req.body);
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