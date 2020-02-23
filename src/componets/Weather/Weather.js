import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import './Weather.css';
import { LocationContext } from '../../contextProviders/LocationContext';
import WeatherItem from "./WeatherItem/WeatherItem";

const APP_ID = process.env.REACT_APP_WEATHER_APP_ID;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${APP_ID}`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${APP_ID}`;

const now = moment();
const inFuture = ({dt_txt}) => moment(dt_txt).diff(now, 'hours') >= 1;
const between = (n, min, max) => min <= n && n <= max;
const getElementsToStore = () => Math.floor(window.innerWidth / 300) - 1;

const Weather = () => {
    const location = useContext(LocationContext);
    const city = location.city;
    const [forecast, setForecast] = useState(null);
    const [current, setCurrent] = useState(null);
    const [elementsToStore, setElementsToStore] = useState(getElementsToStore());

    const getIcon = id => {
        switch (true) {
            case between(id, 200, 232):
                return 'lighting';
            case between(id, 300, 321):
                return 'drizzle';
            case between(id, 500, 531):
                return 'rainy-day';
            case between(id, 600, 602):
                return 'snow-cloud';
            case between(id, 611, 612):
                return 'sleet';
            case between(id, 615, 616):
                return 'snow-cloud';
            case between(id, 620, 621):
                return 'hail';
            case id === 622:
                return 'hail-storm';
            case id === 701:
                return 'mist';
            case id === 711:
                return 'smog';
            case id === 741:
                return 'foggy';
            case id === 781:
                return 'hurricane';
            case id === 800:
                return 'sunny-day';
            case id === 801:
                return 'partialy-cloudy';
            case between(id, 802, 805):
                return 'cloudy-day';
            default:
                return 'temperature';
        }
    };


    useEffect(() => {
        //Current
        //https://api.openweathermap.org/data/2.5/weather?city=Berlin,de&units=metric&appid=${APP_ID}

        //5days
        //https://api.openweathermap.org/data/2.5/forecast?q=Berlin,de&units=metric&appid=${APP_ID}

        //Description
        //https://openweathermap.org/weather-conditions

        const calledAt = localStorage.getItem('calledAt');
        const storedForecast = localStorage.getItem('forecast');
        const storedCurrent = localStorage.getItem('current');


        if (calledAt && moment().diff(moment(calledAt), 'minutes') < 10) {
            setForecast(JSON.parse(storedForecast));
            setCurrent(JSON.parse(storedCurrent));

            // console.log('local forecast', JSON.parse(forecast));
            // console.log('local current', JSON.parse(current));
        } else if (location?.city) {
            (async () => {
                const fetchedCurrent = await window.fetch(`${WEATHER_API_URL}&lat=${location.coordinates.lat}&lon=${location.coordinates.lon}`).then(response => response.json());
                const fetchedForecast = await window.fetch(`${FORECAST_API_URL}&lat=${location.coordinates.lat}&lon=${location.coordinates.lon}`)
                    .then(response => response.json())
                    .then(result => result.list.filter(inFuture));

                localStorage.setItem('calledAt', moment().format());
                localStorage.setItem('current', JSON.stringify(fetchedCurrent));
                localStorage.setItem('forecast', JSON.stringify(fetchedForecast));

                setCurrent(fetchedCurrent);
                setForecast(fetchedForecast);

                // console.log('call', current, 'current');
                // console.log('call', forecast, 'forecast');
            })();
        }

        window.onresize = () => {
            setElementsToStore(getElementsToStore())
        };
    }, [location]);

    return (
        <div className='Weather'>
            {
                (current) ?
                    <WeatherItem
                        temperature={Math.floor(current.main.temp)}
                        icon={getIcon(current.weather[0].id)}
                        wind={current.wind.speed.toFixed(1)}
                        size={'medium'}
                        time={'Now'}
                        city={city}
                    >
                        <div>Now</div>
                    </WeatherItem>
                    : null
            }
            {
                (forecast) ?
                    forecast.slice(0, elementsToStore).map(it => (
                        <WeatherItem
                            temperature={Math.floor(it.main.temp)}
                            icon={getIcon(it.weather[0].id)}
                            wind={it.wind.speed.toFixed(1)}
                            key={it.dt}
                            size={'small'}
                        >
                            <div>{moment(it.dt_txt).format('DD MMM')}</div>
                            <div>{moment(it.dt_txt).format('HH:mm')}</div>
                        </WeatherItem>
                    ))
                    : null
            }
        </div>
    );
};

export default Weather;
