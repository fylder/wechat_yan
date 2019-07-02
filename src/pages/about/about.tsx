import { Image, Text, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import "./about.scss"

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

interface About {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  type: string
  title: string
  datas
}

@connect(({ user }) => ({
  user
}))
class About extends Component<ComponentProps, ComponentState> {
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

  componentWillMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="container">
        <View className="personal-container">
          <Image
            className="personal-avatar"
            src="https://wx.qlogo.cn/mmopen/vi_32/27CTqYz6lVGETQuETA4hsbPCTRtHcXcSmR5mLGic1Zgg0YVEPeiaoAl1mqlXjnRA6eDcYZayX245y7wKtYOMLPQg/0"
            mode="widthFix"
          />
          <Text className="font-title personal-nickname">关于我</Text>
        </View>

        <View className="personal-h">
          <View className="personal-tag">
            <View>
              <Text className="font-content font-bord">Name</Text>
            </View>
            <View className="personal-line" />
          </View>

          <View>
            <Text className="font-content font-bord">剑指锁妖塔</Text>
          </View>

          <View className="personal-tag">
            <View>
              <Text className="font-content font-bord">I Am</Text>
            </View>
            <View className="personal-line" />
          </View>
          <View>
            <Text className="font-content">
              一只搞Android软件开发，做一些好玩的app
              有一种强迫只要有新的就不用旧的，我不会跟你说开发版本都是更最新，AS上也绝不容忍，既然好用为何放弃
              从小被仙剑的祸害后，到现在一直喜欢仙剑、古剑的游戏
              有摄影那份兴趣，特佩服那些ps、lr的大神们，曾第一次出去夜拍那手抖啊，回来一看真是惨不忍睹，愧对苍天，愧对景，更是愧对镜头前那个人
              有朝一日和小伙伴们骑着车，架着镜头，各处浪
            </Text>
          </View>

          <View className="personal-tag">
            <View>
              <Text className="font-content font-bord">Contact</Text>
            </View>
            <View className="personal-line" />
          </View>

          <View>
            <Text className="font-content">电话：15577391707</Text>
          </View>
          <View>
            <Text className="font-content">邮件：fylder@163.com</Text>
          </View>
          <View>
            <Text className="font-content">博客：http://fylder.me</Text>
          </View>
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

export default About as ComponentClass<PageOwnProps, PageState>
