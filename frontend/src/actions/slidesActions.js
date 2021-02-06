import axios from "axios";
import { domain } from "../methods/methods";
import _ from 'lodash'
const getSlides = (control, action) => async (dispatch, getState) => {
    try {
        if (action) {
            const { actions: { [action]: actionExist } } = getState()
            if (actionExist && _.isEqual(actionExist.collections, control.collections)) return
        }
        dispatch({ type: 'GET_SLIDES_REQUEST' })
        const { data } = await axios.post(domain + '/api/slides/get', control)
        //console.log(control, action)
        dispatch({ type: 'GET_SLIDES_SUCCESS', payload: data })
        if (action && data) {
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: {
                        slides: data.slides,
                        title: control.title,
                        collections: data.collections
                    }
                }
            })
        }
    } catch (error) {
        dispatch({ type: 'GET_SLIDES_FAIL', payload: error.message })
    }
}

export { getSlides }
