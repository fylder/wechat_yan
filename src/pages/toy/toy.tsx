import { Image, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { ComponentClass } from "react";
import { getList } from "../../actions/toyAction";
import { TOY_LIST } from "../../constants/actionType";
import { Album } from "../../store/model/data.d";
import { getDate } from "../../tools/time";
import { TYPE_COMIC, TYPE_DEFAULT, TYPE_TOY } from "./data";
import "./toy.scss";

type PageStateProps = {
  toy: {
    album: Album[];
  };
};

type PageDispatchProps = {};

type PageOwnProps = {
  dispatch(type: any): Promise<any>;
};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Toy {
  props: IProps;
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  datas: Album[];
  isRefresh: boolean;
}

@connect(
  ({ toy }) => ({
    toy
  }),
  dispatch => ({})
)
class Toy extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    Taro.setNavigationBarTitle({ title: "小玩意" });
    this.state = {
      datas: [],
      isRefresh: false
    };
  }

  componentWillMount() {
    const albumList = this.props.toy.album;
    if (albumList.length < 1) {
      this.setState({
        isRefresh: true
      });
      // 获取数据
      this.props.dispatch(getList(false));
    } else {
      // 直接从缓存获取
      this.setState({
        datas: albumList
      });
    }
  }

  //props状态改变触发器
  componentWillReceiveProps(nextProps: any) {
    const {
      toy: { album, action }
    } = nextProps;
    if (action && action === TOY_LIST && this.state.isRefresh) {
      Taro.stopPullDownRefresh();
      this.setState({
        datas: album,
        isRefresh: false
      });
    }
  }

  config: Config = {
    enablePullDownRefresh: true
  };

  onPullDownRefresh() {
    if (!this.state.isRefresh) {
      this.props.dispatch(getList(true));
      this.setState({
        isRefresh: true
      });
    }
  }

  // imageError = index => {
  //   const defaultImg =
  //     "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg";
  //   const data = this.state.datas;
  //   data[index].src = defaultImg;
  //   this.setState({ datas: data });
  // };

  itemClick = (id: number, title: string, subject: string, cover: string) => {
    Taro.navigateTo({
      url: `/pages/comic/comic?id=${id}&title=${title}&subject=${subject}&cover=${cover}`
    });
  };

  categoryItemClick = (title: string, tags: string) => {
    Taro.navigateTo({
      url: `/pages/category/category?title=${title}&tags=${tags}`
    });
  };

  render() {
    return (
      <View>
        <View className="index">
          <View className="lay">
            <View className="lay_bg">
              <Image
                className="lay_img"
                src="http://photo.fylder.me/photo_1604458379649.jpg?imageMogr2/auto-orient/thumbnail/!1080x1080r/blur/1x0/quality/75"
                mode="aspectFill"
              />
            </View>
            <View className="lay_fg">
              <View className="at-row at-row__align--center lay_search">
                <View className="at-row at-row__justify--center">
                  <View className="at-col at-col-10">
                    <View className="at-row at-row__justify--center toy_item_lay">
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
            {this.state.datas.map((item: Album) => {
              return (
                <View
                  className="item_lay_container"
                  key={item.id}
                  onClick={this.itemClick.bind(
                    this,
                    item.id,
                    item.name,
                    item.subject,
                    item.cover
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
                    {getDate(item.createdAt)}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

export default Toy as ComponentClass<PageOwnProps, PageState>;
