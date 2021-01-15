import axios from "axios"

const getScreenBox = (_id) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_SCREENBOX_REQUEST' })

        if (_id) {
            const { data } = await axios.post('/api/screenBox/get', _id)
            dispatch({ type: 'GET_SCREENBOX_SUCCESS', payload: data })
            console.log('screenBox', data)
        } else {
            const { data } = await axios.post('/api/screenBox/get')
            dispatch({ type: 'GET_SCREENBOX_SUCCESS', payload: data })
            console.log('screenBox', data)
        }

    } catch (error) {
        dispatch({ type: 'GET_SCREENBOX_FAIL', payload: error })
    }
}

const saveScreenBox = (screenBox) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'SCREENBOX_SAVE_REQUEST' })
        const { userSignin: { userInfo } } = getState()

        /*if (screenBox._id) {
            const { data } = await axios.put('/api/screenBox/put', screenBox, {
                headers: { Authorization: 'Bearer ' + userInfo.token }
            })
            console.log('screenBox', data)
            dispatch({ type: 'SCREENBOX_SAVE_SUCCESS', payload: data })

        } else {*/
        const { data } = await axios.post('/api/screenBox/save', screenBox, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        console.log('screenBox', data)
        dispatch({ type: 'SCREENBOX_SAVE_SUCCESS', payload: data })
        //}

    } catch (error) {
        dispatch({ type: 'SCREENBOX_SAVE_FAIL' })
    }
}

const deleteScreenBox = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post('/api/screenBox/delete', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    console.log('screenBox', data)
}

export { getScreenBox, saveScreenBox, deleteScreenBox } 