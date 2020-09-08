import cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM } from "../constants/constants";

const addToCart = (product) => async (dispatch, getState) => {
  dispatch({ type: CART_ADD_ITEM, payload: product });
  const { cart: { cartItems } } = getState();
  cookie.set("cartItems", JSON.stringify(cartItems))
};

const removeFromCart = (itemId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: itemId });
  const { cart: { cartItems } } = getState();
  cookie.set("cartItems", JSON.stringify(cartItems));
};

const updateCart = (item) => async (dispatch, getState) => {
  dispatch({ type: CART_UPDATE_ITEM, payload: item });
  const { cart: { cartItems } } = getState();
  cookie.set("cartItems", JSON.stringify(cartItems));
};

export { addToCart, removeFromCart, updateCart };
