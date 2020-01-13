import React, { Component } from 'react'
import moment from 'moment'
import register from '../../TopSection/check.png'

export default class Traders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableArr: []
        }
    }

    componentDidMount() {
        let languageManager = this.props.languageManager();
        const tableElementsArray = languageManager.table_inner;
        tableElementsArray.forEach((item) => {
            item.date = moment().format('HH:mm:ss, L')
        });

        this.setState({
            tableArr: tableElementsArray
        }, () => {
            this.timer = setInterval(() => {
                tableElementsArray.unshift(tableElementsArray[11]);
                tableElementsArray[11].date = moment().format('HH:mm:ss, L');
                this.setState({
                    tableArr: tableElementsArray
                }, () => {
                    tableElementsArray.pop();
                })
            },5000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render () {
        let languageManager = this.props.languageManager();
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
                                    this.state.tableArr.map((item, index) => {
                                        return (
                                            <tr className="customer" key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.date}</td>
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