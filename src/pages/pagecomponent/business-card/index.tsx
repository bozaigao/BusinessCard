/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 个人名片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  fWeight,
  h,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import {cloudBaseUrl} from "../../../api/httpurl";
import {User} from "../../../const/global";


interface Props {
  shareClick: any;
  collectCallback: any;
  visitorCallback: any;
  viewMyCardCallback: any;
  gotoCardCallback: any;
  userInfo: User;
}

interface State {
  imageTempPath: string;
}

export default class Card extends PureComponent<Props, State> {


  componentDidMount() {
    this.drawBall()
  }


  drawBall() {
    Taro.showLoading({
      title: '加载中',
    });
    let {userInfo} = this.props;

    console.log('用户基本资料', userInfo);

    const context = Taro.createCanvasContext('canvas', this)
    //@ts-ignore
    const that = this;

    Taro.getImageInfo({
      src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
    }).then((res) => {
      this.roundRectColor(context, 0, 0, 335, 204, 16);
      //@ts-ignore
      context.drawImage(res.path, 10, 10, 335, 204);
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
              console.log('执行到这里啦');
              context.draw(false, () => {
                Taro.hideLoading();
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

    let {shareClick, collectCallback, visitorCallback, viewMyCardCallback, gotoCardCallback, userInfo} = this.props;
    let {imageTempPath} = this.state;

    return (
      <View style={styleAssign([wRatio(100), styles.uac, mt(10)])}>
        <View style={styleAssign([wRatio(95), h(249), bgColor(commonStyles.whiteColor), radiusA(10)])}>
          <canvas style="width: 335px; height: 204px;background:#fff;margin-top:20px;border-radius:4px;"
                  canvas-id="canvas"/>
          <View style={styleAssign([wRatio(100), h(45), styles.udr, styles.uac, styles.ujb])}
                onClick={gotoCardCallback}>
            <Text
              style={styleAssign([fSize(12), color('#29292E'), ml(16)])}>我的名片</Text>
            <View style={styleAssign([styles.udr, styles.uac, mr(16)])}>
              <Image style={styleAssign([w(18), h(18)])} src={require('../../../assets/ico_mingpianma.png')}/>
              <Image style={styleAssign([w(7), h(12), ml(12)])} src={require('../../../assets/ico_next.png')}/>
            </View>
          </View>
        </View>
        {/*拨打电话等操作*/}
        <View style={styleAssign([wRatio(100), h(144), bgColor(commonStyles.whiteColor), styles.uac, mt(20)])}>
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(20)])}>
            <View style={styleAssign([styles.uf1, styles.uac])}
                  onClick={collectCallback}>
              <Text style={styleAssign([fSize(18), color('#343434'), fWeight('bold')])}>118</Text>
              <View style={styleAssign([styles.udr, styles.uac])}>
                <Image style={styleAssign([w(11), h(11)])} src={`${cloudBaseUrl}ico_star_gray.png`}/>
                <Text style={styleAssign([fSize(12), color('#979797'), ml(5)])}>收藏</Text>
              </View>
            </View>
            <View style={styleAssign([w(1), h(25), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([styles.uf1, styles.uac])} onClick={visitorCallback}>
              <Text style={styleAssign([fSize(18), color('#343434'), fWeight('bold')])}>230</Text>
              <View style={styleAssign([styles.udr, styles.uac])}>
                <Image style={styleAssign([w(11), h(11)])} src={`${cloudBaseUrl}ico_person_gray.png`}/>
                <Text style={styleAssign([fSize(12), color('#979797'), ml(5)])}>访客</Text>
              </View>
            </View>
          </View>
          {/*完善分享名片*/}
          <View
            style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujc, h(44), bgColor(commonStyles.whiteColor), mt(20)])}>
            <View style={styleAssign([styles.udr, styles.uac])}>
              <TouchableButton
                customStyle={styleAssign([w(160), radiusA(4), styles.uac, styles.ujc, bo(1), {borderStyle: 'solid'}, bdColor(commonStyles.colorTheme),
                  bgColor(commonStyles.whiteColor), h(44)])}
                onClick={viewMyCardCallback}>
                <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>查看名片</Text>
              </TouchableButton>
              <TouchableButton
                customStyle={styleAssign([w(160), radiusA(4), ml(15), styles.uac, styles.ujc, bo(1), h(44),
                  bdColor(commonStyles.colorTheme), bgColor(commonStyles.colorTheme)])}
                onClick={() => {
                  shareClick(imageTempPath);
                }}>
                <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>分享名片</Text>
              </TouchableButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
