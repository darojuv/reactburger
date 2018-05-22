import React from 'react';
import classes from './buildControl.css'

const buildControl = (props) => (
    <div>
        <div className={classes.label}> {props.label} </div>
        <button className={classes.Less}>less</button>
        <button className={classes.More} >add</button>
    </div>
);

export default buildControl;