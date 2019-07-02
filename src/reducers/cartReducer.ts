import {
  CART_ADD,
  CART_REMOVE,
  CART_SAVE,
  CART_SELECT
} from "../constants/actionType"

const STATE = {
  cart: []
}

/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export default function cart(state = STATE, action) {
  switch (action.type) {
    case CART_SELECT:
      return {
        ...state,
        cart: action.cart
      }
    case CART_SAVE:
      return {
        ...state,
        cart: action.cart
      }
    case CART_ADD:
      let cartTemp = state.cart
      cartTemp.unshift(action.cartItem)
      return {
        ...state,
        cart: cartTemp
      }
    case CART_REMOVE:
      return {
        ...state,
        cart: action.cart
      }
    default:
      return state
  }
}
