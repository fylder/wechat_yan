import { Image, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import "./archives.scss"
import { ArchivesModel } from "./model"

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Archives {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  archives: any | undefined
}

/**
 * 随笔
 */
@connect(({}) => ({}))
class Archives extends Component<ComponentProps, ComponentState> {
  config: Config = {
    navigationBarTitleText: "随笔"
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      archives: []
    }
  }

  componentWillMount() {
    this.getArticle()
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  getArticle = () => {
    Taro.showNavigationBarLoading()
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/article",
      method: "GET"
    }).then(res => {
      Taro.hideNavigationBarLoading()
      this.setState({
        archives: res.data
      })
    })
  }

  itemClick = (item: ArchivesModel) => {
    Taro.navigateTo({
      url: `/pages/article/article?id=${item.id}`
    })
  }

  //2019-07-07T19:02:37.000Z
  getDate = (timeStr: string): string => {
    var date = new Date(timeStr)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  render() {
    return (
      <View>
        <View className="header_lay">
          <Image
            className="header_img"
            src="http://b275.photo.store.qq.com/psb?/V13MxeJc2qpf92/A92lmM5FnNd6k.tL2pCLVw1EEVYJz*2BR3LUsf3DHo8!/b/dIvt8qNCBgAA&bo=IAMWAkAGKwQBCHE!&rf=viewer_4"
            mode="aspectFill"
          />
          <View className="subject-lay">
            <View className="at-article__h3 subject-font">fylder' 随笔</View>
          </View>
        </View>

        <View className="item_lay">
          {this.state.archives.map((item: ArchivesModel) => {
            return (
              <View
                className="item_lay_container"
                key={item.id}
                onClick={this.itemClick.bind(this, item)}
              >
                <View className="at-article__h3 item_lay_title">
                  {item.subject}
                </View>
                <Image
                  className="item_lay_img"
                  src={item.cover}
                  mode="aspectFill"
                  lazyLoad={true}
                />
                <View className="at-article__info item_lay_info font-content-small">
                  {this.getDate(item.createdAt)}
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default Archives as ComponentClass<PageOwnProps, PageState>
