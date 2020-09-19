import {
    ATTENDANCE_LIST_SUCCESS,
    ATTENDANCE_LIST_FAIL,
    ATTENDANCE_LIST_REQUEST,
    ATTENDANCE_SAVE_FAIL,
    ATTENDANCE_SAVE_SUCCESS,
    ATTENDANCE_SAVE_REQUEST,
    ATTENDANCE_DELETE_REQUEST,
    ATTENDANCE_DELETE_SUCCESS,
    ATTENDANCE_DELETE_FAIL,
    ATTENDANCE_DETAILS_REQUEST,
    ATTENDANCE_DETAILS_SUCCESS,
    ATTENDANCE_DETAILS_FAIL, ATTENDANCE_SAVE_CLEAR
} from "../constants/constants";

function attendanceListReducer(state = { attendance: [] }, action) {
    switch (action.type) {
        case ATTENDANCE_LIST_REQUEST:
            return {
                loading: true,
                attendance: [],
            };
        case ATTENDANCE_LIST_SUCCESS:
            return {
                loading: false,
                attendance: action.payload,
            };
        case ATTENDANCE_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function attendanceSaveReducer(state = { attendance: {} }, action) {
    switch (action.type) {
        case ATTENDANCE_SAVE_REQUEST:
            return {
                loading: true,
            };
        case ATTENDANCE_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                attendance: action.payload,
            };
        case ATTENDANCE_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ATTENDANCE_SAVE_CLEAR:
            return {
                success: false
            }
        default:
            return state;
    }
}

function attendanceDeleteReducer(state = { data: {} }, action) {
    switch (action.type) {
        case ATTENDANCE_DELETE_REQUEST:
            return {
                loading: true,
            };
        case ATTENDANCE_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case ATTENDANCE_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function attendanceDetailsReducer(state = { attendance: {} }, action) {
    switch (action.type) {
        case ATTENDANCE_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case ATTENDANCE_DETAILS_SUCCESS:
            return {
                loading: false,
                attendance: action.payload,
            };
        case ATTENDANCE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    attendanceListReducer,
    attendanceSaveReducer,
    attendanceDeleteReducer,
    attendanceDetailsReducer
};