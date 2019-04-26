import React from 'react';
import classes from './Input.css';

const input = props => {
    let inputElement = null;

    switch(props.kind) {
        case('input'):
            inputElement = <input className={classes.InputElement} {...props.config} />;
            break;

        case('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props.config} />;
            break;   
            
        case('select'):
            inputElement = (
                <select className={classes.InputElement}>
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
        </div>
    )
}

export default input;