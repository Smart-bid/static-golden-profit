import React, { Component } from 'react'
import accurate from "./img/icon_accurate-trading.svg";
import cutting from "./img/icon_cutting-edge-technology.svg";
import trading from "./img/icon_trusted-trading.svg";

export default class FamousNames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                accurate,
                cutting,
                trading
            }
        }
    }


    render () {
        let languageManager = this.props.languageManager();
        return (
            <div className="Benefits">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="benefits-title">{languageManager.benefits_title}</h2>
                            <p className="benefits-subtitle">{languageManager.benefits_subtitle}</p>
                        </div>
                        {
                            languageManager.benefits_information.map((item, index) => {
                                return (
                                    <div key={index} className="col-sm-4">
                                        <div className="benefits-block">
                                            <div className="benefits-img">
                                                <img src={this.state.images[item.img]} alt={item.name} className="img-responsive"/>
                                            </div>
                                            <p className="title">{item.title}</p>
                                            <p className="description">{item.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}