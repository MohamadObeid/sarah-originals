import axios from "axios";
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

const listAssignment = () => async (dispatch) => {
    try {
        dispatch({ type: ASSIGNMENT_LIST_REQUEST })
        const { data } = await axios.get("/api/assignment");
        dispatch({ type: ASSIGNMENT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ASSIGNMENT_LIST_FAIL, payload: error.message })
    }
}

const saveAssignment = (assignment) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: ASSIGNMENT_SAVE_REQUEST, payload: assignment });

        // update
        if (assignment._id) {
            const { data } = await axios.put('/api/assignment/' + assignment._id, assignment, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: ASSIGNMENT_SAVE_SUCCESS, payload: data })
        }

        // new
        else {
            const { data } = await axios.post('/api/assignment', assignment, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: ASSIGNMENT_SAVE_SUCCESS, payload: data })
        }

    } catch (error) {
        dispatch({ type: ASSIGNMENT_SAVE_FAIL, payload: error.message })
    }
};

const deleteAssignment = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ASSIGNMENT_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/assignment/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ASSIGNMENT_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ASSIGNMENT_DELETE_FAIL, payload: error.message });
    }
};

const detailsassignment = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ASSIGNMENT_DETAILS_REQUEST, payload: _id });
        const { data } = await axios.get("/api/assignment/" + _id);
        dispatch({ type: ASSIGNMENT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ASSIGNMENT_DETAILS_FAIL, payload: error.message });
    }
};

export {
    listAssignment, saveAssignment, deleteAssignment, detailsassignment
}