import React from 'react';
import moment from 'moment';

import Hexagon from '../Background/Hexagon'
import './Clock.css';

class Clock extends React.Component {
  state = {
    time: moment().format('HH:mm'),
    date: moment().format('DD MMM YYYY')
  };

  tick = () => {
    this.setState(() => ({
      time: moment().format('HH:mm'),
      date: moment().format('DD MMM YYYY')
    }));
  };

  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  render() {
    return (
      <div className={'Clock'}>
        <Hexagon hexagonSize={'big'}>
          <div className={'date'}>
            {this.state.date}
          </div>
          <div className={'time'}>
            {this.state.time}
          </div>
        </Hexagon>
      </div>
    );
  }
}

export default Clock;

