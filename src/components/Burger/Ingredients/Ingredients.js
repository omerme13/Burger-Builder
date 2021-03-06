import React, { Component} from 'react';
import classes from './Ingredients.css';
import PropTypes from 'prop-types';

// this is a dumb component(not a container), but we use the class 
// instead of regular func because it's a requirement for 'prop-types'
class Ingredient extends Component {
    render() {
        let ingredient = null;

        switch(this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
    
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
    
            case ('meat'):
                ingredient = <li className={classes.Meat}></li>;
                break;
    
            case ('cheese'):
                ingredient = <li className={classes.Cheese}></li>;
                break;
            
            case ('salad'):
                ingredient = <li className={classes.Salad}></li>;
                break;
    
            case ('bacon'):
                ingredient = <li className={classes.Bacon}></li>;
                break;
    
            default: ingredient = null;       
    
        }
        return ingredient;
    }
}

Ingredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default Ingredient;