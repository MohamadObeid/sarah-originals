import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM, PACKED_ITEMS } from "../constants/constants";


function cartReducer(state = { cartItems: [] }, action) {

  switch (action.type) {

    case 'CLEAR_MESSAGE': return { cartItems: action.payload, message: false }

    case CART_ADD_ITEM:
      if (action.payload.isArray) return { cartItems: action.payload.items }
      else {
        const { message, ...newItem } = action.payload
        return { cartItems: [...state.cartItems, newItem], message }
      }

    case CART_UPDATE_ITEM: {
      const { message, ...newItem } = action.payload
      return { cartItems: state.cartItems.map(item => item._id == newItem._id ? newItem : item), message }
    }

    case CART_REMOVE_ITEM: {
      const { message, ...newItem } = action.payload
      return { cartItems: state.cartItems.filter(item => item._id !== newItem._id), message }
    }

    case 'CLEAR_CART':
      return { cartItems: [] }

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
