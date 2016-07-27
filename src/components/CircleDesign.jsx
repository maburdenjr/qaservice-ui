import React, { Component } from 'react';

class CircleDesign extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let result = this.props.option;
        if(this.props.option.imageUrl) {
            let iconImage = 'url('+result.imageUrl+')';
            return (
                <div className="imgOption questionAnswer circleDesignImg">
                    <div className="imgMask roundButton" style={{backgroundImage: iconImage}}></div>
                    <div className="imgLabel centered">{result.label}</div>
                </div>
            );
        } else {
            return (
                <div className="questionAnswer roundButton circleDesignTxt">
                    <div className="centered questionLabel">{result.label}</div>
                </div>
            );
        }
    }

}

export default CircleDesign;
