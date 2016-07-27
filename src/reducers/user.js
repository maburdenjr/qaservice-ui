import { SET_USER_DETAILS } from '../actions/user';

const userDetails = (state = '4fe469b2-8da6-4d07-bed0-3f6fdb4c0701', action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                sampleId: action.sampleId,
                authToken: action.authToken,
                gatewayUrl: action.gatewayUrl
            }
        default:
            return state;
    }
};

export default userDetails;
