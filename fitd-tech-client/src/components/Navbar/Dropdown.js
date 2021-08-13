import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function Dropdown() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
            <div
                onClick={handleClick}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                {MenuItems.map((item, index) => {
                    const newWebPage = item.path.includes('https://');
                    return (
                        <>
                            {
                                newWebPage ? (
                                    <a id='contentlink' href='https://play.acast.com/s/ninetwentynine?source=explore-tab' target="_blank" rel="noopener noreferrer">{item.title}</a>
                                ) : (
                                    <Link id='contentlink' to='/articles' >{item.title}</Link>
                                )
                            }
                        </>
                    );
                })}
            </div>
        </>
    );
}

export default Dropdown;