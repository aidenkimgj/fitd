import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { InputAdornment } from '@material-ui/core';

const AddressForm = ({ membershipData, firstName, lastName, email, }) => {
    const { price, memberTier } = membershipData;
    return (
        <Fragment>
            <Typography variant='h6' gutterBottom>
                Purchase Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label='First name'
                        defaultValue={firstName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label='Last name'
                        defaultValue={lastName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label='Email address'
                        defaultValue={email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label='Price'
                        defaultValue={price}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label='Content or membership name'
                        defaultValue={`${memberTier} membership`}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default AddressForm;
