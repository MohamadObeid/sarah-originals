import axios from "axios";
import {
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_SAVE_FAIL,
    CATEGORY_SAVE_SUCCESS,
    CATEGORY_ACTIVATION_SUCCESS,
    CATEGORY_SAVE_REQUEST,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
} from "../constants/constants";

const listCategory = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })
        const { data } = await axios.get("/api/category");
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message })
    }
}

const saveCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
        const { userSignin: { userInfo } } = getState();

        if (category.activation) {
            const { data } = await axios.put('/api/category/' + category._id, { ...category, edited_by: userInfo.name, last_edition: Date.now }, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: CATEGORY_ACTIVATION_SUCCESS, payload: data })
        } else {

            if (category._id) {
                const { data } = await axios.put('/api/category/' + category._id, { ...category, edited_by: userInfo.name, last_edition: Date.now }, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                });
                dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data })
            }

            // new
            else {
                const { data } = await axios.post('/api/category', { ...category, created_by: userInfo.name, last_edition: Date.now }, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                });
                dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data })
            }
        }

    } catch (error) {
        dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message })
    }
};

const deleteCategory = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_DELETE_REQUEST, payload: _id });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/category/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
    }
};

export { listCategory, saveCategory, deleteCategory };