import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
		marginBottom:  theme.spacing(15)

	},
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#000000da',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: '#F89230',

	},
	googleButton: {
		marginBottom: theme.spacing(2),

	},
}));

export default useStyles;
