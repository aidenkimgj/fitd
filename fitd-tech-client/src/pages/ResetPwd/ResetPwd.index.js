import React, { useState, useEffect } from 'react';
import Input from './input';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import actionResetPwd from '../../redux/actions/actionResetPwd';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { MessageBox } from '../../components/MessageBox';
import { useHistory } from 'react-router-dom';

const ResetPwd = () => {
	//const [resetPwd, setResetPwd] = useState(initialState);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const classes = useStyles();
	const dispatch = useDispatch();
	const { token } = useParams();
	const history = useHistory();
	const { loading, success, err } = useSelector(
		(state) => state.resetPwdReducer
	);
	const isValid =
		password === confirmPassword && password !== '' && confirmPassword !== ''
			? true
			: false;

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(actionResetPwd(password, token));
	};

	//const handleChange = (e) => {
	//	setResetPwd({ ...resetPwd, [e.target.name]: e.target.value });
	//};

	useEffect(() => {
		if (success) {
			history.push('/auth');
		}
	}, [history, success]);

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<Typography>Logo</Typography>
				</Avatar>
				<Typography>
					Enter your user account's verified email address and we will send you
					a password reset link.
				</Typography>
				{loading && <LoadingSpinner />}
				{err && <MessageBox severity='error'>{err}</MessageBox>}
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Input
							name='password'
							label='Password'
							handleChange={(e) => setPassword(e.target.value)}
							type='password'
						/>
						<Input
							name='confirmPassword'
							label='confirm Password'
							handleChange={(e) => setConfirmPassword(e.target.value)}
							type='password'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							disabled={!isValid}
						>
							Send password reset email
						</Button>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default ResetPwd;
