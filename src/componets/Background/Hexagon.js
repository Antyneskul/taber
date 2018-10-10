import React from 'react';
import './Hexagon.css'

const Hexagon = props => {
    return (
        <div className={'Hexagon'}>
            {props.children}
        </div>
    )
};

export default Hexagon;