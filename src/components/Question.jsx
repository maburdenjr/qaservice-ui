import React, { PropTypes, Component } from 'react';

export default class Question extends Component {
    render() {
        // TODO: Construct an empty object somewhere else e.g. action?
        let question = this.props.question;
        if (question && (!question.options || question.options.length < 1)) {
            question.options = [];
        }

        return (
            <div>
                <p>{question.label}</p>
                <ul>
                    {question.options.map((option, i) =>
                        <li key={i}>{option.label}</li>
                    )}
                </ul>
            </div>
        );
    }
}

Question.propTypes = {
  question: PropTypes.object.isRequired
};
