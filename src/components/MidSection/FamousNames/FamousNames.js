import React, { Component } from 'react'
import elder from './img/alexander-elder.jpg'
import seykota from './img/ed-seykota.jpg'
import oneil from './img/william-o-neil.jpg'
import buffet from './img/warren-buffett.jpg'

export default class FamousNames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                elder,
                seykota,
                oneil,
                buffet
            }
        }
    }


    render () {
        let languageManager = this.props.languageManager();
        return (
            <div className="FamousNames">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="famous-title">{languageManager.famous_title}</h2>
                            <div className="row">
                                <p className="famous-description col-lg-8 offset-lg-2">{languageManager.famous_description}</p>
                            </div>
                        </div>
                        {
                            languageManager.famous_body.map((item, index) => {
                                return (
                                    <div key={index} className="col-sm-6 famous-people">
                                        <div className="single-person">
                                            <h3>{item.name}</h3>
                                            <p>{item.text}</p>
                                            <img src={this.state.images[item.img]} alt={item.name}/>
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