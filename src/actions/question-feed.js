import fetch from 'isomorphic-fetch';
import { changeUiView } from './ui';


export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const CHANGE_SELECTED_QUESTION = 'CHANGE_SELECTED_QUESTION';

function requestQuestion() {
    return {
        type: FETCH_FEED_REQUEST
    };
}

function receiveQuestionFromFeed(json) {
    return {
        type: FETCH_FEED_SUCCESS,
        question: json,
        receivedAt: Date.now()
    };
}

function shouldFetchQuestion(state) {
  if (state.questionFeed.isFetching) {
    return false;
  }
  return true;
}

function fetchQuestionFromFeed(sampleId, state) {
    return dispatch => {
        dispatch(requestQuestion());

        const gatewayUrl = state.userDetails.gatewayUrl;

        return fetch(`${gatewayUrl}/question/feed/${sampleId}`, {
            mode:'cors',
            method: 'GET',
            headers: {
                'Accept-Version':'1.0.0'
                //'Authorization': state.userDetails.authToken
            }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveQuestionFromFeed(json)))
        .catch(error => {
            // TODO: Improve error handling and routing for empty json response
            dispatch(changeUiView('THANK_YOU', error));
        });
    };
}

export function fetchFeedIfNeeded(sampleId) {
    return (dispatch, getState) => {
        if (shouldFetchQuestion(getState())) {
            return dispatch(fetchQuestionFromFeed(sampleId, getState()));
        }
    };
}
