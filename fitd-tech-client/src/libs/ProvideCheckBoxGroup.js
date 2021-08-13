import {
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	TextField,
} from '@material-ui/core';

const ProvideCheckboxGroup = ({
	values,
	label,
	ProvideCheckboxonChange,
	provideCheckedOther,
	setProvideCheckedOther,
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
										onChange={ProvideCheckboxonChange(index)}
									/>
								}
								label={value.label}
							/>
							<TextField
								type='text'
								value={provideCheckedOther}
								onChange={(e) => setProvideCheckedOther(e.target.value)}
							/>
						</div>
					);
				}
				return (
					<FormControlLabel
						key={index}
						control={
							<Checkbox
								checked={value.checked}
								onChange={ProvideCheckboxonChange(index)}
							/>
						}
						label={value.label}
					/>
				);
			})}
		</FormGroup>
	</FormControl>
);

export default ProvideCheckboxGroup;
