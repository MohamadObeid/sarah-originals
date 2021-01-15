function screenBoxReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_SCREENBOX_REQUEST':
            return state
        case 'GET_SCREENBOX_SUCCESS':
            return {
                loading: false,
                screenBox: action.payload
            }
        case 'GET_SCREENBOX_FAIL':
            return state
        default:
            return state
    }
}

function screenBoxSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'SCREENBOX_SAVE_REQUEST':
            return state
        case 'SCREENBOX_SAVE_SUCCESS':
            return {
                loading: false,
                screenBox: action.payload
            }
        case 'SCREENBOX_SAVE_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export { screenBoxReducer, screenBoxSaveReducer }