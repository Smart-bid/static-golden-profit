import React, { useState } from 'react'
import { OutlinedInput, FormControl, FormGroup,
        InputLabel, FormHelperText, Checkbox,
        IconButton, InputAdornment, FormControlLabel,
        Popper, Fade,
        List, ListItem,
        ListItemIcon 
} from '@material-ui/core'

import {
        fade,
        ThemeProvider,
        withStyles,
        makeStyles,
        createMuiTheme,
} from '@material-ui/core/styles'

import { Link } from 'react-router-dom' 
        
import MuiPhoneNumber from 'material-ui-phone-number'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#8cd32f',
          },
          secondary: {
            main: '#f0482a',
          },
    },
})

const CustomCheckbox = withStyles({
    root: {
      color: '#52bce6',
      '&$checked': {
        color: '#8cd32f',
      },
    }
})(props => <Checkbox color="default" {...props} />);

export default function MaterialInputs(props) {
    const [show, toggleVisible] = useState(false),
        [reqlist, toggleList] = useState(false),
        [feedback, showFeedback] = useState(false)

    function updateValue(value, key) {
        props.trackStartEdit()
        let obj = {},
            tempForm = props.form
        obj[key] = value
        Object.assign(tempForm, obj)
        if (key !== 'phone_number') props.inputValidation(key)

        return props.onChange(tempForm)
    }

    String.prototype.restr = function() { return this.charAt(0).toUpperCase() + this.slice(1).replace("_", " ") }
    let passtest = {}, arr = ['invalidlength', 'nospecial', 'nolowercase', 'nouppercase', 'nonumber']
    arr.map((err, index) => passtest[err] = props.languageManager.passtest[index])
    let reqOpen = Boolean(reqlist)

    return (
        <ThemeProvider theme={theme}>
            {props.inputs.map(input =>
                {
                    switch (input.type) {
                        default: 
                            return (
                                <FormControl variant='outlined'
                                    color={((props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')) ? 'secondary' : 'primary' )}
                                    key={input.name}
                                    className={input.groupClass}>

                                    <InputLabel style={{backgroundColor: '#fff'}} htmlFor={input.name}>{props.languageManager[input.name]}</InputLabel>

                                    <OutlinedInput
                                        className={input.className}
                                        error={props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')}
                                        id={input.name}
                                        aria-describedby="feebback"
                                        value={(props.form[input.name] || '')}
                                        onChange={e => updateValue(e.target.value, input.name)}
                                        onFocus={() => {if (props.errors[input.name]) props.onFocus(input.name); showFeedback(true)}}
                                        onBlur={() => showFeedback(false)}
                                    />
                                    <FormHelperText className={input.errorClassName} style={{color: ((props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')) ? '#f0482a' : ''), fontWeight: 700}} id="feebback">{((props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')) && props.errors[input.name].messages[0])}</FormHelperText>

                                </FormControl>
                            )
                        case 'phone_number':
                            return (
                                <FormControl variant='outlined' key={input.name} className={input.groupClass}>

                                    <MuiPhoneNumber
                                        className={input.className}
                                        label={props.languageManager[input.name]}
                                        aria-describedby="feebback"
                                        variant='outlined'
                                        id={input.name}
                                        value={(props.form.hasOwnProperty('phone_number')) ? props.form.phone_number : ''}
                                        defaultCountry={props.countryCode.toLowerCase()}
                                        onChange={(value) => {value = value.replace(/\D/g,''); updateValue(value, 'phone_number')}}
                                        error={props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')} 
                                    />
                                    <FormHelperText className={input.errorClassName} style={{color: ((props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')) ? '#f0482a' : ''), fontWeight: 700}} id="feebback">{((props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')) && props.errors[input.name].messages[0])}</FormHelperText>

                                </FormControl>
                            )
                        case 'password':
                            return (
                                    <FormControl
                                        color={(props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages') ? 'secondary' : 'primary' )} 
                                        key={input.name} 
                                        variant='outlined' 
                                        className={input.groupClass}>

                                            <InputLabel htmlFor={input.name}>{props.languageManager[input.name]}</InputLabel>

                                            <OutlinedInput
                                                className={input.className}
                                                id={input.name}
                                                labelWidth={70}
                                                value={(props.form[input.name] || '')}
                                                type={show ? 'text' : 'password'}
                                                onChange={e => updateValue(e.target.value, input.name)}
                                                onFocus={e => toggleList(e.currentTarget)}
                                                onBlur={e => toggleList(null)}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => toggleVisible(!show)}
                                                            onMouseDown={e => e.preventDefault()}
                                                            edge="end"
                                                        >
                                                            {show ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                    <Popper
                                        className="popper"
                                        open={reqOpen}
                                        anchorEl={reqlist ? reqlist.parentElement.parentElement : null}
                                        style={{zIndex: 10}}
                                        placement='bottom-end'
                                        transition
                                        >
                                        {({ TransitionProps }) => (   
                                            <Fade {...TransitionProps} timeout={350}>
                                                <List className={input.listClass} style={{backgroundColor: '#fff', width: '100%', border: '2px solid', borderColor: (props.errors.hasOwnProperty('password') ? '#f0482a' : '#8cd32f')}}>
                                                    {Object.keys(passtest).map(key =>
                                                        (props.errors.hasOwnProperty('password') && (props.errors.password[key] || props.errors.password.empty))
                                                        ? 
                                                        <ListItem key={key} style={{ color: '#f0482a', fontSize: '14px', padding: '10px' }}>
                                                            <ListItemIcon >
                                                                <CloseIcon style={{ color: '#f0482a' }}/>
                                                            </ListItemIcon>
                                                            {passtest[key]}
                                                        </ListItem>
                                                        :
                                                        <ListItem key={key} style={{ color: '#8cd32f', fontSize: '14px', padding: '10px' }}>
                                                            <ListItemIcon >
                                                                <CheckIcon style={{ color: '#8cd32f' }}/>
                                                            </ListItemIcon>
                                                            {passtest[key]}
                                                        </ListItem>
                                                        )}
                                                </List>
                                            </Fade>
                                        )}
                                    </Popper>

                                </FormControl>
                            )

                        case 'checkbox':
                            return (
                                <FormGroup
                                    style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}
                                    color={(props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages') ? 'secondary' : 'primary' )} 
                                    key={input.name} 
                                    className={input.groupClass}>

                                    <FormControlLabel
                                        style={{ display: 'block', marginRight: 0}}
                                        control={
                                            <CustomCheckbox
                                                className={input.className} 
                                                checked={Boolean(props.form[input.name])} 
                                                onChange={() => updateValue(!props.form[input.name], input.name)} 
                                                value={props.form[input.name]} />
                                        }
                                        labelPlacement="end"
                                    />

                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <CheckboxText 
                                            text={input.text}
                                            links={input.links}/>

                                        <FormHelperText className={input.errorClassName} style={{color: ((props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')) ? '#f0482a' : ''), fontWeight: 700}} id="feebback">{((props.errors.hasOwnProperty(input.name) && props.errors[input.name].hasOwnProperty('messages')) && props.errors[input.name].messages[0])}</FormHelperText>
                                    </div>

                                </FormGroup>
                            )
                        }
                    }
                )
            }
        </ThemeProvider>
) }

const CheckboxText = (props) => {
    let textSplit = props.text

    let separator = ''
    if (props.links) {
        props.links.map((link, index) => {
            separator += link.text
            if (index < props.links.length - 1) separator += '|'
        })
    }
    textSplit = textSplit.split(new RegExp(separator))

    return (props.links)
        ? 
    <span>{textSplit.map((part, index) => {
        if (index < textSplit.length- 1) return <span key={index}>{part} <Link to={props.links[index].to}>{props.links[index].text}</Link></span>
        else return <span key={index}>{part}</span>
        })}</span>
        : 
    <span>{props.text}</span>

}