import {
    EMPLOYEE_LIST_SUCCESS,
    EMPLOYEE_LIST_FAIL,
    EMPLOYEE_LIST_REQUEST,
    EMPLOYEE_SAVE_FAIL,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_SAVE_REQUEST,
    EMPLOYEE_DELETE_REQUEST,
    EMPLOYEE_DELETE_SUCCESS,
    EMPLOYEE_DELETE_FAIL,
    EMPLOYEE_DETAILS_REQUEST,
    EMPLOYEE_DETAILS_SUCCESS,
    EMPLOYEE_DETAILS_FAIL,
    EMPLOYEE_SAVE_CLEAR,
    CLEAR_EMPLOYEE_DELETE
} from "../constants/constants";

function employeeListReducer(state = { employees: undefined }, action) {
    switch (action.type) {
        case EMPLOYEE_LIST_REQUEST:
            return {
                loading: true
            };
        case EMPLOYEE_LIST_SUCCESS:
            return {
                loading: false,
                employees: action.payload,
            };
        case EMPLOYEE_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function employeeSaveReducer(state = { employee: {} }, action) {
    switch (action.type) {
        case EMPLOYEE_SAVE_REQUEST:
            return {
                loading: true,
            };
        case EMPLOYEE_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                employee: action.payload,
            };
        case EMPLOYEE_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case EMPLOYEE_SAVE_CLEAR:
            return {
                success: false
            }
        default:
            return state;
    }
}

function employeeDeleteReducer(state = { data: {} }, action) {
    switch (action.type) {
        case EMPLOYEE_DELETE_REQUEST:
            return {
                loading: true,
            };
        case EMPLOYEE_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case EMPLOYEE_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_EMPLOYEE_DELETE:
            return { success: false }
        default:
            return state;
    }
}

function employeeDetailsReducer(state = { employee: undefined }, action) {
    switch (action.type) {
        case EMPLOYEE_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case EMPLOYEE_DETAILS_SUCCESS:
            return {
                loading: false,
                employee: action.payload[0],
            };
        case EMPLOYEE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    employeeListReducer,
    employeeSaveReducer,
    employeeDeleteReducer,
    employeeDetailsReducer
};