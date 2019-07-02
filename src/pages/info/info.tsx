import { Text, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { AtAvatar, AtButton } from "taro-ui"
import "./info.scss"

type PageStateProps = {
  user: {
    id: string
    username: string
    avatar: string
  }
}

type PageDispatchProps = {
  handleInfo: () => void
  handleClickItem: (type: string) => void
}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Info {
  props: IProps
}

@connect(
  ({ user }) => ({
    user
  }),
  dispatch => ({
    handleInfo() {
      Taro.navigateTo({
        url: "/pages/about/about"
      })
    },
    handleClickItem(type: string) {
      Taro.navigateTo({
        url: "/pages/album/album?type=" + type
      })
    }
  })
)
class Info extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "fylder"
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
    const albumSrc =
      "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg"

    return (
      <View className="index">
        <View className="info-card">
          <View className="at-row">
            <View className="at-col at-col-1 at-col--auto">
              <AtAvatar circle size="large" image={albumSrc} />
            </View>
            <View className="at-col">
              <View className="info-lay">
                <View className="at-article__h3">
                  {this.props.user.username}
                </View>
                <View className="at-article__p">看尽繁花似锦云卷云舒，</View>
                <View className="at-article__p info-lay-description">
                  踏遍天涯海角山川万里
                </View>
              </View>
            </View>
          </View>
        </View>
        <AtButton
          className="btn info-btn"
          // type="primary"
          onClick={this.props.handleInfo.bind(this)}
        >
          个人信息
        </AtButton>
        <AtButton
          className="btn"
          type="primary"
          onClick={this.props.handleClickItem.bind(this, "photos")}
        >
          游历
        </AtButton>
        <AtButton
          className="btn"
          type="primary"
          onClick={this.props.handleClickItem.bind(this, "cosplays")}
        >
          漫展
        </AtButton>
        <AtButton
          className="btn"
          type="primary"
          onClick={this.props.handleClickItem.bind(this, "flowers")}
        >
          花草
        </AtButton>
        <AtButton
          className="btn"
          type="primary"
          onClick={this.props.handleClickItem.bind(this, "cyclings")}
        >
          骑行
        </AtButton>
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

export default Info as ComponentClass<PageOwnProps, PageState>
