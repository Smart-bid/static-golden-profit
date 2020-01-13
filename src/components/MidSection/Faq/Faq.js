import React, {Component} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: [
                'true',
                'true',
                'true',
                'true',
                'true'
            ]
        }
    }

    handleClick = (e) => {
        const question = e.target.getAttribute('data-name');
        const startTitle = ['true', 'true', 'true', 'true', 'true'];
        const newStatus = startTitle.slice();
        console.log(question);
        newStatus[question] = !this.state.title[question];
        this.setState({title: newStatus},() => {
            console.log(this.state);
        });
    }

    render () {
        let languageManager = this.props.languageManager();
        return (
            <div className="Faq">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>{languageManager.faq_title}</h2>
                        </div>
                        <div className="col-lg-8 offset-lg-2">
                            <div className="faq-block">
                                <Accordion>
                                    {
                                        languageManager.faq_question.map((item, index) => {
                                            return (
                                                <Card key={index}>
                                                    <Card.Header>
                                                        <Accordion.Toggle variant="link" data-name={index} className={`question ` + this.state.title[index]} onClick={(e) => {this.handleClick(e)}} eventKey={index}>{item.question}</Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey={index}>
                                                        <Card.Body>{item.answer}</Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            )
                                        })
                                    }
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}