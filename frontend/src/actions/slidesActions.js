import axios from "axios";
import { domain } from "../methods/methods";
import _ from 'lodash'

const getSlides = (controls, action, content) => async (dispatch, getState) => {
    try {
        if (action) {
            const { slides } = getState()

            var slidesExist = slides.find(slides => slides.collections &&
                _.isEqual(slides.collections, controls.collections))

            if (slidesExist) {
                dispatch({
                    type: 'UPDATE_ACTIONS', payload: {
                        [action]: { ...slidesExist, title: controls.title }
                    }
                })
                return
            }

            if (content && (content.slides || content.title)) {
                const slides = content.slides
                const title = content.title
                dispatch({ type: 'UPDATE_ACTIONS', payload: { [action]: { slides, title } } })
                return
            }
        }

        const { data } = await axios.post(domain + '/api/slides/get', controls)
        dispatch({ type: 'GET_SLIDES_SUCCESS', payload: data })

        if (action && data) {
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: { ...data, title: controls.title }
                }
            })
        }

    } catch (error) {
        dispatch({ type: 'GET_SLIDES_FAIL', payload: error.message })
    }
}

export { getSlides }
