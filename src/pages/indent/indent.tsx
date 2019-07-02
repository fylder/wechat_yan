import { View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { AtDivider, AtIcon, AtList, AtListItem, AtMessage } from "taro-ui"
import "./indent.scss"

type PageStateProps = {
  user: {
    id: string
    username: string
    avatar: string
  }
  indent: {
    indentList: [
      {
        indent: [
          {
            id: string
            name: string
            count: number
            date: string
          }
        ]
      }
    ]
  }
}

type PageDispatchProps = {
  handleDetail: () => void
}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Indent {
  props: IProps
}

@connect(
  ({ user, indent }) => ({
    user,
    indent
  }),
  dispatch => ({
    handleDetail(item, index) {
      Taro.atMessage({
        message: "click:" + item.name,
        type: "info"
      })
    }
  })
)
class Indent extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "订单"
  }
  constructor(props, context) {
    super(props, context)
    this.state = { id: 0 }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let datas: Array<any>
    if (this.props.indent.indentList) {
      datas = this.props.indent.indentList
    } else {
      datas = []
    }
    return (
      <View>
        <AtMessage />
        <View className="at-article__h2">订单</View>
        <AtList>
          {datas.map((item, index) => {
            return (
              <AtListItem
                key={index}
                title="2019-06-13 15:25:33"
                note={item.name}
                arrow="right"
                thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
                onClick={this.props.handleDetail.bind(this, item, index)}
              />
            )
          })}
          <AtDivider>
            <AtIcon value="check-circle" />
          </AtDivider>
          <AtListItem
            title="2019-06-13 15:25:33"
            note="树莓味"
            arrow="right"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
          <AtListItem
            title="2019-06-13 15:25:33"
            note="黑森林草莓味"
            arrow="right"
            thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
          />
          <AtListItem
            title="2019-06-13 15:25:33"
            note="芝士蛋糕"
            extraText="详细信息"
            arrow="right"
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
          />
        </AtList>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Indent as ComponentClass<PageOwnProps, PageState>
