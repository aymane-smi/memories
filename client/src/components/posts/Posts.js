import React from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import {CircularProgress, Grid} from '@material-ui/core';
import useStyles from './styles';

const Posts = ({setCurrentId, trigger})=>{
    const user = localStorage.getItem(('profile')) || null;
    const classes = useStyles();
    let posts = useSelector((state)=>state.posts);
    posts = user ? posts : [];
    return (
        !posts.length ? <CircularProgress /> :
                <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                    {posts.map((post, i)=>(
                        <Grid key={i} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))}
                </Grid>
        
    );
};

export default Posts;