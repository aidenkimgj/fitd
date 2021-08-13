import React, { useEffect } from 'react';
import HeroSection from '../Home/HeroSection';
import { homeObjOne, homeObjTwo } from './Data';

function Content() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <HeroSection {...homeObjOne} />
            <HeroSection {...homeObjTwo} />
        </>
    );
}

export default Content;