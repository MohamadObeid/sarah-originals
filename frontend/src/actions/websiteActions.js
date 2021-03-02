import axios from "axios"
import { domain } from "../methods/methods"

const getWebsites = (conditions) => async (dispatch, getState) => {
    try {
        const { websites } = getState()
        const websiteExist = websites.find(website => website.name === conditions.name)
        if (websiteExist) return

        dispatch({ type: 'WEBSITE_GET_REQUEST' })
        const { data } = await axios.post(domain + '/api/website/get', conditions)

        dispatch({ type: 'WEBSITE_GET_SUCCESS', payload: data })
        // console.log(conditions.name, data)

    } catch (error) {
        dispatch({ type: 'WEBSITE_GET_FAIL', payload: error })
    }
}

const saveWebsites = (websites) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'WEBSITE_SAVE_REQUEST' })
        const { userSignin: { userInfo } } = getState()

        const { data } = await axios.post(domain + '/api/website/save', websites/*, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        }*/)
        console.log('save website', data)
        dispatch({ type: 'WEBSITE_SAVE_SUCCESS', payload: data })

    } catch (error) {
        dispatch({ type: 'WEBSITE_SAVE_FAIL' })
    }
}

const deleteWebsites = (_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.post(domain + '/api/website/delete', _id, {
        headers: { Authorization: 'Bearer ' + userInfo.token }
    })
}

export { getWebsites, saveWebsites, deleteWebsites } 