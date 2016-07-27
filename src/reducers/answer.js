import { UPDATE_SELECTED_ANSWERS, SUBMIT_ANSWER_REQUEST, SUBMIT_ANSWER_SUCCESS, SUBMIT_ANSWER_FAILURE } from '../actions/answer';

function selectedAnswers(state = [], action) {
  switch (action.type){
    case UPDATE_SELECTED_ANSWERS:
      return [
        ...action.answerIds //replace state with all currently selected answerIds
      ];
    default:
      return state;
  }
}

const answerDetails = (state = {
  answers: [],
  isSubmitting: false,
  didInvalidate: false
}, action) => {
  switch (action.type){
    case UPDATE_SELECTED_ANSWERS:
      return Object.assign({}, state, {
        answers: selectedAnswers(state.answers, action)
      });
    case SUBMIT_ANSWER_REQUEST:
      return Object.assign({}, state, {
        isSubmitting: true,
        didInvalidate: false
      });
    case SUBMIT_ANSWER_SUCCESS:
      return Object.assign({}, state, {
        isSubmitting: false,
        didInvalidate: false,
        answers: [],
        nextQuestionCode: action.nextQuestionCode
      });
    case SUBMIT_ANSWER_FAILURE:
      return Object.assign({}, state, {
        isSubmitting: false,
        didInvalidate: true
      });
    default:
      return state;
  }
};

export default answerDetails;
