import axios from "axios"
import { domain } from "../methods/methods"

const getStyles = (conditions) => async (dispatch) => {
    try {
        dispatch({ type: 'STYLES_GET_REQUEST' })
        const { data } = await axios.post(domain + '/api/styles/get', conditions)

        dispatch({ type: 'STYLES_GET_SUCCESS', payload: data })
        //console.log('styles', data)

        if (conditions.name === 'Default Desktop Styles') {
            dispatch({ type: 'DEFAULT_STYLES_GET_SUCCESS', payload: data })
            console.log('default desktop Styles', data)
        }

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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const getTitleStyles = (conditions) => async (dispatch) => {
    try {
        dispatch({ type: 'TITLE_STYLES_GET_REQUEST' })
        const { data } = await axios.post(domain + '/api/styles/getTitle', conditions)

        dispatch({ type: 'TITLE_STYLES_GET_SUCCESS', payload: data })
        //console.log('title styles', data)

        if (conditions.name === 'Default Title Desktop Styles') {
            dispatch({ type: 'DEFAULT_TITLE_STYLES_GET_SUCCESS', payload: data })
            console.log('default desktop Title Styles', data)
        }

    } catch (error) {
        dispatch({ type: 'TITLE_STYLES_GET_FAIL', payload: error })
    }
}

const saveTitleStyles = (styles) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'TITLE_STYLES_SAVE_REQUEST' })
        const { userSignin: { userInfo } } = getState()

        const { data } = await axios.post('/api/styles/saveTitle', styles, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        console.log('save Title Styles', data)
        dispatch({ type: 'TITLE_STYLES_SAVE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'TITLE_STYLES_SAVE_FAIL' })
    }
}

const deleteTitleStyles = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post('/api/styles/deleteTitle', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    console.log('Deleted Title Styles', data)
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const getAddToCartStyles = (conditions) => async (dispatch) => {
    try {
        dispatch({ type: 'ADDTOCART_TITLE_STYLES_GET_REQUEST' })
        const { data } = await axios.post(domain + '/api/styles/getAddToCart', conditions)

        dispatch({ type: 'ADDTOCART_TITLE_STYLES_GET_SUCCESS', payload: data })
        //console.log('AddToCart styles', data)

        if (conditions.name === 'Default Desktop AddToCart') {
            dispatch({ type: 'DEFAULT_ADDTOCART_TITLE_STYLES_GET_SUCCESS', payload: data })
            console.log('default AddToCart Styles', data)
        }

    } catch (error) {
        dispatch({ type: 'ADDTOCART_TITLE_STYLES_GET_FAIL', payload: error })
    }
}

const saveAddToCartStyles = (styles) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ADDTOCART_TITLE_STYLES_SAVE_REQUEST' })
        const { userSignin: { userInfo } } = getState()

        const { data } = await axios.post('/api/styles/saveAddToCart', styles, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        console.log('save AddToCart Styles', data)
        dispatch({ type: 'ADDTOCART_TITLE_STYLES_SAVE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'ADDTOCART_TITLE_STYLES_SAVE_FAIL' })
    }
}

const deleteAddToCartStyles = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post('/api/styles/deleteAddToCart', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    console.log('Deleted AddToCart Styles', data)
}

export {
    getStyles, saveStyles, deleteStyles,
    getTitleStyles, saveTitleStyles, deleteTitleStyles,
    getAddToCartStyles, saveAddToCartStyles, deleteAddToCartStyles
} 