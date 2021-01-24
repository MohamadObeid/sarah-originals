import axios from "axios";
import { domain } from "../methods/methods";

const getSlides = (view) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_SLIDES_REQUEST' })
        const { data } = await axios.post(domain + '/api/slides/get', view)
        //console.log('slides', data)
        dispatch({ type: 'GET_SLIDES_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'GET_SLIDES_FAIL', payload: error.message })
    }
}

export { getSlides }
