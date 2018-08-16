import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import axiosInstance from '../../axios-orders';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        ingredients = {
            ...ingredients
        };

        const sum = Object.keys(ingredients)
                .map(igKey => {
                    return ingredients[igKey];
                })
                .reduce((sum, cur) => {
                    return sum + cur;
                }, 0);
        
       return sum > 0
    }

    //before redux
    // addIngredientHandler(type){
    //     //console.log(this.state.ingredients)
    //     const oldCount = this.state.ingredients[type];
       
    //     const oldPrice = this.state.totalPrice;
    //     const newprice = oldPrice + INGREDIENT_PRICE[type];
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = oldCount + 1;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newprice
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // } 

    //before redux
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //        return;
    //     }
    //     const oldPrice = this.state.totalPrice;
    //     const newprice = oldPrice - INGREDIENT_PRICE[type];
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = oldCount - 1;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newprice
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        console.log("in purchase handler")
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});

        }
        else{
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];

        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        // }

        // queryParams.push('price='+ this.state.totalPrice);
        
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString 
        // });
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients cannot be rendered!</p> : <Spinner />;

        if(this.props.ings) {
            burger = (<Aux>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                            ingredientsAdded = {this.props.onIngredientAdded}
                            ingredientsRemoved = {this.props.onIngredientRemoved}
                            disabled = {disabledInfo}
                            price={this.props.totalPrice}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuthenticated}
                            purchasable = {this.updatePurchaseState(this.props.ings)}/>
                        </Aux>);
            orderSummary = <OrderSummary 
                            price={this.props.totalPrice}
                            ingredients={this.props.ings} 
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}/>;
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}  
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientType) => dispatch(actions.addIngredients(ingredientType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngredientRemoved: (ingredientType) => dispatch(actions.removeIngredients(ingredientType)),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axiosInstance));