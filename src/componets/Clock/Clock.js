import React from 'react';
import './Clock.css';

import moment from 'moment';

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
    setInterval(() => this.tick() , 1000);
  }

  render() {
    return (
      <div className={'Clock'}>
        <div className={'date'}>
          {this.state.date}
        </div>
        <div className={'time'}>
          {this.state.time}
        </div>
      </div>
    );
  }
}

export default Clock;

