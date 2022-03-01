import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:8081/api/"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile"))
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    return req;
});

export const fetchPosts = ()=>{
    return API.get("/post");
};

export const createPost = (newPost)=> API.post("/post", newPost);

export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/post/${id}`);

export const likePost = (id) => API.patch(`/post/${id}/likeCount`);

export const signUp = (formData) => API.post("/user/signup", formData);

export const signIn = (formData) => API.post("/user/signin", formData);