import Axios from "axios"
import {
    CONTROL_LIST_REQUEST,
    CONTROL_LIST_SUCCESS,
    CONTROL_LIST_FAIL,
    CONTROL_SAVE_REQUEST,
    CONTROL_SAVE_SUCCESS,
    CONTROL_SAVE_FAIL
} from "../constants/constants"

const getControls = () => async (dispatch) => {
    dispatch({ type: CONTROL_LIST_REQUEST })
    try {
        const data = await Axios.get('/api/controls')
        dispatch({ type: CONTROL_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CONTROL_LIST_FAIL, payload: error })
    }
}

const saveControls = (controls) => async (dispatch, getState) => {
    const { controls: { controls: defaultControls } } = getState()
    const { userSignin: { userInfo } } = getState()

    dispatch({ type: CONTROL_SAVE_REQUEST, action: defaultControls })
    try {
        const data = await Axios.get('/api/controls', controls, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        dispatch({ type: CONTROL_SAVE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CONTROL_SAVE_FAIL, payload: defaultControls })
    }
}

export { getControls, saveControls } 