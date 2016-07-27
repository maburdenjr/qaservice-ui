import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFeedIfNeeded  } from '../actions/question-feed';
import QuestionHeader from '../components/QuestionHeader';
import QuestionBody from '../components/QuestionBody';
import ThankYou from '../components/ThankYou';
import { updateSelectedAnswers, submitSelectedAnswersIfAvailable } from '../actions/answer';
import { setUserDetails } from '../actions/user';
import { skipQuestionIfNotSkipping } from '../actions/skip';

class QuestionContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {fetchFeed, setUserAuthDetails} = this.props;
        setUserAuthDetails(this.props.sampleId, this.props.authToken, this.props.gatewayUrl);
        fetchFeed(this.props.sampleId);
    }

    render() {
        if (this.props.question && this.props.uiView === 'SHOW_FEED') {
            return (
                <div className="page pagePadded pageWidth1">
                    <div className="ancGrid">
                        <QuestionHeader {...this.props}></QuestionHeader>
                        <QuestionBody {...this.props}></QuestionBody>
                    </div>
                </div>
            );
        } else if (this.props.uiView === 'THANK_YOU') {
            return (
                <div className = "page pagePadded pageWidth1">
                    <div className = "ancGrid">
                        <ThankYou></ThankYou>
                        </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

}

QuestionContainer.propTypes = {
    question: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
};

function mapStateToProps(state) {
    const { uiView, questionFeed } = state;
    const {
        isFetching,
        lastUpdated,
        item: question
      } = questionFeed || {
        isFetching: true,
        item: {}
    };

    return {
        uiView,
        question,
        isFetching,
        lastUpdated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAnswers: (answerIds) => {
          dispatch(updateSelectedAnswers(answerIds));
        },
        submitAnswers: () => {
          dispatch(submitSelectedAnswersIfAvailable());
        },
        fetchFeed: (sampleId) => {
          dispatch(fetchFeedIfNeeded (sampleId));
        },
        setUserAuthDetails: (sampleId, authToken, gatewayUrl) => {
            dispatch(setUserDetails(sampleId, authToken, gatewayUrl));
        },
        skipQuestion: (skipReasonId) => {
          dispatch(skipQuestionIfNotSkipping(skipReasonId));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionContainer);
