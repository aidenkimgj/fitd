import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaLinkedin
} from 'react-icons/fa';
import { RiDoorOpenFill } from 'react-icons/ri';

function Footer() {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join our exclusive newsletter to receive the latest news and trends
                </p>
                {/* <p className='footer-subscription-text'>
                    You can unsubscribe at any time
                </p>
                <div className='input-areas'>
                    <form>
                        <input
                            className='footer-input'
                            name='email'
                            type='email'
                            placeholder='Email Address'
                        />
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div> */}
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/faq'>How it works</Link>
                        <Link to='/coaching'>Our Coaches</Link>
                    </div>
                    {/* <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Support</Link>
                    </div> */}
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <a href='https://www.instagram.com/' target="_blank" without rel="noreferrer" >Instagram</a>
                        <a href='https://www.facebook.com/' target="_blank" without rel="noreferrer">Facebook</a>
                        <a href='https://youtube.com/' target="_blank" without rel="noreferrer">Youtube</a>
                        <a href='https://twitter.com/' target="_blank" without rel="noreferrer">Twitter</a>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            <RiDoorOpenFill className='navbar-icon' />
                            FITD
                        </Link>
                    </div>
                    <small className='website-rights'>FITD © 2021</small>
                    <div className='social-icons'>
                        <a
                            className='social-icon-link'
                            href='https://www.facebook.com/'
                            target='_blank'
                            aria-label='Facebook'
                            without rel="noreferrer"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            className='social-icon-link'
                            href='https://www.instagram.com/'
                            target='_blank'
                            aria-label='Instagram'
                            without rel="noreferrer"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            className='social-icon-link'
                            href={
                                'https://youtube.com/'
                            }
                            target='_blank'
                            aria-label='Youtube'
                            without rel="noreferrer"
                        >
                            <FaYoutube />
                        </a>
                        <a
                            className='social-icon-link'
                            href='https://twitter.com/'
                            target='_blank'
                            aria-label='Twitter'
                            without rel="noreferrer"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            className='social-icon-link'
                            href='https://www.linkedin.com/company/footinthedoor/'
                            target='_blank'
                            aria-label='LinkedIn'
                            without rel="noreferrer"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;