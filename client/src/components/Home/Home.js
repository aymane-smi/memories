import React, {useEffect, useState} from 'react'
import {Container, Grid, Grow} from '@material-ui/core';
import Posts from '../posts/Posts';
import Form from'../forms/Forms';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {getPosts} from '../../actions/posts';

function Home() {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
          <Grid container justifyContent='center' className={classes.mainContainer} alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
    </Grow>
  )
}

export default Home