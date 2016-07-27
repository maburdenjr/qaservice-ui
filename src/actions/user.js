export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export function setUserDetails(sampleId, authToken, gatewayUrl) {
    return {
        type: SET_USER_DETAILS,
        sampleId: sampleId,
        authToken: authToken,
        gatewayUrl: gatewayUrl
    };
}