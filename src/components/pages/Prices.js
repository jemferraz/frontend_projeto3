import React, {useState, useEffect, useContext, useRef} from 'react';
import UserContext from '../../context/userContext';
import Plotly from 'plotly.js';
import './Prices.css';

//import createPlotlyComponent from 'plotly-latest.min.js';
//const Plot = createPlotlyComponent(Plotly);


function Prices() {
    const plotRef = useRef(); 

    const [context] = useContext(UserContext);
    const {api_key, company, date} = context;

    const [stockCandle, setStockCandle] = useState();
    const [trace, setTrace] = useState();

    const timestampToDateStr = (timestamp) => {
        const dt = new Date(timestamp*1000);
        const dtStr = dt.toISOString();
        return dtStr;
    }

    const prepareTrace = (data) => {
        const trace = {
                        x: data.t.map(timestampToDateStr),
                        close: data.c,
                        high: data.h,
                        low: data.l,
                        open: data.o,          
                        type: 'candlestick',
                        xaxis: 'x',
                        yaxis: 'y'
                    };
        setTrace(trace);
        return trace;
    }

    const createPlot = (trace) => {
        const layout = {
                        title: `Candlestick chart for ${company.symbol} - ${company.description}`,
                        dragmode: 'zoom',
                        showlegend: false,
                        xaxis: { rangeslider: { visible: false } }
                        };
        if(trace){
            Plotly.newPlot(plotRef.current, [trace], layout);
        }
    }


    const getStockCandle = () => {
        const startDate = new Date(date.start);
        const endDate = new Date(date.end);
        const startTimestamp = startDate.getTime()/1000;
        const endTimestamp = endDate.getTime()/1000;

        console.log(`api_key: ${api_key}`)
        console.log(`symbol: ${company.symbol}`)
        console.log(`startTimestamp: ${startTimestamp}`);
        console.log(`endTimestamp: ${endTimestamp}`);

        if(company){
            fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${company.symbol}&resolution=D&from=${startTimestamp}&to=${endTimestamp}&token=${api_key}`)
            .then( res => res.json() )
            .then( data => {console.log(data); return data})
            .then( data => { setStockCandle(data); return data})
            .then(prepareTrace)
            .then(createPlot);    
        }
    }

    useEffect(
        () => getStockCandle() , [context]
      )

    return(
        <div>
            {stockCandle &&
            <div clasName='chart-container'>
                <div className='chart' ref={plotRef}>
                </div>
            </div>
            }
        </div>
    );

} 

export default Prices;

/*
            <Plot
                data={[
                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                        {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
            />
*/

/*

    const [stockCandle, setStockCandle] = useState();
    const [trace, setTrace] = useState();

    const timestampToDateStr = (timestamp) => {
        const dt = new Date(timestamp);
        const dtStr = dt.toISOString();
        return dtStr;
    }

    const prepareTrace = (data) => {
        const trace = {
                        x: data.t.map(timestampToDateStr),
                        close: data.c,
                        high: data.h,
                        low: data.l,
                        open: data.o,          
                        type: 'candlestick',
                        xaxis: 'x',
                        yaxis: 'y'
                    };
        setTrace(trace);
    }


    const getStockCandle = () => {
        const startDate = new Date(date.start);
        const endDate = new Date(date.end);
        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();

        fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${company.symbol}&resolution=1&from=${startTimestamp}&to=${endTimestamp}&token=${api_key}`)
        .then( res => res.json() )
        .then( data => {console.log(data); return data})
        .then( data => { setStockCandle(data),
                         prepareTrace(data) } );
    }

    useEffect(
        () => getStockCandle() , []
      )
    

    return (
        <div className='prices'>
            <Plot
                data={[trace]}
                layout={ {
                            dragmode: 'zoom',
                            showlegend: false,
                            xaxis: { rangeslider: { visible: false } }
                        } }
            />
        </div>
    );
*/