import fetch from 'isomorphic-fetch';
import { fetchFeedIfNeeded } from './question-feed';

export const SKIP_QUESTION_REQUEST = 'SKIP_QUESTION_REQUEST';
export const SKIP_QUESTION_SUCCESS = 'SKIP_QUESTION_SUCCESS';
export const SKIP_QUESTION_FAILURE = 'SKIP_QUESTION_FAILURE';

function submitSkipRequest(skipId){
  return {
    type: SKIP_QUESTION_REQUEST,
    skipId
  };
}

function submitSkipSuccess(){
  return {
    type: SKIP_QUESTION_SUCCESS
  };
}

function submitSkipFailure(error){
  return {
    type: SKIP_QUESTION_FAILURE,
    error: error
  };
}

function notCurrentlySkipping(state){
  if(state.skipDetails.isSkipping){
    return false;
  }
  return true;
}

//skipReasonId needs to be 1,2,3,4
function skipQuestion(skipReasonId, state){
  return (dispatch) =>{
    dispatch(submitSkipRequest(skipReasonId));

    const questionId = state.questionFeed.item.id;
    const gatewayUrl = state.userDetails.gatewayUrl;

    return fetch(`${gatewayUrl}/question/${questionId}/skip`,{
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept-Version' : '1.0.0',
        'Content-Type': 'application/json'
        //'Authorization': state.userDetails.authToken
      },
      body: JSON.stringify({
        sampleId: state.userDetails.sampleId,
        revision: state.questionFeed.item.revision.toString(),
        skipReasonId: skipReasonId.toString()
      })
    })
      .then(response => response.json())
      .then(() => {
        dispatch(submitSkipSuccess());
        dispatch(fetchFeedIfNeeded(state.userDetails.sampleId));
      })
      .catch(error => {
        dispatch(submitSkipFailure(error));
      });
  };
}


export function skipQuestionIfNotSkipping(skipReasonId){
  return (dispatch, getState) => {
    if(notCurrentlySkipping(getState())){
      dispatch(skipQuestion(skipReasonId, getState()));
    }
  };
}
