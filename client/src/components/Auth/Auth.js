import React, {useState} from 'react'
import {Avatar, Paper, Grid, Container, Button, Typography} from '@material-ui/core';
import LockOutlinedIcon  from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signup, signin} from '../../actions/auth';
const INIT_FORM = {firstName: '', lastName: '', email: '', password: ''};

const Auth = () => {
    const user = localStorage.getItem('profile') || null;
    const dispatch = useDispatch();
    const classes = useStyles();
    const History = useHistory();
    if(user)
        History.push("/");
    const [isSignUp, setSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(INIT_FORM);
    const handleShowPassword = ()=> setShowPassword((prev)=>!prev);
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        if(isSignUp)
            dispatch(signup(form, History));
        else
            dispatch(signin(form, History));
    };
    const handleChange = (evt)=>{
        setForm({...form, [evt.target.name]: evt.target.value});
    };
    const switchMode = ()=> {
        setSignUp((prev)=>!prev);
        setShowPassword(false);
    };
    const googleSuccess = async(res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
            dispatch({type: "AUTH", data: {result, token}});
            History.push("/");
        }catch(err){
            console.log(err);
        }
    };
    const googleFailure = ()=>{
        alert("Google Auth Failure");
    };
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignUp && (<>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>)}
                    <Input name="email" label="Email Address"handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? "sign up" : "sign in"}</Button>
                    <GoogleLogin
                    clientId="16984295716-q8riq7o33l7rq20k4risg4p7ottko9r6.apps.googleusercontent.com"
                    render={(props)=>(
                        <Button
                            color="primary"
                            className={classes.googleButton}
                            fullWidth
                            onClick={props.onClick}
                            disabled={props.disabled}
                            startIcon={<Icon />}
                            variant="contained" 
                        >
                             Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    />
                </Grid>
                <Grid container justify="flex-end">
                    <Button onClick={switchMode} fullWidth>
                        {isSignUp ? "Already Have an account ?": "Don't have an account ?"}
                    </Button>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth