import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS, USERS_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_SAVE_SUCCESS, USER_SAVE_REQUEST, USER_ACTIVATION_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, CLEAR_SAVE_USER, CLEAR_SIGNIN_USER } from "../constants/constants";

function userSigninReducer(state = { loading: true, userInfo: {} }, action) {
    switch (action.type) {
        case CLEAR_SIGNIN_USER:
            return { loading: true, userInfo: {} }
        case USER_SIGNIN_REQUEST:
            return { loading: true, userInfo: {} };
        case USER_SIGNIN_SUCCESS:
            if (action.payload)
                return { loading: false, success: true, userInfo: action.payload }
            else return { loading: false, userInfo: {} } // sined out
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload, userInfo: {} }
        default:
            return state;
    }
}

function userRegisterReducer(state = { userInfo: {} }, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function userSaveReducer(state = { userInfo: {} }, action) {
    switch (action.type) {
        case USER_SAVE_REQUEST:
            return { loading: true };
        case USER_SAVE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_SAVE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_ACTIVATION_SUCCESS:
            return { loading: false, activate: true, success: false, userInfo: action.payload }
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        case CLEAR_SAVE_USER:
            return { success: false, userInfo: undefined, activate: false }
        default:
            return state;
    }
}

function userDeleteReducer(state = { user: {} }, action) {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {
                loading: true,
            };
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function usersListReducer(state = { users: [] }, action) {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return {
                loading: true,
                users: [],
            };
        case USERS_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload,
            };
        case USERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function userDetailsReducer(state = { user: undefined }, action) {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            };
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    userSigninReducer,
    userRegisterReducer,
    usersListReducer,
    userDeleteReducer,
    userSaveReducer,
    userDetailsReducer,
};