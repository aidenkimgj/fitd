import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { RiDoorOpenFill } from 'react-icons/ri';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { useSelector } from 'react-redux';
import AvatarIcon from '../AvatarIcon';
import Dropdown from './Dropdown';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const { authData, loading } = useSelector((state) => state.authReducer);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [dropdown, setDropdown] = useState(false);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
        return {
            // window.removeEventListener('resize', showButton)
        };
    }, []);

    useEffect(() => {
        return {};
    }, []);

    const [scrollDown, setScrollDown] = useState(false);
    const controlNavbar = () => {
        if (window.scrollY < 100) {
            setScrollDown(false);
        } else {
            setScrollDown(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        }
    }, []);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className={`navbar ${scrollDown ? 'scrolldown' : 'default'}`}>
                    <div className='navbar-container container'>
                        <Link
                            to='/'
                            style={{ color: 'black', fontWeight: 'bolder' }}
                            className='navbar-logo'
                            onClick={closeMobileMenu}
                        >
                            <RiDoorOpenFill style={{ color: scrollDown ? '#fff' : '#000000da' }} className='navbar-icon' />
                            <span style={{ color: scrollDown ? '#fff' : '#000000da' }}>FITD</span>
                        </Link>
                        <div className='menu-icon' onClick={handleClick}>
                            {click ? (
                                <FaTimes style={{ color: scrollDown ? '#fff' : '#000000da' }} />
                            ) : (
                                <FaBars style={{ color: scrollDown ? '#fff' : '#000000da' }} />
                            )}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li
                                className='nav-item'
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            >
                                <Link
                                    to='/content'
                                    className={`nav-links ${scrollDown ? 'scrolldownLink' : 'default'}`}
                                    onClick={closeMobileMenu}
                                >
                                    Content <i className='fas fa-caret-down' />
                                </Link>
                                {dropdown && <Dropdown />}
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/coaching'
                                    className={`nav-links ${scrollDown ? 'scrolldownLink' : 'default'}`}
                                    onClick={closeMobileMenu}
                                >
                                    Coaching
                                </Link>
                            </li>

                            <li className='nav-item'>
                                <Link
                                    to='/faq'
                                    className={`nav-links ${scrollDown ? 'scrolldownLink' : 'default'}`}
                                    onClick={closeMobileMenu}
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li className='nav-btn'>
                                <AvatarIcon scrollDown={scrollDown} />
                            </li>
                        </ul>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;
