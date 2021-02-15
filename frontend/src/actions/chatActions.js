import axios from "axios"
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
    LIVE_USER_SAVE_REQUEST,
    LIVE_USER_DELETE_REQUEST,
    LIVE_USER_DELETE_SUCCESS,
    LIVE_USER_DELETE_FAIL,
    LIVE_USER_SAVE_SUCCESS,
    LIVE_USER_SAVE_FAIL,
    LIVE_USER_DETAILS_FAIL,
    LIVE_USER_DETAILS_SUCCESS,
    LIVE_USER_DETAILS_REQUEST,
    CLEAR_LIVE_USER_DETAILS,
    CLEAR_LIVE_USER_LIST,
    CLEAR_LIVE_USER_SAVE,
    CLEAR_CHAT_DETAILS,
    CLEAR_CHAT_SAVE,
} from "../constants/constants"

const listChat = () => async (dispatch) => {
    try {
        dispatch({ type: CHAT_LIST_REQUEST })
        const { data } = await axios.get("/api/chat");
        dispatch({ type: CHAT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CHAT_LIST_FAIL, payload: error.message })
    }
}

const saveChat = (chat) => async (dispatch) => {
    try {
        dispatch({ type: CHAT_SAVE_REQUEST, payload: chat });
        // update
        if (chat._id) {
            const { data } = await axios.put('/api/chat/' + chat._id, chat)
            dispatch({ type: CHAT_SAVE_SUCCESS, payload: data })
        }
        // new
        else {
            const { data: chatData } = await axios.post('/api/chat', chat)
            dispatch({ type: CHAT_SAVE_SUCCESS, payload: chatData })

            if (chatData.data) {
                const { data: liveUserData } = await axios.post('/api/live', {
                    startDate: Date.now(),
                    chatId: [chatData.data._id],
                    userName: chatData.data.created_by,
                    userId: chatData.data.created_by_id,
                })
                dispatch({ type: LIVE_USER_SAVE_SUCCESS, payload: liveUserData })
            }
        }
    } catch (error) {
        dispatch({ type: CHAT_SAVE_FAIL, payload: error.message })
    }
}

const deleteChat = (_id) => async (dispatch) => {
    if (_id === 'clear') {
        dispatch({ type: CLEAR_CHAT_SAVE, payload: undefined });
    } else try {
        dispatch({ type: CHAT_DELETE_REQUEST });
        const { data } = await axios.delete("/api/chat/" + _id)
        dispatch({ type: CHAT_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CHAT_DELETE_FAIL, payload: error.message });
    }
}

const detailsChat = (_id) => async (dispatch) => {
    if (_id === 'clear') {
        dispatch({ type: CLEAR_CHAT_DETAILS, payload: undefined });
    } else try {
        dispatch({ type: CHAT_DETAILS_REQUEST, payload: _id });
        const { data } = await axios.get("/api/chat/" + _id);
        dispatch({ type: CHAT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CHAT_DETAILS_FAIL, payload: error.message })
    }
}

// live chat

const listLiveUser = (liveUser) => async (dispatch) => {
    if (liveUser === 'clear') {
        dispatch({ type: CLEAR_LIVE_USER_LIST, payload: undefined });
    } else try {
        dispatch({ type: LIVE_USER_LIST_REQUEST })
        /*const { data } = await axios.get("/api/live");
        dispatch({ type: LIVE_USER_LIST_SUCCESS, payload: data })*/
    } catch (error) {
        dispatch({ type: LIVE_USER_LIST_FAIL, payload: error.message })
    }
}

const saveLiveUser = (liveUser) => async (dispatch) => {
    if (liveUser === 'clear') {
        dispatch({ type: CLEAR_LIVE_USER_SAVE, payload: undefined });
    } else try {
        dispatch({ type: LIVE_USER_SAVE_REQUEST, payload: liveUser });
        // update
        if (liveUser._id) {
            const { data } = await axios.put('/api/live/' + liveUser._id, liveUser)
            dispatch({ type: LIVE_USER_SAVE_SUCCESS, payload: data })
        }
        // new
        else {
            const { data } = await axios.post('/api/live/', liveUser)
            dispatch({ type: LIVE_USER_SAVE_SUCCESS, payload: data })
        }
    } catch (error) {
        dispatch({ type: LIVE_USER_SAVE_FAIL, payload: error.message })
    }
}

const deleteLiveUser = (_id) => async (dispatch) => {
    try {
        dispatch({ type: LIVE_USER_DELETE_REQUEST });
        const { data } = await axios.delete("/api/live/" + _id)
        dispatch({ type: LIVE_USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LIVE_USER_DELETE_FAIL, payload: error.message });
    }
}

const detailsLiveUser = (_id) => async (dispatch) => {
    if (_id === 'clear') {
        dispatch({ type: CLEAR_LIVE_USER_DETAILS, payload: undefined });
    } else try {
        dispatch({ type: LIVE_USER_DETAILS_REQUEST, payload: _id });
        const { data } = await axios.get("/api/live/" + _id);
        dispatch({ type: LIVE_USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LIVE_USER_DETAILS_FAIL, payload: error.message })
    }
}

export {
    listChat,
    saveChat,
    deleteChat,
    detailsChat,
    listLiveUser,
    saveLiveUser,
    deleteLiveUser,
    detailsLiveUser,
}