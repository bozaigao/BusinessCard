/**
 * @filename share_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/23
 * @Description: 商品分享
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {styleAssign, toast} from "../../utils/datatool";
import {bgColor, commonStyles, default as styles} from "../../utils/style";
import * as actions from '../../actions/login';
import {connect} from "@tarojs/redux";
import TopHeader from "../../compoments/top-header/index";
import {View} from "@tarojs/components";
import {User} from "../../const/global";
import BottomButon from "../../compoments/bottom-buton/index";

interface Props {
  userInfo: User;
}

interface State {
  imageTempPath: string;
}

@connect(state => Object.assign(state.taskCenter, state.login), {...actions})
class ShareGoods extends Component<Props, State> {
  private viewRef;
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }

  constructor(props) {
    super(props);
    this.state = {
      imageTempPath: ''
    }
  }


  componentDidMount() {
    this.drawBall()
  }

  drawBall() {
    this.viewRef && this.viewRef.showLoading();
    let {userInfo} = this.props;

    const context = Taro.createCanvasContext('canvas', this)
    //@ts-ignore
    const that = this;

    this.roundRectColor(context, 0, 0, 335, 497, 4);
    Taro.getImageInfo({
      src: userInfo.avatar,
    }).then((res) => {

      let arcWidth = 44;
      //x-轴坐标
      let xCoor = 18;
      //y-轴坐标
      let yCoor = 18;

      context.beginPath();
      context.arc(xCoor + arcWidth / 2, yCoor + arcWidth / 2, arcWidth / 2, 0, Math.PI * 2, false)
      context.clip();
      //@ts-ignore
      context.drawImage(res.path, xCoor, yCoor, arcWidth, arcWidth);
      context.restore();
      context.setFontSize(18);
      context.fillText(`${userInfo.name} 为您推荐`, 70, 48);
      Taro.getImageInfo({
        src: this.$router.params.photo,
      }).then((res) => {
        let fengMianWidth = 300;
        let fengMianHeight = 321;

        //@ts-ignore
        context.drawImage(res.path, xCoor, yCoor + 61, fengMianWidth, fengMianHeight);
        context.fillText(`${this.$router.params.name}`, xCoor, fengMianHeight + 68 + arcWidth);
        context.fillText('参考价格：', xCoor, fengMianHeight + 96 + arcWidth);
        context.setFontSize(24);
        context.setFillStyle('#FA541C');
        context.fillText(`¥${this.$router.params.price}`, xCoor + 90, fengMianHeight + 96 + arcWidth);
        context.setFillStyle('#979797');
        context.setFontSize(12)
        context.fillText('长按识别二维码', xCoor + 220, fengMianHeight + 100 + arcWidth);
        Taro.getImageInfo({
          src: userInfo.wxacode,
        }).then((res) => {
          //@ts-ignore
          context.drawImage(res.path, xCoor + 248, fengMianHeight + 45 + arcWidth, 40, 40);
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
        console.log('保存图片', this.state.imageTempPath);
        Taro.saveImageToPhotosAlbum({
          filePath: this.state.imageTempPath
        }).then(res => {
          that.viewRef && that.viewRef.hideLoading();
          toast('保存成功');
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
            toast('保存成功');
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


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/12
   * @function: 绘制圆角填充色矩形
   */
  roundRectColor(context, x, y, w, h, r) { //绘制圆角矩形（纯色填充）
    context.save();
    context.setFillStyle(commonStyles.whiteColor);
    context.setStrokeStyle(commonStyles.whiteColor)
    context.setLineJoin('round'); //交点设置成圆角
    context.setLineWidth(r);
    context.strokeRect(x + r / 2, y + r / 2, w - r, h - r);
    context.fillRect(x + r, y + r, w - r * 2, h - r * 2);
    context.stroke();
    context.closePath();
  }

  k

  render() {
    return (
      <CustomSafeAreaView
        customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
        notNeedBottomPadding={true}
        ref={(ref) => {
          this.viewRef = ref;
        }}>
        <TopHeader title={'分享商品'}/>
        <View style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <canvas style="width: 335px; height: 497px;background:#fff;margin-top:20px;border-radius:4px;"
                  canvas-id="canvas"/>
          <View style={styleAssign([styles.uf1, styles.uje])}>
            <BottomButon title={'保存商品海报后分享'} onClick={() => {
              this.saveImage();
            }}/>
          </View>
        </View>
      </CustomSafeAreaView>
    )
  }
}

export default ShareGoods;
