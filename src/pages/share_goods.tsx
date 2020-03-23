/**
 * @filename share_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/23
 * @Description: 商品分享
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../compoments/safe-area-view/index";
import {styleAssign} from "../utils/datatool";
import {absB, absR, bgColor, color, commonStyles, default as styles, fSize, h, mt, w, wRatio} from "../utils/style";
import * as actions from '../actions/login';
import {connect} from "@tarojs/redux";
import TopHeader from "../compoments/top-header";
import {Button, Image, Text, View} from "@tarojs/components";
import TouchableButton from "../compoments/touchable-button";
import {User} from "../const/global";

interface Props {
  userInfo: User;
}

interface State {
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
      showShare: true
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

    this.roundRectColor(context, 0, 0, 272, 405, 4);
    Taro.getImageInfo({
      //"https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/3ccb9ece-ce65-4c0d-9c0e-90f9d8d481b9user_20_1584091341305.jpg"
      src: "https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/f5d2edf9-204a-4eb9-8c75-f643b9ee9d23wx7834b9fe3df7e260.o6zAJs4Isyce0yXyimX4btWbjcko.zUap8D6fA36n97685444eaa98aaf0dbba1eb1b6e29aa.jpeg",
    }).then((res) => {

      let arcWidth = 36;
      //x-轴坐标
      let xCoor = 14;
      //y-轴坐标
      let yCoor = 14;

      context.beginPath();
      context.arc(xCoor + arcWidth / 2, yCoor + arcWidth / 2, arcWidth / 2, 0, Math.PI * 2, false)
      context.clip();
      console.log('路径', res.path)
      //@ts-ignore
      context.drawImage(res.path, xCoor, yCoor, arcWidth, arcWidth);
      context.restore();
      context.setFontSize(14);
      context.fillText('王嘉怡 为您推荐', 70, 38);
      Taro.getImageInfo({
        //"https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/3ccb9ece-ce65-4c0d-9c0e-90f9d8d481b9user_20_1584091341305.jpg"
        src: "https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/f5d2edf9-204a-4eb9-8c75-f643b9ee9d23wx7834b9fe3df7e260.o6zAJs4Isyce0yXyimX4btWbjcko.zUap8D6fA36n97685444eaa98aaf0dbba1eb1b6e29aa.jpeg",
      }).then((res) => {
        let fengMianWidth = 244;
        let fengMianHeight = 263;

        //@ts-ignore
        context.drawImage(res.path, xCoor, yCoor + 48, fengMianWidth, fengMianHeight);
        context.fillText('现代简约双人木床', xCoor, fengMianHeight + 48 + arcWidth);
        context.fillText('参考价格：', xCoor, fengMianHeight + 68 + arcWidth);
        context.setFontSize(19);
        context.setFillStyle('#FA541C');
        context.fillText('¥600', xCoor + 80, fengMianHeight + 68 + arcWidth);
        context.setFillStyle('#979797');
        context.setFontSize(9)
        context.fillText('长按识别二维码', xCoor + 180, fengMianHeight + 72 + arcWidth);
        Taro.getImageInfo({
          //"https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/3ccb9ece-ce65-4c0d-9c0e-90f9d8d481b9user_20_1584091341305.jpg"
          src: "https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/f5d2edf9-204a-4eb9-8c75-f643b9ee9d23wx7834b9fe3df7e260.o6zAJs4Isyce0yXyimX4btWbjcko.zUap8D6fA36n97685444eaa98aaf0dbba1eb1b6e29aa.jpeg",
        }).then((res) => {
          //@ts-ignore
          context.drawImage(res.path, xCoor + 198, fengMianHeight + 30 + arcWidth, 32, 32);
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


  render() {
    return (
      <CustomSafeAreaView
        customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
        notNeedBottomPadding={true}
        ref={(ref) => {
          this.viewRef = ref;
        }}>
        <TopHeader title={'分享商品'}/>
        <View style={styleAssign([styles.uf1, styles.uac, bgColor('rgb(99,99,99)')])}>
          <canvas style="width: 272px; height: 405px;background:#fff;margin-top:20px;border-radius:4px;"
                  canvas-id="canvas"/>
          <View
            style={styleAssign([styles.upa, absB(0), absR(0), wRatio(100)])}>
            <View style={styleAssign([wRatio(100), h(194), bgColor(commonStyles.whiteColor), styles.upa, absB(0)])}>
              {/*微信分享、名片海报*/}
              <View style={styleAssign([wRatio(100), h(148), styles.udr, styles.uac, styles.ujb])}>
                <Button openType={'share'}
                        style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.whiteColor)])}>
                  <Image style={styleAssign([w(62), h(62)])} src={require('../assets/ico_wechat.png')}/>
                  <Text style={styleAssign([fSize(13), color('#0C0C0C'), mt(5)])}>微信好友</Text>
                </Button>
                <Button style={styleAssign([styles.uac, styles.uf1, bgColor(commonStyles.whiteColor)])}
                        onClick={() => {
                          this.setState({showShare: false});
                        }}>
                  <Image style={styleAssign([w(62), h(62)])} src={require('../assets/ico_wechat_friend.png')}/>
                  <Text style={styleAssign([fSize(13), color('#0C0C0C'), mt(5)])}>朋友圈</Text>
                </Button>
                <Button style={styleAssign([styles.uac, styles.uf1, bgColor(commonStyles.whiteColor)])}
                        onClick={() => {
                          this.setState({showShare: false});
                        }}>
                  <Image style={styleAssign([w(62), h(62)])} src={require('../assets/ico_download_pic.png')}/>
                  <Text style={styleAssign([fSize(13), color('#0C0C0C'), mt(5)])}>保存到手机</Text>
                </Button>
              </View>
              <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              {/*取消*/}
              <TouchableButton
                onClick={() => {
                  this.setState({showShare: false});
                }}
                customStyle={styleAssign([wRatio(100), h(40), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
                <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>取消</Text>
              </TouchableButton>
              <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            </View>
          </View>
        </View>
      </CustomSafeAreaView>
    )
  }
}

export default ShareGoods;
