import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_ACTIVATION_SUCCESS,
  PRODUCTS_DETAILS_SUCCESS
} from "../constants/constants";

const listProducts = (idList) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST, payload: idList });
    const { data } = await axios.get("/api/products")
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product })
    const { userSignin: { userInfo } } = getState()
    if (product.activation) {
      const { data } = await axios.put('/api/products/' + product._id, { ...product, edited_by: userInfo.name, last_edition: Date.now }, {
        headers: { 'Authorization': 'Bearer ' + userInfo.token }
      });
      dispatch({ type: PRODUCT_ACTIVATION_SUCCESS, payload: data })
    } else if (product._id) {
      const { data } = await axios.put('/api/products/' + product._id, { ...product, edited_by: userInfo.name, last_edition: Date.now }, {
        headers: { 'Authorization': 'Bearer ' + userInfo.token }
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data })
    } else {
      const { data } = await axios.post('/api/products', { ...product, created_by: userInfo.name, last_edition: Date.now }, {
        headers: { 'Authorization': 'Bearer ' + userInfo.token }
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message })
  }
};

const deleteProduct = (_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    const { data } = await axios.delete("/api/products/" + _id, {
      headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
  }
};

const detailsProduct = (searchDetails) => async (dispatch) => {
  if (Array.isArray(searchDetails)) {
    const { data } = await axios.post("/api/products/getproducts", searchDetails)
    dispatch({ type: PRODUCTS_DETAILS_SUCCESS, payload: data })
  }
  else if (searchDetails.searchKeyword) {
    const { data } = await axios.post("/api/products/searchKeyword", searchDetails)
    dispatch({ type: PRODUCTS_DETAILS_SUCCESS, payload: data })
  } else try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: searchDetails })
    const { data } = await axios.get("/api/products/" + searchDetails)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message })
  }
};


export {
  listProducts, detailsProduct, saveProduct, deleteProduct
};
