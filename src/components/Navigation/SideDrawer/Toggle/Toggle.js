import React from 'react';
import Logo from '../../../LOGO/Logo'
import classes from './Toggle.css';

const toggle = (props) => (
    <div className={classes.Logo} onClick={props.toggleClick}>
        <Logo />
    </div>
);

export default toggle;