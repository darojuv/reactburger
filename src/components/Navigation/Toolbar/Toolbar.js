import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../LOGO/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import NavigationItems from '../NavigationItems/NavigationItems.js';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}  />
        <div className={classes.Logo}>
            <Logo />
        </div> 

        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>

);

export default toolbar
 