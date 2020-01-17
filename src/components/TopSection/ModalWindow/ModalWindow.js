import React, {Component} from 'react'
import ua from "../ua.svg";


export default class ModalWindow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show_customer_name: false,
            nameArr: ""
        }
    }

    componentDidMount() {
        let languageManager = this.props.languageManager();
        const namesElementsArray = languageManager.customers_name;
        this.setState({
            nameArr: namesElementsArray[1]
        }, () => {
            this.timer = setInterval(() => {
                namesElementsArray.unshift(namesElementsArray[5]);
                namesElementsArray.pop();
                this.setState({
                    show_customer_name: !this.state.show_customer_name,
                    nameArr: namesElementsArray[1]
                })
            },3000)
        });
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let languageManager = this.props.languageManager();
        return (
            <div className="col-lg-6 col-md-6 hidden-block">
                <div id="modal-window" className={`show ` + this.state.show_customer_name}>
                    <img src={ua} alt=""/>
                    <div className="name">
                        <p>{this.state.nameArr}</p>
                    </div>
                    <div className="status">
                        <p>{languageManager.status}</p>
                    </div>
                </div>
            </div>
        )
    }
}