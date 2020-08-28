import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SideBar from './components/sidebar/SideBar';
import TopBar from './components/topbar/TopBar';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import News from './components/pages/News';
import Prices from './components/pages/Prices';
import './App.css';
import api_key from './private/api_key';
import UserContext from './context/userContext';

//console.log(api_key);
function App() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const today_minus_one_year = new Date(year-1, month-1, day);

  const todayStr = today.toISOString().substring(0, 10);
  const today_minus_one_yearStr = today_minus_one_year.toISOString().substring(0, 10);

  console.log(`Today : ${todayStr}`)

  const [context, setContext] = useState({api_key: api_key, 
                                          company: {}, 
                                          companyList: [],
                                          showDate: false,
                                          date: {start: today_minus_one_yearStr, end: todayStr} 
                                          });

  const getCompanyList = () => {
    fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${api_key}`)
    .then( res => res.json() )
    .then( data => setContext({...context, companyList: data}) );
  }

  useEffect(
    () => getCompanyList(), [context.showDate]
  )

  return (
    <div className="App">
      {context.companyList &&
        <UserContext.Provider value={[context, setContext]}>
          <div className='sidebar-container'>
            <SideBar />
          </div>
          <div className='topbar-container'>
            <TopBar />
          </div>
          <div className='pages-container'>
            <Switch>
              <Route exact path='/' >
                <Home />
              </Route>

              <Route path='/profile'>
                <Profile />
              </Route>

              <Route path='/news'>
                <News />
              </Route>

              <Route path='/prices'>
                <Prices />  
              </Route>

            </Switch>
          </div>
        </UserContext.Provider>
    }
    </div>
  );
}

export default App;