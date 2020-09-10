import axios from "axios";
import {
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
    BRAND_LIST_REQUEST,
    BRAND_SAVE_FAIL,
    BRAND_SAVE_SUCCESS,
    BRAND_SAVE_REQUEST,
    BRAND_DELETE_REQUEST,
    BRAND_DELETE_SUCCESS,
    BRAND_DELETE_FAIL,
    BRAND_SAVE_CLEAR,
} from "../constants/constants";

const listBrand = () => async (dispatch) => {
    try {
        dispatch({ type: BRAND_LIST_REQUEST })
        const { data } = await axios.get("/api/brand");
        dispatch({ type: BRAND_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: BRAND_LIST_FAIL, payload: error.message })
    }
}

const saveBrand = (brand) => async (dispatch, getState) => {
    if (brand === 'clear') {
        dispatch({ type: BRAND_SAVE_CLEAR, payload: undefined })
    } else try {
        const { userSignin: { userInfo } } = getState()
        dispatch({ type: BRAND_SAVE_REQUEST, payload: brand });

        // update
        if (brand._id) {
            const { data } = await axios.put('/api/brand/' + brand._id, brand, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: BRAND_SAVE_SUCCESS, payload: data })
        }

        // new
        else {
            const { data } = await axios.post('/api/brand', brand, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: BRAND_SAVE_SUCCESS, payload: data })
        }

    } catch (error) {
        dispatch({ type: BRAND_SAVE_FAIL, payload: error.message })
    }
};

const deleteBrand = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BRAND_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/brand/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: BRAND_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BRAND_DELETE_FAIL, payload: error.message });
    }
};

export {
    listBrand, saveBrand, deleteBrand,
};