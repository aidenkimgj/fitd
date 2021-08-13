export const coachProfileObj = ({
	firstName,
	lastName,
	email,
	linkedIn,
	introOfCoach,
	coachStyle,
	certification,
	paidOpt,
	wage,
	numOfPeople,
	hoursPerWeek,
	expertiseArea,
	provideChecked,
	expertiseAreaOther,
	provideCheckedOther,
	uploadFile,
	coachAgreeChecked,
	events,
}) => {
	const filteredProvideChecked = provideChecked.filter(
		(data) => data.checked === true
	);

	const newProvideChecked = filteredProvideChecked.map((data) => {
		if (data.label === 'Other:') {
			data['label'] = provideCheckedOther;
		}
		return data;
	});

	const filteredExpertiseArea = expertiseArea.filter(
		(data) => data.checked === true
	);

	const newExpertiseArea = filteredExpertiseArea.map((data) => {
		if (data.label === 'Other:') {
			data['label'] = expertiseAreaOther;
		}
		return data;
	});

	return {
		firstName,
		lastName,
		email,
		linkedIn,
		introOfCoach,
		coachStyle,
		certification,
		paidOpt,
		wage,
		numOfPeople,
		hoursPerWeek,
		expertiseArea: newExpertiseArea,
		provideChecked: newProvideChecked,
		uploadFile,
		coachAgreeChecked,
		events,
	};
};
