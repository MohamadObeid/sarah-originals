import {
    CONTROL_LIST_REQUEST,
    CONTROL_LIST_SUCCESS,
    CONTROL_LIST_FAIL,
    CONTROL_SAVE_REQUEST,
    CONTROL_SAVE_SUCCESS,
    CONTROL_SAVE_FAIL
} from "../constants/constants"

function controlReducer(state = { controls: {}, loading: true }, action) {
    switch (action.type) {
        case CONTROL_LIST_REQUEST:
            return {
                loading: true,
                controls: {}
            }
        case CONTROL_LIST_SUCCESS:
            return {
                loading: false,
                controls: action.payload
            }
        case CONTROL_LIST_FAIL:
            return {
                loading: false,
                controls: {},
            }
        default:
            return state
    }
}

function controlSaveReducer(state = { controls: {}, loading: true }, action) {
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

function controllerReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_CONTROLLER_REQUEST':
            return state
        case 'GET_CONTROLLER_SUCCESS':
            return {
                loading: false,
                controls: action.payload
            }
        case 'GET_CONTROLLER_FAIL':
            return state
        default:
            return state
    }
}

function controllerSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'CONTROLLER_SAVE_REQUEST':
            return state
        case 'CONTROLLER_SAVE_SUCCESS':
            return {
                loading: false,
                controls: action.payload
            }
        case 'CONTROLLER_SAVE_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

function actions(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_ACTIONS':
            return ({ ...state, ...action.payload }) // ex. dispatch({type, payload: {visible: true}})

        case 'REMOVE_FROM_ACTIONS':
            { const { [action.payload]: _, ...updatedState } = state; return (updatedState) }

        default: return state
    }
}

export { controlReducer, controlSaveReducer, actions, controllerReducer, controllerSaveReducer }