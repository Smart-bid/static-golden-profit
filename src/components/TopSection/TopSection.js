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
        let languageManager = this.props.languageManager(),
            steps = [
            {
                className: 'cardb',
                inputs: [
                    {
                        name: 'first_name',
                        type: 'text',
                        className: 'input_small',
                        errorClass: 'inputError',
                        groupClass: 'formClass left'
                    },
                    {
                        name: 'last_name',
                        type: 'text',
                        className: 'input_small',
                        errorClass: 'inputError',
                        groupClass: 'formClass right'
                    },
                    {
                        name: 'email',
                        type: 'email',
                        className: 'input_big',
                        errorClass: 'inputError',
                        groupClass: 'formClass large'
                    },
                    {
                        name: 'phone_number',
                        type: 'phone_number',
                        className: 'input_small',
                        errorClass: 'inputError',
                        groupClass: 'formClass small left'
                    },
                    {
                        name: 'password',
                        type: 'password',
                        className: 'input_small',
                        errorClass: 'inputError',
                        groupClass: 'formClass small right',
                        listClass: 'req_list'
                    },
                    {
                        name: 'agree_1',
                        type: 'checkbox',
                        text: languageManager.agreement_first,
                        links: [{text: 'Privacy Policy', to: '/'}],
                        groupClass: 'checkbox_text'
                    },
                    {
                        name: 'agree_2',
                        type: 'checkbox',
                        text: languageManager.agreement_second,
                        links: [{text: languageManager.terms_links, to: '/terms'}, {text: languageManager.privacy_links, to: '/privacy'}],
                        groupClass: 'checkbox_text'
                    }
                ],
                button: {
                    className: 'button_forward',
                    text: languageManager.button
                },
                supportText: {
                    className: 'support_text',
                    image: {},
                    main: languageManager.more_title[0],
                    tooltip: languageManager.more_decription
                }
            }
        ];
        return (
            <div className='TopSection'>
                <Header languageManager={this.props.languageManager} handleScroll={this.handleScroll.bind(this)}/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 logo">
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
                            <div className="col-lg-8 col-md-12 video-player">
                                <VideoPlayer {...this.props}/>
                            </div>
                            <div className="col-lg-4 col-md-12 form">
                                <div className="regform" ref={this.regPanel}>
                                    <div className="reg-title"><h3>{languageManager.title_form}</h3></div>
                                    <Regform {...this.props}
                                             loadingLogo={{
                                                 className: 'loading',
                                                 source: logo
                                             }}
                                             material={true}
                                             formSteps={steps}
                                             responseError={{
                                                 className: 'resError',
                                                 button: {
                                                     className: 'button_forward',
                                                     text: 'OK'
                                                 }
                                             }}
                                    />
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
