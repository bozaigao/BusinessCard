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

    Taro.getImageInfo({
      src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
    }).then((res) => {
      this.roundRectColor(context, 0, 0, 272, 405, 4);
      //@ts-ignore
      context.drawImage(res.path, 10, 10, 313, 194);
      //电话
      Taro.getImageInfo({
        src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_mobile.png?sign=16ccd18da0a7c3bbcbb3bf1f8a582b0d&t=1584026985`,
      }).then((res) => {
        //@ts-ignore
        context.drawImage(res.path, 295, 90, 11, 9);
        context.setFontSize(12);
        context.setFillStyle('#343434');
        context.setTextAlign('right');
        context.fillText(userInfo.phone, 290, 100);
        //微信
        Taro.getImageInfo({
          src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_wechat.png?sign=d69e311e5b1e06c521c064611bd9d30a&t=1584028318`,
        }).then((res) => {
          //@ts-ignore
          context.drawImage(res.path, 295, 110, 12, 10);
          context.setTextAlign('right');
          context.fillText(userInfo.wechat, 290, 120);
          //邮箱
          Taro.getImageInfo({
            src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_email.png?sign=f35e0d13f139b041fdb849c2e143e5ce&t=1584030793`,
          }).then((res) => {
            //@ts-ignore
            context.drawImage(res.path, 295, 130, 12, 10);
            context.setTextAlign('right');
            context.fillText(userInfo.email ? userInfo.email : '邮箱信息未对外公开', 290, 140);
            //地址
            Taro.getImageInfo({
              src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_location.png?sign=c3abda7fa28594034f71a597086f5864&t=1584030919`,
            }).then((res) => {
              //@ts-ignore
              context.drawImage(res.path, 295, 150, 12, 10);
              context.setTextAlign('right');
              context.fillText(userInfo.detailAddress, 290, 160);
              //小程序码
              Taro.getImageInfo({
                src: `https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/1a6fe6b5-a397-476c-8ddb-ab1c50d016fauser_20_1583967075205.jpg`,
              }).then((res) => {
                //@ts-ignore
                context.drawImage(res.path, 15, 360, 44, 44);
                context.setTextAlign('right');
                Taro.getImageInfo({
                  src: userInfo.avatar,
                }).then((res) => {

                  let arcWidth = 60;
                  //x-轴坐标
                  let xCoor = 30;
                  //y-轴坐标
                  let yCoor = 20;

                  context.beginPath();
                  context.arc(xCoor + arcWidth / 2, yCoor + arcWidth / 2, arcWidth / 2, 0, Math.PI * 2, false)
                  context.clip();
                  //@ts-ignore
                  context.drawImage(res.path, xCoor, yCoor, arcWidth, arcWidth);
                  context.restore();
                  context.setFontSize(18);
                  context.setFillStyle(commonStyles.colorTheme);
                  context.fillText(userInfo.name, 34, 115);
                  context.setFontSize(12);
                  context.fillText(userInfo.position, 100, 115);
                  context.fillText(userInfo.company, 34, 140);
                  context.setFontSize(14);
                  context.fillText('您好,', 15, 240);
                  context.setFillStyle('#E2BB7B');
                  context.fillText('长按识别二维码 收下名片', 70, 390);
                  context.setStrokeStyle(commonStyles.pageDefaultBackgroundColor);
                  context.moveTo(0, 340);
                  context.lineTo(335, 340);
                  context.stroke();
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
