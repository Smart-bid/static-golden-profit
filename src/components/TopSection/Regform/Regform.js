import React, { Component } from 'react'
import RegInputs from './RegInputs'
import MaterialInputs from './MaterialInputs'
import { withRouter, Redirect } from 'react-router-dom'
import PropTypes from "prop-types"

// Material UI
import { Tooltip } from '@material-ui/core'
 
// Reactstrap
import {
    Card, CardImg, CardBody,
    CardTitle, Button, 
    FormGroup, Input
} from 'reactstrap'

class Regform extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            form: {},
            errors: {},
            step: 1
        }

        this.handleForward = this.handleForward.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputValidation = this.inputValidation.bind(this)
        this.handleBackwards = this.handleBackwards.bind(this)
        this.inputFocus = this.inputFocus.bind(this)
    }

    handleForward(formStep) {
        let validate = this.props.validateParams(this.state.form)

        if (formStep.passTest && formStep.passTest.checkPass) {
            if (this.state.form.password !== this.state.form.passcheck || !this.state.form.passcheck) validate.success = false
            else {
                let tempForm = this.state.form
                delete tempForm.passcheck
                this.setState({form: tempForm})
            }
        }

        if (validate.success) this.props.setLeadData(this.state.form)
            .then(() => { if (formStep.firstLeadStep) this.props.handleLeadStep() })
            .then(() => { if (formStep.button.hasOwnProperty('linkTo')) this.setState({path: formStep.button.linkTo})})
            .then(() => this.setState({step: this.state.step + 1, errors: {}}, () => {
                if (this.state.step <= this.props.formSteps.length) {
                    let tempForm = this.state.form
                    if (this.props.formSteps[this.state.step - 1].inputs) this.props.formSteps[this.state.step - 1].inputs.map(input => {if (!tempForm[input.name]) tempForm[input.name] = ''})
                    if (this.props.formSteps[this.state.step - 1].passTest && !tempForm.password) {tempForm.password = ''; if (this.props.formSteps[this.state.step - 1].passTest.checkPass) tempForm.passcheck = ''}

                    this.setState({form: tempForm}, () => {if (this.props.formSteps[this.state.step - 1].passTest) this.inputValidation('password')})
                }
            }))

        else this.setState({errors: validate.errors})
    }

    handleBackwards(backStep) {
        let tempForm = this.state.form
        if (this.state.step <= this.props.formSteps.length) {
            if (this.props.formSteps[this.state.step - 1].inputs) this.props.formSteps[this.state.step - 1].inputs.map(input => delete tempForm[input.name])
            if (this.props.formSteps[this.state.step - 1].passTest) {delete tempForm.passcheck; delete tempForm.password}
        }

        this.setState({step: backStep, form: tempForm}, () => {
            if (this.props.formSteps[this.state.step - 1].inputs) this.props.formSteps[this.state.step - 1].inputs.map(input => tempForm[input.name] = '')
            if (this.props.formSteps[this.state.step - 1].passTest) {tempForm.password = ''}
        })
    }

    handleSubmit() {
        let validate = this.props.validateParams(this.state.form)

        if (validate.success) this.props.setLeadData(this.state.form)
            .then(() => this.setState({step: this.state.step + 1}))
            .then(this.props.handleSubmit)
            .then(res => { if (res.redirectUrl) {window.location = res.redirectUrl} else {this.setState({responseError: res.error})} })

        else this.setState({errors: validate.errors})
    }

    inputValidation(key) {
        let valid = this.props.validateInput({[key]: this.state.form[key]})
        this.setState({errors: valid})
    }

    inputFocus(key) {
        let tempErrors = this.state.errors
        delete tempErrors[key]
        this.setState({errors: tempErrors})
    }

    componentDidMount() {
        this.props.formSteps.map((formStep, index) => {
            if (formStep.passTest && this.state.step === index + 1) this.setState({form: Object.assign(this.state.form, {password: ''}, () => this.inputValidation('password'))})
            if (formStep.inputs && this.state.step === index + 1) formStep.inputs.map(input => {
                let obj = {},
                    tempForm = this.state.form
                obj[input.name] = ''
                this.setState({form: Object.assign(tempForm, obj)})
            })
        })
    }

    render() {
        let version = this.props.languageManager(),
            currentStep = this.state.step,
            material = this.props.material,
            steps = this.props.formSteps,
            errors = this.state.errors,
            form = this.state.form,
            resError = this.props.responseError

        if (!this.state.path) {
            return (
                <Card className={this.props.formClass}>
                    {(currentStep <= steps.length) ? 
                    <div>
                        {(this.props.mainLogo && 
                            <CardImg className={this.props.mainLogo.className} top src={this.props.mainLogo.source} alt='Logo'/>)}

                        {(this.props.formTitle && 
                            <CardTitle className={this.props.formTitle.className}>{this.props.formTitle.text}</CardTitle>)}

                        {(this.props.stepButtons && 
                            <StepButtons 
                                steps={steps.length}
                                currentStep={currentStep}
                                onClick={step => this.handleBackwards(step)}
                                stepButtons={this.props.stepButtons}/>
                        )}

                        <div>
                            {
                                steps.map((formStep, index) => 
                                    <CardBody key={index} className={formStep.className} style={{
                                        transition: 'margin 0.3s ease-out',
                                        justifyContent: 'center',
                                        marginLeft: (currentStep > index + 1) ? '-100%' : ''
                                    }}>

                                        {(formStep.inputs &&

                                            (material
                                                ?
                                            <MaterialInputs 
                                                {...formStep}
                                                trackStartEdit={this.props.trackStartEdit}
                                                inputValidation={this.inputValidation}
                                                countryCode={this.props.countryCode}
                                                form={form}
                                                languageManager={version}
                                                errors={errors}
                                                onChange={form => this.setState({form})} 
                                                onFocus={key => this.inputFocus(key)} />
                                                :
                                            <RegInputs
                                                {...formStep}
                                                trackStartEdit={this.props.trackStartEdit}
                                                form={form}
                                                languageManager={version}
                                                errors={errors}
                                                onChange={form => this.setState({form})} 
                                                onFocus={key => this.inputFocus(key)} /> 

                                        ))}

                                        {(formStep.passTest &&
                                            
                                            <PassTest 
                                                {...formStep.passTest}
                                                form={form}
                                                languageManager={version}
                                                onChange={form => this.setState({form}, () => this.inputValidation('password'))}
                                                errors={errors}/>
                                                
                                        )}

                                        <Button onClick={() => (index + 1 === steps.length) ? this.handleSubmit() : this.handleForward(formStep)} className={formStep.button.className}>{formStep.button.text}</Button>

                                        {(formStep.supportText)
                                            ?
                                            <div className={formStep.supportText.className}>

                                                {(formStep.supportText.img) ? <img src={formStep.supportText.img}/> : <React.Fragment></React.Fragment> }
                                                <span>{formStep.supportText.main}</span>
                                                {(formStep.supportText.tooltip)
                                                    ?
                                                <span>
                                                    <Tooltip title={formStep.supportText.tooltip} placement="top">
                                                        <span style={{textDecoration: 'underline dotted', cursor: 'pointer'}}> more</span>
                                                    </Tooltip>
                                                </span> : <React.Fragment></React.Fragment>}

                                            </div> : <React.Fragment></React.Fragment>
                                        }
                                    
                                    </CardBody>)
                            }
                        </div>
                    </div> :
                    <div>
                            
                            {(!this.state.responseError) ?

                            <CardImg className={this.props.loadingLogo.className} top src={this.props.loadingLogo.source} alt='loading'/> :

                            <CardBody style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>

                                <CardTitle className={resError.className}>{this.state.responseError}</CardTitle>
                                <Button onClick={() => this.handleBackwards(1)} className={resError.button.class}>{resError.button.text}</Button>

                            </CardBody>
                            }
                            
                        
                    </div>
                    }
                </Card>
            ) 
        } else return <Redirect to={{ pathname: this.state.path, search: this.props.location.search, state: this.state}}/>
    }
}


function StepButtons(props) {

    let arr = []
    for (let i=1; i <= props.steps; i++) {
        arr.push(
            <Button 
                key={i}
                className={(i + 1 > props.currentStep) ? props.stepButtons.mainClass : props.stepButtons.disabledClass} 
                disabled={(i + 1 > props.currentStep)}
                onClick={() => props.onClick(i)}>{(props.stepButtons.withNumber && i)}</Button>
        )
    }

    return <div className={props.stepButtons.className}>{arr}</div>
}

function PassTest(props) {

    function passTest(value, key) {
        let obj = {},
            tempForm = props.form
        obj[key] = value
        Object.assign(tempForm, obj)

        return props.onChange(tempForm)
    }

    let passtest = {};
    ['invalidlength', 'nospecial', 'nolowercase', 'nouppercase', 'nonumber'].map((err, index) => passtest[err] = props.languageManager.passtest[index])


    return (
        <FormGroup className={props.groupClass}>

            <Input className={props.className}
                maxLength={(props.maxLength) ? props.maxLength : '32'}
                type={'password'}
                name={'password'}
                autoComplete="off"
                value={(props.form['password'] || '')}
                defaultValue={(props.form['password'] && props.form['password'])}
                valid={(props.form.hasOwnProperty('passcheck') && (props.form.password === props.form.passcheck) && (props.form.passcheck.length >= 8))}
                onChange={e => passTest(e.target.value, e.target.name)}
                placeholder={props.languageManager['password']}/>

            {props.checkPass && 

            <Input className={props.className}
                type={'password'}
                name={'passcheck'}
                value={(props.form['passcheck'] || '')}
                valid={(props.form.hasOwnProperty('passcheck') && (props.form.password === props.form.passcheck) && (props.form.passcheck.length >= 8))}
                placeholder={props.languageManager['passcheck']}
                onChange={e => passTest(e.target.value, e.target.name)}/>}

            {(props.withList &&
                <ul>
                    {Object.keys(passtest).map(key => {
                        return (<li className={(props.errors.hasOwnProperty('password') && (props.errors.password[key] || props.errors.password.empty)) ? '' : 'ok'} key={key}>{passtest[key]}</li>)
                    })}
                </ul>
            )}


        </FormGroup>
    ) 
}

export default withRouter(Regform)



