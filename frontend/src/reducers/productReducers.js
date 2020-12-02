// This function defines what to return according to different action types
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

function productListReducer(state = { products: [] }, action) {
  // state = { products: [] } means default value of state is products of empty array
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: // if sending request to server, show loading
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS: // if data is gotten from the server set data in products
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state; // return empty state which is set default
  }
}

function productDetailsReducer(state = { product: [] }, action) {
  // state = { products: [] } means default value of state is product of empty object
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: // if sending request to server, show loading
      return {
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCTS_DETAILS_SUCCESS:
      return {
        product: action.payload,
      }
    default:
      return state;
  }
}

function productSaveReducer(state = { product: {} }, action) {

  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_ACTIVATION_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state; // return empty state which is set default
  }
}

function productDeleteReducer(state = { data: {} }, action) {
  // state = { products: [] } means default value of state is product of empty object
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST: // if sending request to server, show loading
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS: // if data is gotten from the server set data in products
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state; // return empty state which is set default
  }
}

function Actions(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_ACTIONS':
      return ({ ...action.payload, ...state }) // ex. dispatch({type, payload: {visible: true}})

    case 'REMOVE_FROM_ACTIONS':
      { const { [action.payload]: _, ...updatedState } = state; return (updatedState) }

    default: return state
  }
}

export {
  productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, Actions
};
