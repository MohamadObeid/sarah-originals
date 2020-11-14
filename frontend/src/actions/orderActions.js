import axios from "axios";
import cookie from "js-cookie";
import {
    SAVE_DELIVERY_ADDRESS,
    TOGGLE_ORDER_SCREEN,
    SAVE_PAYMENT_METHOD,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_SAVE_FAIL,
    ORDER_SAVE_SUCCESS,
    ORDER_SAVE_REQUEST,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_SAVE_CLEAR,
    STORED_ORDER_LIST
} from "../constants/constants";

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

const listOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })
        const { data } = await axios.get("/api/order");
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message })
    }
}

const listActiveOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })
        const { data } = await axios.get("/api/order/active");
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message })
    }
}

const backupActiveOrders = (orders, command) => async (dispatch) => {
    if (command === 'store') {
        const activeOrders = JSON.parse(window.sessionStorage.getItem('activeOrders'))
        dispatch({ type: STORED_ORDER_LIST, payload: activeOrders })
    } else if (orders)
        window.sessionStorage.setItem('activeOrders', JSON.stringify(orders))
    else try {
        const activeOrders = JSON.parse(window.sessionStorage.getItem('activeOrders'))
        dispatch({ type: ORDER_LIST_SUCCESS, payload: activeOrders })
        window.sessionStorage.removeItem('activeOrders')
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message })
    }
}

const saveOrder = (order) => async (dispatch, getState) => {
    if (order === 'clear') {
        dispatch({ type: ORDER_SAVE_CLEAR, payload: undefined })
    } else try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: ORDER_SAVE_REQUEST, payload: order })
        // update
        if (order._id) {
            const { data } = await axios.put('/api/order/' + order._id, order, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            })

            data.data
                ? dispatch({ type: ORDER_SAVE_SUCCESS, payload: data.data })
                : dispatch({ type: ORDER_SAVE_SUCCESS, payload: data.message })
        }

        // new
        else {
            const { data } = await axios.post('/api/order  ', order, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            })

            dispatch({ type: ORDER_SAVE_SUCCESS, payload: data.data })
        }

    } catch (error) {
        dispatch({ type: ORDER_SAVE_FAIL, payload: error.message })
    }
};

const deleteOrder = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/order/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
    }
};

const detailsOrder = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: _id })
        const { data } = await axios.get("/api/order   /" + _id)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message })
    }
}

export {
    saveAddress,
    savePaymentMethod,
    toggleOrderScreen,
    listOrders,
    saveOrder,
    deleteOrder,
    detailsOrder,
    listActiveOrders,
    backupActiveOrders
};