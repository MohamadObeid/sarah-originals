import axios from "axios";
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
    ATTENDANCE_DETAILS_FAIL,
    ATTENDANCE_SAVE_CLEAR
} from "../constants/constants";

const listAttendance = () => async (dispatch) => {
    try {
        dispatch({ type: ATTENDANCE_LIST_REQUEST })
        const { data } = await axios.get("/api/attendance");
        dispatch({ type: ATTENDANCE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ATTENDANCE_LIST_FAIL, payload: error.message })
    }
}

const saveAttendance = (attendance) => async (dispatch, getState) => {
    if (attendance === 'clear') {
        dispatch({ type: ATTENDANCE_SAVE_CLEAR, payload: undefined })
    } else try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: ATTENDANCE_SAVE_REQUEST, payload: attendance });

        // update
        if (attendance._id) {
            const { data } = await axios.put('/api/attendance/' + attendance._id, attendance, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: ATTENDANCE_SAVE_SUCCESS, payload: data })
        }

        // new
        else {
            const { data } = await axios.post('/api/attendance', attendance, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: ATTENDANCE_SAVE_SUCCESS, payload: data })
        }

    } catch (error) {
        dispatch({ type: ATTENDANCE_SAVE_FAIL, payload: error.message })
    }
};

const deleteAttendance = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ATTENDANCE_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/attendance/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ATTENDANCE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ATTENDANCE_DELETE_FAIL, payload: error.message });
    }
};

const detailsAttendance = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ATTENDANCE_DETAILS_REQUEST, payload: _id });
        const { data } = await axios.get("/api/attendance/" + _id);
        dispatch({ type: ATTENDANCE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ATTENDANCE_DETAILS_FAIL, payload: error.message });
    }
};

export {
    listAttendance, saveAttendance, deleteAttendance, detailsAttendance
}