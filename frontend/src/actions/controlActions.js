import axios from "axios"
import {
    CONTROL_LIST_REQUEST,
    CONTROL_LIST_SUCCESS,
    CONTROL_LIST_FAIL,
    CONTROL_SAVE_REQUEST,
    CONTROL_SAVE_SUCCESS,
    CONTROL_SAVE_FAIL
} from "../constants/constants"
import { getSlideLists } from "./slideListsActions"

const listControls = () => async (dispatch) => {
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

const getController = (_id) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_CONTROLLER_REQUEST' })

        if (_id) {
            const { data } = await axios.post('/api/controller/get', _id)
            dispatch({ type: 'GET_CONTROLLER_SUCCESS', payload: data })
            console.log('controller', data)

        } else {
            const { data } = await axios.post('/api/controller/get')
            dispatch({ type: 'GET_CONTROLLER_SUCCESS', payload: data })
            console.log('controller', data)
        }

    } catch (error) {
        dispatch({ type: 'GET_CONTROLLER_FAIL', payload: error })
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
}

const saveController = (controller) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: 'CONTROLLER_SAVE_REQUEST' })

        /*if (controller._id) {
            const { data } = await axios.put('/api/controller/save', controller, {
                headers: { Authorization: 'Bearer ' + userInfo.token }
            })
            console.log('save controller', data)
            dispatch({ type: 'CONTROLLER_SAVE_SUCCESS', payload: data })
        } else {*/
        const { data } = await axios.post('/api/controller/save', controller, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        console.log('save controller', data)
        dispatch({ type: 'CONTROLLER_SAVE_SUCCESS', payload: data })
        //}

    } catch (error) {
        dispatch({ type: 'CONTROLLER_SAVE_FAIL' })
    }
}

const deleteController = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post('/api/controller/delete', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    console.log('delete controller', data)
}

export { listControls, saveControls, getController, saveController, deleteController } 