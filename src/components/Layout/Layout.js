import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        sidedrawerShow: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({sidedrawerShow: false})
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sidedrawerShow: !prevState.sidedrawerShow}
        })
    }
    
    render() {
        return(
            <Aux>
            <Toolbar drawerToggleClicked = {this.drawerToggleClickHandler}/>
            <SideDrawer open={this.state.sidedrawerShow} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
} 

export default Layout;