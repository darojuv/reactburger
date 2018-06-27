import React from 'react';
import classes from './Input.css';

const input = (props) => {
    
    let inputElement = null;
    let inputElementClasses = [classes.InputElement];
    let validationError = null;
    if(props.elementValid && props.shouldValidat && props.touched){
        inputElementClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>  Please enter valid {props.valueType} </p>;
    }
    switch(props.elementType){
        case ('input'):
            inputElement = <input 
            className={inputElementClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value} 
            onChange={props.changed} />
            break;
        case ('inputarea'):
            inputElement = <inputarea 
            className={inputElementClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value} 
            onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (
                <select 
                className={inputElementClasses.join(' ')}
                value={props.value}
                onChange={props.changed} >
                    {
                        props.elementConfig.options.map( option => (
                            <option key={option.value} value={option.value} 
                            onChange={props.changed}>
                                {option.displayValue}
                            </option>
                        ))
                    }
                </select>);
            break;            
        default:
            inputElement = <input className={inputElementClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value} />
            break;                        
    }

    return(
        <div className={classes.Input} >
            <label className={classes.label} > {props.label} </label>
            {inputElement}
            {validationError}
        </div>
    );

}

export default input;