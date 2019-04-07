import React, { Component} from 'react';
import ingredientClasses from './Ingredients.css';
import PropTypes from 'prop-types';

// this is a dumb component(not a container), but we use the class 
// instead of regular func because it's a requirement for 'prop-types'
class Ingredient extends Component {
    render() {
        let ingredient = null;

        switch(this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={ingredientClasses.BreadBottom}></div>;
                break;
    
            case ('bread-top'):
                ingredient = (
                    <div className={ingredientClasses.BreadTop}>
                        <div className={ingredientClasses.Seeds1}></div>
                        <div className={ingredientClasses.Seeds2}></div>
                    </div>
                );
                break;
    
            case ('meat'):
                ingredient = <div className={ingredientClasses.Meat}></div>;
                break;
    
            case ('cheese'):
                ingredient = <div className={ingredientClasses.Cheese}></div>;
                break;
            
            case ('salad'):
                ingredient = <div className={ingredientClasses.Salad}></div>;
                break;
    
            case ('bacon'):
                ingredient = <div className={ingredientClasses.Bacon}></div>;
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