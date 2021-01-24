import axios from "axios"
import {
    CONTROL_LIST_REQUEST,
    CONTROL_LIST_SUCCESS,
    CONTROL_LIST_FAIL,
    CONTROL_SAVE_REQUEST,
    CONTROL_SAVE_SUCCESS,
    CONTROL_SAVE_FAIL
} from "../constants/constants"
import { getSlides } from "./slidesActions"

/*const listControls = () => async (dispatch) => {
    try {
        dispatch({ type: CONTROL_LIST_REQUEST })
        const { data } = await axios.get('/api/controls')
        console.log('controls', data)
        if (data) {
            dispatch({ type: CONTROL_LIST_SUCCESS, payload: data })
            dispatch(getSlideLists(data.homePageViews))
        }
    } catch (error) {
        dispatch({ type: CONTROL_LIST_FAIL, payload: error })
    }
}

const saveControls = (controls) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()

    dispatch({ type: CONTROL_SAVE_REQUEST })
    try {
        const { data } = await axios.put('/api/controls/put', controls, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        dispatch({ type: CONTROL_SAVE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CONTROL_SAVE_FAIL })
    }
}*/

const getControls = (_id) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_CONTROLS_REQUEST' })

        const { data } = await axios.post('https://sarah-originals.herokuapp.com/api/controls/get', _id)
        dispatch({ type: 'GET_CONTROLS_SUCCESS', payload: data })
        console.log('controls', data)

    } catch (error) {
        dispatch({ type: 'GET_CONTROLS_FAIL', payload: error })
    }
}

const saveControls = (controls) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: 'CONTROLS_SAVE_REQUEST' })

        const { data } = await axios.post('api/controls/save', controls, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        console.log('save controls', data)
        dispatch({ type: 'CONTROLS_SAVE_SUCCESS', payload: data })


    } catch (error) {
        dispatch({ type: 'CONTROLS_SAVE_FAIL' })
    }
}

const deleteControls = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post('/api/controls/delete', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    console.log('delete controls', data)
}

export { getControls, saveControls, deleteControls } 