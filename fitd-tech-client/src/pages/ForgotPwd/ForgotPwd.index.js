import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './input';
import useStyles from './styles';
import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import actionForgotPwd from '../../redux/actions/actionForgotPwd';
import LoadingSpinner from '../../components/LoadingSpinner';
import { MessageBox } from '../../components/MessageBox';

const ForgotPwd = () => {
	const [email, setEmail] = useState('');
	const classes = useStyles();
	const dispatch = useDispatch();
	const { loading, success, err } = useSelector(
		(state) => state.forgotPwdReducer
	);
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(actionForgotPwd(email));
	};

	const handleChange = (e) => {
		setEmail({ ...email, [e.target.name]: e.target.value });
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<Typography>Logo</Typography>
				</Avatar>
				<Typography>
					{success
						? 'Email sent.'
						: 'Enter your E-mail. We will send you a password reset link.'}
				</Typography>
				{loading && <LoadingSpinner />}
				{!success && err && <MessageBox severity='error'>{err}</MessageBox>}
				{success ? (
					<MessageBox severity='success'>
						Successfully sent email to reset your password, please check your
						email ...
					</MessageBox>
				) : (
					<form className={classes.form} onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Input
								name='email'
								label='email'
								handleChange={handleChange}
								type='email'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
								disabled={email.length === 0 ? true : false}
							>
								Send password reset email
							</Button>
						</Grid>
					</form>
				)}
			</Paper>
		</Container>
	);
};

export default ForgotPwd;
