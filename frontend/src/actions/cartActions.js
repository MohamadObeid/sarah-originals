import cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM, PACKED_ITEMS } from "../constants/constants";

const addToCart = (product) => (dispatch, getState) => {
  if (product.length > 0)
    dispatch({ type: CART_ADD_ITEM, payload: { items: product, isArray: true } })

  else dispatch({ type: CART_ADD_ITEM, payload: product })
  const { cart: { cartItems } } = getState()
  cookie.set("cartItems", JSON.stringify(cartItems))
}

const packItems = (items) => (dispatch) => {
  dispatch({ type: PACKED_ITEMS, payload: items })
  localStorage.setItem('packedItems', JSON.stringify(items))
}

const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: item });
  const { cart: { cartItems } } = getState();
  cookie.set("cartItems", JSON.stringify(cartItems));
};

const updateCart = (item) => (dispatch, getState) => {
  if (item === 'clear') {
    dispatch({ type: 'CLEAR_CART' })
    cookie.remove("cartItems")
  } else {
    dispatch({ type: CART_UPDATE_ITEM, payload: item })
    const { cart: { cartItems } } = getState()
    cookie.set("cartItems", JSON.stringify(cartItems))
  }
};

export { addToCart, removeFromCart, updateCart, packItems };
