import React, {Component} from 'react';
import classes from './Message.css';


class ErrorMessage extends Component {
    state = {
        class: [classes.Message, classes[this.props.type]].join(' ') 
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                class: classes.Hide
            }) 
        }, 3000);
    }

    render() {
        return(
            <div className={this.state.class}>
                {this.props.children}
            </div>
        )
    }
}

export default ErrorMessage;