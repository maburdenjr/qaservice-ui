import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Error extends Component {
    render () {
        return (
            <div className="error">
                <div className="message">
                </div>
            </div>
        );
    }
}

Error.propTypes = {
    sampleId: PropTypes.string.isRequired
};

export default Error;
