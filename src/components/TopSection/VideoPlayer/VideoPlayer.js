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
      <div className="VideoPlayer">
        <Vimeo  videoId="311657644" autoplay={false} controls={true} muted width='100%' height='100%' onClick={this.props.trackVideoPlay}/>
      </div>
    )
  }
}