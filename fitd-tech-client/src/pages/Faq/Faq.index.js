import React, { useEffect } from 'react';
import Cards from '../../components/FaqPage/Cards.faq';

function Faq() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <Cards />
        </>
    );
}

export default Faq;