import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    /* THE OLD SYNTHAX */
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }

    }

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controlls</div>
            </>
        );
    }
}

export default BurgerBuilder;