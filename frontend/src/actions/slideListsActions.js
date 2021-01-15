import axios from "axios";

const getSlideLists = (views) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_SLIDE_LISTS_REQUEST' })
        const { data } = await axios.post('/api/slideLists', { views })
        console.log('slide Lists', data)
        if (data)
            dispatch({ type: 'GET_SLIDE_LISTS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_SLIDE_LISTS_FAIL', payload: error.message })
    }
}

export { getSlideLists }
