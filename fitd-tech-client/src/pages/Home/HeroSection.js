import React from 'react';
import './HeroSection.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

const Parse = (txt) => {
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(txt, 'text/html');
    let doc = htmlDoc.getElementsByTagName('h1')[0];
    return doc;
};

function HeroSection({
    lightBg,
    topLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt,
    imgStart,
    browse
}) {
    return (
        <>
            <div
                className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
            >
                <div className='container'>
                    <div
                        className='row home__hero-row'
                        style={{
                            display: 'flex',
                            flexDirection: imgStart === 'start' ? 'row-reverse' : 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div className='row'>
                            <div className='home__hero-text-wrapper'>
                                <div className='top-line'>{topLine}</div>
                                <div
                                    className={lightText ? 'heading' : 'heading dark'}
                                    dangerouslySetInnerHTML={{ __html: headline }}
                                />
                                <p
                                    className={
                                        lightTextDesc
                                            ? 'home__hero-subtitle'
                                            : 'home__hero-subtitle dark'
                                    }
                                >
                                    {description}
                                </p>
                                {console.log(`browse`, browse)}
                                {
                                    alt === 'podcast' ? (
                                        <a href={`${browse}`} target='_blank' without rel="noreferrer">
                                            <Button buttonSize='btn--wide' buttonColor='blue'>
                                                {buttonLabel}
                                            </Button>
                                        </a>
                                    ) : (
                                        <Link to={`${browse}`}>
                                            <Button buttonSize='btn--wide' buttonColor='blue'>
                                                {buttonLabel}
                                            </Button>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='home__hero-img-wrapper'>
                                <img src={img} alt={alt} className='home__hero-img' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;
