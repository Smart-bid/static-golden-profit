import React, { Component } from 'react'
import Invest from './Invest/Invest'
import Trend from "./Trend/Trend";
import Partners from './Partners/Partners'
import vault from './images/gold-vault.jpg'
import FamousNames from "./FamousNames/FamousNames";
import Benefits from "./Benefits/Benefits";
import Traders from "./Traders/Traders";
import Faq from "./Faq/Faq";


export default class MidSection extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className="MidSection">
                <Partners />
                <div className="section-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <h2>{languageManager.join_title}</h2>
                                <h3>{languageManager.join_subtitle}</h3>
                                <p>{languageManager.join_description}</p>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <img src={vault} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <Invest languageManager={this.props.languageManager}/>
                <Trend languageManager={this.props.languageManager}/>
                <FamousNames languageManager={this.props.languageManager}/>
                <Benefits languageManager={this.props.languageManager}/>
                <Traders languageManager={this.props.languageManager}/>
                <Faq languageManager={this.props.languageManager}/>
                <div className="second-form">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2>{languageManager.second_form}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
