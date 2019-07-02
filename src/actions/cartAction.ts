import {
  CART_ADD,
  CART_REMOVE,
  CART_SAVE,
  CART_SELECT
} from "../constants/actionType"
import CartListModel, { CartModel } from "./model/cartModel"

export const query = () => {
  return {
    type: CART_SELECT,
    cart: [
      {
        id: "1",
        name: "天气之子",
        count: 1,
        date: ""
      }
    ]
  }
}

export const save = (cartList: CartListModel) => {
  return {
    type: CART_SAVE,
    cart: cartList
  }
}

export const add = (cart: CartModel) => {
  return {
    type: CART_ADD,
    cartItem: cart
  }
}

export const remove = () => {
  return {
    type: CART_REMOVE,
    cart: []
  }
}
