import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact active>Burger Builder</NavigationItem>
        {props.isauthenticated
            ?<NavigationItem link="/orders" >My Orders</NavigationItem> 
            :null}
        {props.isauthenticated 
            ?<NavigationItem link="/logout">Logout</NavigationItem>
            :<NavigationItem link="/auth" >Sign Up</NavigationItem>}
    </ul>
);

export default navigationItems;