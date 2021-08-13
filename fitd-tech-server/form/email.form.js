const forgot = (name, token, email) => {
	return (
		{
			from: process.env.WEBSITE_EMAIL_ADDRESS,
			to: email,
			subject: 'Password search authentication code transmission',
			text: 'This is the authentication code to find the password!',
			html:
				`<p>Hello ${name}</p>` +
				`<p>Please click the URL to reset your password.<p>` +
				`<a href='${process.env.DOMAIN}/resetpw/${token}/${email}'>Click here to reset Your Password</a><br/>` +
				`If you don't request this, please contact us` +
				`<h4> FITD Tech</h4>`
		}
	);
}

const newCoach = (name, token, email) => {
	return (
		{
			from: process.env.WEBSITE_EMAIL_ADDRESS,
			to: email,
			subject: 'Request Coach',
			text: `${name} requested to be a coach`,
			html:
				`<p>Click URL to see a application <p>` +
				`<a href='${process.env.DOMAIN}/application/${token}'>Application</a><br/>` +
				`<h4> FITD Tech</h4>`
		}
	);
}


module.exports = {
	forgot,
	newCoach
}