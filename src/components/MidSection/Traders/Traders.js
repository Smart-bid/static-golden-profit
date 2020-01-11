import React, { Component } from 'react'
import moment from 'moment'
import register from '../../TopSection/check.png'
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default class Traders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letter: ""
        }
    }

    randomLetter = (alphabet) => {
        let letter = Math.floor(Math.random() * alphabet.length);
        this.setState({
            letter: alphabet[letter]
        })
    };


    render () {
        let languageManager = this.props.languageManager();
        const today = new Date();
        return (
            <div className="Traders">
                <div className="container">
                    <div className="user-table-block">
                        <h2 className="table-title">{languageManager.table_title}</h2>
                        <div className="table-container">
                            <div className="table-shadow"></div>
                            <table>
                                <tbody>
                                <tr>
                                    <th width="158" scope="col">{languageManager.table_head[0]}</th>
                                    <th width="160" scope="col">{languageManager.table_head[1]}</th>
                                    <th width="104" scope="col">{languageManager.table_head[2]}</th>
                                </tr>
                                {
                                    languageManager.table_inner.map((item, index) => {
                                        return (
                                            <tr className="customer" key={index}>
                                                <td>{item.name}</td>
                                                <td>{moment(today).format('h:mm:ss, L')}</td>
                                                <td><img src={register} alt="register"/></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}