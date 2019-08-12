import { View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import "./blog.scss"
import { about } from "./data"

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

interface Blog {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {}

@connect(({ user }) => ({
  user
}))
class Blog extends Component<ComponentProps, ComponentState> {
  config: Config = {
    navigationBarTitleText: "fylder",
    usingComponents: {
      wemark: "../../components/wemark/wemark"
    }
  }
  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  render() {
    return (
      <View className="mark-lay">
        <wemark md={about.content} />
      </View>
    )
  }
}

export default Blog as ComponentClass<PageOwnProps, PageState>
