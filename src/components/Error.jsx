import React, { Component } from 'react';

class Error extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.question) {
            return (
                <div></div>
            );
        } else {
            return null;
        }
    }

}

export default Error;
