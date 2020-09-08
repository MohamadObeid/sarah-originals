import {
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_FAIL,
    CATEGORY_SAVE_REQUEST,
    CATEGORY_SAVE_SUCCESS,
    CATEGORY_SAVE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_ACTIVATION_SUCCESS,
    CATEGORY_DELETE_FAIL,
} from "../constants/constants";

function categoryListReducer(state = { category: [] }, action) {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return {
                loading: true,
                category: [],
            };
        case CATEGORY_LIST_SUCCESS:
            return {
                loading: false,
                category: action.payload,
            };
        case CATEGORY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function categorySaveReducer(state = { category: {} }, action) {

    switch (action.type) {
        case CATEGORY_SAVE_REQUEST:
            return {
                loading: true,
            };
        case CATEGORY_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                category: action.payload,
            };
        case CATEGORY_ACTIVATION_SUCCESS:
            return {
                loading: false,
                success: true,
                category: action.payload,
            };
        case CATEGORY_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state; // return empty state which is set default
    }
}

function categoryDeleteReducer(state = { data: {} }, action) {
    // state = { products: [] } means default value of state is product of empty object
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST: // if sending request to server, show loading
            return {
                loading: true,
            };
        case CATEGORY_DELETE_SUCCESS: // if data is gotten from the server set data in products
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case CATEGORY_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state; // return empty state which is set default
    }
}


export { categoryListReducer, categorySaveReducer, categoryDeleteReducer };