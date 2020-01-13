import React, { Component } from 'react'
import Vimeo from 'react-vimeo'

import btn from './play_btn.png'
 
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        play: true,
        hide: true
    }
  }

  hideElement = () => {
    this.setState({
      hide: !this.state.hide
    });
  }


  render () {
    return (
      <div className="VideoPlayer">
        <div className={`videoOverlayInner ` + this.state.hide} onClick={this.hideElement}>
          <p>Tap to watch and learn the secret!</p>
          <img src={btn} alt="play-button"/>
        </div>
        <Vimeo videoId="311657644" width='100%' height='100%'/>
      </div>
    )
  }
}