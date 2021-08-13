import React, { Fragment, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './checkoutStyles';
import axios from 'axios';
import { API } from '../../config';
import LoadingSpinner from '../LoadingSpinner';

const PaymentForm = ({ success, setSuccess, membershipData, _id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post(
                    `${API}/api/payment`,
                    {
                        amount: membershipData.price * 100,
                        id,
                        membershipId: membershipData.membershipId,
                    },
                    { withCredentials: true }
                );
                const { isMembership } = response.data.user;

                if (response.data.success) {
                    console.log('Successful payment');
                    const currentSession = JSON.parse(sessionStorage.getItem('profile'));
                    const currentLocal = JSON.parse(localStorage.getItem('profile'));
                    currentSession.isMembership = isMembership;
                    currentLocal.isMembership = isMembership;
                    sessionStorage.setItem('profile', JSON.stringify(currentSession));
                    localStorage.setItem('profile', JSON.stringify(currentLocal));
                    setSuccess(true);
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error', error);
            }
        } else {
            console.log(error.message);
        }
    };

    return (
        <Fragment>
            <Typography variant='h6' gutterBottom>
                Purchase Summary
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText
                        primary={membershipData.memberTier}
                        secondary={`This is ${membershipData.memberTier} membership`}
                    />
                    <Typography variant='body2'>{membershipData.price}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary='Total' />
                    <Typography variant='subtitle1' className={classes.total}>
                        {membershipData.price}
                    </Typography>
                </ListItem>
            </List>
            <Typography variant='h6' gutterBottom>
                Payment method
            </Typography>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <CardElement hidePostalCode='false' />
                    <br />
                    <br />
                    <div className="paymentSpinner" style={{ display: 'flex', justifyContent: 'center' }}>
                        {loading && <LoadingSpinner />}
                    </div>
                    <div style={{ display: loading ? 'none' : '' }}>
                        <Button
                            fullwidth
                            type='submit'
                            variant='outlined'
                            disabled={!stripe}
                            className={classes.button}
                            style={{ width: '95%' }}
                        >
                            Pay
                        </Button>
                    </div>
                </form>
            ) : (
                <Fragment>
                    <Typography variant='h5' gutterBottom>
                        Thank you for your order.
                    </Typography>
                    <Typography variant='subtitle1'>
                        Your membership tier is {membershipData.memberTier}. You will get a
                        decent coach from our experts.
                    </Typography>
                </Fragment>
            )}
        </Fragment>
    );
};

export default PaymentForm;
