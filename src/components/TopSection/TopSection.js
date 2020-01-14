import React, { Component } from 'react'

import Header from './Header/Header'
import ModalWindow from "./ModalWindow/ModalWindow";
import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import Regform  from './Regform/Regform'
import Ticker  from './Ticker/Ticker'
import logo from './logo.svg'

export default class TopSection extends Component {
    constructor(props) {
        super(props)
        this.regPanel = React.createRef();
    }

    handleScroll() {
        let panel = this.regPanel.current;
        window.scrollTo({
            top: panel.offsetTop,
            left: 0,
            behavior: 'smooth'
        })

    }

    render() {
        let languageManager = this.props.languageManager();
        return (
            <div className='TopSection'>
                <Header languageManager={this.props.languageManager} handleScroll={this.handleScroll.bind(this)}/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 logo">
                            <img src={logo} alt="GoldenProfit"/>
                        </div>
                        <ModalWindow {...this.props} />
                        <div className="col-12">
                            <div className="headline">
                                <div className="title">
                                    <h1>{languageManager.title}</h1>
                                </div>
                                <div className="subtitle">
                                    <h2>{languageManager.subtitle}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-reg" id="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-12 video-player">
                                <VideoPlayer {...this.props}/>
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="regform" ref={this.regPanel}>
                                    <div className="reg-title"><span>{languageManager.topreg1}</span> {languageManager.topreg2}</div>
                                    <Regform {...this.props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Ticker />
            </div>
        )
    }
}
