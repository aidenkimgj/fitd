import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../AdminDropdown/AdminDropdown.css'

export const CoachDropdown = ({ scrollDown }) => {
    return (
        <div className={`adminDropdown`}>
            <DropdownButton id="dropdown" className={scrollDown ? 'scrollDownAdminDropDown' : 'defaultAdminDropDown'} title="Coach">
                <Link to="/manageCoach">Manage Schedule</Link>
            </DropdownButton>
        </div>
    )
}
