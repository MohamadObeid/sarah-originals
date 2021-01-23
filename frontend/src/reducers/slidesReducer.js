

function slidesReducer(state = [], action) {
    switch (action.type) {
        case 'GET_SLIDES_REQUEST':
            return state
        case 'GET_SLIDES_SUCCESS':
            state.push(action.payload)
            return state
        case 'GET_SLIDES_FAIL':
            return state
        default:
            return state
    }
}

export {
    slidesReducer
};