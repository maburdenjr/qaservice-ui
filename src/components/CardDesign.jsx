import React, { Component } from 'react';

class CardDesign extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let result = this.props.option;
        if(this.props.option.imageUrl) {
            let iconImage = 'url('+result.imageUrl+')';
            return (
                <div className="questionAnswer cardDesign cardDesignImg" style={{backgroundImage: iconImage}}>
                    <div className="questionContent">
                        <div className="centered questionLabel">{result.label}</div>
                        <div className="centered questionInstruction">{result.instruction}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="questionAnswer cardDesign">
                    <div className="centered questionLabel">{result.label}</div>
                    <div className="centered questionInstruction">{result.instruction}</div>
                </div>
            );
        }
    }

}

export default CardDesign;
