export const CHANGE_UI_VIEW = 'CHANGE_UI_VIEW';

export function changeUiView(uiView) {
    return {
        type: CHANGE_UI_VIEW,
        uiView
    };
}
