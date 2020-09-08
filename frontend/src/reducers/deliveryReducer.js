import {
    DELIVERY_LIST_SUCCESS,
    DELIVERY_LIST_REQUEST,
    DELIVERY_LIST_FAIL,
    DELIVERY_SAVE_REQUEST,
    DELIVERY_SAVE_SUCCESS,
    DELIVERY_SAVE_FAIL,
    DELIVERY_DELETE_REQUEST,
    DELIVERY_DELETE_SUCCESS,
    DELIVERY_DELETE_FAIL,
    DELIVERY_ACTIVATION_SUCCESS
} from "../constants/constants";

function deliveryListReducer(state = { delivery: [] }, action) {
    switch (action.type) {
        case DELIVERY_LIST_REQUEST:
            return {
                loading: true,
                delivery: [],
            };
        case DELIVERY_LIST_SUCCESS:
            return {
                loading: false,
                delivery: action.payload,
            };
        case DELIVERY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function deliverySaveReducer(state = { delivery: {} }, action) {

    switch (action.type) {
        case DELIVERY_SAVE_REQUEST:
            return {
                loading: true,
            };
        case DELIVERY_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                delivery: action.payload,
            };
        case DELIVERY_ACTIVATION_SUCCESS:
            return {
                loading: false,
                success: true,
                delivery: action.payload,
            };
        case DELIVERY_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function deliveryDeleteReducer(state = { data: {} }, action) {

    switch (action.type) {
        case DELIVERY_DELETE_REQUEST:
            return {
                loading: true,
            };
        case DELIVERY_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case DELIVERY_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    deliveryListReducer, deliverySaveReducer, deliveryDeleteReducer
};