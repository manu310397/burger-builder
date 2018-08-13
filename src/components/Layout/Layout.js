import React, {Component} from 'react';
import {connect} from 'react-redux';

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
    componentDidUpdate(){
        console.log(this.props.isAuthenticated)
    }
    
    render() {
        return(
            <Aux>
            <Toolbar
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked = {this.drawerToggleClickHandler}/>
            <SideDrawer
            isAuth={this.props.isAuthenticated}
            open={this.state.sidedrawerShow} 
            closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);