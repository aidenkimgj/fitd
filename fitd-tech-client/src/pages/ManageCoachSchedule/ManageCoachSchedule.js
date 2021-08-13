import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookScheduler from '../../components/BookScheduler/BookScheduler'
import LoadingSpinner from '../../components/LoadingSpinner';
import { MessageBox } from '../../components/MessageBox';
import { API } from '../../config';
import './ManageCoachSchedule.css';

export const ManageCoachSchedule = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { _id } = JSON.parse(sessionStorage.getItem('profile'));
    useEffect(() => {
        (
            async () => {
                const { data } = await axios.post(`${API}/api/user/getApplication`, {}, {
                    withCredentials: true
                });
                const application = data.app.filter((data) => data.user === _id);
                if (application.length > 0) {
                    const events = application[0].events
                    events.map((data) => {
                        data['start'] = new Date(data.start);
                        data['end'] = new Date(data.end);
                    })
                    console.log(`events`, events)
                    setEvents([...events]);
                }
            }
        )();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        await axios.post(`${API}/api/schedule/manage-coach-schedule`, { changedEvents: events }, {
            withCredentials: true
        });

        setTimeout(() => {
            setLoading(false);
            setMessage('Schedule is Updated');
        }, 1500);
        setTimeout(() => {
            setMessage('');
        }, 2500);


    }

    return (
        <div className='manageCoachSchdule-container'>
            <div className='manageCoachSchdule-title'>
                Manage Schedule
            </div>
            <div className='manageCoachSchdule-scheduler'>
                <BookScheduler events={events} setEvents={setEvents} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                {message !== '' && <MessageBox>{message}</MessageBox>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                {loading && <LoadingSpinner />}
            </div>
            <div className='manageCoachSchdule-btn'>
                <button className='sendBtn' onClick={() => handleSubmit()}>
                    Update
                </button>
            </div>
        </div>
    )
}
