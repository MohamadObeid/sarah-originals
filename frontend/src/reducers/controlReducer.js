import {
    CONTROL_LIST_REQUEST,
    CONTROL_LIST_SUCCESS,
    CONTROL_LIST_FAIL,
    CONTROL_SAVE_REQUEST,
    CONTROL_SAVE_SUCCESS,
    CONTROL_SAVE_FAIL
} from "../constants/constants"

function controlReducer(state = { controls: undefined }, action) {
    switch (action.type) {
        case CONTROL_LIST_REQUEST:
            return {
                loading: true,
                controls: action.payload
            }
        case CONTROL_LIST_SUCCESS:
            return {
                loading: false,
                controls: action.payload
            }
        case CONTROL_LIST_FAIL:
            return {
                loading: false,
                controls: action.payload
            }
        default:
            return state
    }
}

function controlSaveReducer(state = { controls: {} }, action) {
    switch (action.type) {
        case CONTROL_SAVE_REQUEST:
            return {
                loading: true
            }
        case CONTROL_SAVE_SUCCESS:
            return {
                loading: false,
                controls: action.payload
            }
        case CONTROL_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export { controlReducer, controlSaveReducer }