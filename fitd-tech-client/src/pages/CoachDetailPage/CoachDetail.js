import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import './CoachDetail.css';
import { TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import { API } from '../../config';

export const CoachDetail = () => {
    const coachData = useLocation().state;
    const [rating, setRating] = useState('2.5');
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [submittedReview, setSubmittedReview] = useState(false);
    const [noMoreReviews, setNoMoreReviews] = useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile'));
    const history = useHistory();
    const {
        firstName,
        lastName,
        expertiseArea,
        fileUrl,
        categories,
        coachStyle,
        email,
        linkedIn,
        certification,
        services,
        introOfCoach,
    } = coachData;

    const userInfo =
        sessionStorage.getItem('profile') &&
        JSON.parse(sessionStorage.getItem('profile'));

    const onClickBookBtn = () => {
        if (userInfo === null) {
            history.push('/auth');
        } else {
            history.push({
                pathname: `/payment/${firstName} ${lastName}`,
                state: coachData,
            });
        }
    };

    const ratingChange = (event, value) => {
        setRating(value?.toString());
    };

    const handleSubmitReview = async () => {
        setSubmittedReview(false);
        // console.log(`rating`, rating);
        // console.log(`reviews`, reviews);
        if (comment === '') {
            return alert('Should leave message');
        }
        if (profile) {
            const {
                _id,
                firstName: logginUserFirstName,
                lastName: logginUserLastName,
            } = profile;
            const coachId = coachData._id;
            const loginUserFullname = `${logginUserFirstName} ${logginUserLastName}`;
            const reviewObj = {
                review: comment,
                rating,
                userId: _id,
                userName: loginUserFullname,
                coachId,
            };
            await axios.post(
                `${API}/api/review/coach-review`,
                reviewObj,
                { withCredentials: true }
            );
            setComment('');
        }
        setSubmittedReview(true);
    };

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                `${API}/api/review/${coachData._id}/coach-reviews`,
                {
                    withCredentials: true,
                }
            );
            const reviews = data.reviews;

            setReviews(reviews);
            if (profile) {
                const { _id } = profile;
                const alreadyReviewed =
                    reviews.filter((data) => data.creator === _id).length > 0
                        ? true
                        : false;
                setNoMoreReviews(alreadyReviewed);
            }
        })();
    }, [submittedReview]);

    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const dataLimit = 5;
    const indexOfLast = page * dataLimit;
    const indexOfFirst = indexOfLast - dataLimit;
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        if (reviews) {
            setPageData(reviews.slice(indexOfFirst, indexOfLast));
        }
    }, [indexOfFirst, indexOfLast, reviews]);

    return (
        <div className='CoachDetailPage'>
            <div className='left'>
                <div className='leftTop'>
                    <div className='leftImg'>
                        <img src={fileUrl} alt='coach_face' />
                    </div>
                    <div className='leftName'>{`${firstName} ${lastName}`}</div>
                    <div className='leftExpertise'>
                        {expertiseArea.map((data) => {
                            return <div>{data.label}</div>;
                        })}
                    </div>
                </div>
                {userInfo?.role === 0 || userInfo === null ? (
                    <div className='leftSubscribeBtn'>
                        <button className='bookBtn' onClick={onClickBookBtn}>
                            Book Coach
                        </button>
                    </div>
                ) : (
                    ''
                )}
                <div className='leftBottom'>
                    <div className='leftEmail'>{email}</div>
                    <div className='leftSotialLinks'>
                        <div className='leftLinkedInBtn'>
                            <LinkedInIcon />
                        </div>
                        <div className='leftEmailBtn'>
                            <EmailIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='rightTop'>
                    <h2 className='righTopTitle'>About Me</h2>
                    <p className='rightIntroduction'>{introOfCoach}</p>
                </div>
                <div className='rightMiddle'>
                    <h2 className='rightMiddleTitle'>Teaching</h2>
                    <div className='bigLink'>related contents...</div>
                </div>
                <div className='rightReviews'>
                    <h2 className='rightReviewsTitle'>Reviews</h2>
                    <div>
                        {reviews.length > 0 ? (
                            <>
                                {pageData.map((review) => {
                                    return (
                                        <div className='reviews'>
                                            <div className='reviewTop'>
                                                <div className='creatorName'>{review.creatorName}</div>
                                                <Rating
                                                    name='half-rating'
                                                    readOnly
                                                    value={review.rating}
                                                    size='small'
                                                    style={{ fontSize: '20px' }}
                                                />
                                            </div>
                                            <div className='reviewContent'>{review.review}</div>
                                        </div>
                                    );
                                })}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        margin: '30px auto',
                                    }}
                                >
                                    <Pagination
                                        count={Math.ceil(reviews.length / dataLimit)}
                                        color='secondary'
                                        onChange={handlePageChange}
                                        page={page}
                                    />
                                </div>
                            </>
                        ) : (
                            <div> No reviews...</div>
                        )}
                    </div>
                </div>
                <div className='rightBottom'>
                    <h2 className='rightBottomTitle'>Rating</h2>

                    <Rating
                        name='half-rating'
                        defaultValue={2.5}
                        precision={0.5}
                        onChange={ratingChange}
                        size='large'
                        style={{ fontSize: '30px' }}
                    />

                    <div className='rightBottomRating'>
                        <h2 className='rightBottomSubTitle'>Comment</h2>
                        <TextField
                            id='outlined-multiline-static'
                            label={profile ? 'Comment' : 'Need to login'}
                            disabled={profile && !noMoreReviews ? false : true}
                            multiline
                            rows={4}
                            variant='outlined'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            className={profile && !noMoreReviews ? 'on' : 'off'}
                            onClick={() => handleSubmitReview()}
                            type='submit'
                            disabled={profile && !noMoreReviews ? false : true}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
