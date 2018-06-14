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
        {
            controls.map(control => <BuildControl 
                                    key={control.label} 
                                    label={control.label}
                                    added = {() => props.ingredientsAdded(control.type)}
                                    />)
        }
    </div>
)

export default buildControls;