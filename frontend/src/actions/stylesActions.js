import axios from "axios"

const getStyles = (conditions) => async (dispatch) => {
    try {
        dispatch({ type: 'STYLES_GET_REQUEST' })
        const { data } = await axios.post('/api/styles/get', conditions)

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

        const { data } = await axios.post('/api/styles/save', styles, {
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
    const { data } = await axios.post('/api/styles/delete', _id, {
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
        const { data } = await axios.post('/api/styles/getTitle', conditions)

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

export {
    getStyles, saveStyles, deleteStyles,
    getTitleStyles, saveTitleStyles, deleteTitleStyles
} 