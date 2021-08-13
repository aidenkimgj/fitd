import {
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';

const CoachAgreeCheckboxGroup = ({ values, label, CoachAgreeOnChange }) => (
	<FormControl component='fieldset'>
		<FormLabel component='legend'>{label}</FormLabel>
		<FormGroup>
			{values.map((value, index) => (
				<FormControlLabel
					key={index}
					control={
						<Checkbox
							checked={value.checked}
							onChange={CoachAgreeOnChange(index)}
						/>
					}
					label={value.label}
				/>
			))}
		</FormGroup>
	</FormControl>
);

export default CoachAgreeCheckboxGroup;
