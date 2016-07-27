import React, { Component } from 'react';

class QuestionHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.question) {
            return (
                <div className="ancCol w100">
                    <div className="questionHeader">
                        <div className="categoryTitle">{this.props.question.category}</div>
                        <h1 className="subCategoryTitle conTitle">{this.props.question.topic}</h1>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

}

export default QuestionHeader;
