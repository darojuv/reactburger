import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Backdrop from '../UI/Backdrop/Backdrop';

const layout = (props) => (
    <Aux>
        <Backdrop />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
); 
export default layout;