import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/question'
import nock from 'nock'
import expect from 'expect'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions for question', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it('should create FETCH_QUESTION_SUCCESS when fetching todos has been done', () => {
        nock('http://localhost:3000/')
        .get('/question/EYECOLOR')
        .reply(200, {
            label: 'what are your color?',
            options: ['red', 'blue', 'brown']
        });

        const expectedActions = [
            { id: 'EYECOLOR', type: actions.FETCH_QUESTION_REQUEST },
            {
                type: actions.FETCH_QUESTION_SUCCESS,
                id: 'EYECOLOR',
                question: {
                    label: 'what are your color?',
                    options: ['red', 'blue', 'brown']
                }
            }
        ];

        const store = mockStore({ questionById: [] })

        return store.dispatch(actions.fetchQuestionIfNeeded('EYECOLOR'))
          .then(() => { // return of async actions
              let actions = store.getActions();
              expect(actions.length).toEqual(expectedActions.length);
              expect(actions[0]).toEqual(expectedActions[0]);
              expect(actions[1].question).toEqual(expectedActions[1].question);
              expect(actions[1].id).toEqual(expectedActions[1].id);
              expect(actions[1].type).toEqual(expectedActions[1].type);
        });
      });
});
