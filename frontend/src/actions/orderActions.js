import axios from "axios";
import cookie, { set } from "js-cookie";
import {
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    SAVE_DELIVERY_ADDRESS,
    TOGGLE_ORDER_SCREEN,
    SAVE_PAYMENT_METHOD
} from "../constants/constants";

const listOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })
        const { data } = await axios.get("/api/order");
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message })
    }
}

const saveAddress = (addressItem) => (dispatch, getState) => {
    dispatch({ type: SAVE_DELIVERY_ADDRESS, payload: addressItem })
    const { address: { address } } = getState();
    cookie.set("address", JSON.stringify(address));
}

const savePaymentMethod = (method) => (dispatch, getState) => {
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: method })
    const { paymentMethod: { paymentMethod } } = getState();
    cookie.set("paymentMethod", JSON.stringify(paymentMethod));
}

const toggleOrderScreen = (orderScreen) => (dispatch) => {
    dispatch({ type: TOGGLE_ORDER_SCREEN, payload: orderScreen })
}

export {
    saveAddress,
    savePaymentMethod,
    toggleOrderScreen,
    listOrders
};