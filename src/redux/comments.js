import * as ActionTypes from "./actionTypes"
export const Comments = (state = {
    errorMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errorMessage: null, comments: action.payload }
        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errorMessage: action.payload, comments: [] }
        default:
            return state;
    }
}