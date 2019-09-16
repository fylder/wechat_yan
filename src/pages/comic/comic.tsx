import { Block, Image, Text, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import ImgLoader from "../../components/img-loader/img-loader"
import { Picture } from "../../model/AlbumModel"
import linePng from "../../static/img/line.jpg"
import "./comic.scss"

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Info {
  props: IProps
  imgLoader: ImgLoader
  hasLoad: boolean
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: string
  title: string
  subject: string
  datas: Picture[]
  imgLoadList: Picture[]
}

/**
 * 照片详情
 */
@connect(
  ({}) => ({}),
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
    this.imgLoader = new ImgLoader(this)
    this.hasLoad = false
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    const id = this.$router.params.id
    const title = this.$router.params.title
    const subject = this.$router.params.subject
    if (subject) {
      Taro.setNavigationBarTitle({ title })
    }

    this.setState({
      id,
      title,
      subject
    })
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/picture/" + id,
      method: "GET",
      mode: "cors"
    }).then(res => {
      this.setState({
        datas: res.data
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

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  imageError = index => {
    const defaultImg =
      "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg"
    const data = this.state.datas
    data[index].photo = defaultImg
    this.setState({ datas: data })
  }

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
                <Text>{this.state.subject}</Text>
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
                        <View className="at-article__h3">{item.subject}</View>
                        <Image
                          className="at-article__img fade_in"
                          src={item.photo}
                          onError={this.imageError.bind(this, index)}
                          mode="widthFix"
                          lazyLoad={true}
                          onClick={this.handlePicture.bind(this, item.photo)}
                        />
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

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Info as ComponentClass<PageOwnProps, PageState>
