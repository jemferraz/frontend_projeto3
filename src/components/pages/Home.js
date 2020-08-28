import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../context/userContext';
import './Home.css';

function Home() {
    const [context] = useContext(UserContext);
    const {api_key, company, date} = context;


    return (
        <div className='home'>
            <p>Choose a company and navigate in the menu...</p>
        </div>
    );
}

export default Home;