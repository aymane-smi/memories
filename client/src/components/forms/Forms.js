import React, {useEffect, useState} from 'react';
import {Button, Typography, Paper, TextField} from '@material-ui/core';
import FileBase from 'react-file-base64'
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
const Form = ({currentId, setCurrentId})=>{
    const dispatch = useDispatch();
    const [postData, setPost] = useState({creator: '', title: '', tags: [], selectedFile: '', message: ''});
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.find((p)=> p._id === currentId) : null);
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        if(currentId)
            dispatch(updatePost(currentId, postData));
        else
            dispatch(createPost(postData));
        Clear();
    };

    const Clear = ()=>{
        setCurrentId(null);
        setPost({creator: '', title: '', tags: '', selectedFile: '', message: ''});
    };

    useEffect(()=>{
        console.log("inside the form:",currentId);
        if(post)
            setPost(post);
    }, [post]);

    return (<Paper className={classes.paper}>
        <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
            <Typography variant='h6'>{currentId ? "Editing" : "Creating"} a memory</Typography>
            <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator} onChange={(evt)=>setPost({...postData, creator: evt.target.value})}/>
            <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(evt)=>setPost({...postData, title: evt.target.value})}/>
            <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(evt)=>setPost({...postData, tags: evt.target.value})}/>
            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64})=> setPost({...postData, selectedFile: base64})}/>
            </div>
            <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(evt)=>setPost({...postData, message: evt.target.value})}/>
            <Button variant="contained" className={classes.buttonSubmit} fullWidth size="large" color="primary" type="submit">Submit</Button>
            <Button variant="contained" className={classes.buttonSubmit} fullWidth size="large" color="secondary" type="submit" onSubmit={Clear}>Clear</Button>
        </form>
    </Paper>);
};

export default Form;