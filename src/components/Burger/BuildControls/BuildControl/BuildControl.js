import React from 'react';
import classes from './buildControl.css'

const buildControl = (props) => (
    <div>
        <div> {props.label} </div>
        <button>less</button>
        <button>add</button>
    </div>
);

export default buildControl;