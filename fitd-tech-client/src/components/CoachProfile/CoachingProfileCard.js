import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { CoachCategoriesCard } from './CoachCategoriesCard';
import './CoachingProfileCard.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 360,
    },
});

export const CoachingProfileCard = ({ coachData, index }) => {
    const classes = useStyles();
    const { firstName, lastName, fileUrl, expertiseArea, introOfCoach } =
        coachData;
    function textLengthOverCut(txt, len, lastTxt) {
        if (len === '' || len === null) {
            len = 20;
        }
        if (lastTxt === '' || lastTxt === null) {
            lastTxt = '...';
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
    }
    return (
        <div className={`coachingProfileCard`} key={index}>
            <div className='cards__item__link '>
                <CardMedia
                    className={`${classes.media} coachImg`}
                    image={fileUrl}
                    title={fileUrl}
                />
                <div className='cardActionArea'>
                    <div className='cardContent'>
                        <h2 className='coachName'>{`${firstName} ${lastName}`}</h2>
                        <div className='coachCategories'>
                            {expertiseArea.map((data) => {
                                return <CoachCategoriesCard categories={data} />;
                            })}
                        </div>
                        <h6 className='coachIntro'>
                            {textLengthOverCut(introOfCoach, '200', '...')}
                        </h6>
                    </div>
                    <div className='cardActions'>
                        <Link
                            className='coachLeanMoreButton'
                            to={{
                                pathname: `/coaches/${firstName} ${lastName}`,
                                state: coachData,
                            }}
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
