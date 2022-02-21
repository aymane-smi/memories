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