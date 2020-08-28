import React, {useState, useEffect, useContext} from 'react';
//import {Link} from 'react-router-dom';
import UserContext from '../../context/userContext';
import './SideBar.css';

function SideBar() {

    const [company, setCompany] = useState();
    const [context, setContext] = useContext(UserContext);
    const {companyList} = context;

    const handleSelect = (e) =>{
        const company = companyList[e.target.value];
        setCompany(company);
        setContext({...context, company: company})
    }

    /*
    const [start, setStart] = useState(context.date.start);
    const [end, setEnd] = useState(context.date.end);

    const onChangeStart = (e) => {setStart(e.target.value); console.log(`Start: ${start}`)};
    const onChangeEnd = (e) => {setEnd(e.target.end); console.log(`End: ${end}`)};
    const onSubmit = (e) => {
        const date = {start: start, end: end};
        setContext({...context, date});
    }
    */

    return (
        <div className="sidebar">
            <p>Company: {company && company.description} </p> <br/>
            <p>Symbol: {company && company.symbol}</p> <br/>
            
            <div className="company-select">
                <select className='select' onChange={handleSelect}>
                    {companyList && companyList.map((comp, index) => {
                        return(<option value={index} key={index} > {comp.symbol} - {comp.description} </option>);
                    } )}
                </select>
            </div>
        </div>
    );
}

export default SideBar;

/*
            {context.showDate &&
                <div className='dates-select'>
                    <form className='dates-form' onSubmit={onSubmit}>
                        <div className='start'>
                            <label for='start'>Start date:</label>
                            <input type='date' id='start' name='start' value={context.date.start} onChange={onChangeStart}></input>
                        </div>
                        <div className='end'>
                            <label for='end'>End date:</label>
                            <input type='date' id='end' name='end' value={context.date.end} onChange={onChangeEnd}></input>
                        </div>
                        <input type='button'>OK </input>
                    </form>
                </div>
            }

*/