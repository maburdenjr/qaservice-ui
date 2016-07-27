import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchQuestionIfNeeded } from '../actions/question';
import Intro from './Intro';
import Question from '../components/Question';
import { changeUiView } from '../actions/ui';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch, selectedQuestionId } = this.props;
        dispatch(fetchQuestionIfNeeded(selectedQuestionId));
    }

    render() {

        const {uiView, question, isFetching, lastUpdated, onIntroContinue} = this.props;
        const isEmpty = !question;

        let AppView;

        switch (uiView) {
            case 'SHOW_INTRO':
                AppView = Question;
                break;
            case 'SHOW_QUESTION':
                AppView = Question;
                break;
            default:
                AppView = Intro;
        }

        return (
            <div>
                <AppView question={question} {...this.props} />
            </div>
        );
    }
}

App.propTypes = {
  selectedQuestionId: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
};

App.defaultProps = { selectedQuestionId: 'EYECOLOR' };

function mapStateToProps(state) {
    const {uiView, userDetails, selectedQuestionId, questionById } = state;
    const {
        isFetching,
        lastUpdated,
        item: question
    } = questionById[selectedQuestionId] || {
        isFetching: true,
        item: {}
    };

    return {
        uiView,
        userDetails,
        selectedQuestionId,
        question,
        isFetching,
        lastUpdated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onIntroContinue: function(uiView) { dispatch(changeUiView(uiView));}
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
