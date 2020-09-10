import {
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
    BRAND_LIST_REQUEST,
    BRAND_SAVE_FAIL,
    BRAND_SAVE_SUCCESS,
    BRAND_SAVE_REQUEST,
    BRAND_DELETE_REQUEST,
    BRAND_DELETE_SUCCESS,
    BRAND_DELETE_FAIL,
    BRAND_SAVE_CLEAR,
} from "../constants/constants";

function brandListReducer(state = { brand: [] }, action) {
    switch (action.type) {
        case BRAND_LIST_REQUEST:
            return {
                loading: true,
                brand: [],
            };
        case BRAND_LIST_SUCCESS:
            return {
                loading: false,
                brand: action.payload,
            };
        case BRAND_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function brandSaveReducer(state = { brand: {} }, action) {
    // state = { products: [] } means default value of state is product of empty object
    switch (action.type) {
        case BRAND_SAVE_REQUEST: // if sending request to server, show loading
            return {
                loading: true,
            };
        case BRAND_SAVE_SUCCESS: // if data is gotten from the server set data in products
            return {
                loading: false,
                success: true,
                brand: action.payload,
            };
        case BRAND_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case BRAND_SAVE_CLEAR:
            return {
                success: false,
                brand: action.payload,
            }
        default:
            return state;
    }
}

function brandDeleteReducer(state = { data: {} }, action) {
    // state = { products: [] } means default value of state is product of empty object
    switch (action.type) {
        case BRAND_DELETE_REQUEST: // if sending request to server, show loading
            return {
                loading: true,
            };
        case BRAND_DELETE_SUCCESS: // if data is gotten from the server set data in products
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case BRAND_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state; // return empty state which is set default
    }
}

export { brandListReducer, brandSaveReducer, brandDeleteReducer };