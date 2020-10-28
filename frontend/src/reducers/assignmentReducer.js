import {
    ASSIGNMENT_LIST_SUCCESS,
    ASSIGNMENT_LIST_FAIL,
    ASSIGNMENT_LIST_REQUEST,
    ASSIGNMENT_SAVE_FAIL,
    ASSIGNMENT_SAVE_SUCCESS,
    ASSIGNMENT_SAVE_REQUEST,
    ASSIGNMENT_DELETE_REQUEST,
    ASSIGNMENT_DELETE_SUCCESS,
    ASSIGNMENT_DELETE_FAIL,
    ASSIGNMENT_DETAILS_REQUEST,
    ASSIGNMENT_DETAILS_SUCCESS,
    ASSIGNMENT_DETAILS_FAIL
} from "../constants/constants";

function assignmentListReducer(state = { assignments: [] }, action) {
    switch (action.type) {
        case ASSIGNMENT_LIST_REQUEST:
            return {
                loading: true,
                assignments: [],
            };
        case ASSIGNMENT_LIST_SUCCESS:
            return {
                loading: false,
                assignments: action.payload,
            };
        case ASSIGNMENT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function assignmentSaveReducer(state = { assignment: {} }, action) {
    switch (action.type) {
        case ASSIGNMENT_SAVE_REQUEST:
            return {
                loading: true,
            };
        case ASSIGNMENT_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                assignment: action.payload,
            };
        case ASSIGNMENT_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function assignmentDeleteReducer(state = { data: {} }, action) {
    switch (action.type) {
        case ASSIGNMENT_DELETE_REQUEST:
            return {
                loading: true,
            };
        case ASSIGNMENT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case ASSIGNMENT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function assignmentDetailsReducer(state = { assignment: [] }, action) {
    switch (action.type) {
        case ASSIGNMENT_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case ASSIGNMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                assignment: action.payload,
            };
        case ASSIGNMENT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    assignmentListReducer,
    assignmentSaveReducer,
    assignmentDeleteReducer,
    assignmentDetailsReducer
};