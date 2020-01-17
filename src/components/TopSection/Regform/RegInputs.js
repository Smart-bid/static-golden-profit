import React from 'react'
import { FormGroup, FormFeedback, Input, CardImg } from 'reactstrap'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function RegInputs(props) {

    function updateValue(value, key) {
        props.trackStartEdit()
        let obj = {},
            tempForm = props.form
        obj[key] = value
        Object.assign(tempForm, obj)

        return props.onChange(tempForm)
    }

    return (
            props.inputs.map(input =>
                {
                    switch (input.type) {
                        default: 
                            return (
                                <FormGroup key={input.name} className={input.groupClass}>

                                    <Input className={input.className + ' ' + input.name}
                                        maxLength={(input.maxLength) ? input.maxLength : '32'}
                                        type={input.type}
                                        name={input.name}
                                        value={(props.form[input.name] || '')}
                                        autoComplete="off"
                                        onChange={e => updateValue(e.target.value, input.name)}
                                        onFocus={() => {if (props.errors[input.name]) props.onFocus(input.name)}}
                                        placeholder={props.languageManager[input.name]}
                                        invalid={props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')}/>

                                    {props.errors.hasOwnProperty(input.name) && props.errors[input.name]['messages'] &&
                                    <FormFeedback>{props.errors[input.name].messages[0]}</FormFeedback>}

                                </FormGroup>
                            )

                        case 'phone_number': 
                            return (
                                <FormGroup key={input.name} className={input.groupClass}>

                                    <PhoneInput
                                        defaultCountry={input.countryCode}
                                        containerClassName="intl-tel-input"
                                        inputClassName={input.className}
                                        value={(props.form.hasOwnProperty('phone_number')) ? props.form.phone_number : ''}
                                        onChange={(value) => {value = value.replace(/\D/g,''); updateValue(value, 'phone_number')}}
                                        />

                                        {(props.errors.hasOwnProperty(input.name) && props.errors[input.name]['messages']) &&
                                        <FormFeedback style={{display: 'block'}}>{props.errors[input.name].messages[0]}</FormFeedback>}

                                </FormGroup>
                            )

                        case 'checkbox':
                            return (
                                <FormGroup key={input.name} className={input.groupClass}>

                                    <Input className={input.className + ' ' + input.name}
                                        style={{position: 'relative', marginLeft: 0}}
                                        type={input.type}
                                        name={input.name}
                                        checked={(props.form.hasOwnProperty(input.name) && props.form[input.name])}
                                        invalid={props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')}
                                        onChange={e => updateValue(e.target.checked, input.name)} />{input.text}

                                    {props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages') &&
                                    <FormFeedback>{props.errors[input.name].messages[0]}</FormFeedback>}

                                </FormGroup>
                            )

                        case 'custom':
                            return (
                                <FormGroup key={input.name} className={input.groupClass}>

                                    {input.customInput}

                                </FormGroup>
                            )
                        case 'image':
                            return <CardImg key={input.className} className={input.className} src={input.source} />
                    }
                })
        )

}
