import axios from "axios";
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

const listReviews = () => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_LIST_REQUEST })
        const { data } = await axios.get("/api/review");
        dispatch({ type: REVIEW_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: REVIEW_LIST_FAIL, payload: error.message })
    }
}

const saveReview = (review) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: REVIEW_SAVE_REQUEST, payload: review });

        // update
        if (review._id) {
            const { data } = await axios.put('/api/review/' + review._id, review, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: REVIEW_SAVE_SUCCESS, payload: data })
        }

        // new
        else {
            const { data } = await axios.post('/api/review', review, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: REVIEW_SAVE_SUCCESS, payload: data })
        }

    } catch (error) {
        dispatch({ type: REVIEW_SAVE_FAIL, payload: error.message })
    }
};

const deleteReview = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REVIEW_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/review/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: REVIEW_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REVIEW_DELETE_FAIL, payload: error.message });
    }
};

const detailsReview = (_id) => async (dispatch) => {
    try {
        dispatch({ type: REVIEW_DETAILS_REQUEST, payload: _id });
        const { data } = await axios.get("/api/review/" + _id);
        dispatch({ type: REVIEW_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REVIEW_DETAILS_FAIL, payload: error.message });
    }
};

export {
    listReviews, saveReview, deleteReview, detailsReview
}