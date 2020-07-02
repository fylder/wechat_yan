import { Image, Text, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { ComponentClass } from "react";
import { getList } from "../../actions/albumAction";
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
}

@connect(({ album }) => ({
  album
}))
class Info extends Component<ComponentProps, ComponentState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  constructor(props, context) {
    super(props, context);
    const type = this.$router.params.type;
    this.state = {
      type,
      title: "fylder",
      datas: []
    };
  }

  componentWillMount() {
    const albumList = this.props.album.album;
    if (albumList.length < 1) {
      this.props.dispatch(getList());
    }
  }

  config: Config = {
    navigationBarTitleText: "fylder' 相册"
  };

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
    const albumList = this.props.album.album;
    this.setState({
      datas: albumList
    });
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
