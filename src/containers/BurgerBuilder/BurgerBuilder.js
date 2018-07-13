import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axiosInstance from '../../axios-orders';
const INGREDIENT_PRICE = {
    salad: 0.5,
    meat: 0.7,
    cheese: 1,
    bacon: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axiosInstance.get('https://burger-builder-4a877.firebaseio.com/ingredients.json')
                .then(response => {
                    this.setState({ingredients: response.data});
                })
                .catch(error => this.setState({error: error}));
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
        
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler(type){
        //console.log(this.state.ingredients)
        const oldCount = this.state.ingredients[type];
       
        const oldPrice = this.state.totalPrice;
        const newprice = oldPrice + INGREDIENT_PRICE[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount + 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newprice
        });

        this.updatePurchaseState(updatedIngredients);
    } 

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
           return;
        }
        const oldPrice = this.state.totalPrice;
        const newprice = oldPrice - INGREDIENT_PRICE[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount - 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newprice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price='+ this.state.totalPrice);
        
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString 
        });
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients cannot be rendered!</p> : <Spinner />;

        if(this.state.ingredients) {
            burger = (<Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                            ingredientsAdded = {this.addIngredientHandler.bind(this)}
                            ingredientsRemoved = {this.removeIngredientHandler}
                            disabled = {disabledInfo}
                            price={this.state.totalPrice}
                            ordered={this.purchaseHandler}
                            purchasable = {this.state.purchasable}/>
                        </Aux>);
            orderSummary = <OrderSummary 
                            price={this.state.totalPrice}
                            ingredients={this.state.ingredients} 
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}/>;
        }

        if(this.state.loading){
            orderSummary = <Spinner />
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

export default WithErrorHandler(BurgerBuilder, axiosInstance);