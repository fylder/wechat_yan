export class IndentItemModel {
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

export class IndentModel {
  indent: Array<IndentItemModel>
  name: string

  constructor() {
    this.indent = []
  }

  public getCount() {
    return this.indent.length
  }
  public add(item: IndentItemModel) {
    this.indent.push(item)
  }
}

export default class IndentListModel {
  indentList: Array<IndentModel>

  constructor() {
    this.indentList = []
  }

  public getCount() {
    return this.indentList.length
  }
}
