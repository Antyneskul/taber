import React from 'react';
import './Background.css';

class Background extends React.Component {
  constructor(props) {
    super(props);

    const imgData = localStorage.getItem('img');
    this.state = {
      img: imgData ? imgData : localStorage.getItem('imgSrc')
    }
  }

  render() {
    return (
      <div className={'Background'} style={{backgroundImage: `url(${this.state.img})`}}></div>
    )
  }
}

export default Background;
