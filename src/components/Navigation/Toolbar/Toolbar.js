import React from 'react';
import classes from './Toolbar.css';
//import Logo from '../../LOGO/Logo';
import Toggle from '../SideDrawer/Toggle/Toggle';

import NavigationItems from '../NavigationItems/NavigationItems.js';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        {/* <div className={classes.Logo}>
            <Logo />
        </div> */}
        <Toggle />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>

);

export default toolbar
 