import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from '../libs/AvatarStyle';
import { Link, useHistory } from 'react-router-dom';
import { LOGOUT_REQUEST } from '../redux/constants/actionTypes';
import { AdminDropdown } from './AdminDropdown/AdminDropdown';
import './Avatar.css';
import { CoachDropdown } from './CoachDropdown/CoachDropdown';
import { GeneralUserDropdown } from './GeneralUserDropdown/GeneralUserDropdown';
// import decode from 'jwt-decode';

const AvatarIcon = ({ scrollDown }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [user, setUser] = useState(
		JSON.parse(sessionStorage.getItem('profile'))
	);
	const logout = () => {
		dispatch({ type: LOGOUT_REQUEST });
		history.push('/');
	};

	useEffect(() => {
		setUser(JSON.parse(sessionStorage.getItem('profile')));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sessionStorage.getItem('profile')]);
	return (
		<Toolbar className={classes.toolbar}>
			{user ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: `250px`,
					}}
				>
					<Avatar
						className={`${scrollDown ? 'scrolldownBtn' : 'defaultBtn'}`}
						alt={user.firstNname}
						src={user.imageUrl}
					>
						{user.firstName.charAt(0)}
					</Avatar>
					<Button
						variant='contained'
						className={classes.logout}
						color='primary'
						onClick={logout}
					>
						Logout
					</Button>
					{user.role === 2 && <AdminDropdown scrollDown={scrollDown} />}
					{user.role === 1 && <CoachDropdown scrollDown={scrollDown} />}
					{user.role === 0 && <GeneralUserDropdown scrollDown={scrollDown} />}
				</div>
			) : (
				<Link
					className={`avatarButton ${
						scrollDown ? 'scrolldownBtn' : 'defaultBtn'
					}`}
					to='/auth'
				>
					Get Started
				</Link>
			)}
		</Toolbar>
	);
};

export default AvatarIcon;
