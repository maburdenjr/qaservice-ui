import React, { Component } from 'react';

class ThankYou extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="thankYou">
                <img src="public/images/icn_thanks_48x48.svg" />
                <h1>Thanks!</h1>
                <h2>Your answers will help power new insights.</h2>
                <div id="thankYouFooter">
                    <a className="ancBtn">Done</a>
                </div>
            </div>
        );
    }

}

export default ThankYou;
