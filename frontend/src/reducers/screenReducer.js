function screenListReducer(state = [], action) {
    switch (action.type) {
        case 'SCREEN_GET_REQUEST':
            return state
        case 'SCREEN_GET_SUCCESS':
            Array.isArray(action.payload)
                ? state.push(...action.payload)
                : state.push(action.payload)
            return state
        case 'SCREEN_GET_FAIL':
            return state
        default:
            return state
    }
}

function screenSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'SCREEN_SAVE_REQUEST':
            return state
        case 'SCREEN_SAVE_SUCCESS':
            return action.payload
        case 'SCREEN_SAVE_FAIL':
            return state
        default:
            return state
    }
}

export { screenListReducer, screenSaveReducer }