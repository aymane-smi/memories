import * as api from '../api/index';

export const getPosts = ()=>(async (dispatch)=>{
    try{
        const {data} = await api.fetchPosts();
        dispatch({type: "FETCH_URL", payload: data})
    }catch(err){
        console.log(err.message);
    }
});

export const createPost = (newPost)=>(async (dispatch)=>{
    try{
        const {data} = await api.createPost(newPost);
        dispatch({type: "CREATE", payload: data});
    }catch(err){
        console.log(err.message);
    }
});


export const updatePost = (id, updatePost)=>(async (dispatch)=>{
    try{
        const {data} = await api.updatePost(id, updatePost);
        dispatch({type: "UPDATE", payload: data});
    }catch(err){
        console.log(err.message);
    }
});

export const deletePost = (id)=>(async (dispatch)=>{
    try{
        await api.deletePost(id);
        dispatch({type: "DELETE", payload: id});
    }catch(err){
        console.log(err.message);
    }
});


export const likePost = (id)=>(async (dispatch)=>{
    try{
        const {data} = await api.likePost(id);
        const {post} = data;
        dispatch({type:"ADD_LIKE", payload: post});
    }catch(err){
        console.log(err.message);
        console.log(err);
    }
});