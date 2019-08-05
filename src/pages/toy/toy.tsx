import { Image, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import linePng from "../../static/img/line.jpg"
import { type } from "./data"
import "./toy.scss"

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

interface Toy {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: number
  title: string
  datas: any
}

@connect(
  ({ user }) => ({
    user
  }),
  dispatch => ({})
)
class Toy extends Component<ComponentProps, ComponentState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "小玩意"
  }
  constructor(props, context) {
    super(props, context)
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    const title = "小玩意"

    this.setState({
      title
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
          <View className="lay">
            <View className="lay_bg">
              <Image
                className="lay_img"
                src="http://img5.mtime.cn/pi/2019/05/29/083826.86010876_1000X1000.jpg"
                mode="aspectFill"
              />
            </View>
            <View className="lay_fg">
              <View className="at-row at-row__align--center lay_search">
                <View className="at-row at-row__justify--center">
                  <View className="at-col at-col-10">
                    <View className="at-row at-row__justify--center toy-item-lay">
                      <View className="at-col-6 toy-item-left">
                        <View className="toy-type">
                          <View className="toy-card">fylder</View>
                        </View>
                      </View>
                      <View className="at-col-6 toy-item-right">
                        <View className="at-col-12 toy-item-top">
                          <View className="toy-type">
                            <View className="toy-card">模型</View>
                          </View>
                        </View>
                        <View className="at-col-12 toy-item-bottom">
                          <View className="toy-type">
                            <View className="toy-card">动漫</View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="item_lay">
            {type.map((item, index) => {
              return (
                <View className="item_lay_container" key={item.id}>
                  <View className="at-article__h3 item_lay_title">
                    Onmyoji主题店
                  </View>
                  <Image
                    className="item_lay_img"
                    src="http://img5.mtime.cn/pi/2019/05/29/083826.86010876_1000X1000.jpg"
                    mode="aspectFill"
                  />
                  <View className="at-article__info item_lay_info">
                    2019-08-04
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default Toy as ComponentClass<PageOwnProps, PageState>
