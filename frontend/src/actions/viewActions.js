import axios from "axios"
import { domain, website } from "../methods/methods"

const getViews = (conditions) => async (dispatch, getState) => {
    try {
        conditions.website = website
        const { views } = getState()
        const viewExist = views.find(view => view.name === conditions.name)
        if (viewExist) return

        dispatch({ type: 'VIEW_GET_REQUEST' })
        const { data } = await axios.post(domain + '/api/view/get', conditions)

        dispatch({ type: 'VIEW_GET_SUCCESS', payload: data })
        //console.log(conditions.name, data)

    } catch (error) {
        dispatch({ type: 'VIEW_GET_FAIL', payload: error })
    }
}

const saveViews = (views) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'VIEW_SAVE_REQUEST' })
        const { userSignin: { userInfo } } = getState()

        const { data } = await axios.post(domain + '/api/view/save', views, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })
        console.log('save view', data)
        dispatch({ type: 'VIEW_SAVE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'VIEW_SAVE_FAIL' })
    }
}

const deleteViews = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post(domain + '/api/view/delete', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    //console.log('view', data)
}

export { getViews, saveViews, deleteViews } 