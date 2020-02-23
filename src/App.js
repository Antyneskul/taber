import React, { useEffect, useState } from 'react';
import './App.css';
import Background from './componets/Background/Background';
import Clock from "./componets/Clock/Clock";
import Weather from './componets/Weather/Weather';
import { LocationContext } from './contextProviders/LocationContext';
import useLocation from './hooks/useLocation';

const App = () => {
    const {location} = useLocation();
    const brightness = JSON.parse(localStorage.getItem('brightness'));
    const [theme, setTheme] = useState('');
    const {lat, lon} = location;

    useEffect(() => {
        setTheme((brightness && Number(brightness) < 90) ? 'dark' : '')
    }, [brightness]);


    return (
        <LocationContext.Provider value={{city: location?.address?.state, coordinates: {lat, lon}}}>
            <div className={`App ${theme}`}>
                <Background/>
                <Clock/>
                <Weather/>
            </div>
        </LocationContext.Provider>
    );
}

export default App;
