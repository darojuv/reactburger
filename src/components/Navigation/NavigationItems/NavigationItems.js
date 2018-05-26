import React from 'react';
import NavigationItem from './NavigationItem/NavigatoinItem';
import NavigationItems from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={NavigationItems.NavigationItems}>
        <NavigationItem link="/" active >
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/" >
            Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;