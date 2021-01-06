import { Image, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { ComponentClass } from "react";
import { Album } from "../../store/model/data.d";
import { getDate } from "../../tools/time";
import "./category.scss";

type PageStateProps = {
  category: {
    album: Album[];
  };
};

type PageDispatchProps = {};

type PageOwnProps = {
  dispatch(type: any): Promise<any>;
};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Category {
  props: IProps;
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  title: string;
  tags: string;
  album: Album[];
  cover: string;
}

@connect(
  ({ category }) => ({
    category
  }),
  dispatch => ({})
)
class Category extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    const title =
      this.$router.params.title === undefined ? "" : this.$router.params.title;
    const tags = this.$router.params.tags;
    this.state = {
      title,
      tags,
      album: [],
      cover:
        tags === "cosplay"
          ? "http://photo.fylder.me/photo_1598549784319.jpg?imageMogr2/auto-orient/thumbnail/!480x480r/blur/1x0/quality/75"
          : "http://photo.fylder.me/photo_1604458379649.jpg?imageMogr2/auto-orient/thumbnail/!1080x1080r/blur/1x0/quality/75"
    };
    Taro.setNavigationBarTitle({ title });
  }

  componentWillMount() {
    this.getAlbum();
  }

  config: Config = {
    navigationBarTitleText: "小玩意"
  };

  getAlbum = () => {
    Taro.showNavigationBarLoading();
    Taro.request({
      url: "https://wechat.fylder.me:8022/wechat/album/tag",
      method: "POST",
      mode: "cors",
      data: {
        tags: this.state.tags
      }
    }).then(res => {
      Taro.hideNavigationBarLoading();
      this.setState({
        album: res.data
      });
    });
  };

  itemClick = (item: Album) => {
    Taro.navigateTo({
      url: `/pages/comic/comic?id=${item.id}&title=${item.name}&subject=${item.subject}&cover=${item.cover}`
    });
  };

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
          {this.state.album.map((item: Album) => {
            return (
              <View
                className="item_lay_container"
                key={item.id}
                onClick={this.itemClick.bind(this, item)}
              >
                <View className="at-article__h3 item_lay_title">
                  {item.subject}
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
    );
  }
}

export default Category as ComponentClass<PageOwnProps, PageState>;
