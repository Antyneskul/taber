import React from 'react';
import './Hexagon.css'

const Hexagon = props => (
  <div className={`Hexagon ${props.hexagonSize}`}>
    {props.children}
  </div>
);

export default Hexagon;