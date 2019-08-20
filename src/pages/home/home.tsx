import { Image, Swiper, SwiperItem, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { AtIcon } from "taro-ui"
import { detail } from "../../actions/userAction"
import { image_data, item_datas } from "./data"
import "./home.scss"

type PageStateProps = {
  user: {
    id: string
    username: string
    avatar: string
  }
}

type PageDispatchProps = {
  handleLogin(): () => void
  handleTypeItemClick: () => void
  handleComicClick: () => void

  handleMoreClick: () => void
}

type PageOwnProps = { dispatch(type: any): Promise<any> }

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Home {
  props: IProps
}
interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  type: string
  title: string
  covers
  isRefresh: boolean
}

@connect(
  ({ user }) => ({ user }),
  dispatch => ({
    handleLogin() {
      Taro.getUserInfo().then(result => {
        const nickName = result.userInfo.nickName
        const avatarUrl = result.userInfo.avatarUrl
        dispatch(detail("1", nickName, avatarUrl))
      })
    },
    handleTypeItemClick(index: number) {
      switch (index) {
        case 0: {
          //天气之子
          Taro.navigateTo({
            url: "/pages/other/detail/detail?id=" + index
          })
          break
        }
        case 1: {
          //随手拍
          Taro.navigateTo({
            url: "/pages/album/album?type="
          })
          break
        }
        case 2: {
          //游历
          Taro.navigateTo({
            url: "/pages/album/album?type="
          })
          break
        }
        case 3: {
          //心情
          Taro.navigateTo({
            url: "/pages/archives/archives"
          })
          break
        }
        case 4: {
          //今月份
          Taro.navigateTo({
            url: "/pages/monthly/monthly"
          })
          break
        }
        case 5: {
          //小玩意
          Taro.navigateTo({
            url: "/pages/toy/toy"
          })
          break
        }
        default: {
          Taro.navigateTo({
            url: "/pages/other/detail/detail?id=" + index
          })
          break
        }
      }
    },
    handleComicClick(id: number, title: string, subject: string) {
      Taro.navigateTo({
        url: `/pages/comic/comic?id=${id}&title=${title}&subject=${subject}`
      })
    },
    handleMoreClick() {
      Taro.navigateTo({
        url: "/pages/album/album?type="
      })
    }
  })
)
class Home extends Component<ComponentProps, ComponentState> {
  config: Config = {
    navigationBarTitleText: "首页",
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark"
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    this.props.handleLogin()
    this.getAlbum()
  }

  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: "带着毛驴去兜风",
      path: "/pages/home/home"
    }
  }

  onPullDownRefresh() {
    if (!this.state.isRefresh) {
      this.getAlbum()
      this.setState({
        isRefresh: true
      })
    }
  }

  getAlbum = () => {
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/album/latest",
      method: "POST",
      data: {
        size: 6
      }
    }).then(res => {
      Taro.stopPullDownRefresh()
      this.setState({
        covers: res.data,
        isRefresh: false
      })
    })
  }

  render() {
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
            <View className="lay_container">
              {/* <View className="at-article__h3 grid_title">fylder</View> */}
              <View className="at-row at-row--wrap grid_lay">
                {item_datas.map((item, index) => {
                  return (
                    <View
                      className="at-col at-col-4 grid_item_lay"
                      key={item.id}
                      onClick={this.props.handleTypeItemClick.bind(this, index)}
                    >
                      <View className="grid_lay_img">
                        <AtIcon
                          className="grid_img"
                          prefixClass="tao"
                          value={item.icon}
                          size="32"
                          color="#888888"
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
                      <View className="at-col recent_news">最新相册</View>
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
                        <View
                          className="first_item_lay"
                          onClick={this.props.handleComicClick.bind(
                            this,
                            item.id,
                            item.name,
                            item.subject
                          )}
                        >
                          <Image
                            className="first_item_img"
                            src={item.cover}
                            mode="aspectFill"
                            lazyLoad={true}
                          />
                          <View />
                          <View className="flex-container">
                            <View className="at-article__h3 flex-item-detail">
                              {item.name}
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

export default Home as ComponentClass<PageOwnProps, PageState>
