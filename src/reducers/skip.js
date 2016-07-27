import { SKIP_QUESTION_REQUEST, SKIP_QUESTION_SUCCESS, SKIP_QUESTION_FAILURE } from '../actions/skip';

const skipDetails = (state = {
  isSkipping: false,
  didInvalidate: false,
  skipId: null
}, action) => {
  switch (action.type){
    case SKIP_QUESTION_REQUEST:
      return Object.assign({}, state, {
        isSkipping: true,
        skipId: action.skipId
      });
    case SKIP_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        isSkipping: false,
        didInvalidate: false,
        skipId: null
      });
    case SKIP_QUESTION_FAILURE:
      return Object.assign({}, state, {
        isSkipping: false,
        didInvalidate: true,
        skipId: null
      });
    default:
      return state;
  }
};

export default skipDetails;
