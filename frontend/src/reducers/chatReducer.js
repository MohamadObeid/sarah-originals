import {
    CHAT_LIST_SUCCESS,
    CHAT_LIST_FAIL,
    CHAT_LIST_REQUEST,
    CHAT_SAVE_FAIL,
    CHAT_SAVE_SUCCESS,
    CHAT_SAVE_REQUEST,
    CHAT_DELETE_REQUEST,
    CHAT_DELETE_SUCCESS,
    CHAT_DELETE_FAIL,
    CHAT_DETAILS_REQUEST,
    CHAT_DETAILS_SUCCESS,
    CHAT_DETAILS_FAIL,

    LIVE_USER_LIST_REQUEST,
    LIVE_USER_LIST_SUCCESS,
    LIVE_USER_LIST_FAIL,
    LIVE_USER_SAVE_FAIL,
    LIVE_USER_SAVE_SUCCESS,
    LIVE_USER_SAVE_REQUEST,
    LIVE_USER_DELETE_REQUEST,
    LIVE_USER_DELETE_SUCCESS,
    LIVE_USER_DELETE_FAIL,
    LIVE_USER_DETAILS_REQUEST,
    LIVE_USER_DETAILS_SUCCESS,
    LIVE_USER_DETAILS_FAIL,
    CLEAR_LIVE_USER_DETAILS,
    CLEAR_LIVE_USER_LIST,
    CLEAR_LIVE_USER_SAVE,
    CLEAR_CHAT_DETAILS,
} from "../constants/constants";

function chatListReducer(state = { chat: undefined }, action) {
    switch (action.type) {
        case CHAT_LIST_REQUEST:
            return {
                loading: true,
                chat: [],
            };
        case CHAT_LIST_SUCCESS:
            return {
                loading: false,
                chat: action.payload,
            };
        case CHAT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function chatSaveReducer(state = { chat: undefined }, action) {
    switch (action.type) {
        case CHAT_SAVE_REQUEST:
            return {
                loading: true,
            };
        case CHAT_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                chat: action.payload.data,
            };
        case CHAT_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function chatDeleteReducer(state = { data: undefined }, action) {
    switch (action.type) {
        case CHAT_DELETE_REQUEST:
            return {
                loading: true,
            };
        case CHAT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case CHAT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function chatDetailsReducer(state = { chat: undefined }, action) {
    switch (action.type) {
        case CHAT_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case CHAT_DETAILS_SUCCESS:
            return {
                loading: false,
                chat: action.payload[0],
            };
        case CHAT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_CHAT_DETAILS:
            return {
                chat: action.payload,
            };
        default:
            return state;
    }
}

// Live Chat

function liveUserListReducer(state = { liveUser: undefined }, action) {
    switch (action.type) {
        case LIVE_USER_LIST_REQUEST:
            return {
                loading: true,
                liveUser: [],
            };
        case LIVE_USER_LIST_SUCCESS:
            return {
                loading: false,
                liveUser: action.payload,
            };
        case LIVE_USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_LIVE_USER_LIST:
            return {
                liveUser: action.payload,
            };
        default:
            return state;
    }
}

function liveUserSaveReducer(state = { liveUser: undefined }, action) {
    switch (action.type) {
        case LIVE_USER_SAVE_REQUEST:
            return {
                loading: true,
            };
        case LIVE_USER_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                liveUser: action.payload.data,
            };
        case LIVE_USER_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_LIVE_USER_SAVE:
            return {
                liveUser: action.payload,
            };
        default:
            return state;
    }
}

function liveUserDeleteReducer(state = { data: undefined }, action) {
    switch (action.type) {
        case LIVE_USER_DELETE_REQUEST:
            return {
                loading: true,
            };
        case LIVE_USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case LIVE_USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function liveUserDetailsReducer(state = { liveUser: undefined }, action) {
    switch (action.type) {
        case LIVE_USER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case LIVE_USER_DETAILS_SUCCESS:
            return {
                loading: false,
                liveUser: action.payload[0],
            };
        case LIVE_USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_LIVE_USER_DETAILS:
            return {
                liveUser: action.payload,
            };
        default:
            return state;
    }
}

export {
    chatListReducer,
    chatSaveReducer,
    chatDeleteReducer,
    chatDetailsReducer,
    liveUserListReducer,
    liveUserSaveReducer,
    liveUserDeleteReducer,
    liveUserDetailsReducer,
};