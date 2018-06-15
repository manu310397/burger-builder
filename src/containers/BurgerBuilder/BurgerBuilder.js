import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    meat: 0.7,
    cheese: 1,
    bacon: 1.5
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert('You Ordered!');
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
       
        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients} 
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientsAdded = {this.addIngredientHandler.bind(this)}
                    ingredientsRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable = {this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;