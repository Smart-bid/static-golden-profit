import React, {Component} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'true'
        }
    }

    handleClick = (e) => {
        const question = e.target.getAttribute('data-name');
        console.log(question);
        this.setState({
            title: !this.state.title
        }, () => {
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
                                                        <Accordion.Toggle variant="link" data-name="title" className={`question ` + this.state.title} onClick={this.handleClick} eventKey={index}>{item.question}</Accordion.Toggle>
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