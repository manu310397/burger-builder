import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './Buildcontrol/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>Rs {props.price.toFixed(2)}</strong></p>
        {
            controls.map(control => 
                <BuildControl 
                    key={control.label} 
                    label={control.label}
                    added = {() => props.ingredientsAdded(control.type)}
                    removed = {() => props.ingredientsRemoved(control.type)}
                    disabled = {props.disabled[control.type]}
                />)
        }

        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW':'SIGN UP TO ORDER'}</button>
    </div>
)

export default buildControls;