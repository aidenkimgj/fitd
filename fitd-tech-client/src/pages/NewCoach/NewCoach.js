import React, { useState, useEffect, Component } from 'react';
import './newCoach.css';
import 'react-dropzone-uploader/dist/styles.css';
import ProvideCheckboxGroup from '../../libs/ProvideCheckBoxGroup';
import CoachCheckboxGroup from '../../libs/CoachCheckboxGroup';
import CoachAgreeCheckboxGroup from '../../libs/CoachAgreeCheckboxGroup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BookScheduler from '../../components/BookScheduler/BookScheduler';
import {
    AccountCircle,
    AlternateEmail,
    LinkedIn,
    AttachMoney,
    Create,
} from '@material-ui/icons';
import {
    TextField,
    InputAdornment,
    FormControlLabel,
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
    Button,
    FormHelperText,
} from '@material-ui/core';
import { coachProfileObj } from '../../libs/coachProfileObj';
import actionNewCoach from '../../redux/actions/actionNewCoach';
import axios from 'axios';
import { API } from '../../config';

const NewCoach = () => {
    const [firstName, setFirstName] = useState('');
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState(false);
    const [linkedIn, setLinkedIn] = useState('');
    const [linkedInErrorMsg, setLinkedInErrorMsg] = useState(false);
    const [introOfCoach, setIntroOfCoach] = useState('');
    const [introOfCoachErrorMsg, setIntroOfCoachErrorMsg] = useState(false);
    // const [uploadFile, setUploadFile] = useState({});
    const [paidOpt, setPaidOpt] = useState('');
    const [paidOptErrorMsg, setPaidOptErrorMsg] = useState(false);
    const [paidOptHelperText, setPaidOptHelperText] = useState('');
    const [paidOptError, setPaidOptError] = useState(false);
    const [wage, setWage] = useState(0);
    const [coachStyle, setCoachStyle] = useState('');
    const [coachStyleErrorMsg, setCoachStyleErrorMsg] = useState(false);
    const [numOfPeople, setNumOfPeople] = useState(0);
    const [hoursPerWeek, setHoursPerWeek] = useState(0);
    const [certification, setCertification] = useState('');
    const [expertiseArea, setExpertiseArea] = useState([
        { label: 'Software engineering/development', checked: false },
        { label: 'Design', checked: false },
        { label: 'Product management', checked: false },
        { label: 'Marketing', checked: false },
        { label: 'Operations', checked: false },
        { label: 'Founders/Startups', checked: false },
        { label: 'Finance', checked: false },
        { label: 'Non-profit', checked: false },
        { label: 'Other:', checked: false },
    ]);
    const [expertiseAreaOther, setExpertiseAreaOther] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const [provideChecked, setProvideChecked] = useState([
        { label: 'General Career Coaching', checked: false },
        {
            label: 'Resume Review (where you give feedback on a resume)',
            checked: false,
        },
        { label: 'Resume Writing (where you write the resume)', checked: false },
        { label: 'Salary Negotiation', checked: false },
        {
            label: 'Mock Interviews (where you help someone practice interviewing)',
            checked: false,
        },
        {
            label:
                'Portfolio Review (where you give feedback on a designer’s portfolio)',
            checked: false,
        },
        { label: 'Founder Coaching', checked: false },
        { label: 'Other:', checked: false },
    ]);
    const [provideCheckedOther, setProvideCheckedOther] = useState('');
    const [coachAgreeChecked, setCoachAgreeChecked] = useState([
        { label: 'I agree', checked: false },
    ]);

    // useState for calendar
    const [events, setEvents] = useState([]);

    const ExpertiseOnChange =
        (index) =>
            ({ target: { checked } }) => {
                const newValues = [...expertiseArea];
                const value = expertiseArea[index];
                newValues[index] = { ...value, checked };
                setExpertiseArea(newValues);
            };

    const ProvideCheckboxonChange =
        (index) =>
            ({ target: { checked } }) => {
                const newValues = [...provideChecked];
                const value = provideChecked[index];
                newValues[index] = { ...value, checked };
                setProvideChecked(newValues);
            };

    const CoachAgreeOnChange =
        (index) =>
            ({ target: { checked } }) => {
                const newValues = [...coachAgreeChecked];
                const value = coachAgreeChecked[index];
                newValues[index] = { ...value, checked };
                setCoachAgreeChecked(newValues);
            };

    const handleRadioChange = (e) => {
        setPaidOpt(e.target.value);

        if (e.target.value === 'yes') {
            setPaidOptHelperText('');
            setPaidOptError(false);
        } else if (e.target.value === 'no') {
            setPaidOptHelperText('');
            setPaidOptError(false);
        } else {
            setPaidOptHelperText('Please select an option');
            setPaidOptError(true);
        }
    };

    const userInfo = JSON.parse(sessionStorage.getItem('profile'));

    const handleSubmit = async () => {
        let isValid = false;
        const regexName = /[a-zA-Z]/;

        const regexEmail =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const regexLinkedIn =
            /^((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;

        if (regexName.test(firstName)) {
            isValid = true;
        } else {
            isValid = false;
            setFirstNameErrorMsg(true);
            alert('Please enter your first name or only letters');
            return;
        }

        if (regexName.test(lastName)) {
            isValid = true;
        } else {
            isValid = false;
            alert('Please enter your last name or only letters');
            return;
        }

        if (regexEmail.test(email)) {
            isValid = true;
        } else {
            isValid = false;
            alert('Invalid your email');
            return;
        }

        if (regexLinkedIn.test(linkedIn)) {
            isValid = true;
        } else {
            isValid = false;
            alert('Invalid your LinkedIn URL');
            return;
        }

        if (introOfCoach !== '') {
            isValid = true;
        } else {
            isValid = false;
            alert('Please write down your introduction');
            return;
        }

        const imageInput = document.querySelector('#imageInput');
        const file = imageInput.files[0];

        if (file !== undefined) {
            isValid = true;
        } else {
            isValid = false;
            alert('Please upload your image!');
            return;
        }

        if (paidOpt !== '') {
            isValid = true;
        } else {
            isValid = false;
            alert('Please chose "Yes" or "No');
            return;
        }

        if (coachStyle !== '') {
            isValid = true;
        } else {
            isValid = false;
            alert('Please write down your coaching style');
            return;
        }

        const expertiseCheckboxLength = expertiseArea.filter(
            (value) => value.checked === true
        ).length;

        if (expertiseCheckboxLength > 0) {
            isValid = true;
        } else {
            isValid = false;
            alert('Please chose at least one.');
            return;
        }

        const provideCheckboxLength = provideChecked.filter(
            (value) => value.checked === true
        ).length;

        if (provideCheckboxLength > 0) {
            isValid = true;
        } else {
            isValid = false;
            alert('Please chose at least one.');
            return;
        }

        const coachAgreeCheckboxLength = coachAgreeChecked.filter(
            (value) => value.checked === true
        ).length;

        if (coachAgreeCheckboxLength > 0) {
            isValid = true;
        } else {
            isValid = false;
            alert('You must agree to the agreement.');
            return;
        }

        if (isValid === true) {
            const imageInput = document.querySelector('#imageInput');
            const file = imageInput.files[0];

            const result = await axios.get(
                `${API}/api/user/s3Url/newCoach-${file.name}`
            );

            const url = result.data.url;

            await axios.put(url, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadFile = url.split('?')[0];

            const obj = coachProfileObj({
                firstName,
                lastName,
                email,
                linkedIn,
                introOfCoach,
                uploadFile,
                paidOpt,
                wage,
                coachStyle,
                numOfPeople,
                hoursPerWeek,
                certification,
                expertiseArea,
                expertiseAreaOther,
                provideChecked,
                provideCheckedOther,
                coachAgreeChecked,
                events,
            });
            setTimeout(() => {
                dispatch(actionNewCoach(obj));
            }, 2000);

            history.push('/');
        } else {
            alert('check again');
            return;
        }
    };

    const redirection = () => {
        alert('Need to signin to join our coach team')
        history.push('/')
    }

    const redirectionAsUser = () => {
        alert('You can not join our coach team unless you are a regular user')
        history.push('/')
    }

    return (
        <>
            {userInfo && userInfo?.role === 0 ? (
                <div className='body'>
                    <div className='main-container'>
                        <div className='main-title'>FITD New Coach Application</div>
                        <form>
                            <div className='sub-title'>Basic Information:</div>
                            <div className='textField'>
                                <TextField
                                    required
                                    autoFocus
                                    label='First name'
                                    type='text'
                                    value={firstName}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                        setFirstNameErrorMsg(false);
                                    }}
                                    error={firstNameErrorMsg}
                                    helperText={
                                        firstNameErrorMsg
                                            ? 'Please enter your first name or only letters'
                                            : ''
                                    }
                                />
                            </div>
                            <div className='textField'>
                                <TextField
                                    required
                                    autoFocus
                                    label='Last name'
                                    type='text'
                                    value={lastName}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        setLastNameErrorMsg(false);
                                    }}
                                    error={lastNameErrorMsg}
                                    helperText={
                                        lastNameErrorMsg
                                            ? 'Please enter your last name or only letters'
                                            : ''
                                    }
                                />
                            </div>
                            <div className='textField'>
                                <TextField
                                    required
                                    label='E-mail'
                                    type='email'
                                    value={email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <AlternateEmail />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailErrorMsg(false);
                                    }}
                                    error={emailErrorMsg}
                                    helperText={emailErrorMsg ? 'Invalid your E-mail' : ''}
                                />
                            </div>
                            <div className='textField'>
                                <TextField
                                    required
                                    label='LinkedIn Profile'
                                    type='text'
                                    value={linkedIn}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <LinkedIn />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        setLinkedIn(e.target.value);
                                        setLinkedInErrorMsg(false);
                                    }}
                                    error={linkedInErrorMsg}
                                    helperText={
                                        linkedInErrorMsg ? 'Invalid your LinkedIn Profile URL!' : ''
                                    }
                                />
                            </div>
                            <div className='textField'>
                                <TextField
                                    required
                                    label='Explain yourself'
                                    type='text'
                                    multiline
                                    value={introOfCoach}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <Create />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        setIntroOfCoach(e.target.value);
                                        setIntroOfCoachErrorMsg(false);
                                    }}
                                    error={introOfCoachErrorMsg}
                                    helperText={
                                        introOfCoachErrorMsg
                                            ? 'Please write down your introduction'
                                            : ''
                                    }
                                />
                            </div>
                            <div className='uploadPhoto'>
                                <input id='imageInput' type='file' accept='image/*' />
                            </div>
                            <div className='sub-title'>
                                Set the available time for the coaching:
                            </div>
                            <div>
                                <BookScheduler events={events} setEvents={setEvents} />
                            </div>
                            <br /> <br />
                            <div className='sub-title'>Coaching Experience:</div>
                            <div className='coachExperience'>
                                <FormControl component='fieldset' error={paidOptErrorMsg}>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        Have you had paid coaching client?
                                    </FormLabel>
                                    <RadioGroup
                                        required
                                        value={paidOpt}
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel
                                            value='yes'
                                            control={<Radio />}
                                            label='Yes'
                                        />
                                        <FormControlLabel
                                            value='no'
                                            control={<Radio />}
                                            label='No'
                                        />
                                    </RadioGroup>
                                    <FormHelperText>{paidOptHelperText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className='coachExperience'>
                                <FormControl>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        What is your coaching hourly rate?
                                    </FormLabel>
                                    <TextField
                                        required
                                        type='number'
                                        value={wage}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <AttachMoney />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) =>
                                            e.target.value < 0 ? setWage(0) : setWage(e.target.value)
                                        }
                                        helperText={
                                            'If you do not type, your hourly rate will be saved as ZERO.'
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className='coachExperience'>
                                <FormControl>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        Please describe your coaching style.
                                    </FormLabel>
                                    <TextField
                                        required
                                        type='text'
                                        value={coachStyle}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Create />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) => {
                                            setCoachStyle(e.target.value);
                                            setCoachStyleErrorMsg(false);
                                        }}
                                        error={coachStyleErrorMsg}
                                        helperText={
                                            coachStyleErrorMsg
                                                ? 'Please write down your coaching style.'
                                                : ''
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className='coachExperience'>
                                <FormControl>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        How many people have you coached?
                                    </FormLabel>
                                    <TextField
                                        required
                                        type='number'
                                        value={numOfPeople}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Create />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) =>
                                            e.target.value < 0
                                                ? setNumOfPeople(0)
                                                : setNumOfPeople(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className='coachExperience'>
                                <FormControl>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        How many hours per week will you be available to coach on
                                        FITD?
                                    </FormLabel>
                                    <TextField
                                        required
                                        type='number'
                                        value={hoursPerWeek}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Create />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) =>
                                            e.target.value < 0
                                                ? setHoursPerWeek(0)
                                                : setHoursPerWeek(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className='coachExperience'>
                                <FormControl>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        Coaching Certifications
                                    </FormLabel>
                                    <TextField
                                        type='text'
                                        value={certification}
                                        placeholder='e.g. ICF, CTI'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position='start'>
                                                    <Create />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) => setCertification(e.target.value)}
                                        helperText={
                                            'If you have a certification, please write here!'
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className='coachExperience'>
                                <FormControl>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        Please choose areas of expertise you would be most
                                        comfortable coaching on?
                                    </FormLabel>
                                    <div className='checkbox'>
                                        <CoachCheckboxGroup
                                            required
                                            values={expertiseArea}
                                            onChange={ExpertiseOnChange}
                                            expertiseAreaOther={expertiseAreaOther}
                                            setExpertiseAreaOther={setExpertiseAreaOther}
                                        />
                                    </div>
                                </FormControl>
                            </div>
                            <div className='coachExperience'>
                                <FormControl>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        What services would you be comfortable providing? (Check all
                                        that apply)
                                    </FormLabel>
                                    <div className='checkbox'>
                                        <ProvideCheckboxGroup
                                            required
                                            values={provideChecked}
                                            ProvideCheckboxonChange={ProvideCheckboxonChange}
                                            provideCheckedOther={provideCheckedOther}
                                            setProvideCheckedOther={setProvideCheckedOther}
                                        />
                                    </div>
                                </FormControl>
                            </div>
                            <div className='coachExperience'>
                                <FormControl>
                                    <FormLabel style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        I have read and agree to the Coach agreement.
                                    </FormLabel>
                                    <div>
                                        <div className='typograph'>
                                            You need a confirmation procedure to become a coach. It
                                            takes about business 5 days, and if it is approved, we
                                            will contact you.
                                        </div>
                                    </div>
                                    <div className='checkbox'>
                                        <CoachAgreeCheckboxGroup
                                            required
                                            values={coachAgreeChecked}
                                            CoachAgreeOnChange={CoachAgreeOnChange}
                                        />
                                    </div>
                                </FormControl>
                            </div>
                            <div className='submitBtn'>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    onClick={handleSubmit}
                                    style={{ margin: '0 auto', display: 'flex' }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            ) :

                userInfo?.role === 1 || userInfo?.role === 2 ? redirectionAsUser() : redirection()
            }
        </>
    );
};

export default NewCoach;
// https://www.linkedin.com/in/coach/
