import axios from 'axios';
import cookie from "js-cookie";
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
    USER_ACTIVATION_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_SAVE_USER
} from '../constants/constants';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        let { data } = await axios.post("/api/users/signin", { email, password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        data = { ...data, signinDate: Date.now() }
        cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message })
    }
}

const saveUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_SAVE_REQUEST, payload: user });
    const { userSignin: { userInfo } } = getState();

    if (user === 'clear') {
        dispatch({ type: CLEAR_SAVE_USER, payload: undefined });
    } else try {
        if (user.activation) {
            const { data } = await axios.put('/api/users/' + user._id, user, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: USER_ACTIVATION_SUCCESS, payload: data })
        }
        else {
            if (user._id) {

                const { data } = await axios.put('/api/users/' + user._id, user, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                });
                dispatch({ type: USER_SAVE_SUCCESS, payload: data })

                // re-signin
                if (user._id === userInfo._id) {
                    cookie.remove('userInfo')
                    let { data: signinData } = await axios.post("/api/users/signin",
                        { email: data.data.email, password: data.data.password })
                    dispatch({ type: USER_SIGNIN_SUCCESS, payload: signinData })
                    signinData = { ...signinData, signinDate: Date.now() }
                    cookie.set('userInfo', JSON.stringify(signinData))
                }

            } else {
                const { data } = await axios.post("/api/users/create", user)
                dispatch({ type: USER_SAVE_SUCCESS, payload: data });
            }
        }
    } catch (error) {
        dispatch({ type: USER_SAVE_FAIL, payload: error.message })
    }
}

const register = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: user });
    try {
        const { data } = await axios.post("/api/users/register", user)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
    }
}

const listUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USERS_LIST_REQUEST });
        const { data } = await axios.get("/api/users");
        dispatch({ type: USERS_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USERS_LIST_FAIL, payload: error.message });
    }
}

const deleteUser = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();

        const { data } = await axios.delete("/api/users/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: error.message });
    }
}

const detailsUser = (_id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get("/api/users/" + _id);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
    }
};

export { signin, register, listUsers, deleteUser, saveUser, detailsUser };