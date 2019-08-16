import { Image, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { ArchivesModel } from "../archives/model"
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
  id: number
  article: ArchivesModel | undefined
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
    const id = this.$router.params.id
    this.state = {
      id,
      article: undefined
    }
  }

  componentWillMount() {
    this.getArticle()
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  getArticle = () => {
    Taro.request({
      url: `https://wechat.fylder.me:8022/wechat/article/${this.state.id}`,
      method: "GET"
    }).then(res => {
      this.setState({
        article: res.data
      })
    })
  }

  render() {
    return (
      <View>
        <Image
          className="header_img"
          src={this.state.article === undefined ? "" : this.state.article.cover}
          mode="aspectFill"
        />
        <View className="mark-lay">
          <wemark
            md={
              this.state.article === undefined ? "" : this.state.article.content
            }
          />
        </View>
      </View>
    )
  }
}

export default Article as ComponentClass<PageOwnProps, PageState>
