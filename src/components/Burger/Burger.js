import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {

    let ingredients = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_, index) => {
                    return <BurgerIngredient key={index + igKey} type={igKey} />
                })
            }).reduce((arr, el) => {
                return arr.concat(el);
            }, []);
    
            if(ingredients.length <= 0){
                ingredients = <p>Please add ingredients!</p>
            }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;