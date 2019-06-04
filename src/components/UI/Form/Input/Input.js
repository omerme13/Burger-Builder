import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement]

    if (!props.isValid && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.Error}>
            Please insert a valid {props.config.type}
        </p>
    }
    switch(props.kind) {
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.config} 
                value={props.value}
                onChange={props.changed}
            />;
            break;

        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}  
                {...props.config} 
                value={props.value}
                onChange={props.changed}
            />;
            break;   
            
        case('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}  
                    value={props.value} 
                    onChange={props.changed}>
                    {props.config.options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue} 
                        </option>
                    ))}
                </select>
            )
            break;    
        
        default: 

            break;
    }

    

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;