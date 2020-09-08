import axios from "axios";
import {
    DELIVERY_LIST_SUCCESS,
    DELIVERY_LIST_FAIL,
    DELIVERY_LIST_REQUEST,
    DELIVERY_SAVE_FAIL,
    DELIVERY_SAVE_SUCCESS,
    DELIVERY_SAVE_REQUEST,
    DELIVERY_DELETE_REQUEST,
    DELIVERY_DELETE_SUCCESS,
    DELIVERY_DELETE_FAIL,
    DELIVERY_ACTIVATION_SUCCESS
} from "../constants/constants";

const listDelivery = () => async (dispatch) => {
    try {
        dispatch({ type: DELIVERY_LIST_REQUEST })
        const { data } = await axios.get("/api/delivery");
        dispatch({ type: DELIVERY_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERY_LIST_FAIL, payload: error.message })
    }
}

const saveDelivery = (delivery) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_SAVE_REQUEST, payload: delivery });
        const { userSignin: { userInfo } } = getState();

        if (delivery.activation) {
            const { data } = await axios.put('/api/delivery/' + delivery._id, { ...delivery, edited_by: userInfo.name, last_edition: Date.now }, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: DELIVERY_ACTIVATION_SUCCESS, payload: data })
        }
        else {

            if (delivery._id) {
                const { data } = await axios.put('/api/delivery/' + delivery._id, { ...delivery, edited_by: userInfo.name, last_edition: Date.now }, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                });
                dispatch({ type: DELIVERY_SAVE_SUCCESS, payload: data })
            }

            else {
                const { data } = await axios.post('/api/delivery', { ...delivery, created_by: userInfo.name, last_edition: Date.now }, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                });
                dispatch({ type: DELIVERY_SAVE_SUCCESS, payload: data })
            }
        }

    } catch (error) {
        dispatch({ type: DELIVERY_SAVE_FAIL, payload: error.message })
    }
};

const deleteDelivery = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/delivery/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: DELIVERY_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELIVERY_DELETE_FAIL, payload: error.message });
    }
};

export {
    listDelivery, saveDelivery, deleteDelivery
};