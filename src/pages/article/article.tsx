import { View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import "./article.scss"

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

interface Article {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  article: any
}

@connect(({ user }) => ({
  user
}))
class Article extends Component<ComponentProps, ComponentState> {
  config: Config = {
    navigationBarTitleText: "fylder",
    usingComponents: {
      wemark: "../../components/wemark/wemark"
    }
  }
  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    this.getArticle()
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  
  getArticle = () => {
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/article/1",
      method: "GET"
    }).then(res => {
      console.log("article data", res.data)
      this.setState({
        article: res.data
      })
    })
  }

  render() {
    return (
      <View className="mark-lay">
        <wemark md={this.state.article.content} />
      </View>
    )
  }
}

export default Article as ComponentClass<PageOwnProps, PageState>
