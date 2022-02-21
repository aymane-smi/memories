import axios from 'axios';


const url = 'http://localhost:8081/api/post';

export const fetchPosts = ()=>{
    return axios.get(url);
};

export const createPost = (newPost)=> axios.post(url, newPost);