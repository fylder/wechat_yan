import { Image, Text, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { Album } from "../../store/model/data.d"
import "./album.scss"

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
  type: string
  title: string
  datas: Album[]
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
    navigationBarTitleText: "fylder' album"
  }
  constructor(props, context) {
    super(props, context)
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    const type = this.$router.params.type
    this.setState({
      type,
      title: "fylder"
    })
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/album",
      method: "GET",
      mode: "cors"
    }).then(res => {
      console.log("data", res.data)
      this.setState({
        datas: res.data
      })
    })
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  imageError = index => {
    const defaultImg =
      "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg"
    const data = this.state.datas
    data[index].cover = defaultImg
    this.setState({ datas: data })
  }

  handleItemClick = (id: number, title: string, subject: string) => {
    Taro.navigateTo({
      url: `/pages/comic/comic?id=${id}&title=${title}&subject=${subject}`
    })
  }
  render() {
    return (
      <View>
        <Image
          className="index-img"
          src="http://spider.ws.126.net/6b1df938dab6a363b5a475c4e9e21345.jpeg"
          onError={this.imageError.bind(this, 1)}
          mode="aspectFill"
        />
        <View className="index">
          <View className="info-card">
            <View className="at-row at-row__align--center">
              <View className="info-index" />
              <View className="at-col">
                <Text>{this.state.title}</Text>
              </View>
            </View>
          </View>
          <View className="at-row at-row__justify--center">
            <View className="at-col at-col-11">
              <View className="at-row at-row--wrap">
                {this.state.datas.map((item: Album, index: number) => {
                  return (
                    <View className="at-col at-col-6" key={item.id}>
                      <View
                        className="album-lay"
                        onClick={this.handleItemClick.bind(
                          this,
                          item.id,
                          item.name,
                          item.subject
                        )}
                      >
                        <View className="album-card">
                          <Image
                            className="album-img"
                            src={item.cover}
                            onError={this.imageError.bind(this, index)}
                            mode="aspectFill"
                          />
                          <View className="album-title">{item.name}</View>
                        </View>
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Info as ComponentClass<PageOwnProps, PageState>
