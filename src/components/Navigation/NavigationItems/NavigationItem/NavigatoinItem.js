// import React from 'react';
// import classes from './NavigationItem.css';

// const navigationItem = (props) => (
//     <li className={classes.NavigationItem}>
//         <a 
//             href={props.link}
//             className={ props.active ? classes.active : null } > {props.children} </a>
//     </li>
// );

// export default navigationItem;

import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
        exact={props.exact}
        to={props.link}
        activeClassName={classes.active} > {props.children} </NavLink>
    </li>
);

export default navigationItem;