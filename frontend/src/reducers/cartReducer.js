import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM, PACKED_ITEMS } from "../constants/constants";


function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return { cartItems: [...state.cartItems, action.payload] }
    case CART_UPDATE_ITEM:
      return action.payload
        ? { cartItems: state.cartItems.map((item) => item._id == action.payload._id ? action.payload : item) }
        : { cartItems: [] }
    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter((item) => item._id !== action.payload && item) }
    default:
      return state;
  }
}

function packedReducer(state = { packedItems: [] }, action) {
  switch (action.type) {
    case PACKED_ITEMS:
      return { packedItems: action.payload }
    default:
      return state
  }
}

export { cartReducer, packedReducer };
