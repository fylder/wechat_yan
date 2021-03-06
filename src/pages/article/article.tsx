import { Image, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { ComponentClass } from "react";
import { ArticleModel } from "../../store/model/data";
import "./article.scss";

type PageStateProps = {};

type PageDispatchProps = {};

type PageOwnProps = {
  dispatch(type: any): Promise<any>;
};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Article {
  props: IProps;
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: string;
  article: ArticleModel | undefined;
}

/**
 * blog详情页
 */
@connect(({}) => ({}))
class Article extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    const id = this.$router.params.id;
    this.state = {
      id,
      article: undefined
    };
  }

  componentWillMount() {
    this.getArticle();
  }
  config: Config = {
    navigationBarTitleText: "fylder",
    usingComponents: {
      wemark: "../../components/wemark/wemark"
    }
  };
  getArticle = () => {
    Taro.showNavigationBarLoading();
    Taro.request({
      url: `https://wechat.fylder.me:8022/wechat/article`,
      method: "POST",
      mode: "cors",
      data: {
        id: this.state.id
      },
      success: res => {
        Taro.hideNavigationBarLoading();
        this.setState({
          article: res.data
        });
      }
    });
  };

  render() {
    return (
      <View>
        <Image
          className="header_img"
          src={this.state.article === undefined ? "" : this.state.article.cover}
          mode="aspectFill"
        />
        <View className="mark_lay">
          <wemark
            md={
              this.state.article === undefined ? "" : this.state.article.content
            }
          />
        </View>
      </View>
    );
  }
}

export default Article as ComponentClass<PageOwnProps, PageState>;
