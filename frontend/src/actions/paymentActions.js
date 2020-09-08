import axios from "axios";
import {
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_FAIL,
    PAYMENT_LIST_REQUEST,
    PAYMENT_SAVE_FAIL,
    PAYMENT_SAVE_SUCCESS,
    PAYMENT_SAVE_REQUEST,
    PAYMENT_DELETE_REQUEST,
    PAYMENT_DELETE_SUCCESS,
    PAYMENT_DELETE_FAIL,
    PAYMENT_ACTIVATION_SUCCESS
} from "../constants/constants";

const listPayment = () => async (dispatch) => {
    try {
        dispatch({ type: PAYMENT_LIST_REQUEST })
        const { data } = await axios.get("/api/payment");
        dispatch({ type: PAYMENT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PAYMENT_LIST_FAIL, payload: error.message })
    }
}

const savePayment = (payment) => async (dispatch, getState) => {
    try {
        dispatch({ type: PAYMENT_SAVE_REQUEST, payload: payment });
        const { userSignin: { userInfo } } = getState();

        if (payment.activation) {
            const { data } = await axios.put('/api/payment/' + payment._id, { ...payment, edited_by: userInfo.name, last_edition: Date.now }, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: PAYMENT_ACTIVATION_SUCCESS, payload: data })
        }
        else {

            if (payment._id) {
                const { data } = await axios.put('/api/payment/' + payment._id, { ...payment, edited_by: userInfo.name, last_edition: Date.now }, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                });
                dispatch({ type: PAYMENT_SAVE_SUCCESS, payload: data })
            }

            else {
                const { data } = await axios.post('/api/payment', { ...payment, created_by: userInfo.name, last_edition: Date.now }, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                });
                dispatch({ type: PAYMENT_SAVE_SUCCESS, payload: data })
            }
        }

    } catch (error) {
        dispatch({ type: PAYMENT_SAVE_FAIL, payload: error.message })
    }
};

const deletePayment = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PAYMENT_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/payment/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: PAYMENT_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PAYMENT_DELETE_FAIL, payload: error.message });
    }
};

export {
    listPayment, savePayment, deletePayment
};