import React from 'react';

import './WeatherItem.css';
import Hexagon from "../../Background/Hexagon";

const WeatherItem = props => {
  return (
    <div className={'WeatherItem'}>
      <Hexagon hexagonSize={props.size}>
        <div className={'forecast'}>

          <div className={'condition'}>
            <div className={`flaticon-${props.icon}`}></div>
            <div className={'temp'}>{props.temperature}°</div>
          </div>


          <div className={'wind'}>
            <div className={'flaticon-breeze'}></div>
            <div>{props.wind} km/h</div>
          </div>

          <div className={'time'}>
            {props.children}
          </div>
        </div>
      </Hexagon>
    </div>
  );
};

export default WeatherItem;