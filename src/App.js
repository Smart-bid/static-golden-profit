import React, { Component } from 'react'

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'
import Page from './pages/Page'

// Pages
import * as Pages from './pages'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            page: 'main',
        };

        this.handleStep = this.handleStep.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
    }

    handleStep = (step) => {
        this.setState({step})
    };

    handleSubmit = () => {
        this.props.handleSubmit()
        .then(() => this.setState({ step: 1 }))
    };

    pageHandler(page) {
        window.scrollTo(0, 0);

        switch (page) {
            default:  
                this.setState({page: 'main'});
                break;
            case 'terms':
                this.setState({page: Pages.terms});
                break;
            case 'privacy':
                this.setState({page: Pages.privacy});
                break;
            case 'gov':
                this.setState({page: Pages.gov});
                break;
            case 'disc':
                this.setState({page: Pages.disc});
                break;
            case 'spam':
                this.setState({page: Pages.spam});
                break;
        }

    }

    render() {

        let languageManager = this.props.languageManager();

        if (this.state.page === 'main') {
            return (
                <div className='App'>
                    <TopSection {...this.props} handleStep={this.handleStep} step={this.state.step}/>

                    <MidSection languageManager={this.props.languageManager}/>

                    <BottomSection
                        languageManager={this.props.languageManager}
                        pageHandler={this.pageHandler}
                        handleForward={this.handleForward}
                    />
                    <div className="privacy-policy">
                        <div className="privacy-inner">
                            <span>{languageManager.bottom_info[0]}<a onClick={() => this.pageHandler('privacy')}>{languageManager.bottom_info[1]}</a></span>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <Page page={this.state.page} pageHandler={this.pageHandler}></Page>
            )
        }
    }
}
