function viewsReducer(state = { views: [] }, action) {
    switch (action.type) {
        case 'VIEWS_LIST_REQUEST':
            return {
                loading: true,
                views: [],
            };
        case 'VIEWS_LIST_SUCCESS':
            return {
                loading: false,
                views: action.payload,
            };
        case 'VIEWS_LIST_FAIL':
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export { viewsReducer }