import logo from './logo.svg';
import './App.css';
import {Container, AppBar, Typography, Grid, Grow} from '@material-ui/core';
import memories from './images/memories.png';
import Posts from './components/posts/Posts';
import Form from'./components/forms/Forms';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getPosts} from './actions/posts';

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="App">
      <Container maxwith="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Memories
            <img src={memories} className={classes.image} alt="memories" height="60"/>
          </Typography>
        </AppBar>
        <Grow in>
          <Grid container justifyContent='center' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
