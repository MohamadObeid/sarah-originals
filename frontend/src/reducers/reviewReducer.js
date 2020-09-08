import {
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,
    REVIEW_LIST_REQUEST,
    REVIEW_SAVE_FAIL,
    REVIEW_SAVE_SUCCESS,
    REVIEW_SAVE_REQUEST,
    REVIEW_DELETE_REQUEST,
    REVIEW_DELETE_SUCCESS,
    REVIEW_DELETE_FAIL,
    REVIEW_DETAILS_REQUEST,
    REVIEW_DETAILS_SUCCESS,
    REVIEW_DETAILS_FAIL
} from "../constants/constants";

function reviewListReducer(state = { review: [] }, action) {
    switch (action.type) {
        case REVIEW_LIST_REQUEST:
            return {
                loading: true,
                review: [],
            };
        case REVIEW_LIST_SUCCESS:
            return {
                loading: false,
                review: action.payload,
            };
        case REVIEW_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function reviewSaveReducer(state = { review: {} }, action) {
    switch (action.type) {
        case REVIEW_SAVE_REQUEST:
            return {
                loading: true,
            };
        case REVIEW_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                review: action.payload,
            };
        case REVIEW_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function reviewDeleteReducer(state = { data: {} }, action) {
    switch (action.type) {
        case REVIEW_DELETE_REQUEST:
            return {
                loading: true,
            };
        case REVIEW_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case REVIEW_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function reviewDetailsReducer(state = { review: [] }, action) {
    switch (action.type) {
        case REVIEW_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case REVIEW_DETAILS_SUCCESS:
            return {
                loading: false,
                review: action.payload,
            };
        case REVIEW_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    reviewListReducer,
    reviewSaveReducer,
    reviewDeleteReducer,
    reviewDetailsReducer
};