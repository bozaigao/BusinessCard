/**
 * @filename my_video.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 我的视频
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {get, parseData, styleAssign, toast} from "../../utils/datatool";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, Text, Video, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import {cloudBaseUrl, FileController} from "../../api/httpurl";
import {Enum} from "../../const/global";
import {
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";

interface Props {
  //更新用户信息
  update: any;
}

interface State {
  videoUrl: string;
}

@connect(state => state.Goods, {...actions})
class MyVideo extends Component<Props, State> {

  private viewRef;
  private uploadResult;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {

  }

  constructor(props) {
    super(props);
    this.uploadResult = this.$router.params.videoUrl;
    this.state = {
      videoUrl: this.uploadResult ? this.uploadResult : ''
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 将文件通过微信Api上传到服务端
   */
  uploadFileTpWx = (path, callback) => {
    if (path.includes('tmp')) {
      this.viewRef && this.viewRef.showLoading();
      let that = this;
      let token = get(Enum.TOKEN);

      Taro.uploadFile({
        url: FileController.uploadVideo,
        filePath: path,
        name: 'file',
        header: {
          'token': token
        },
        success(res) {
          that.uploadResult = parseData(res.data).data;
          callback();
          console.log('上传文件', parseData(res.data).data);
        }
      });
    } else {
      this.uploadResult = path;
      callback();
    }
  }


  render() {

    let {videoUrl} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'我的视频'} customCallback={() => {
          Taro.navigateBack();
        }}/>
        <View style={styleAssign([styles.uf1])}>
          <View
            style={styleAssign([wRatio(100), h(55), pl(20), pr(20), mt(20), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(18), color('#0C0C0C')])}>添加视频</Text>
            <Text style={styleAssign([fSize(12), color('#979797')])}>添加快速说明业务的视频，可提升名片的停留时长哦~</Text>
          </View>
          <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {
            videoUrl.length !== 0 ?
              <View style={styleAssign([wRatio(100), styles.udr, styles.ujc])}>
                <Video
                  style={styleAssign([w(335), h(203), bgColor(commonStyles.whiteColor)])}
                  src={videoUrl}
                  controls={true}
                  autoplay={false}
                  objectFit={'fill'}
                  initialTime={1}
                  id='video'
                  loop={false}
                  muted={false}/>
                <Image style={styleAssign([w(20), h(20), styles.upa, absR(25), absT(8)])}
                       src={`${cloudBaseUrl}ico_close.png`}
                       onClick={() => {
                         this.setState({videoUrl: ''});
                         this.uploadResult = '';
                       }}/>
              </View> :
              <View style={styleAssign([wRatio(100), styles.udr, styles.ujc])}
                    onClick={() => {
                      Taro.chooseVideo({compressed: true}).then((res) => {
                        console.log('视频信息', res);
                        this.setState({videoUrl: res.tempFilePath});
                      });
                    }}>
                <View
                  style={styleAssign([w(335), h(203), bgColor('#F9F9F9'), styles.uac, styles.ujc])}>
                  <View style={styleAssign([styles.uac])}>
                    <Image style={styleAssign([w(41), h(37)])}
                           src={`${cloudBaseUrl}ico_video.png`}/>
                    <Text style={styleAssign([fSize(16), color('#4A4A4A')])}>点击上传</Text>
                  </View>
                </View>
              </View>
          }
        </View>
        {/*保存*/}
        <View style={styleAssign([wRatio(100), h(64), styles.uac, styles.ujc])}>
          <TouchableButton customStyle={styleAssign([w(335), h(48), radiusA(2), bgColor(commonStyles.colorTheme),
            styles.uac, styles.ujc])}
                           onClick={() => {
                             this.uploadFileTpWx(videoUrl, () => {
                               this.update();
                               console.log('上传成功后的视频列表', this.uploadResult);
                             });
                           }}>
            <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>保存</Text>
          </TouchableButton>
        </View>
      </CustomSafeAreaView>
    );
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 更新用户信息
   */
  update = () => {
    this.props.update({
      videoUrl: this.uploadResult,
    }).then((res) => {
      console.log('更新我的视频', res);
      this.viewRef && this.viewRef.hideLoading();
      toast('信息更新成功');
      Taro.navigateBack();

    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }
}

export default MyVideo;
