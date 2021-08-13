import React from 'react';

// export const MessageBox = ({ children }) => {
// 	return <div style={{ color: 'red', fontWeight: 'bolder' }}>{children}</div>;
// };

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

export function MessageBox({ severity, children }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Alert severity={severity}>
				<AlertTitle>{severity}</AlertTitle>
				<strong>{children}</strong>
			</Alert>
		</div>
	);
}
