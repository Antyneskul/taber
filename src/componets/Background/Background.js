import React, { useState, useEffect } from 'react';
import './Background.css';

const Background = () => {
    const [backgroundImage, setBackgroundImage] = useState(localStorage.getItem('imgData'));

    useEffect(() => {
        const interval = setInterval(() => {
            const imgData = localStorage.getItem('imgData');
            if(!backgroundImage && imgData){
                setBackgroundImage(localStorage.getItem('imgData'));
                clearInterval(interval);
            }
        }, 1000)
    }, [backgroundImage]);

    return <div className={'Background'}
                style={{backgroundImage: `url(${backgroundImage}`}}/>;
};

export default Background;
