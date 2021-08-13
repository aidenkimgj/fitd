import axios from 'axios';
import { API } from '../config';

export const getCoaches = async (search) => {
    let coaches;
    console.log(`API check....`, API)
    if (search) {
        const { data } = await axios.get(
            `${API}/api/search/coach/${search}`,
            {
                withCredentials: true,
            }
        );
        coaches = data;
    } else {
        const { data } = await axios.get(
            `${API}/api/search/coach/all`,
            {
                withCredentials: true,
            }
        );
        const coachResults = data;
        coaches = coachResults;
    }
    return coaches;
};
