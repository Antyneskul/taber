import React from 'react';
import moment from 'moment';
import './Weather.css';
import WeatherItem from "./WeatherItem/WeatherItem";

const APP_ID = "eb5808ab05f337d65c0d10f174014a7b";
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${APP_ID}`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${APP_ID}`;

//TODO: reduce repeating
const iconStatusMap = {
    200: 'lightning',
    201: 'lightning',
    202: 'lightning',
    210: 'lightning',
    211: 'lightning',
    212: 'lightning',
    221: 'lightning',
    230: 'lightning',
    231: 'lightning',
    232: 'lightning',

    300: 'drizzle',
    301: 'drizzle',
    302: 'drizzle',
    310: 'drizzle',
    311: 'drizzle',
    312: 'drizzle',
    313: 'drizzle',
    314: 'drizzle',
    321: 'drizzle',

    500: 'rainy-day',
    501: 'rainy-day',
    502: 'rainy-day',
    503: 'rainy-day',
    504: 'rainy-day',
    511: 'rainy-day',
    520: 'rainy-day',
    521: 'rainy-day',
    522: 'rainy-day',
    531: 'rainy-day',

    600: 'snow-cloud',
    601: 'snow-cloud',
    602: 'snow-cloud',
    611: 'sleet',
    612: 'sleet',
    615: 'snow-cloud',
    616: 'snow-cloud',
    620: 'hail',
    621: 'hail',
    622: 'hail-storm',

    701: 'mist',
    711: 'smog',
    741: 'foggy',
    781: 'hurricane',

    800: 'sunny-day',
    801: 'partialy-cloudy',
    802: 'cloudy-day',
    803: 'cloudy-day',
    804: 'cloudy-day',
    805: 'cloudy-day'
};

class Weather extends React.Component {
    state = {
        zip: '13581,de',
        forecast: null,
        current: null
    };

    getIcon = id => iconStatusMap[id] ? iconStatusMap[id] : 'temperature';

    componentDidMount() {
        //Current 
        //https://api.openweathermap.org/data/2.5/weather?zip=13581,de&units=metric&appid=eb5808ab05f337d65c0d10f174014a7b

        //5days
        //https://api.openweathermap.org/data/2.5/forecast?q=13581&units=metric&appid=eb5808ab05f337d65c0d10f174014a7b

        //Description
        //https://openweathermap.org/weather-conditions

        const calledAt = localStorage.getItem('calledAt');
        const forecast = localStorage.getItem('forecast');
        const current = localStorage.getItem('current');


        if (calledAt && moment().diff(moment(calledAt), 'minutes') < 10) {
            this.setState(() => ({
                current: JSON.parse(current),
                forecast: JSON.parse(forecast)
            }));

            console.log('local forecast', JSON.parse(forecast));
            console.log('local current', JSON.parse(current));
        } else {
            Promise.all([
                window.fetch(`${WEATHER_API_URL}&zip=${this.state.zip}`).then(response => response.json()),
                window.fetch(`${FORECAST_API_URL}&q=${this.state.zip}`).then(response => response.json())
            ]).then(responses => {
                const elementsToStore =  (window.outerWidth > 1500) ? 5 : 4;
                const current = responses.shift();
                const forecast = responses.shift().list.slice(0, elementsToStore);

                localStorage.setItem('calledAt', moment().format());
                localStorage.setItem('current', JSON.stringify(current));
                localStorage.setItem('forecast', JSON.stringify(forecast));

                this.setState(() => ({
                    current,
                    forecast
                }));

                console.log('call', current);
                console.log('call', forecast);
            });
        }
    }

    render() {
        return (
            <div className='Weather'>
                {
                    (this.state.current) ?
                        <WeatherItem
                            temperature={Math.floor(this.state.current.main.temp)}
                            icon={this.getIcon(this.state.current.weather[0].id)}
                            wind={this.state.current.wind.speed}
                            size={'medium'}
                            time={'Now'}
                        >
                            <div>Now</div>
                        </WeatherItem>
                        : null
                }
                {
                    (this.state.forecast) ?
                        this.state.forecast.map(it => (
                            <WeatherItem
                                temperature={Math.floor(it.main.temp)}
                                icon={this.getIcon(it.weather[0].id)}
                                wind={it.wind.speed}
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
        )
    }
}

export default Weather;