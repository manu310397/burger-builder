import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 0
    }

    addIngredientHandler(type){
        //console.log(this.state.ingredients)
        const oldCount = this.state.ingredients[type];
       
        const oldPrice = this.state.totalPrice;
        const newprice = oldPrice + INGREDIENT_PRICE[type];
        const updatedIngredients = this.state.ingredients;
        updatedIngredients[type] = oldCount + 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newprice
        })
    } 

    removeIngredientHandler(type) {
        
    }
    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientsAdded = {this.addIngredientHandler.bind(this)}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;