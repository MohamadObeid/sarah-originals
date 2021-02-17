function viewListReducer(state = [], action) {
    switch (action.type) {
        case 'VIEW_GET_REQUEST':
            return state
        case 'VIEW_GET_SUCCESS':
            Array.isArray(action.payload)
                ? state.push(...action.payload)
                : state.push(action.payload)
            return state
        case 'VIEW_GET_FAIL':
            return state
        default:
            return state
    }
}

function viewSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'VIEW_SAVE_REQUEST':
            return state
        case 'VIEW_SAVE_SUCCESS':
            return action.payload
        case 'VIEW_SAVE_FAIL':
            return state
        default:
            return state
    }
}

export { viewListReducer, viewSaveReducer }