import axios from "axios";

const listHomePageViews = (homePage) => async (dispatch) => {
    try {
        dispatch({ type: 'VIEWS_LIST_REQUEST' })
        const { data } = await axios.post('/api/views',
            { views: homePage.views, limit: homePage.limit })
        console.log(data)
        dispatch({ type: 'VIEWS_LIST_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'VIEWS_LIST_FAIL', payload: error.message })
    }
}

export { listHomePageViews }
