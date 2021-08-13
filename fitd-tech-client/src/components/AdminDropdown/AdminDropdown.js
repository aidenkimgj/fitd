import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminDropdown.css'

export const AdminDropdown = ({ scrollDown }) => {
    return (
        <div className={`adminDropdown`}>
            <DropdownButton id="dropdown" className={scrollDown ? 'scrollDownAdminDropDown' : 'defaultAdminDropDown'} title="Admin">
                <Link to="/manageusers">Manage User</Link>
                <Link to="/managecontents">Manage Content</Link>
            </DropdownButton>
        </div>
    )
}
