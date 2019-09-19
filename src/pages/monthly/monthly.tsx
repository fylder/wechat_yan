import { Block, Image, Text, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import ImgLoader from "../../components/img-loader/img-loader"
import { Picture } from "../../model/AlbumModel"
import linePng from "../../static/img/line.jpg"
import "./monthly.scss"

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Monthly {
  props: IProps
  imgLoader: ImgLoader
  hasLoad: boolean
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: number
  title: string
  datas: Picture[]
  imgLoadList: Picture[]
}

@connect(
  ({}) => ({}),
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
    this.imgLoader = new ImgLoader(this)
    this.hasLoad = false
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
      const photos: Picture[] = resp.data
      this.setState({
        datas: photos
      })
    })
  }

  componentWillUpdate(props: any, state: any) {
    if (state.datas && state.datas.length > 0 && !this.hasLoad) {
      this.hasLoad = true
      state.datas.map((item: Picture) => {
        this.imgLoader.load(item.photo, (err, data) => {
          const datas = this.state.datas.map(item => {
            if (item.photo == data.src) {
              item.loaded = true
            }
            return item
          })
          this.setState({
            datas
          })
        })
      })
    }
  }

  // imageError = index => {
  //   const defaultImg =
  //     "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg"
  //   const data = this.state.album
  //   data[index].src = defaultImg
  //   this.setState({ album: data })
  // }

  handlePicture = (src: string) => {
    Taro.previewImage({
      urls: [src]
    })
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
          <Block>
            {this.state.datas.map((item: Picture, index) => {
              return (
                <View>
                  <View className="at-article__content" key={item.id}>
                    <Image
                      className="at-article__img"
                      src={tag}
                      mode="widthFix"
                    />
                    {item.loaded && (
                      <View className="at-article__section">
                        <Image
                          className="at-article__img"
                          src={item.photo}
                          // onError={this.imageError.bind(this, index)}
                          mode="widthFix"
                          lazyLoad={true}
                          onClick={this.handlePicture.bind(this, item.photo)}
                        />
                        <View className="tag">{item.createdAt}</View>
                        <View className="at-article__h3 title">
                          {item.subject}
                        </View>
                        <View className="at-article__p describe">
                          {item.describe}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )
            })}
          </Block>
          {/*  引入图片预加载组件  */}
          <Block>
            {this.state.datas.map((item: Picture, index) => {
              return (
                <Image
                  key={index}
                  src={item.photo}
                  data-src={item.photo}
                  onLoad={this.imgLoader._imgOnLoad.bind(this.imgLoader)}
                  onError={this.imgLoader._imgOnLoadError.bind(this.imgLoader)}
                  style="width:0;height:0;opacity:0"
                />
              )
            })}
          </Block>
        </View>
      </View>
    )
  }
}

export default Monthly as ComponentClass<PageOwnProps, PageState>
