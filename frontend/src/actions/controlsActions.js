import axios from "axios"
import { domain } from "../methods/methods"

const getControls = (conditions) => async (dispatch, getState) => {
    try {
        const fields = conditions.fields || null
        const { controls } = getState()
        if (controls[fields]) return

        dispatch({ type: 'GET_CONTROLS_REQUEST' })

        const { data } = await axios.post(domain + '/api/controls/get', conditions)
        controls[fields] = data[fields]

        dispatch({ type: 'GET_CONTROLS_SUCCESS', payload: controls })
        console.log('controls', controls)

    } catch (error) {
        dispatch({ type: 'GET_CONTROLS_FAIL', payload: error })
    }
}

const saveControls = (controls) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: 'CONTROLS_SAVE_REQUEST' })

        const { data } = await axios.post(domain + '/api/controls/save', controls, {
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
    const { data } = await axios.post(domain + '/api/controls/delete', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    console.log('delete controls', data)
}

export { getControls, saveControls, deleteControls } 