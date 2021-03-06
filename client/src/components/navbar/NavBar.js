import React, {useState, useEffect} from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import memories from '../../images/memories.png';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
const NavBar = ()=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")) || null);
    const logout = ()=>{
        dispatch({type: "LOGOUT"});
        history.push("/");
    };
    useEffect(()=>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);
    return (<AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
        Memories
        <img src={memories} className={classes.image} alt="memories" height="60"/>
        </Typography>
    </div>
    <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant="h6">
                    {user.result.name}
                </Typography>
                <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>
                    Logout
                </Button>
            </div>
        ): <Button component={Link} to="/Auth" color="primary" variant="contained">SignIn</Button>
        }
    </Toolbar>
  </AppBar>);
};
export default NavBar;