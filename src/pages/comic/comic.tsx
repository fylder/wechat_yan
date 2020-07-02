import { Block, Image, Text, View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Taro, { Component, Config } from "@tarojs/taro";
import { ComponentClass } from "react";
import { getList } from "../../actions/photoAction";
import ImgLoader from "../../components/img-loader/img-loader";
import { Picture } from "../../model/AlbumModel";
import { Photo } from "../../model/PhotoModel";
import head_bg from "../../static/img/head_title_bg.svg";
import linePng from "../../static/img/line.jpg";
import "./comic.scss";

type PageStateProps = {
  photo: {
    photos: Array<Photo>;
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
  imgLoader: ImgLoader;
  hasLoad: boolean;
  hasCoverLoad: boolean;
}

interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: string;
  title: string;
  subject: string;
  cover: string;
  coverLoadUrl: string;
  datas: Picture[];
  imgLoadList: Picture[];
  coverLoad: boolean;
}

/**
 * 相册照片详情
 */
@connect(
  ({ photo }) => ({ photo }),
  dispatch => ({})
)
class Info extends Component<ComponentProps, ComponentState> {
  constructor(props, context) {
    super(props, context);
    this.imgLoader = new ImgLoader(this);
    this.hasLoad = false;
    this.hasCoverLoad = false;

    const id = this.$router.params.id;
    const title = this.$router.params.title;
    const subject = this.$router.params.subject;
    let cover = this.$router.params.cover;

    if (cover === undefined) {
      cover = "";
    } else {
      //参数传递会过滤`?`
      const imgStyle =
        "?imageMogr2/auto-orient/thumbnail/!480x480r/blur/1x0/quality/75";
      cover = cover.split("?")[0] + imgStyle;
    }
    if (subject) {
      Taro.setNavigationBarTitle({ title });
    }

    this.state = {
      id,
      title,
      subject,
      cover,
      coverLoadUrl: "",
      datas: [],
      imgLoadList: [],
      coverLoad: false
    };
  }

  componentWillMount() {
    let photoList = this.props.photo.photos;

    let hasData = false;
    for (let item of photoList) {
      if (item.id == this.state.id) {
        hasData = true;
        break;
      }
    }
    if (!hasData) {
      this.props.dispatch(getList(this.state.id));
    }
  }

  componentWillUpdate(props: any, state: any) {
    if (state.cover && state.cover.length > 0 && !this.hasCoverLoad) {
      this.hasCoverLoad = true;
      this.imgLoader.load(state.cover, (err, data) => {
        this.setState({
          coverLoadUrl: state.src,
          coverLoad: true
        });
      });
    } else if (state.datas && state.datas.length > 0 && !this.hasLoad) {
      this.hasLoad = true;
      state.datas.map((item: Picture) => {
        this.imgLoader.load(item.photo, (err, data) => {
          const datas = this.state.datas.map(item => {
            if (item.photo == data.src) {
              item.loaded = true;
            }
            return item;
          });
          this.setState({
            datas
          });
        });
      });
    }
  }

  config: Config = {
    navigationBarTitleText: "fylder"
  };

  imageError = index => {
    const defaultImg =
      "http://img5.mtime.cn/pi/2019/03/30/100155.92232373_1000X1000.jpg";
    const data = this.state.datas;
    data[index].photo = defaultImg;
    this.setState({ datas: data });
  };

  handlePicture = (src: string) => {
    Taro.previewImage({
      urls: [src]
    });
  };

  render() {
    let tag = linePng;
    const photoList: Array<Photo> = this.props.photo.photos;
    for (let item of photoList) {
      if (item.id === this.state.id) {
        this.setState({
          datas: item.pictures
        });
        break;
      }
    }

    return (
      <View>
        <View className="index">
          <View className="headn_lay">
            <View className="head_card">
              <Block>
                {this.state.coverLoad && (
                  <Image
                    className="at-article__img head_img fade_in"
                    src={this.state.cover}
                    mode="aspectFill"
                  />
                )}
              </Block>
              {/*  引入图片预加载组件  */}
              <Block>
                <Image
                  src={this.state.cover}
                  data-src={this.state.cover}
                  onLoad={this.imgLoader._imgOnLoad.bind(this.imgLoader)}
                  onError={this.imgLoader._imgOnLoadError.bind(this.imgLoader)}
                  style="width:0;height:0;opacity:0"
                />
              </Block>
              <View className="head_lay">
                {/* <View className="head_title">
                  <Text>ahh</Text>
                </View> */}
              </View>
            </View>
            <View className="content_lay">
              <View className="content_padding_lay" />
              <View className="subject_head">
                <View className="head_subject_img_lay">
                  <Image
                    className="at-article__img head_subject_img"
                    src={head_bg}
                    mode="widthFix"
                  />
                </View>
                <View className="head_subject_title">
                  <Text className="head_subject_title_font">
                    {this.state.subject}
                  </Text>
                </View>
              </View>
              <View className="content_footer_lay" />
            </View>
          </View>
          {/* <View className="info_card">
            <View className="at-row at-row__align--center">
              <View className="info_index" />
              <View className="at-col">
                <Text>{this.state.subject}</Text>
              </View>
            </View>
          </View> */}
          <Block>
            {this.state.datas.map((item: Picture, index: number) => {
              return (
                <View className="at-article__content" key={item.id}>
                  <Image
                    className="at-article__img"
                    src={tag}
                    mode="widthFix"
                  />
                  {/* taro version:1.3.7 item不能更新 2019-12-09 11:37 */}
                  {this.state.datas[index].loaded && (
                    <View className="at-article__section">
                      <View className="card_item">
                        {/* 照片描述信息 */}
                        {item.describe === "" || item.describe === undefined ? (
                          <View />
                        ) : (
                          <View className="card_info">
                            <View className="at-article__h3 title">
                              {item.describe}
                            </View>
                          </View>
                        )}
                        <Image
                          className="at-article__img card_img fade_in"
                          // className="fade_in"
                          src={item.photo}
                          onError={this.imageError.bind(this, index)}
                          mode="widthFix"
                          lazyLoad={true}
                          onClick={this.handlePicture.bind(this, item.photo)}
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </Block>
          {/*  引入图片预加载组件  */}
          <Block>
            {this.state.datas.map((item: Picture, index) => {
              return (
                <Image
                  key={item.id}
                  src={item.photo}
                  data-src={item.photo}
                  onLoad={this.imgLoader._imgOnLoad.bind(this.imgLoader)}
                  onError={this.imgLoader._imgOnLoadError.bind(this.imgLoader)}
                  style="width:0;height:0;opacity:0"
                />
              );
            })}
          </Block>
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

export default Info as ComponentClass<PageOwnProps, PageState>;
