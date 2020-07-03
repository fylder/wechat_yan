import { Image, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { ComponentClass } from "react";
import { getList } from "../../actions/articleAction";
import { ARTICLE_LIST } from "../../constants/actionType";
import { ArticleModel } from "../../store/model/data.d";
import { getDate } from "../../tools/time";
import "./archives.scss";

type PageStateProps = {
  article: { article: ArticleModel[] };
};

type PageDispatchProps = {};

type PageOwnProps = {
  dispatch(type: any): Promise<any>;
};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Archives {
  props: IProps;
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  datas: ArticleModel[];
  isRefresh: boolean;
}

/**
 * 随笔
 */
@connect(
  ({ article }) => ({
    article
  }),
  dispatch => ({})
)
class Archives extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    Taro.setNavigationBarTitle({ title: "随笔" });
    this.state = {
      datas: [],
      isRefresh: false
    };
  }

  componentWillMount() {
    const articleList = this.props.article.article;
    if (articleList.length < 1) {
      this.setState({
        isRefresh: true
      });
      // 获取数据
      this.props.dispatch(getList(false));
    } else {
      // 直接从缓存获取
      this.setState({
        datas: articleList
      });
    }
  }

  //props状态改变触发器
  componentWillReceiveProps(nextProps: any) {
    const {
      article: { article, action }
    } = nextProps;
    if (action && action === ARTICLE_LIST && this.state.isRefresh) {
      Taro.stopPullDownRefresh();
      this.setState({
        datas: article,
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

  itemClick = (item: ArticleModel) => {
    Taro.navigateTo({
      url: `/pages/article/article?id=${item.id}`
    });
  };

  render() {
    return (
      <View className="lay">
        <View className="header_lay">
          <Image
            className="header_img"
            src="http://b275.photo.store.qq.com/psb?/V13MxeJc2qpf92/A92lmM5FnNd6k.tL2pCLVw1EEVYJz*2BR3LUsf3DHo8!/b/dIvt8qNCBgAA&bo=IAMWAkAGKwQBCHE!&rf=viewer_4"
            mode="aspectFill"
          />
          <View className="subject_lay">
            <View className="at-article__h3 subject_font">fylder' 随笔</View>
          </View>
        </View>

        <View className="item_lay">
          {this.state.datas.map((item: ArticleModel, index: number) => {
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

export default Archives as ComponentClass<PageOwnProps, PageState>;
