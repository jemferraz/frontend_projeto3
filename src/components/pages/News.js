import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../../context/userContext';
import './News.css';

function News() {
    const [context] = useContext(UserContext);
    const {api_key, company, date} = context;
    const [newsList, setNewsList] = useState();


    const getNewsData = () => {
        fetch(`https://finnhub.io/api/v1/company-news?symbol=${company.symbol}&from=${date.start}&to=${date.end}&token=${api_key}`)
        .then( res => res.json() )
        .then( data => {console.log(data); return data})
        .then( data => setNewsList(data) );
    }

    useEffect(
        () => getNewsData() , [context]
      )

    return (
        <div className='news'>
            {newsList && 
                newsList.map((news, item) => { return(
                    <div className='news-item' key={item} >
                        <p>Id: {news.id} </p>
                        <p>Category: {news.category} </p>
                        <p>Datetime: {Date(news.datetime)} </p>
                        <h4 className='news-headline'>{news.headline}</h4>
                        <p className='news-summary'>{news.summary}</p> 
                        <img src={news.image} alt={`Image for ${news.summary}` } height='300'/>
                        <p>Related: {news.related} </p>
                        <p>Source: <i>{news.source}</i> </p>
                        <a href={news.url}>News' url</a>
                    </div> )
                } )
            }
        </div>
    );
}

export default News;