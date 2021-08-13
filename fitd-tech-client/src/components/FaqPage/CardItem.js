import React from 'react';

function CardItem(props) {
    return (
        <>
            <li className='cards__item'>
                <a href={props.path} target="_blank" rel="noopener noreferrer" className='cards__item__link'>

                    <div className='cards__item__info'>
                        <h5 className='cards__item__heading'>
                            {props.heading}
                        </h5>
                        <h5 className='cards__item__text'>
                            {props.text}</h5>



                    </div>
                </a>
            </li>
        </>
    );
}

export default CardItem;