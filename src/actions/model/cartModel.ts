export class CartModel {
  id: string
  name: string
  count: number
  date: string

  constructor(id: string, name: string, count: number, date: string) {
    this.id = id
    this.name = name
    this.count = count
    this.date = date
  }
}

export default class CartListModel {
  cartList: Array<CartModel>

  constructor() {
    this.cartList = []
  }
  
  public add(cart: CartModel) {
    this.cartList.push(cart)
  }
}
