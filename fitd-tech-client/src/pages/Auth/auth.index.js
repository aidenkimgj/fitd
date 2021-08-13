import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import Input from './input';
import useStyles from './styles';
import { actionSignUp, actionSignIn } from '../../redux/actions/actionAuth';
import actionNameError from '../../redux/actions/actionNameError';
import AuthIcon from './authIcon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import LoadingSpinner from '../../components/LoadingSpinner';
import { MessageBox } from '../../components/MessageBox';
import { useHistory } from 'react-router-dom';
import actionClear from '../../redux/actions/actionClear';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = JSON.parse(sessionStorage.getItem('profile'));
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { loading, authData, err } = useSelector(state => state.authReducer);
  const isValid =
    formData.password === formData.confirmPassword &&
    formData.password !== '' &&
    formData.confirmPassword !== ''
      ? true
      : false;
  const nameRegEx = /^[a-zA-Z]+$/;

  const handleSubmit = e => {
    e.preventDefault();
    if (isSignup) {
      const { firstName, lastName } = formData;
      if (!firstName.match(nameRegEx) || !lastName.match(nameRegEx)) {
        dispatch(actionNameError());
        return;
      } else {
        dispatch(actionSignUp(formData));
      }
    } else {
      dispatch(actionSignIn(formData, history));
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword(prevShowPassword => !prevShowPassword);

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
    handleShowPassword(false);
  };

  const googleSuccess = async res => {
    const { tokenId } = res;
    try {
      dispatch(actionSignIn({ token: tokenId }));
    } catch (error) {
      console.error(error);
    }
  };

  const googleError = () =>
    console.error('Google Sign In was unsuccessful. Try again later');

  const forgotPassword = e => {
    history.push('/forgotPwd');
  };

  useEffect(() => {
    if (authData && authData.userId) {
      history.push('/');
    }
    if (authData && authData.success) {
      setIsSignup(false);
    }
  }, [authData, history]);

  useEffect(() => {
    dispatch(actionClear());
  }, [dispatch, isSignup]);

  return (
    <>
      {!userInfo ? (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Typography>
            {loading && <LoadingSpinner />}
            {err && <MessageBox severity="error">{err}</MessageBox>}
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
                  <Fragment>
                    <Input
                      name="firstName"
                      label="First Name"
                      handleChange={handleChange}
                      autoFocus
                      half
                      type="text"
                    />
                    <Input
                      name="lastName"
                      label="Last Name"
                      handleChange={handleChange}
                      half
                      type="text"
                    />
                  </Fragment>
                )}
                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                />
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                />
                {isSignup && (
                  <Input
                    name="confirmPassword"
                    label="confirm Password"
                    handleChange={handleChange}
                    type="password"
                  />
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSignup && !isValid}
              >
                {isSignup ? 'Sign Up' : 'Sign In'}
              </Button>
              {/* <Grid item>
                                    {!isSignup && (
                                        <GoogleLogin
                                            clientId={process.env.REACT_APP_CLIENT_ID}
                                            render={(renderProps) => (
                                                <Button
                                                    className={classes.googleButton}
                                                    color='primary'
                                                    fullWidth
                                                    onClick={renderProps.onClick}
                                                    disabled={renderProps.disabled}
                                                    startIcon={<AuthIcon />}
                                                    variant='contained'
                                                >
                                                    Sign in with Google
                                                </Button>
                                            )}
                                            onSuccess={googleSuccess}
                                            onFailure={googleError}
                                            cookiePolicy='single_host_origin'
                                        />
                                    )}
                                </Grid> */}
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSignup
                      ? 'Already have an account? Sign In'
                      : "Don't have an account? Sign Up"}
                  </Button>
                </Grid>
                <Grid item>
                  {!isSignup && (
                    <Button onClick={forgotPassword}>
                      Forgot your password?
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      ) : (
        history.push('/')
      )}
    </>
  );
};

export default SignUp;
