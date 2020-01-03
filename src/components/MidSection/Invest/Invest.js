import React, {Component} from 'react'


export default class Invest extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="Invest">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 offset-md-3">
                            <h2 className="invest-title">{languageManager.invest_main_title}</h2>
                        </div>
                        <div className="col-md-9 offset-md-3 steps-block">
                            <div className="row">
                                {
                                    languageManager.invest_descriptions.map((item, index) => {
                                        return (
                                            <div key={index} className="col-sm-4 step">
                                                <p className="step-head">{item.step}&nbsp;{index + 1}</p>
                                                <p className="title">{item.name}</p>
                                                <p className="description">{item.text[0]} <span>{item.text[1]}</span></p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-md-9 offset-md-3">
                            <a href="#" className="blue-btn"><span>{languageManager.blue_btn}</span></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}