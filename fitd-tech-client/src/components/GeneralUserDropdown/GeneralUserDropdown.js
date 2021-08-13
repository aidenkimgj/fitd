import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../AdminDropdown/AdminDropdown.css'

export const GeneralUserDropdown = ({ scrollDown }) => {
    return (
        <div className={`adminDropdown`}>
            <DropdownButton id="dropdown" className={scrollDown ? 'scrollDownAdminDropDown' : 'defaultAdminDropDown'} title="User">
                <Link to="/managemyschedule/user">Manage Schedule</Link>
            </DropdownButton>
        </div>
    )
}
