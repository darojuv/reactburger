import React from 'react';
import NavigationItem from './NavigationItem/NavigatoinItem';
import NavigationItems from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={NavigationItems.NavigationItems}>
        {/* <NavigationItem link="/" active >
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/" >
            Checkout
        </NavigationItem> */}
        <NavigationItem link="/" exact >
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/orders" >
            Orders
        </NavigationItem>   
        <NavigationItem link="/auth" >
            Authenticate
        </NavigationItem>                
    </ul>
);

export default navigationItems;