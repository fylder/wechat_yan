import { Image, Video, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { ComponentClass } from "react";
import { getList } from "../../actions/slogAction";
import { SlogModel } from "../../store/model/data.d";
import { getDate } from "../../tools/time";
import "./slog.scss";
import { SLOG_LIST } from "src/constants/actionType";

type PageStateProps = {
  slog: { slog: SlogModel[] };
};

type PageDispatchProps = {};

type PageOwnProps = {
  dispatch(type: any): Promise<any>;
};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Slog {
  props: IProps;
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  cover: string;
  datas: SlogModel[];
  isRefresh: boolean;
}

@connect(
  ({ slog }) => ({
    slog
  }),
  dispatch => ({})
)
class Slog extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //   cover: "http://photo.fylder.me/photo_1568057246317.jpg?imageMogr2/auto-orient/thumbnail/!480x480r/blur/1x0/quality/75"
      cover:
        "http://photo.fylder.me/photo_1570843879557.jpg?imageMogr2/auto-orient/thumbnail/!480x480r/blur/1x0/quality/75",
      datas: [],
      isRefresh: false
    };
    Taro.setNavigationBarTitle({ title: "slog" });
  }

  componentWillMount() {
    const albumList = this.props.slog.slog;
    if (albumList.length < 1) {
      this.props.dispatch(getList());
    }
  }

  //props状态改变触发器
  componentWillReceiveProps(nextProps: any) {
    const {
      slog: { slog, action }
    } = nextProps;
    // if (action && action === SLOG_LIST && this.state.isRefresh) {
    //   this.setState({
    //     datas: slog,
    //     isRefresh: false
    //   });
    // }
  }

  config: Config = {
    enablePullDownRefresh: true
  };

  onPullDownRefresh() {
    if (!this.state.isRefresh) {
      this.props.dispatch(getList());
      this.setState({
        isRefresh: true
      });
    }
  }

  itemClick = item => {
    console.log(
      `/pages/slog/vlog/vlog?id=${item.id}&name=${item.name}&slog=${item.slog}&cover=${item.cover}`
    );
    Taro.navigateTo({
      url: `/pages/slog/vlog/vlog?id=${item.id}&name=${item.name}&slog=${item.slog}&cover=${item.cover}`
    });
  };

  render() {
    const slogList = this.props.slog.slog;
    this.setState({
      datas: slogList
    });
    return (
      <View>
        <View>
          <Image
            className="header_img"
            src={this.state.cover}
            mode="aspectFill"
          />
        </View>
        <View className="item_lay">
          {/* {slog_list.map(item => {
            return (
              <View
                className="item_lay_container"
                key={item.id}
                onClick={this.itemClick.bind(this, item)}
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
          })} */}

          {this.state.datas &&
            this.state.datas.map((item: SlogModel) => {
              return (
                <View className="item_lay_container" key={item.id}>
                  <View className="at-article__h3 item_lay_title">
                    {item.name}
                  </View>
                  <View className="video_lay">
                    <Video
                      className="video_lay_container"
                      src={item.slog}
                      controls={true}
                      autoplay={false}
                      initialTime={0}
                      id="video"
                      loop={false}
                      muted={false}
                    />
                  </View>
                  <View className="at-article__info item_lay_info">
                    {getDate(item.createdAt)}
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    );
  }
}

export default Slog as ComponentClass<PageOwnProps, PageState>;
