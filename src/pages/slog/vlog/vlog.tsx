import { Image, Video, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component } from "@tarojs/taro";
import { ComponentClass } from "react";
import "./index.scss";

type PageStateProps = {
  category: {};
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
  slog: string;
  slog_cover: string;
  name: string;
}

@connect(
  ({ category }) => ({
    category
  }),
  dispatch => ({})
)
class Slog extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    const slog = this.$router.params.slog;
    const cover = this.$router.params.cover;
    const name = this.$router.params.name;
    this.state = {
      cover:
        "http://photo.fylder.me/photo_1604458379649.jpg?imageMogr2/auto-orient/thumbnail/!1080x1080r/blur/1x0/quality/75",
      slog: slog,
      slog_cover: cover,
      name: name
    };
    Taro.setNavigationBarTitle({ title: "slog" });
  }

  componentWillMount() {
    // this.getAlbum();
  }

  render() {
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
          <View className="video_lay">
            <Video
              className="video_lay_container"
              src={this.state.slog}
              controls={true}
              autoplay={false}
              initialTime={0}
              id="video"
              loop={false}
              muted={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Slog as ComponentClass<PageOwnProps, PageState>;
