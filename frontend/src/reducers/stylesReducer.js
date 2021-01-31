function stylesReducer(state = [], action) {
    switch (action.type) {
        case 'STYLES_GET_REQUEST':
            return state
        case 'STYLES_GET_SUCCESS':
            Array.isArray(action.payload)
                ? state.push(...action.payload)
                : state.push(action.payload)
            return state
        case 'STYLES_GET_FAIL':
            return state
        default:
            return state
    }
}

function stylesSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'STYLES_SAVE_REQUEST':
            return state
        case 'STYLES_SAVE_SUCCESS':
            return action.payload
        case 'STYLES_SAVE_FAIL':
            return state
        default:
            return state
    }
}

export { stylesReducer, stylesSaveReducer }