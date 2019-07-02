import { Image, Text, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import linePng from "../../static/img/line.jpg"
import "./comic.scss"

type PageStateProps = {
  user: {
    id: string
    username: string
    avatar: string
  }
}

type PageDispatchProps = {}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Info {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: number
  title: string
  datas
}

@connect(
  ({ user }) => ({
    user
  }),
  dispatch => ({})
)
class Info extends Component<ComponentProps, ComponentState> {
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
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    const id = this.$router.params.id
    const title = this.$router.params.title

    this.setState({
      id,
      title
    })
    Taro.request({
      url: "https://wechat.fylder.me:8022/api/picture/" + id,
      method: "GET"
    }).then(res =>
      this.setState({
        datas: res.data
      })
    )
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  imageError = index => {
    const defaultImg =
      "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg"
    const data = this.state.datas
    data[index].src = defaultImg
    this.setState({ datas: data })
  }

  render() {
    let tag = linePng

    return (
      <View>
        <View className="index">
          <View className="info-card">
            <View className="at-row at-row__align--center">
              <View className="info-index" />
              <View className="at-col">
                <Text>{this.state.title}</Text>
              </View>
            </View>
          </View>
          {this.state.datas.map((item, index) => {
            return (
              <View className="at-article__content" key={item.id}>
                <Image className="at-article__img" src={tag} mode="widthFix" />
                <View className="at-article__section">
                  <View className="at-article__h3">{item.title}</View>
                  <Image
                    className="at-article__img"
                    src={item.src}
                    onError={this.imageError.bind(this, index)}
                    mode="widthFix"
                  />
                </View>
              </View>
            )
          })}
        </View>
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
