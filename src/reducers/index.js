import { combineReducers } from 'redux';
import uiView from './ui.js';
import userDetails from './user.js';
import answerDetails from './answer.js';
import skipDetails from './skip.js';

import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS
} from '../actions/question-feed';

function questionFeed(state = {
  isFetching: false,
  didInvalidate: false,
  item: {}
}, action) {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
    });
    case FETCH_FEED_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        item: action.question,
        lastUpdated: action.receivedAt
    });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
    questionFeed,
    uiView,
    userDetails,
    answerDetails,
    skipDetails
});

export default rootReducer;
