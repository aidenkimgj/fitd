import {
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	TextField,
} from '@material-ui/core';

const CoachCheckboxGroup = ({
	values,
	label,
	onChange,
	expertiseAreaOther,
	setExpertiseAreaOther,
}) => (
	<FormControl component='fieldset'>
		<FormLabel component='legend'>{label}</FormLabel>
		<FormGroup>
			{values.map((value, index) => {
				if (index === values.length - 1) {
					return (
						<div key={index} className='lastCheckbox'>
							<FormControlLabel
								control={
									<Checkbox
										checked={value.checked}
										onChange={onChange(index)}
									/>
								}
								label={value.label}
							/>
							<TextField
								type='text'
								value={expertiseAreaOther}
								onChange={(e) => setExpertiseAreaOther(e.target.value)}
							/>
						</div>
					);
				}
				return (
					<FormControlLabel
						key={index}
						control={
							<Checkbox checked={value.checked} onChange={onChange(index)} />
						}
						label={value.label}
					/>
				);
			})}
		</FormGroup>
	</FormControl>
);

export default CoachCheckboxGroup;
