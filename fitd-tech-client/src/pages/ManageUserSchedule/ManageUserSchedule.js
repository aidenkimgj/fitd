import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const ManageUserSchedule = () => {
    const { events } =
        sessionStorage.getItem('profile') &&
        JSON.parse(sessionStorage.getItem('profile'));

    const localizer = momentLocalizer(moment);

    events.map((data) => {
        data['start'] = new Date(data.start);
        data['end'] = new Date(data.end);
    });

    return (
        <div className='container-main'>
            <div className='manageCoachSchdule-title'>
                Check Your Schedule
            </div>
            <Calendar
                selectable='false'
                defaultDate={moment().toDate()}
                defaultView='week'
                localizer={localizer}
                events={events}
                titleAccessor={events.title}
                startAccessor={events.start}
                endAccessor={events.end}
            />
        </div>
    );
};

export default ManageUserSchedule;
