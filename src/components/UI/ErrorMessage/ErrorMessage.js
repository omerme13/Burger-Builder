import React, {Component} from 'react';
import classes from './ErrorMessage.css';

class ErrorMessage extends Component {
    
    state = {
        currClass: classes.ErrorMessage
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                currClass: classes.Hide
            }) 
        }, 3000);
    }

    render() {
        return(
            <div className={this.state.currClass}>
                {this.props.children}
            </div>
        )
    }
}

export default ErrorMessage;