import axios from "axios";
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
    EMPLOYEE_SAVE_CLEAR, CLEAR_EMPLOYEE_DELETE
} from "../constants/constants"

const listEmployees = () => async (dispatch) => {
    try {
        dispatch({ type: EMPLOYEE_LIST_REQUEST })
        const { data } = await axios.get("/api/employee");
        dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: EMPLOYEE_LIST_FAIL, payload: error.message })
    }
}

const saveEmployee = (employee) => async (dispatch, getState) => {
    if (employee === 'clear') {
        dispatch({ type: EMPLOYEE_SAVE_CLEAR, payload: undefined })
    } else try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: EMPLOYEE_SAVE_REQUEST, payload: employee });

        // update
        if (employee._id) {
            const { data } = await axios.put('/api/Employee/' + employee._id, employee, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: EMPLOYEE_SAVE_SUCCESS, payload: data })
        }

        // new
        else {
            const { data } = await axios.post('/api/employee', employee, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: EMPLOYEE_SAVE_SUCCESS, payload: data })
        }

    } catch (error) {
        dispatch({ type: EMPLOYEE_SAVE_FAIL, payload: error.message })
    }
};

const deleteEmployee = (_id) => async (dispatch, getState) => {
    if (_id === 'clear') {
        dispatch({ type: CLEAR_EMPLOYEE_DELETE })
    } else try {
        dispatch({ type: EMPLOYEE_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/employee/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: EMPLOYEE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: EMPLOYEE_DELETE_FAIL, payload: error.message });
    }
};

const detailsEmployee = (_id) => async (dispatch) => {
    try {
        dispatch({ type: EMPLOYEE_DETAILS_REQUEST, payload: _id });
        const { data } = await axios.get("/api/employee/" + _id);
        dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: EMPLOYEE_DETAILS_FAIL, payload: error.message });
    }
};

export {
    listEmployees, saveEmployee, deleteEmployee, detailsEmployee
}