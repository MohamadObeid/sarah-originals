import axios from "axios"
import { domain } from "../methods/methods"

const getScreens = (conditions) => async (dispatch, getState) => {
    try {
        const { screens } = getState()
        const screenExist = screens.find(screen => screen.viewPort === conditions.viewPort)
        if (screenExist) return

        dispatch({ type: 'SCREEN_GET_REQUEST' })
        const { data } = await axios.post(domain + '/api/screen/get', conditions)

        dispatch({ type: 'SCREEN_GET_SUCCESS', payload: data })
        console.log('screens', data)

    } catch (error) {
        dispatch({ type: 'SCREEN_GET_FAIL', payload: error })
    }
}

const saveScreens = (screens) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'SCREEN_SAVE_REQUEST' })
        const { userSignin: { userInfo } } = getState()

        const { data } = await axios.post(domain + '/api/screen/save', screens, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        console.log('save screens', data)
        dispatch({ type: 'SCREEN_SAVE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'SCREEN_SAVE_FAIL' })
    }
}

const deleteScreens = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post(domain + '/api/screen/delete', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    console.log('screen', data)
}

export { getScreens, saveScreens, deleteScreens } 