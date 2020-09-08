import axios from "axios";
import {
    ZONE_LIST_SUCCESS,
    ZONE_LIST_FAIL,
    ZONE_LIST_REQUEST,
    ZONE_SAVE_FAIL,
    ZONE_SAVE_SUCCESS,
    ZONE_SAVE_REQUEST,
    ZONE_DELETE_REQUEST,
    ZONE_DELETE_SUCCESS,
    ZONE_DELETE_FAIL,
} from "../constants/constants";

const listZone = () => async (dispatch) => {
    try {
        dispatch({ type: ZONE_LIST_REQUEST })
        const { data } = await axios.get("/api/zone");
        dispatch({ type: ZONE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ZONE_LIST_FAIL, payload: error.message })
    }
}

const saveZone = (zone) => async (dispatch, getState) => {

    try {
        dispatch({ type: ZONE_SAVE_REQUEST, payload: zone });
        const { userSignin: { userInfo } } = getState();

        if (zone._id) {
            const { data } = await axios.put('/api/zone/' + zone._id, { ...zone, edited_by: userInfo.name, last_edition: Date.now }, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: ZONE_SAVE_SUCCESS, payload: data })
        }

        else {
            const { data } = await axios.post('/api/zone', { ...zone, created_by: userInfo.name, last_edition: Date.now }, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: ZONE_SAVE_SUCCESS, payload: data })
        }

    } catch (error) {
        dispatch({ type: ZONE_SAVE_FAIL, payload: error.message })
    }
};

const deleteZone = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ZONE_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/zone/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ZONE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ZONE_DELETE_FAIL, payload: error.message });
    }
};

export {
    listZone, saveZone, deleteZone
};