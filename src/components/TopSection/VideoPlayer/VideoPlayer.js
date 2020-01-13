import React, { Component } from 'react'
import Vimeo from 'react-vimeo'

import btn from './play_btn.png'
 
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       play: true
    }
  }


  render () {
    return (
      <div className="VideoPlayer" onClick={this.props.trackVideoPlay}>
        <iframe src="https://player.vimeo.com/video/311657644?app_id=122963" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen="" data-ready="true"></iframe>
      </div>
    )
  }
}