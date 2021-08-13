import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	body: {
		backgroundColor: '#f5f5f5',
	},
	container: {
		backgroundColor: '#ffffff',
		width: '80%',
		margin: 'auto',
		paddingTop: '2%',
		paddingBottom: '2%',
	},
	textField: {
		marginTop: '1%',
		marginBottom: '1.5%',
	},
	ckeditor: {
		marginTop: '0.5%',
		marginBottom: '1.5%',
	},
	title: {
		marginTop: '1%',
		marginLeft: '.5%',
		fontSize: '18px',
		fontWeight: 'bold',
		color: '#ff6d00',
	},
	gridTitle: {
		marginBottom: '2%',
		marginTop: '4%',
		marginLeft: '.5%',
		fontSize: '18px',
		fontWeight: 'bold',
		color: '#ff6d00',
	},
	ckeditorTitle: {
		marginBottom: '1%',
		marginTop: '4%',
		marginLeft: '.5%',
		fontSize: '18px',
		fontWeight: 'bold',
		color: '#ff6d00',
	},
	nativeSelect: {
		height: '60px',
	},
	gridFiled: {
		marginTop: '4%',
		marginLeft: '.5%',
		fontSize: '18px',
		fontWeight: 'bold',
		color: '#ff6d00',
	},
	submitBtn: {
		width: '100%',
		marginTop: '3%',
		fontSize: '20px',
		fontWeight: 'bold',
		background: '#ff6d00',
		border: 0,
		color: 'white',
	},
	uploadBtn: {
		display: 'none',
	},
	file_upload_icon: {
		cursor: 'pointer',
		width: '96%',
		marginTop: '3%',
		fontSize: '18px',
		fontWeight: 'bold',
		border: 'solid',
		borderRadius: '10px',
		borderColor: '#ff6d00',
		color: '#ff6d00',
		padding: '1.5%',
		textAlign: 'center',
	},
}));

export default useStyles;
