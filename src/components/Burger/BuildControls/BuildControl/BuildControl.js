import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}> {props.label} </div>
        <button disabled={props.disabled} className={classes.Less} onClick={props.removed}>less</button>
        <button className={classes.More} onClick={props.added}>add</button>
    </div>
);

export default buildControl;