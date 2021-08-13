import 'date-fns';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './addContent.styles';
import { useDispatch } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { editorConfiguration } from '../../components/Editor/EditorConfig';
import Myinit from '../../components/Editor/UploadAdapter';
import { AttachMoney } from '@material-ui/icons';
import actionAddContent from '../../redux/actions/actionAddContent';
import {
    Container,
    FormControl,
    Grid,
    TextField,
    NativeSelect,
    InputAdornment,
    Button,
} from '@material-ui/core';
import axios from 'axios';
import { API } from '../../config';

const AddContent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentPrice, setContentPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [viaSelected, setViaSelected] = useState('none');
    const [typeSelected, setTypeSelected] = useState('none');
    const [details, setDetails] = useState({});
    // Error Messages
    const [titleErrMsg, setTitleErrMsg] = useState(false);
    const [descriptionErrMsg, setDescriptionErrMsg] = useState(false);
    const [priceErrMsg, setPriceErrMsg] = useState(false);
    const [durationErrMsg, setDurationErrMsg] = useState(false);
    const [viaErrMsg, setViaErrMsg] = useState(false);
    const [contentTypeErrMsg, setContentTypeErrMsg] = useState(false);
    const [detailsErrMsg, setDetailsErrMsg] = useState(false);

    const getDataFromCKEditor = (event, editor) => {
        const data = editor.getData();
        setDetails({
            ...details,
            contents: data,
        });
    };

    const handleSubmit = async () => {
        let isValid = false;

        const imageInput = document.querySelector('#imageInput');
        const file = imageInput.files[0];

        if (title !== '') {
            isValid = true;
        } else {
            isValid = false;
            setTitleErrMsg(true);
            alert('Please write down content title');
            return;
        }

        if (description !== '') {
            isValid = true;
        } else {
            isValid = false;
            setDescriptionErrMsg(true);
            alert('Please write down content description');
            return;
        }

        if (contentPrice > 0) {
            isValid = true;
        } else {
            isValid = false;
            setPriceErrMsg(true);
            alert('Please enter content price');
            return;
        }

        if (duration > 0) {
            isValid = true;
        } else {
            isValid = false;
            setDurationErrMsg(true);
            alert('Please enter content duration');
            return;
        }

        if (viaSelected !== 'none') {
            isValid = true;
        } else {
            isValid = false;
            setViaErrMsg(true);
            alert('Please select content via');
            return;
        }

        if (typeSelected !== 'none') {
            isValid = true;
        } else {
            isValid = false;
            setContentTypeErrMsg(true);
            alert('Please select content type');
            return;
        }

        if (details.contents !== '') {
            isValid = true;
        } else {
            isValid = false;
            alert('Please write down content details');
            return;
        }
        const fileType = file.type.split('/')[0];
        if (file !== undefined && fileType === 'image') {
            isValid = true;
        } else {
            isValid = false;
            alert('Please upload an image');
            return;
        }

        if (isValid === true) {
            const result = await axios.get(
                `${API}/api/user/s3Url/content-${file.name}`
            );
            const url = result.data.url;
            await axios.put(url, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadFile = url.split('?')[0];
            const addContentObj = {
                title,
                description,
                contentPrice,
                duration,
                viaSelected,
                typeSelected,
                details,
                uploadFile,
            };
            dispatch(actionAddContent(addContentObj));
            history.push('/');
        } else {
            alert('Please check content application form');
            return;
        }
        return;
    };

    return (
        <Fragment>
            <main className={classes.body}>
                <Container className={classes.container}>
                    <form>
                        <div className={classes.title}>Content Title:</div>
                        <TextField
                            required
                            type='text'
                            variant='outlined'
                            className={classes.textField}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setTitleErrMsg(false);
                            }}
                            error={titleErrMsg}
                            helperText={titleErrMsg ? 'Please write down title' : ''}
                        />
                        <div className={classes.title}>Content Description:</div>
                        <TextField
                            required
                            type='text'
                            variant='outlined'
                            className={classes.textField}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setDescriptionErrMsg(false);
                            }}
                            error={descriptionErrMsg}
                            helperText={
                                descriptionErrMsg ? 'Please write down content description' : ''
                            }
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div className={classes.gridTitle}>Content Price:</div>
                                <TextField
                                    required
                                    type='number'
                                    variant='outlined'
                                    className={classes.textField}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <AttachMoney />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={contentPrice}
                                    onChange={(e) => {
                                        e.target.value < 0
                                            ? setContentPrice(0)
                                            : setContentPrice(e.target.value);
                                    }}
                                    error={priceErrMsg}
                                    helperText={priceErrMsg ? 'Please enter content price' : ''}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <div className={classes.gridTitle}>Content Duration:</div>
                                <TextField
                                    required
                                    type='number'
                                    variant='outlined'
                                    className={classes.textField}
                                    value={duration}
                                    onChange={(e) => {
                                        e.target.value < 0
                                            ? setDuration(0)
                                            : setDuration(e.target.value);
                                    }}
                                    error={durationErrMsg}
                                    helperText={
                                        durationErrMsg ? 'Please enter content price' : ''
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item spacing={1} xs={6}>
                                <div className={classes.gridFiled}>Content Via:</div>
                                <FormControl>
                                    <NativeSelect
                                        required
                                        value={viaSelected}
                                        className={classes.nativeSelect}
                                        onChange={(e) => {
                                            setViaSelected(e.target.value);
                                        }}
                                        error={viaErrMsg}
                                        helperText={viaErrMsg ? 'Please select content via' : ''}
                                    >
                                        <option value='none'>None</option>
                                        <option value='video'>Video</option>
                                        <option vlaue='phone'>Phone</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item spacing={1} xs={6}>
                                <div className={classes.gridFiled}>Content Type:</div>
                                <FormControl>
                                    <NativeSelect
                                        required
                                        value={typeSelected}
                                        className={classes.nativeSelect}
                                        onChange={(e) => {
                                            setTypeSelected(e.target.value);
                                        }}
                                        error={contentTypeErrMsg}
                                        helperText={
                                            contentTypeErrMsg ? 'Please select content type' : ''
                                        }
                                    >
                                        <option value='none'>None</option>
                                        <option value='oneOnOne'>One on One</option>
                                        <option vlaue='group'>Group</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div className={classes.ckeditorTitle}>Content Details:</div>
                        <div className={classes.ckeditor}>
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfiguration}
                                onReady={Myinit}
                                onBlur={getDataFromCKEditor}
                                error={detailsErrMsg}
                                helperText={
                                    detailsErrMsg ? 'Please write down content details' : ''
                                }
                            />
                        </div>

                        {/* <div className={classes.ckeditorTitle}>Upload Image:</div> */}
                        <div className={classes.file_upload_icon}>
                            <form id='imageForm' onSubmit={(e) => e.preventDefault()}>
                                <input id='imageInput' type='file' accept='image/*' />
                            </form>
                        </div>
                        <Button
                            variant='outlined'
                            size='large'
                            className={classes.submitBtn}
                            onClick={handleSubmit}
                        >
                            SUBMIT
                        </Button>
                    </form>
                </Container>
            </main>
        </Fragment>
    );
};

export default AddContent;
