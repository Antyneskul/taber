import React, {Component} from 'react';
import './App.css';
import Clock from "./componets/Clock/Clock";
import Background from "./componets/Background/Background";
import Weather from './componets/Weather/Weather';

const getBrightnessClassName = () => {
  const brightness = localStorage.getItem('brightness');

  return (brightness && Number(brightness) < 90) ? 'light' : '';
};

class App extends Component {
  render() {
    return (
      <div className={`App ${getBrightnessClassName()}`}>
        <Background/>
        <Clock/>
        <Weather/>
      </div>
    );
  }
}

export default App;
