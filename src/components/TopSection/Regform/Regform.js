import React, { Component } from 'react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

import logo from '../../BottomSection/logo.png'
import {Reginputs, MaterialInputs} from 'sb-lp-framework'
import {Tooltip} from "@material-ui/core";


export default class Regform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            },
            responseError: '',
            check: false,
            password: "",
            confirm_password: "",
            phone_country_prefix: "",
            country_name: "",
            tel: "",
            agree_1: true,
            agree_2: true,
            firstPassType: 'password',
            secondPassType: 'password',
            errors: '',
            passwordErrors: {
                invalidlength: true,
                nolowercase: true,
                nonumber: true,
                nouppercase: true
            }
        };

        this.handleSync = this.handleSync.bind(this);
    }

    handleClick = (e) => {

        const input = e.target.getAttribute('data-type');
        this.setState((state) => ({
            [input] : state[input] === 'password' ? 'text' : 'password'
        }));

    };

    handleSelectFlag = (num, country) => {
        this.setState({
            phone_country_prefix: '+' + `${country.dialCode}`,
            country_name: country.iso2
        })

    };

    phoneNumberBlur = (status, value, countryData) => {
        this.setState({
            phone_country_prefix: '+' + `${countryData.dialCode}`,
            country_name: countryData.iso2
        })
    }

    handleForward = (e) => {

        let form = this.state.form
        let checkParams = this.props.validateParams(form)
        if (checkParams.success) this.setState({errors: {}}, () => {
            this.props.setLeadData(form).then(this.props.handleLeadStep).then(this.setState({redirect: true}))
        })
        else this.setState({errors: checkParams.errors})
    };

    handleSync(e) {
        let input = e.target.value;
        let inputClass = e.target.className;
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            form.getElementsByClassName(inputClass)[0].value = input;
        })
    }
    componentDidMount() {
        let inputs = [...document.querySelectorAll('.inputfield')];

        inputs.map(input => {
            input.addEventListener('change', this.handleSync);
        })
    }

    inputFocus = (key) => {
        let tempErrors = this.state.errors;
        delete tempErrors[key];
        this.setState({errors: tempErrors})
    }
    inputValidation = (key) => {
        let valid = this.props.validateInput({[key]: this.state.form[key]})
        this.setState({errors: valid})
    }

    handleStepChange = (name, value) => {
        this.props.trackStartEdit();
        let errors = null;
        if (name === 'password') {
            const checkPassword = this.props.validateParams({
                password: value
            });

            if (checkPassword.errors) {
                this.setState({
                    passwordErrors:  checkPassword.errors.password
                })
            }
        }
        this.setState({[name]: value.replace(/^\s+|\s/g, ''), errors});
    };


    render() {

        let material = this.props.material,
            steps = this.props.formSteps,
            errors = this.state.errors,
            form = this.state.form,
            resError = this.props.responseError;

        console.log(steps);

        let languageManager = this.props.languageManager();

        if (this.props.step <= 3) {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')}>
                    <div className='inner'>
                        <div className='form-wrapper'>
                            {this.state.errors && <div className="errors">
                                {this.state.errors}
                            </div>}
                            <div className="small-input-block">
                                {
                                    steps.map((steps, index) =>
                                        <div key={index} className={steps.className} style={{
                                            transition: 'margin 0.3s ease-out',
                                            justifyContent: 'center'
                                        }}>

                                            {(steps.inputs &&

                                                (material
                                                        ?
                                                        <Reginputs
                                                            {...steps}
                                                            trackStartEdit={this.props.trackStartEdit}
                                                            inputValidation={this.inputValidation}
                                                            countryCode={this.props.countryCode}
                                                            form={form}
                                                            languageManager={languageManager}
                                                            errors={errors}
                                                            onChange={form => this.setState({form})}
                                                            onFocus={key => this.inputFocus(key)} />
                                                        :
                                                        <div></div>

                                                ))}

                                           {/* {(formStep.passTest &&

                                                <PassTest
                                                    {...formStep.passTest}
                                                    form={form}
                                                    languageManager={version}
                                                    onChange={form => this.setState({form}, () => this.inputValidation('password'))}
                                                    errors={errors}/>

                                            )}*/}

                                            {/*<Button onClick={() => (index + 1 === steps.length) ? this.handleSubmit() : this.handleForward(formStep)} className={formStep.button.className}>{formStep.button.text}</Button>*/}

                                            {(steps.supportText)
                                                ?
                                                <div className={steps.supportText.className}>

                                                    {(steps.supportText.img) ? <img src={steps.supportText.img}/> : <React.Fragment></React.Fragment> }
                                                    <span>{steps.supportText.main}</span>
                                                    {(steps.supportText.tooltip)
                                                        ?
                                                        <span>
                                                    <Tooltip title={steps.supportText.tooltip} placement="top">
                                                        <span style={{textDecoration: 'underline dotted', cursor: 'pointer'}}> more</span>
                                                    </Tooltip>
                                                </span> : <React.Fragment></React.Fragment>}

                                                </div> : <React.Fragment></React.Fragment>
                                            }

                                        </div>)
                                }
                                {/*<MaterialInputs
                                    {...stepone}
                                    form={this.state.form}
                                    trackStartEdit={this.props.trackStartEdit}
                                    languageManager={languageManager}
                                    errors={this.state.errors}
                                    onChange={form => this.setState({form})}
                                    onFocus={() => {}}/>*/}
                            </div>
                            {/*<Reginputs
                                {...steptwo}
                                form={this.state.form}
                                trackStartEdit={this.props.trackStartEdit}
                                languageManager={languageManager}
                                errors={this.state.errors}
                                onChange={form => this.setState({form})}
                                onFocus={() => {}}
                            />
                            <div className="small-input-block">
                                <IntlTelInput
                                    preferredCountries={[this.props.countryCode]}
                                    containerClassName="intl-tel-input"
                                    inputClassName="inputfield tel"
                                    defaultCountry={this.state.country_name}
                                    autoPlaceholder={true}
                                    separateDialCode={true}
                                    onSelectFlag={this.handleSelectFlag}
                                    onPhoneNumberBlur={this.phoneNumberBlur}
                                    onPhoneNumberChange={(status, value, countryData, number, id) => {
                                        if (value.length < 15) {
                                            this.setState({
                                                tel: value.replace(/^\s+|\s/g, ''),
                                            })
                                        }
                                    }}
                                    value={tel}
                                />
                                <Reginputs
                                    {...stepthree}
                                    form={this.state.form}
                                    trackStartEdit={this.props.trackStartEdit}
                                    languageManager={languageManager}
                                    errors={this.state.errors}
                                    onChange={form => this.setState({form})}
                                    onFocus={() => {}}
                                />
                            </div>
                            <Reginputs
                                {...agreement}
                                form={this.state.form}
                                trackStartEdit={this.props.trackStartEdit}
                                languageManager={languageManager}
                                errors={this.state.errors}
                                onChange={form => this.setState({form})}
                                onFocus={() => {}}
                            />*/}

                            <button onClick={this.handleForward} className='start'>{languageManager.button}</button>
                        </div>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="Regform">
                    {(this.props.step === 4) ? <img src={logo} alt="lodaing" className="loading"/> : 

                    <div className='column'>
                        <span className="response_error">{this.state.responseError}</span>
                        <button className='start' onClick={() => this.props.handleStep(1)}>OK</button>
                    </div>}
                    
                </div>
            )

        }
    }
}
