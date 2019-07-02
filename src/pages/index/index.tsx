import { Image, Swiper, SwiperItem, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { AtIcon } from "taro-ui"
import { detail } from "../../actions/userAction"
import { image_data, item_datas } from "./data"
import "./index.scss"

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  user: {
    id: string
    username: string
    avatar: string
  }
}

type PageDispatchProps = {
  handleLogin(): () => void
  handleUser: () => void
  handleInfo: () => void
  handleItemClick: () => void
  handleComicClick: () => void
  handleTypeItemClick: () => void
  handleMoreClick: () => void
  handleCart: (id: string) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}
interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  type: string
  title: string
  covers
}

@connect(
  ({ user }) => ({ user }),
  dispatch => ({
    handleLogin() {
      Taro.getUserInfo().then(result => {
        const nickName = result.userInfo.nickName
        const avatarUrl = result.userInfo.avatarUrl
        dispatch(detail("1", nickName, avatarUrl))
        // Taro.showToast({
        //   title: nickName,
        //   icon: "get√",
        //   duration: 2000
        // })
      })
    },
    handleItemClick(index: number) {
      Taro.navigateTo({
        url: "/pages/detail/detail?id=" + index
      })
    },
    handleComicClick(id: number, title: string) {
      Taro.navigateTo({
        url: "/pages/comic/comic?id=" + id + "&title=" + title
      })
    },
    handleTypeItemClick(index: number, id: string) {
      switch (index) {
        case 0:
          if (id) {
            Taro.navigateTo({
              url: "/pages/info/info"
            })
          } else {
            Taro.navigateTo({
              url: "/pages/user/user"
            })
          }
          break
        case 1:
          Taro.navigateTo({
            url: "/pages/user/user"
          })
          break
        case 2:
          if (id) {
            Taro.navigateTo({
              url: "/pages/cart/cart"
            })
          } else {
            Taro.navigateTo({
              url: "/pages/user/user"
            })
          }
          break
      }
    },
    handleMoreClick() {
      Taro.navigateTo({
        url: "/pages/detail/detail?id=1"
      })
    }
  })
)
class Index extends Component<ComponentProps, ComponentState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    this.props.handleLogin()
    Taro.request({
      url: "https://wechat.fylder.me:8022/api/album/",
      method: "GET"
    }).then(res =>
      this.setState({
        covers: res.data
      })
    )
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: "带着毛驴去兜风",
      path: "/pages/index/index"
    }
  }

  render() {
    const typeArray = ["fylder", "用户信息", "购物车"]
    return (
      <View className="index">
        <View className="lay">
          <View className="lay_bg">
            <Image
              className="lay_img"
              src="http://img5.mtime.cn/pi/2019/05/29/083826.86010876_1000X1000.jpg"
              mode="aspectFill"
            />
          </View>
          <View className="lay_fg">
            <View className="at-row at-row__align--center lay_search">
              <View className="at-col at-col__offset-1 at-col-1">
                <AtIcon value="search" size="18" color="#AAAAAA" />
              </View>
              <View className="at-col at-article__h3 at-col-9 lay_font">
                Search
              </View>
            </View>
            <View className="lay_container">
              {/* <AtGrid
                className="lay_container_grid"
                data={item_datas}
                hasBorder={false}
                onClick={this.props.handleItemClick.bind(this)}
              /> */}
              <View className="at-article__h3 grid_title">新海诚</View>
              <View className="at-row at-row--wrap grid_lay">
                {item_datas.map((item, index) => {
                  return (
                    <View
                      className="at-col at-col-4 grid_item_lay"
                      key={index}
                      onClick={this.props.handleItemClick.bind(this, index)}
                    >
                      <View className="grid_lay_img">
                        <Image
                          className="grid_img"
                          src={item.image}
                          mode="widthFix"
                        />
                      </View>
                      <View className="at-article__h3 at-row__align--center grid_text">
                        {item.value}
                      </View>
                    </View>
                  )
                })}
              </View>

              <Swiper
                className="swiper-lay"
                indicatorColor="#999"
                indicatorActiveColor="#333"
                vertical={false}
                circular={true}
                interval={3000}
                indicatorDots={true}
                autoplay={true}
              >
                {image_data.map((item, index) => {
                  return (
                    <SwiperItem key={index} className="swiper-item">
                      <Image
                        src={item.image}
                        className="swiper-img"
                        mode="widthFix"
                      />
                    </SwiperItem>
                  )
                })}
              </Swiper>

              <View className="second_lay">
                <View className="at-row">
                  <View className="at-col at-col-10">
                    <View className="at-row at-row__align--center">
                      <View className="recent_tag" />
                      <View className="at-col recent_news">最新影片</View>
                    </View>
                  </View>
                  <View
                    className="at-col at-col-2 recent_more"
                    onClick={this.props.handleMoreClick.bind(this)}
                  >
                    更多
                  </View>
                </View>
                <View className="at-row at-row--wrap">
                  {this.state.covers.map((item, index) => {
                    return (
                      <View className="at-col at-col-6" key={item.id}>
                        <View className="second_item_lay">
                          <Image
                            className="second_item_img"
                            src={item.cover}
                            mode="aspectFill"
                          />
                          <View />
                          <View className="flex-container">
                            <View
                              className="at-article__h3 flex-item-detail"
                              onClick={this.props.handleComicClick.bind(
                                this,
                                item.id,
                                item.name
                              )}
                            >
                              {item.name}
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  })}
                </View>
                <View className="at-row at-row--wrap">
                  {typeArray.map((item, index) => {
                    return (
                      <View className="at-col at-col-6" key={index}>
                        <View className="second_item_lay">
                          <Image
                            className="second_item_img"
                            src="http://img5.mtime.cn/pi/2019/05/29/083826.86010876_1000X1000.jpg"
                            mode="aspectFill"
                          />
                          <View />
                          <View className="flex-container">
                            <View
                              className="at-article__h3 flex-item-detail"
                              onClick={this.props.handleTypeItemClick.bind(
                                this,
                                index,
                                this.props.user.id
                              )}
                            >
                              {item}
                            </View>
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

export default Index as ComponentClass<PageOwnProps, PageState>
