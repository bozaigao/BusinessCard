import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {styleAssign, toast} from "../../utils/datatool";
import {bgColor, commonStyles, default as styles} from "../../utils/style";
import TopHeader from "../../compoments/top-header/index";
import * as actions from '../../actions/login';
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import BottomButon from "../../compoments/bottom-buton/index";
import {User} from "../../const/global";
import {connect} from "@tarojs/redux";

interface Props {
  userInfo: User;
  userSettingGet: any;
  getUserInfoById: any;
}

interface State {
  imageTempPath: string;
  userInfo: User;
}

@connect(state => state.login, {...actions})
class MingpianHaibao extends Component<Props, State> {
  private viewRef;
  private posterUrl;

  constructor(props) {
    super(props)
    this.posterUrl = this.$router.params.posterUrl;
    this.state = {
      //@ts-ignore
      userInfo: null,
      imageTempPath: '',
    }
  }

  componentDidMount() {
    this.drawPoster();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/5/3
   * @function: 绘制海报
   */
  drawPoster() {
    this.viewRef && this.viewRef.showLoading('海报生成中');
    let {userInfo} = this.props;

    const context = Taro.createCanvasContext('canvas', this)
    //@ts-ignore
    const that = this;

    Taro.getImageInfo({
      src: this.posterUrl,
    }).then((res) => {
      //@ts-ignore
      context.drawImage(res.path, 0, 0, 251, 417);
      //名片二维码
      Taro.getImageInfo({
        src: userInfo.wxacode,
      }).then((res) => {
        //@ts-ignore
        context.drawImage(res.path, 205, 370, 40, 40);
        context.draw(false, () => {
          that.viewRef && that.viewRef.hideLoading();
          Taro.canvasToTempFilePath({
            canvasId: 'canvas',
            success: function (res) {
              console.log('获得图片临时路径', res);
              // 获得图片临时路径
              that.setState({
                imageTempPath: res.tempFilePath
              })
            }
          })
        });
      });
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/12
   * @function: 保存存图片
   */
  saveImage() {
    let that = this;

    that.viewRef && that.viewRef.showLoading();
    // 查看是否授权
    Taro.getSetting({
      complete() {
        console.log(444)
      }
    }).then(res => {
      if (res.authSetting['scope.writePhotosAlbum']) {
        Taro.saveImageToPhotosAlbum({
          filePath: this.state.imageTempPath
        }).then(res => {
          that.viewRef && that.viewRef.hideLoading();
          toast('海报保存成功');
          Taro.previewImage({
            current: this.state.imageTempPath, // 当前显示图片的http链接
            urls: [this.state.imageTempPath] // 需要预览的图片http链接列表
          })
          console.log(res)
        })
      } else {
        Taro.authorize({
          scope: 'scope.writePhotosAlbum',
        }).then(() => {
          Taro.saveImageToPhotosAlbum({
            filePath: this.state.imageTempPath
          }).then(res => {
            that.viewRef && that.viewRef.hideLoading();
            toast('名片码保存成功');
            Taro.previewImage({
              current: this.state.imageTempPath, // 当前显示图片的http链接
              urls: [this.state.imageTempPath] // 需要预览的图片http链接列表
            })
            console.log(res)
          })
        })
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  ø


  render() {
    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'海报'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uac])}>
            <canvas style="width: 251px; height: 417px;background:#fff;margin-top:40px;border-radius:4px;"
                    canvas-id="canvas"/>
          </View>
          <View style={styleAssign([styles.uf1, styles.uje])}>
            <BottomButon title={'保存海报后分享'} onClick={() => {
              this.saveImage();
            }}/>
          </View>
        </View>
      </CustomSafeAreaView>);
  }
}

export default MingpianHaibao;
