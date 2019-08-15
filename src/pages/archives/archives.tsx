import { Image, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import "./archives.scss"
import { ArchivesModel } from "./model"

type PageStateProps = {
  user: {
    id: string
  }
}

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

@connect(({ user }) => ({
  user
}))
class Archives extends Component<ComponentProps, ComponentState> {
  config: Config = {
    navigationBarTitleText: "archives"
  }
  constructor(props, context) {
    super(props, context)
    this.setState({
      archives: undefined
    })
  }

  componentWillMount() {
    this.getArticle()
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  getArticle = () => {
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/article",
      method: "GET"
    }).then(res => {
      this.setState({
        archives: res.data
      })
    })
  }

  itemClick = (item: ArchivesModel) => {
    Taro.navigateTo({
      url: "/pages/article/article"
    })
  }

  render() {
    return (
      <View>
        <View className="subject-lay">
          <View className="at-article__h3 subject-font">fylder</View>
        </View>
        <View className="item_lay">
          {this.state.archives.map((item: ArchivesModel) => {
            return (
              <View
                className="item_lay_container"
                key={item.theme}
                onClick={this.itemClick.bind(this, item)}
              >
                <View className="at-article__h3 item_lay_title">
                  {item.subject}
                </View>
                <Image
                  className="item_lay_img"
                  src={item.cover}
                  mode="aspectFill"
                />
                <View className="at-article__info item_lay_info">
                  {item.date}
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
