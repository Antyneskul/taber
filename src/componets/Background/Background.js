import React from 'react';
import './Background.css';

/*global chrome*/
class Background extends React.Component {
  constructor(props) {
    super(props);

    const imgData = localStorage.getItem('img');
    this.state = {
      img: imgData ? imgData : 'https://source.unsplash.com/random/1920x1080/?berlin,dark'
    }
  }

  render() {
    return (
      <div className={'Background'} style={{backgroundImage: `url(${this.state.img})`}}></div>
    )
  }
}

export default Background;
