import axios from "axios";
import { domain } from "../methods/methods";
import _ from 'lodash'

const getSlides = (control, action, firstUpdate) => async (dispatch, getState) => {
    try {
        if (action) {
            const { slides } = getState()

            var slidesExist = slides.find(slides => slides.collections &&
                _.isEqual(slides.collections, control.collections))

            if (slidesExist) {
                dispatch({
                    type: 'UPDATE_ACTIONS', payload: {
                        [action]: { ...slidesExist, title: control.title }
                    }
                })
                return
            }
        }

        dispatch({ type: 'GET_SLIDES_REQUEST' })
        const { data } = await axios.post(domain + '/api/slides/get', control)

        dispatch({ type: 'GET_SLIDES_SUCCESS', payload: data })

        if (action && data) {
            if (firstUpdate) {
                if (control.controllable)
                    dispatch({
                        type: 'UPDATE_ACTIONS', payload: {
                            [action]: { ...data, title: control.title }
                        }
                    })

            } else {
                dispatch({
                    type: 'UPDATE_ACTIONS', payload: {
                        [action]: { ...data, title: control.title }
                    }
                })
            }
        }
    } catch (error) {
        dispatch({ type: 'GET_SLIDES_FAIL', payload: error.message })
    }
}

export { getSlides }
