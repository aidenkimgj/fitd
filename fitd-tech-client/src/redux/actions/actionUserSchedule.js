import * as types from '../constants/actionTypes';

const actionAddUserSchedule = ({ selectedEvents, coachId }) => {
    return {
        type: types.ADD_USER_SCHEDULE_REQUEST,
        payload: { selectedEvents, coachId },
    };
};

export default actionAddUserSchedule;
