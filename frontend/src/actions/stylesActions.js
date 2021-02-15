import axios from "axios"
import { domain } from "../methods/methods"

const getStyles = (conditions) => async (dispatch, getState) => {
    try {
        const { styles } = getState()
        const stylesExist = styles.find(styles => styles.name === conditions.name)
        if (stylesExist) return
        console.log('styles')

        dispatch({ type: 'STYLES_GET_REQUEST' })
        const { data } = await axios.post(domain + '/api/styles/get', conditions)

        dispatch({ type: 'STYLES_GET_SUCCESS', payload: data })
        console.log(data.name, data)

    } catch (error) {
        dispatch({ type: 'STYLES_GET_FAIL', payload: error })
    }
}

const saveStyles = (styles) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'STYLES_SAVE_REQUEST' })
        const { userSignin: { userInfo } } = getState()

        const { data } = await axios.post(domain + '/api/styles/save', styles, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        console.log('save styles', data)
        dispatch({ type: 'STYLES_SAVE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'STYLES_SAVE_FAIL' })
    }
}

const deleteStyles = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post(domain + '/api/styles/delete', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    console.log('styles', data)
}

export { getStyles, saveStyles, deleteStyles } 