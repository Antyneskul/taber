import React, {Component} from 'react';
import './App.css';
import Clock from "./componets/Clock/Clock";
import Background from "./componets/Background/Background";
import Weather from './componets/Weather/Weather';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Background/>
            <Clock/>
            <Weather/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
