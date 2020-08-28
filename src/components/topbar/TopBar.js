import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import UserContext from '../../context/userContext';
import './TopBar.css';

function TopBar() {

    /*
        <Router>
            <ul className="topbar">
                <li className='nav_option' ><Link to='/'>Home</Link></li>
                <li className='nav_option' ><Link to='/profile'>Profile</Link></li>
                <li className='nav_option' ><Link to='/news'>News</Link></li>
                <li className='nav_option' ><Link to='/prices'>Prices</Link></li>
            </ul>
        </Router>
    */

    return (

        <ul className="topbar">
            <li className='nav_option' ><Link to='/'>Home</Link></li>
            <li className='nav_option' ><Link to='/profile'>Profile</Link></li>
            <li className='nav_option' ><Link to='/news'>News</Link></li>
            <li className='nav_option' ><Link to='/prices'>Prices</Link></li>
        </ul>


    );
}

export default TopBar;