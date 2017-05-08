import {FETCH_DATA_SUCCESS, FETCH_DATA_ERRORED, EDIT_CAKE, ADD_CAKE} from '../constants/ActionTypes';
import 'whatwg-fetch';
const initialState = {
    fetchedData: false,
    fetchingData: false
};

export function cakes (state = initialState, action) {

    let newState = {
        fetchedData: false,
        fetchingData: false,
        failedFetch: false
    }

    switch (action.type) {
        case FETCH_DATA_SUCCESS:
                newState.items = action.items;
                newState.fetchedData = true;
                return Object.assign({}, state, newState);
        case EDIT_CAKE:
            newState.fetchedData = true;
            newState.items = state.items.slice(0);
            newState.items[action.userdata.index][action.userdata.prop] = action.userdata.changedValue;
            return Object.assign({}, state, newState);


        case ADD_CAKE:
            newState = {...state};
            newState.items.push(action.userdata);
            return Object.assign({}, state, newState);

        default:
            return state;
    }
}
export function fetchSuccess(items) {
    return {
        type: FETCH_DATA_SUCCESS,
        items
    };
}
export function fetchHasErrored() {
    return {
        type: FETCH_DATA_ERRORED,
    };
}