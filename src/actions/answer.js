import fetch from 'isomorphic-fetch';
import { fetchFeedIfNeeded } from './question-feed';

export const UPDATE_SELECTED_ANSWERS = 'UPDATE_SELECTED_ANSWERS';
export const SUBMIT_ANSWER_REQUEST = 'SUBMIT_ANSWER_REQUEST';
export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';
export const SUBMIT_ANSWER_FAILURE = 'SUBMIT_ANSWER_FAILURE';

function convertToArray(answerIds){
  if(Array.isArray(answerIds)) {
    return answerIds;
  } else  {
    return [answerIds];
  }
}

export function updateSelectedAnswers(answerIds) {
  return {
    type: UPDATE_SELECTED_ANSWERS,
    answerIds: convertToArray(answerIds)
  };
}

function submitAnswerRequest(){
  return {
    type: SUBMIT_ANSWER_REQUEST
  };
}

function submitAnswerSuccess(json){
  return {
    type: SUBMIT_ANSWER_SUCCESS,
    nextQuestionCode: json.nextQuestionCode
  };
}

function notCurrentlySubmitting(state){
  if(state.answerDetails.isSubmitting) {
    return false;
  }
  return true;
}

function validateAnswers(state){
  let answersLength = state.answerDetails.answers.length;
  let maxAnswers = state.questionFeed.item.validationRule.maxAnswers;

  if (answersLength < 1 || answersLength > maxAnswers) {
    return false;
  }

  return true;
}

function submitSelectedAnswers(state){

  return function(dispatch){
    dispatch(submitAnswerRequest());

    const questionId = state.questionFeed.item.id;
    const gatewayUrl = state.userDetails.gatewayUrl;

    return fetch(`${gatewayUrl}/question/${questionId}/answer`, {
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
        answers: state.answerDetails.answers
      })
    })
      .then(response => response.json())
      .then(json => {
          dispatch(submitAnswerSuccess(json));
          dispatch(fetchFeedIfNeeded(state.userDetails.sampleId));
      });
  };
}

export function submitSelectedAnswersIfAvailable(){
  return (dispatch, getState) => {
    if(notCurrentlySubmitting(getState()) && validateAnswers(getState())){
      dispatch(submitSelectedAnswers(getState()));
    }
  };
}
