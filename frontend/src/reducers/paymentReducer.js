import {
    PAYMENT_LIST_SUCCESS,
    PAYMENT_LIST_REQUEST,
    PAYMENT_LIST_FAIL,
    PAYMENT_SAVE_REQUEST,
    PAYMENT_SAVE_SUCCESS,
    PAYMENT_SAVE_FAIL,
    PAYMENT_DELETE_REQUEST,
    PAYMENT_DELETE_SUCCESS,
    PAYMENT_DELETE_FAIL,
    PAYMENT_ACTIVATION_SUCCESS
} from "../constants/constants";

function paymentListReducer(state = { payment: [] }, action) {
    switch (action.type) {
        case PAYMENT_LIST_REQUEST:
            return {
                loading: true,
                payment: [],
            };
        case PAYMENT_LIST_SUCCESS:
            return {
                loading: false,
                payment: action.payload,
            };
        case PAYMENT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function paymentSaveReducer(state = { payment: {} }, action) {

    switch (action.type) {
        case PAYMENT_SAVE_REQUEST:
            return {
                loading: true,
            };
        case PAYMENT_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                payment: action.payload,
            };
        case PAYMENT_ACTIVATION_SUCCESS:
            return {
                loading: false,
                success: true,
                payment: action.payload,
            };
        case PAYMENT_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function paymentDeleteReducer(state = { data: {} }, action) {

    switch (action.type) {
        case PAYMENT_DELETE_REQUEST:
            return {
                loading: true,
            };
        case PAYMENT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case PAYMENT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    paymentListReducer, paymentSaveReducer, paymentDeleteReducer
};