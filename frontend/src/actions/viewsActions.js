import axios from "axios";

const listHomePageViews = (list) => async (dispatch) => {
    try {
        dispatch({ type: 'VIEWS_LIST_REQUEST' })
        const { data } = await axios.post('/api/views',
            { collections: list.collections, limit: list.limit })
        dispatch({ type: 'VIEWS_LIST_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'VIEWS_LIST_FAIL', payload: error.message })
    }
}

export { listHomePageViews }
