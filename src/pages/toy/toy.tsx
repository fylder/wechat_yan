import { Image, View } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import Taro, { Component, Config } from "@tarojs/taro"
import { ComponentClass } from "react"
import { getList } from "../../actions/toyAction"
import { Album } from "../../model/AlbumModel"
import { TYPE_COMIC, TYPE_DEFAULT, TYPE_TOY } from "./data"
import "./toy.scss"

type PageStateProps = {
  toy: {
    album: Album[]
  }
}

type PageDispatchProps = {}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Toy {
  props: IProps
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: number
  datas: any
  album: Album[]
}

@connect(
  ({ toy }) => ({
    toy
  }),
  dispatch => ({})
)
class Toy extends Component<ComponentProps, ComponentState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "小玩意"
  }

  constructor(props, context) {
    super(props, context)
    props.dispatch(getList())
  }

  imageError = index => {
    const defaultImg =
      "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg"
    const data = this.state.datas
    data[index].src = defaultImg
    this.setState({ datas: data })
  }

  itemClick = (id: number, title: string, subject: string) => {
    Taro.navigateTo({
      url: `/pages/comic/comic?id=${id}&title=${title}&subject=${subject}`
    })
  }

  categoryItemClick = (title: string, tags: string) => {
    Taro.navigateTo({
      url: `/pages/category/category?title=${title}&tags=${tags}`
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
        <View className="index">
          <View className="lay">
            <View className="lay_bg">
              <Image
                className="lay_img"
                src="http://spider.ws.126.net/6b1df938dab6a363b5a475c4e9e21345.jpeg"
                mode="aspectFill"
              />
            </View>
            <View className="lay_fg">
              <View className="at-row at-row__align--center lay_search">
                <View className="at-row at-row__justify--center">
                  <View className="at-col at-col-10">
                    <View className="at-row at-row__justify--center toy-item-lay">
                      <View className="at-col-6 toy-item-left">
                        <View
                          className="toy-type"
                          onClick={this.categoryItemClick.bind(
                            this,
                            "fylder",
                            TYPE_DEFAULT
                          )}
                        >
                          <View className="toy-card toy-fylder">fylder</View>
                        </View>
                      </View>
                      <View className="at-col-6 toy-item-right">
                        <View className="at-col-12 toy-item-top">
                          <View
                            className="toy-type"
                            onClick={this.categoryItemClick.bind(
                              this,
                              "模型",
                              TYPE_TOY
                            )}
                          >
                            <View className="toy-card toy-m">模型</View>
                          </View>
                        </View>
                        <View className="at-col-12 toy-item-bottom">
                          <View
                            className="toy-type"
                            onClick={this.categoryItemClick.bind(
                              this,
                              "动漫",
                              TYPE_COMIC
                            )}
                          >
                            <View className="toy-card toy-comic">动漫</View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="item_lay">
            {this.props.toy.album.map((item: Album) => {
              return (
                <View
                  className="item_lay_container"
                  key={item.id}
                  onClick={this.itemClick.bind(
                    this,
                    item.id,
                    item.subject,
                    item.name
                  )}
                >
                  <View className="at-article__h3 item_lay_title">
                    {item.name}
                  </View>
                  <Image
                    className="item_lay_img"
                    src={item.cover}
                    mode="aspectFill"
                    lazyLoad={true}
                  />
                  <View className="at-article__info item_lay_info">
                    {this.getDate(item.createdAt)}
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default Toy as ComponentClass<PageOwnProps, PageState>
