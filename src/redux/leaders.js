import * as ActionTypes from "./actionTypes";

export const Leaders = (state = {
    isLoading: true,
    errorMessage: true,
    leaders: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return { ...state, isLoading: false, errorMessage: null, leaders: action.payload }
        case ActionTypes.LEADERS_LOADING:
            return { ...state, isLoading: true, errorMessage: null, leaders: [] }
        case ActionTypes.LEADERS_FAILED:
            return { ...state, isLoading: false, errorMessage: action.payload, leaders: [] }
        default:
            return state;
    }
}