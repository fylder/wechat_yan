import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { HomeModel } from "../../model/HomeModel";
import { Album } from "../../store/model/data.d";
import { item_datas } from "./data";
import "./home.scss";

type PageStateProps = {};

type PageDispatchProps = {
  handleTypeItemClick: () => void;
  handleComicClick: () => void;
  handleMoreClick: () => void;
};

type PageOwnProps = { dispatch(type: any): Promise<any> };

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Home {
  props: IProps;
}
interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  type: string;
  title: string;
  data: HomeModel;
  isRefresh: boolean;
}

@connect(
  ({}) => ({}),
  dispatch => ({
    handleTypeItemClick(index: number) {
      switch (index) {
        case 0: {
          //随笔
          Taro.navigateTo({
            url: "/pages/archives/archives"
          });
          break;
        }
        case 1: {
          //随手拍
          Taro.navigateTo({
            url: "/pages/album/album?type="
          });
          break;
        }
        case 2: {
          //小玩意
          Taro.navigateTo({
            url: "/pages/toy/toy"
          });
          break;
        }
        case 3: {
          Taro.navigateTo({
            url: `/pages/category/category?title=${"漫展"}&tags=${"cosplay"}`
          });
          break;
        }
        case 4: {
          //今月份
          Taro.navigateTo({
            url: "/pages/monthly/monthly"
          });
          break;
        }
        case 5: {
          //来一杯续命吧
          Taro.navigateTo({
            url: `/pages/comic/comic?id=${10}&title=${"这个夏天喝过的奶茶"}&subject=${"来一杯续命吧"}&cover=${"http://photo.fylder.me/photo_1568054888322.jpg?imageMogr2/auto-orient/thumbnail/!1080x1080r/blur/1x0/quality/75"}`
          });
          break;
        }
        case 6: {
          //slog
          Taro.navigateTo({
            url: "/pages/slog/slog"
          });
          break;
        }
        default: {
          Taro.navigateTo({
            url: "/pages/album/album?type="
          });
          break;
        }
      }
    },
    handleComicClick(
      id: number,
      title: string,
      subject: string,
      cover: string
    ) {
      Taro.navigateTo({
        url: `/pages/comic/comic?id=${id}&title=${title}&subject=${subject}&cover=${cover}`
      });
    },
    handleMoreClick() {
      Taro.navigateTo({
        url: "/pages/album/album?type="
      });
    }
  })
)
class Home extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    Taro.setNavigationBarTitle({ title: "带着毛驴去兜风" });
    Taro.setBackgroundTextStyle({ textStyle: "dark" });
  }

  componentWillMount() {
    this.getAlbum();
  }

  config: Config = {
    enablePullDownRefresh: true
  };

  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "带着毛驴去兜风",
      path: "/pages/home/home"
    };
  }

  onPullDownRefresh = () => {
    if (!this.state.isRefresh) {
      this.getAlbum();
      this.setState({
        isRefresh: true
      });
    }
  };

  getAlbum = () => {
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/home/latest",
      method: "POST",
      mode: "cors",
      data: {
        size: 6
      },
      success: res => {
        Taro.stopPullDownRefresh();
        this.setState({
          data: res.data,
          isRefresh: false
        });
      },
      fail: res => {
        Taro.stopPullDownRefresh();
        //默认显示图
        this.setState({
          data: {
            home:
              "http://photo.fylder.me/photo_1609920268725.jpg?imageMogr2/auto-orient/thumbnail/!480x480r/quality/75",
            swipe: [
              {
                image:
                  "http://photo.fylder.me/photo_1567992692227.jpg?imageMogr2/auto-orient/thumbnail/!480x480r/quality/75"
              }
            ],
            album: []
          },
          isRefresh: false
        });
      }
    });
  };

  render() {
    return (
      <View className="index">
        <View className="lay">
          <View className="lay_bg">
            <Image
              className="lay_img"
              // src="http://photo.fylder.me/photo_1592322731248.jpg"
              src={this.state.data.home}
              mode="aspectFill"
            />
          </View>
          <View className="lay_fg">
            <View className="lay_container">
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
                          prefixClass="wechat"
                          value={item.icon}
                          size="32"
                          color="#888888"
                        />
                      </View>
                      <View className="at-article__h3 at-row__align--center grid_text">
                        {item.value}
                      </View>
                    </View>
                  );
                })}
              </View>
              <Swiper
                className="swiper_lay"
                indicatorColor="#999"
                indicatorActiveColor="#333"
                vertical={false}
                circular={true}
                interval={3000}
                indicatorDots={false}
                autoplay={true}
              >
                {this.state.data.swipe.map((item, index) => {
                  return (
                    <SwiperItem key={index} className="swiper_item">
                      <Image
                        src={item.image}
                        className="swiper_img"
                        mode="aspectFill"
                      />
                    </SwiperItem>
                  );
                })}
              </Swiper>

              <View className="second_lay">
                <View className="at-row second_lay_head">
                  <View className="at-col at-col-9 tag_lay">
                    <View className="at-row at-row__align--center">
                      <View className="recent_tag" />
                      <View className="at-col recent_news">最新相册</View>
                    </View>
                  </View>
                  <View className="at-col at-col-3 recent_more_lay">
                    <View
                      className="recent_more"
                      onClick={this.props.handleMoreClick.bind(this)}
                    >
                      更多
                    </View>
                  </View>
                </View>
                <View className="at-row at-row--wrap second_lay_list">
                  {this.state.data.album.map((item: Album, index: number) => {
                    return (
                      <View className="at-col at-col-6" key={item.id}>
                        <View
                          className="album_item_lay"
                          onClick={this.props.handleComicClick.bind(
                            this,
                            item.id,
                            item.name,
                            item.subject,
                            item.cover
                          )}
                        >
                          <Image
                            className="album_item_img"
                            src={item.cover}
                            mode="aspectFill"
                            lazyLoad={true}
                          />
                          <View className="album_item_container">
                            <View className="album_item_detail">
                              {item.name}
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}

                  {/* {this.state.covers.map((item: Album, index: number) => {
                    return (
                      <View className="at-col at-col-6" key={item.id}>
                        <View
                          className="cover_item_lay"
                          onClick={this.props.handleComicClick.bind(
                            this,
                            item.id,
                            item.name,
                            item.subject
                          )}
                        >
                          <Image
                            className="cover_item_img"
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
                    );
                  })} */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Home;
