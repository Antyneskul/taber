import React, { useState, useMemo, useContext, useEffect } from 'react';
import moment from 'moment';
import { LocationContext } from '../../contextProviders/LocationContext';

import Hexagon from '../Background/Hexagon'
import './Clock.css';

const Clock = () => {
    const getDateData = () => ({
        time: moment().format('HH:mm'),
        date: moment().format('DD MMM YYYY')
    });

    const location = useContext(LocationContext);


    const [data, setData] = useState(getDateData());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(getDateData());
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    return (
        <div className={'Clock'}>
            <Hexagon hexagonSize={'big'}>
                <div className={'date'}>
                    {data.date}
                </div>
                <div className={'time'}>
                    {data.time}
                </div>
                <div className={'city'}>
                    {location.city}
                </div>
            </Hexagon>
        </div>
    );
};

export default Clock;

