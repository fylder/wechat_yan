import { Image, Text, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { ComponentClass } from "react";
import { getList } from "../../actions/albumAction";
import { ALBUM_LIST } from "../../constants/actionType";
import { Album } from "../../store/model/data.d";
import "./album.scss";

type PageStateProps = {
  album: {
    album: Album[];
  };
};

type PageDispatchProps = {};

type PageOwnProps = {
  dispatch(type: any): Promise<any>;
};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Info {
  props: IProps;
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  type: string;
  title: string;
  datas: Album[];
  isRefresh: boolean;
}

@connect(({ album }) => ({
  album
}))
class Info extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    Taro.setNavigationBarTitle({ title: "fylder' 相册" });
    const type = this.$router.params.type;
    this.state = {
      type,
      title: "fylder",
      datas: [],
      isRefresh: false
    };
  }

  componentWillMount() {
    const albumList = this.props.album.album;
    if (albumList.length < 1) {
      this.setState({
        isRefresh: true
      });
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
      album: { album, action }
    } = nextProps;
    if (action && action === ALBUM_LIST && this.state.isRefresh) {
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

  imageError = index => {
    const defaultImg =
      "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg";
    const data = this.state.datas;
    data[index].cover = defaultImg;
    this.setState({ datas: data });
  };

  handleItemClick = (
    id: number,
    title: string,
    subject: string,
    cover: string
  ) => {
    Taro.navigateTo({
      url: `/pages/comic/comic?id=${id}&title=${title}&subject=${subject}&cover=${cover}`
    });
  };
  render() {
    return (
      <View>
        <Image
          className="index_img"
          src="http://spider.ws.126.net/6b1df938dab6a363b5a475c4e9e21345.jpeg"
          onError={this.imageError.bind(this, 1)}
          mode="aspectFill"
        />
        <View className="index">
          <View className="info_card">
            <View className="at-row at-row__align--center">
              <View className="info_index" />
              <View className="at-col info_font">
                <Text>{this.state.title}</Text>
              </View>
            </View>
          </View>
          <View className="at-row at-row__justify--center">
            <View className="at-col at-col-12">
              <View className="at-row at-row--wrap">
                {/* 左边 */}
                <View className="at-col at-col-6 card_left">
                  {this.state.datas != undefined ? (
                    this.state.datas
                      .filter((_item: Album, index: number) => {
                        return index % 2 === 0;
                      })
                      .map((item: Album, index: number) => {
                        return (
                          <View className="at-col at-col-12" key={item.id}>
                            <View
                              className="album_lay"
                              onClick={this.handleItemClick.bind(
                                this,
                                item.id,
                                item.name,
                                item.subject,
                                item.cover
                              )}
                            >
                              <View className="album_card">
                                <Image
                                  className="album_img"
                                  src={item.cover}
                                  onError={this.imageError.bind(this, index)}
                                  mode="aspectFill"
                                  lazyLoad={true}
                                />
                                <View className="album_title">{item.name}</View>
                              </View>
                            </View>
                          </View>
                        );
                      })
                  ) : (
                    <View />
                  )}
                </View>
                {/* 右边 */}
                <View className="at-col at-col-6 card_right">
                  {this.state.datas != undefined ? (
                    this.state.datas
                      .filter((_item: Album, index: number) => {
                        return index % 2 === 1;
                      })
                      .map((item: Album, index: number) => {
                        return (
                          <View className="at-col at-col-12" key={item.id}>
                            <View
                              className="album_lay"
                              onClick={this.handleItemClick.bind(
                                this,
                                item.id,
                                item.name,
                                item.subject,
                                item.cover
                              )}
                            >
                              <View className="album_card">
                                <Image
                                  className="album_img"
                                  src={item.cover}
                                  onError={this.imageError.bind(this, index)}
                                  mode="aspectFill"
                                  lazyLoad={true}
                                />
                                <View className="album_title">{item.name}</View>
                              </View>
                            </View>
                          </View>
                        );
                      })
                  ) : (
                    <View />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Info as ComponentClass<PageOwnProps, PageState>;
