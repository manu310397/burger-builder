import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userID);
        //BEFORE REDUX
        // axiosInstance.get('/orders.json')
        // .then(res => {
        //     //console.log(res.data);
        //     const fetchedOrders = [];
        //     for(let key in res.data) {
        //         fetchedOrders.push({
        //             ...res.data[key],
        //             id:key
        //         });
        //     }
        //     this.setState({loading: false, orders: fetchedOrders });
        // }).catch(err => {
        //     this.setState({loading:false})
        // });
    }

    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
            ))
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userID) => dispatch(action.fetchOrder(token, userID))
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userID: state.auth.userId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axiosInstance));