import { Image, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { AtButton, AtTag, AtToast } from "taro-ui"
import { add } from "../../actions/cartAction"
import { detail, load } from "../../actions/detailAction"
import { CartModel } from "../../actions/model/cartModel"
import anime_data from "./data"
import "./detail.scss"

type PageStateProps = {
  detail: {
    id: number
    info: string
  }
  user: {
    username: string
  }
  load: {
    isLoading: boolean
  }
  cart: {
    cart: [
      {
        id: string
        name: string
        count: number
        date: string
      }
    ]
  }
}

type PageDispatchProps = {
  handlerDetail: () => void
}

type PageOwnProps = {
  // dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Detail {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: number
}

@connect(
  ({ detail, user, load }) => ({
    detail,
    user,
    load
    // cart
  }),
  dispatch => ({
    handlerDetail(id, name) {
      dispatch(load(true))
      const cart = new CartModel(id, name, 1, "")
      dispatch(add(cart))
      setTimeout(() => {
        dispatch(load(false))
      }, 2000)
      dispatch(detail(1, "fylder"))
    }
  })
)
class Detail extends Component<ComponentProps, ComponentState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "detail"
  }

  constructor(props, context) {
    super(props, context)
    this.state = { id: 0 }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    // console.log(this.$router.params) // 输出 { id: 2, type: 'test' }
    const id = this.$router.params.id
    this.setState({
      id: id
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const data = anime_data[this.state.id]
    return (
      <View className="index">
        <View className="detail-content">
          <View className="at-article ">
            <View className="at-article__h1">{data.title}</View>
            <View className="at-article__info">{data.time}</View>
            <View className="at-article__info">
              {data.tags.map((item, index) => {
                return (
                  <AtTag className="tag-item" size="small" key={index}>
                    {item}
                  </AtTag>
                )
              })}
            </View>
            <View className="at-article__content">
              <View className="at-article__section">
                <Image
                  className="at-article__img"
                  src={data.image}
                  mode="widthFix"
                />
                <View className="at-article__h2">{data.describe_title}</View>
                <View className="at-article__p">{data.describe} </View>
                <View className="at-article__p">
                  {this.props.user.username}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="detail-footer">
          <AtButton
            type="primary"
            full
            onClick={this.props.handlerDetail.bind(
              this,
              this.state.id,
              data.title
            )}
          >
            get√
          </AtButton>
        </View>
        <AtToast
          isOpened={this.props.load.isLoading}
          status="loading"
          text="正在提交"
          icon="{icon}"
        />
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

export default Detail as ComponentClass<PageOwnProps, PageState>
