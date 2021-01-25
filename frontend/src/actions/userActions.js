import axios from 'axios';
import cookie from "js-cookie";
import { listLiveUser } from './chatActions'
import { domain } from "../methods/methods"
import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USERS_LIST_SUCCESS,
    USERS_LIST_REQUEST,
    USERS_LIST_FAIL,
    USER_SAVE_SUCCESS,
    USER_SAVE_FAIL,
    USER_SAVE_REQUEST,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_SAVE_USER,
    CLEAR_SIGNIN_USER,
} from '../constants/constants';
import { detailsEmployee } from './employeeActions';

const signin = (user) => async (dispatch, getState) => {
    if (user.request === 'clear') {
        dispatch({ type: CLEAR_SIGNIN_USER, payload: undefined })
    } else {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: USER_SIGNIN_REQUEST, payload: userInfo })
        try {
            let { data } = await axios.post(domain + "/api/users/signin", user)
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
            data.employeeId &&
                dispatch(detailsEmployee(data.employeeId))
            data && cookie.set('userInfo', JSON.stringify({
                email: data.email,
                password: data.password,
                isCallCenterAgent: data.isCallCenterAgent,
                name: data.name,
                employeeId: data.employeeId,
                _id: data._id,
                image: data.image,
                isAdmin: data.isAdmin,
                token: data.token,
            }))
        } catch (error) {
            dispatch({ type: USER_SIGNIN_FAIL, payload: error.message })
        }
    }
}

const saveUser = (user) => async (dispatch, getState) => {
    if (user === 'clear') {
        dispatch({ type: CLEAR_SAVE_USER, payload: undefined });
    } else {
        dispatch({ type: USER_SAVE_REQUEST, payload: user });
        const { userSignin: { userInfo } } = getState();
        try {
            if (user._id) {
                const { data } = await axios.put(domain + '/api/users/' + user._id, user, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                })
                dispatch({ type: USER_SAVE_SUCCESS, payload: data })
                // re-signin
                if (user._id === userInfo._id) {
                    cookie.remove('userInfo')
                    let { data: signinData } = await axios.post(domain + "/api/users/signin",
                        { email: data.data.email, password: data.data.password })
                    dispatch({ type: USER_SIGNIN_SUCCESS, payload: signinData })
                    cookie.set('userInfo', JSON.stringify({
                        email: signinData.email,
                        password: signinData.password,
                        isCallCenterAgent: signinData.isCallCenterAgent,
                        name: signinData.name,
                        employeeId: signinData.employeeId,
                        _id: signinData._id,
                        image: signinData.image,
                        isAdmin: signinData.isAdmin,
                        token: signinData.token,
                    }))
                    //for call centers in chatbox
                    signinData.isCallCenterAgent && dispatch(listLiveUser())
                }
                //}
            } else {
                const { data } = await axios.post(domain + "/api/users/create", user)
                dispatch({ type: USER_SAVE_SUCCESS, payload: data });
            }
        } catch (error) {
            dispatch({ type: USER_SAVE_FAIL, payload: error.message })
        }
    }
}

const register = (user) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: user });

    try {
        const { data } = await axios.post(domain + "/api/users/register", user)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

        let { data: signinData } = await axios.post(domain + "/api/users/signin",
            { email: data.email, password: data.password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: signinData })
        signinData = { ...signinData, signinDate: Date.now() + 10800000 }
        cookie.set('userInfo', JSON.stringify({
            email: signinData.email,
            password: signinData.password,
            isCallCenterAgent: signinData.isCallCenterAgent,
            name: signinData.name,
            employeeId: signinData.employeeId,
            _id: signinData._id,
            image: signinData.image,
            isAdmin: signinData.isAdmin,
            token: signinData.token,
        }))

    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
    }
}

const listUsers = (userList) => async (dispatch, getState) => {
    try {
        dispatch({ type: USERS_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();

        if (userList) {
            const { data } = await axios.post(domain + "/api/users", userList, {
                headers: { Authorization: 'Bearer ' + userInfo.token }
            })
            dispatch({ type: USERS_LIST_SUCCESS, payload: data })
        } else {
            const { data } = await axios.get(domain + "/api/users", {
                headers: { Authorization: 'Bearer ' + userInfo.token }
            })
            dispatch({ type: USERS_LIST_SUCCESS, payload: data })
        }
    } catch (error) {
        dispatch({ type: USERS_LIST_FAIL, payload: error.message });
    }
}

const deleteUser = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();

        const { data } = await axios.delete(domain + "/api/users/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: error.message });
    }
}

const detailsUser = (_id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { data } = await axios.get(domain + "/api/users/" + _id)
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.message })
    }
}

const getUser = (phone) => async (dispatch, getState) => {
    if (phone === 'clear') {
        dispatch({ type: USER_DETAILS_SUCCESS, payload: undefined })
    } else try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { userSignin: { userInfo } } = getState()
        const { data } = await axios.post(domain + "/api/users/getUser", { phone: phone }, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        })

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.message })
    }
};

export { signin, register, listUsers, deleteUser, saveUser, detailsUser, getUser }