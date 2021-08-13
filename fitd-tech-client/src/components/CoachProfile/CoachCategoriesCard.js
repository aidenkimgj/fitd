import React from 'react';
import './coachCategoriesCard.css';

export const CoachCategoriesCard = ({ categories }) => {
    const { label } = categories;
    return (
        <span className="coachCategory">
            {label}
        </span>
    )
}
