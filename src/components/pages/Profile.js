import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../context/userContext';
import './Profile.css';

function Profile() {
    const [context] = useContext(UserContext);
    const {api_key, company} = context;
    const [profile, setProfile] = useState();

    const getProfileData = () => {
        fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${company.symbol}&token=${api_key}`)
        .then( res => res.json() )
        .then( data => setProfile(data) );
    }

    useEffect(
        () => getProfileData(), [context]
      )

    //https://finnhub.io/docs/api#company-profile2

    return (
        <div className='profile'>
            {profile && 
            <div className='profile-details'>
                <p>Country: {profile.country} </p> <br/>
                <p>Currency:  {profile.currency} </p> <br/>
                <p>Exchange:  {profile.exchange} </p> <br/>
                <p>IPO: {profile.ipo} </p> <br/>
                <p>Market capitalization: {parseInt(profile.marketCapitalization).toLocaleString()} MM</p> <br/>
                <p>Name: {profile.name} </p> <br />
                <p>Phone: {profile.phone} </p> <br />
                <p>Shares outstanding: {profile.shareOutstanding} </p> <br />
                <p>finnhub industry: {profile.finnhubIndustry}</p> <br />
                <p>Ticker: {profile.ticker} </p> <br/>
                <a href={profile.weburl}>Company website</a> <br/>
                <img src={profile.logo} alt={`Logo for ${profile.name}`} />
            </div>

            } 
        </div>
    );
}

export default Profile;