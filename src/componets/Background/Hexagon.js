import React from 'react';
import './Hexagon.css'

const Hexagon = props => {
    const getBrightness = () => localStorage.getItem('brightness');
    const getBrightnessClassName = () => {
        const brightness = getBrightness();

        return (brightness && Number(brightness) > 180) ? 'light' : '';
    };
    return (
        <div className={`Hexagon ${getBrightnessClassName()} ${props.hexagonSize}`}>
            {props.children}
        </div>
    )
};

export default Hexagon;