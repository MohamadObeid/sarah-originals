import Axios from "axios"
import {
    CONTROL_LIST_REQUEST,
    CONTROL_LIST_SUCCESS,
    CONTROL_LIST_FAIL,
    CONTROL_SAVE_REQUEST,
    CONTROL_SAVE_SUCCESS,
    CONTROL_SAVE_FAIL
} from "../constants/constants"

const listControls = () => async (dispatch) => {
    dispatch({ type: CONTROL_LIST_REQUEST })
    try {
        const { data } = await Axios.get('/api/controls')
        console.log('controls', data[0])
        data[0]
            ? dispatch({ type: CONTROL_LIST_SUCCESS, payload: data[0] })
            : dispatch({ type: CONTROL_LIST_REQUEST, payload: {} })
    } catch (error) {
        dispatch({ type: CONTROL_LIST_FAIL, payload: error })
    }
}

const saveControls = (controls) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()

    dispatch({ type: CONTROL_SAVE_REQUEST })
    try {
        const { data } = await Axios.put('/api/controls/put', controls, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        dispatch({ type: CONTROL_SAVE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CONTROL_SAVE_FAIL })
    }
}

export { listControls, saveControls } 