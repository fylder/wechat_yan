import { Image, Text, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { Picture } from "../../model/AlbumModel"
import linePng from "../../static/img/line.jpg"
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

interface Monthly {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: number
  title: string
  album: Picture[]
}

@connect(
  ({ user }) => ({
    user
  }),
  dispatch => ({})
)
class Monthly extends Component<ComponentProps, ComponentState> {
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
    this.getMonthlyAlbum()

    this.setState({
      title
    })
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getMonthlyAlbum = () => {
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/picture/type",
      method: "POST",
      data: {
        type: "flower"
      }
    }).then(resp => {
      const albums: Picture[] = resp.data
      this.setState({
        album: albums
      })
    })
  }

  // imageError = index => {
  //   const defaultImg =
  //     "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg"
  //   const data = this.state.album
  //   data[index].src = defaultImg
  //   this.setState({ album: data })
  // }

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
          {this.state.album.map((item: Picture, index) => {
            return (
              <View className="at-article__content" key={item.id}>
                <Image className="at-article__img" src={tag} mode="widthFix" />
                <View className="at-article__section">
                  <Image
                    className="at-article__img"
                    src={item.photo}
                    // onError={this.imageError.bind(this, index)}
                    mode="widthFix"
                    lazyLoad={true}
                  />
                  <View className="tag">{item.createdAt}</View>
                  <View className="at-article__h3 title">{item.subject}</View>
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

export default Monthly as ComponentClass<PageOwnProps, PageState>
