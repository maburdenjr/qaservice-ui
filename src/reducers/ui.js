import { CHANGE_UI_VIEW } from '../actions/ui';

const uiView = (state = 'SHOW_FEED', action) => {
    switch (action.type) {
        case CHANGE_UI_VIEW:
            return action.uiView;
        default:
            return state;

    }
};

export default uiView;
