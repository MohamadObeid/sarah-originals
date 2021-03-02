function searchReducer(state = [], action) {
    switch (action.type) {
        case 'SEARCH_REQUEST':
            return state
        case 'SEARCH_SUCCESS':
            state.push(action.payload)
            return state
        case 'SEARCH_FAIL':
            return state
        default:
            return state
    }
}

export {
    searchReducer
};