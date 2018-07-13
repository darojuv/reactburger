import React from 'react';
import NavigationItem from './NavigationItem/NavigatoinItem';
import NavigationItems from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={NavigationItems.NavigationItems}>
        <NavigationItem link="/" exact >
            Burger Builder
        </NavigationItem>
        {
            props.isAuthenticated ?
            <NavigationItem link="/orders" >
                Orders
            </NavigationItem>
            : 
            null
        }        
        { props.isAuthenticated ?
            <NavigationItem link="/logout" >
                Logout
            </NavigationItem>
            : 
            <NavigationItem link="/auth" >
                Authenticate
            </NavigationItem> 
        }
    </ul>
);

export default navigationItems;