import React, { Fragment, useState } from 'react';
import useStyles from './checkoutStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory, useLocation } from 'react-router-dom';

//const steps = ['Purchase Information', 'Payment', 'Review your order'];
const steps = ['Purchase Information', 'Payment details'];

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://fitd.com/'>
                fitd.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function getStepContent(step, success, setSuccess, membershipData, email,
    firstName,
    lastName,
    role,
    _id) {
    switch (step) {
        case 0:
            return <AddressForm membershipData={membershipData} email={email}
                firstName={firstName}
                lastName={lastName}
            />;
        case 1:
            return <PaymentForm success={success} setSuccess={setSuccess} membershipData={membershipData} email={email}
                firstName={firstName}
                lastName={lastName}
                role={role}
                _id={_id} />;
        default:
            throw new Error('Unknown step');
    }
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [success, setSuccess] = useState(false);
    const membershipData = useLocation().state;
    const history = useHistory();
    const { email,
        firstName,
        lastName,
        role,
        _id, } = JSON.parse(sessionStorage.getItem('profile'));

    const screenToScheduler = () => {
        history.push({ pathname: '/payment', state: membershipData.coachData });
    }
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h4' align='center'>
                        Checkout
                    </Typography>
                    <Elements stripe={stripePromise}>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Fragment>
                            {getStepContent(activeStep, success, setSuccess, membershipData, email,
                                firstName,
                                lastName,
                                role,
                                _id)}
                            <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={activeStep === steps.length - 1 ? screenToScheduler : handleNext}
                                    className={classes.button}
                                    disabled={
                                        activeStep !== steps.length - 1 || success
                                            ? false
                                            : true
                                    }
                                >
                                    {activeStep === steps.length - 1 ? 'Done' : 'Next'}
                                </Button>
                            </div>
                        </Fragment>
                    </Elements>
                </Paper>
                <Copyright />
            </main>
        </Fragment>
    );
};

export default Checkout;
