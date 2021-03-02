function websiteListReducer(state = [], action) {
    switch (action.type) {
        case 'WEBSITE_GET_REQUEST':
            return state
        case 'WEBSITE_GET_SUCCESS':
            Array.isArray(action.payload)
                ? state.push(...action.payload)
                : state.push(action.payload)
            return state
        case 'WEBSITE_GET_FAIL':
            return state
        default:
            return state
    }
}

function websiteSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'WEBSITE_SAVE_REQUEST':
            return state
        case 'WEBSITE_SAVE_SUCCESS':
            return action.payload
        case 'WEBSITE_SAVE_FAIL':
            return state
        default:
            return state
    }
}

export { websiteListReducer, websiteSaveReducer }