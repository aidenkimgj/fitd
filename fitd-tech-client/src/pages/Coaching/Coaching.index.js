import React, { useEffect, useState } from 'react';
import { CoachingProfileCard } from '../../components/CoachProfile/CoachingProfileCard';
import './Coaching.css';
import { useHistory } from 'react-router';
import { getCoaches } from '../../libs/getCoaches';
import { BiSearch } from 'react-icons/bi';

function Coaching() {
    const [coaches, setCoaches] = useState([]);

    const history = useHistory();

    const userInfo = JSON.parse(sessionStorage.getItem('profile'));
    const onClickBtn = () => {
        history.push('/newcoach');
    };

    const handleSearch = async (e) => {
        const search = e.target.value;
        const coaches = await getCoaches(search);
        setCoaches(coaches);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            const coaches = await getCoaches();
            setCoaches(coaches);
        })();
    }, []);

    return (
        <div className='Coaching'>
            <h1 className='coaching_header'>Explore our Coaches</h1>
            <div className='container-search_btn'>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-txt'
                        name=''
                        placeholder='Search Category'
                        onChange={handleSearch}
                    />
                    <a className='search-btn' href='#'>
                        <BiSearch size={25} />
                    </a>
                </div>
                {userInfo && userInfo.role === 0 ? (
                    <div className='flex-header'>
                        <button className='coachbtn' onClick={onClickBtn}>
                            Want to become a coach?
                        </button>
                    </div>
                ) : (
                    <div>
                        {userInfo && userInfo.role === 3 ? (
                            <div>You already applied</div>
                        ) : (
                            ''
                        )}
                    </div>
                )}
            </div>
            <div className='coachingCards'>
                {coaches &&
                    coaches.length > 0 &&
                    coaches.map((coach, index) => {
                        return <CoachingProfileCard coachData={coach} index={index} />;
                    })}
            </div>
        </div>
    );
}

export default Coaching;
