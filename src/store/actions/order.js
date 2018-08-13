import * as actionTypes from '../actions/actionTypes';
import axiosInstance from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axiosInstance.post('/orders.json?auth='+token, orderData)
            .then(response => {
                console.log(orderData.price);
                console.log(response.data.name);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailure(error));
            });

    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILURE
    }
}

export const fetchOrder = (token, userID) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        console.log(token);
        const queryParams = '?auth=' + token + '&orderBy="userID"&equalTo="' + userID + '"';
        console.log(userID)
        axiosInstance.get('/orders.json'+queryParams)
        .then(res => {
            //console.log(res.data);
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => {
            dispatch(fetchOrdersFailure(err))
        });
    }
}