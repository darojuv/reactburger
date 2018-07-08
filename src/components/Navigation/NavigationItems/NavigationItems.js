import React from 'react';
import { connect } from 'react-redux';
import NavigationItem from './NavigationItem/NavigatoinItem';
import NavigationItems from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={NavigationItems.NavigationItems}>
        <NavigationItem link="/" exact >
            Burger Builder
        </NavigationItem>
        { props.isAuthenticated ?
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

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken != null
    }
}

export default connect(mapStateToProps)(navigationItems);