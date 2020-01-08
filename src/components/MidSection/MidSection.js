import React, { Component } from 'react'
import Invest from './Invest/Invest'
import Trend from "./Trend/Trend";
import Partners from './Partners/Partners'
import vault from './images/gold-vault.jpg'
import FamousNames from "./FamousNames/FamousNames";


export default class MidSection extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="MidSection">
                <Partners />
                <div className="section-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <h2>{languageManager.join_title}</h2>
                                <h3>{languageManager.join_subtitle}</h3>
                                <p>{languageManager.join_description}</p>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <img src={vault} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <Invest languageManager={this.props.languageManager}/>
                <Trend languageManager={this.props.languageManager}/>
                <FamousNames languageManager={this.props.languageManager}/>
            </div>

        )
    }
}
