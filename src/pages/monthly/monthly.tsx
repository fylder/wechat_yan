import { Image, Text, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import linePng from "../../static/img/line.jpg"
import datas from "./data"
import "./monthly.scss"

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
    const title = "今月份的花束"

    this.setState({
      title,
      datas: datas
    })
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
                  <Image
                    className="at-article__img"
                    src={item.image}
                    onError={this.imageError.bind(this, index)}
                    mode="widthFix"
                  />
                  <View className="tag">{item.month}</View>
                  <View className="at-article__h3 title">{item.title}</View>
                  <View className="at-article__p describe">
                    {item.describe}
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default Info as ComponentClass<PageOwnProps, PageState>
