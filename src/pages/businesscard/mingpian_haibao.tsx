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
import {NetworkState} from "../../api/httpurl";

interface Props {
  userInfo: User;
  userSettingGet: any;
}

interface State {
  imageTempPath: string;
  cardStyle: string;
  hidePhone: boolean;
  hideWechat: boolean;
  hideEmail: boolean;
  hideAddress: boolean;
}

@connect(state => state.login, {...actions})
class MingpianHaibao extends Component<Props, State> {
  private viewRef;

  constructor(props) {
    super(props)
    this.state = {
      imageTempPath: '',
      cardStyle: '-1',
      hidePhone: false,
      hideWechat: false,
      hideEmail: false,
      hideAddress: false,
    }
  }

  componentDidMount() {
    console.log('用户信息', this.props.userInfo);
    this.userSettingGet();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/25
   * @function: 获取用户的设置信息
   */
  userSettingGet = () => {
    this.props.userSettingGet({userId: this.props.userInfo.id}).then((res) => {
      if (res !== NetworkState.FAIL) {
        this.setState({
          hidePhone: res.phone === 0,
          hideWechat: res.wechat === 0,
          hideEmail: res.email === 0,
          hideAddress: res.address === 0,
          cardStyle: res.cardStyle
        }, () => {
          if (this.state.cardStyle === '0') {
            this.drawBallStyle1();
          } else if (this.state.cardStyle === '1') {
            this.drawBallStyle2();
          } else if (this.state.cardStyle === '2') {
            this.drawBallStyle3();
          } else if (this.state.cardStyle === '3') {
            this.drawBallStyle4();
          } else if (this.state.cardStyle === '4') {
            this.drawBallStyle5();
          }
        });
      }
      console.log('获取用户的设置信息', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/25
   * @function: 样式1商务版
   */
  drawBallStyle1() {
    this.viewRef && this.viewRef.showLoading('海报生成中');
    let {userInfo} = this.props;
    let {hideEmail, hideAddress, hidePhone, hideWechat} = this.state;

    const context = Taro.createCanvasContext('canvas', this)
    //@ts-ignore
    const that = this;

    Taro.getImageInfo({
      src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg1.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
    }).then((res) => {
      this.roundRectColor(context, 0, 0, 335, 434, 16);
      //@ts-ignore
      context.drawImage(res.path, 10, 10, 313, 194);
      //电话
      Taro.getImageInfo({
        src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_mobile_gray.png?sign=a0b9ff52662e0b32a72ab4a78559cb02&t=1585125501`,
      }).then((res) => {
        if (!hidePhone) {
          //@ts-ignore
          context.drawImage(res.path, 295, 90, 11, 9);
          context.setFontSize(12);
          context.setFillStyle('#343434');
          context.setTextAlign('right');
          context.fillText(userInfo.phone, 290, 100);
        }
        //微信
        Taro.getImageInfo({
          src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_wechat_gray.png?sign=76fc4851c80b994c1982f9d598893b00&t=1585125546`,
        }).then((res) => {
          if (!hideWechat) {
            //@ts-ignore
            context.drawImage(res.path, 295, 110, 12, 10);
            context.setTextAlign('right');
            context.fillText(userInfo.wechat, 290, 120);
          }
          //邮箱
          Taro.getImageInfo({
            src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_email_gray.png?sign=aeaa9c0c82237be640551b27cf3e3a5e&t=1585125409`,
          }).then((res) => {
            if (!hideEmail) {
              //@ts-ignore
              context.drawImage(res.path, 295, 130, 12, 10);
              context.setTextAlign('right');
              context.fillText(userInfo.email, 290, 140);
            }
            //地址
            Taro.getImageInfo({
              src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_location_gray.png?sign=0d2086dff61b5fc45c269bab7980a1f7&t=1585125458`,
            }).then((res) => {
              if (!hideAddress) {
                //@ts-ignore
                context.drawImage(res.path, 295, 150, 12, 10);
                context.setTextAlign('right');
                context.fillText(userInfo.detailAddress, 290, 160);
              }
              //小程序码
              Taro.getImageInfo({
                src: userInfo.wxacode,
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
                  context.fillText(userInfo.position, that.measureTextWidth(context, userInfo.name, 18, 40), 115);
                  context.setFontSize(12);
                  context.fillText(userInfo.enterpriseName.length > 10 ? userInfo.enterpriseName.substring(0, 11)+'...' : userInfo.enterpriseName, 34, 140);
                  context.setFontSize(14);
                  context.fillText('您好,', 15, 240);
                  that.fillTextWrap(context, `我是${userInfo.enterpriseName}的${userInfo.position}${userInfo.name}`, 15, 260, 294, 20, 14);
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
   * @date 2020/3/25
   * @function: 样式2黑金版
   */
  drawBallStyle2() {
    this.viewRef && this.viewRef.showLoading('海报生成中');
    let {userInfo} = this.props;
    let {hideEmail, hideAddress, hidePhone, hideWechat} = this.state;

    const context = Taro.createCanvasContext('canvas', this)
    //@ts-ignore
    const that = this;

    Taro.getImageInfo({
      src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg2.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
    }).then((res) => {
      this.roundRectColor(context, 0, 0, 335, 434, 16);
      //@ts-ignore
      context.drawImage(res.path, 10, 10, 313, 194);
      //电话
      Taro.getImageInfo({
        src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_mobile_white.png?sign=f1c449e5641a4e599fe465fb92d61ffa&t=1585126741`,
      }).then((res) => {
        if (!hidePhone) {
          //@ts-ignore
          context.drawImage(res.path, 230, 175, 11, 9);
          context.setFontSize(12);
          context.setFillStyle(commonStyles.whiteColor);
          context.setTextAlign('left');
          context.fillText(userInfo.phone, 42, 110);
        }
        //微信
        Taro.getImageInfo({
          src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_wechat_white.png?sign=ade4af5a05ef6c2bc1f9bce5bf2c1102&t=1585126764`,
        }).then((res) => {
          if (!hideWechat) {
            //@ts-ignore
            context.drawImage(res.path, 248, 175, 12, 10);
            context.setTextAlign('left');
            context.fillText(userInfo.wechat, 42, 130);
          }
          //邮箱
          Taro.getImageInfo({
            src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_email_white.png?sign=18c78e0a941c1a9b9c672764e82a87e7&t=1585126677`,
          }).then((res) => {
            if (!hideEmail) {
              //@ts-ignore
              context.drawImage(res.path, 267, 175, 12, 10);
              context.setTextAlign('left');
              context.fillText(userInfo.email, 42, 150);
            }
            //地址
            Taro.getImageInfo({
              src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_location_white.png?sign=2cc8541bf5e97610964db8f657c6565c&t=1585126701`,
            }).then((res) => {
              if (!hideAddress) {
                //@ts-ignore
                context.drawImage(res.path, 286, 175, 12, 10);
                context.setTextAlign('left');
                context.fillText(userInfo.detailAddress, 42, 170);
              }
              //小程序码
              Taro.getImageInfo({
                src: userInfo.wxacode,
              }).then((res) => {
                //@ts-ignore
                context.drawImage(res.path, 15, 360, 44, 44);
                context.setTextAlign('right');
                Taro.getImageInfo({
                  src: userInfo.avatar,
                }).then((res) => {

                  let arcWidth = 60;
                  //x-轴坐标
                  let xCoor = 42;
                  //y-轴坐标
                  let yCoor = 28;

                  context.beginPath();
                  context.arc(xCoor + arcWidth / 2, yCoor + arcWidth / 2, arcWidth / 2, 0, Math.PI * 2, false)
                  context.clip();
                  //@ts-ignore
                  context.drawImage(res.path, xCoor, yCoor, arcWidth, arcWidth);
                  context.restore();
                  context.setFontSize(18);
                  context.setFillStyle('#E2BB7B');
                  context.fillText(userInfo.name, 120, 60);
                  context.setFontSize(12);
                  context.setFillStyle(commonStyles.whiteColor);
                  context.fillText(userInfo.position, 120, 80);
                  context.setTextAlign('right');
                  that.fillTextWrap2(context, userInfo.enterpriseName, 300, 40, 100, 16, 12, commonStyles.whiteColor);
                  context.setTextAlign('left');
                  context.setFontSize(14);
                  context.fillText('您好,', 15, 240);
                  that.fillTextWrap(context, `我是${userInfo.enterpriseName}的${userInfo.position}${userInfo.name}`, 15, 260, 294, 20, 14);
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
   * @date 2020/3/25
   * @function: 样式3简约版
   */
  drawBallStyle3() {
    this.viewRef && this.viewRef.showLoading('海报生成中');
    let {userInfo} = this.props;
    let {hideEmail, hideAddress, hidePhone, hideWechat} = this.state;

    const context = Taro.createCanvasContext('canvas', this)
    //@ts-ignore
    const that = this;

    Taro.getImageInfo({
      src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg3.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
    }).then((res) => {
      this.roundRectColor(context, 0, 0, 335, 434, 16);
      //@ts-ignore
      context.drawImage(res.path, 10, 10, 313, 194);
      //电话
      Taro.getImageInfo({
        src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_mobile_gray.png?sign=a0b9ff52662e0b32a72ab4a78559cb02&t=1585125501`,
      }).then((res) => {
        if (!hidePhone) {
          //@ts-ignore
          context.drawImage(res.path, 38, 146, 11, 9);
          context.setFontSize(12);
          context.setFillStyle('#343434');
          context.setTextAlign('left');
          context.fillText(userInfo.phone, 53, 155);
        }
        //微信
        Taro.getImageInfo({
          src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_wechat_gray.png?sign=76fc4851c80b994c1982f9d598893b00&t=1585125546`,
        }).then((res) => {
          if (!hideWechat) {
            //@ts-ignore
            context.drawImage(res.path, 38, 164, 12, 10);
            context.setTextAlign('left');
            context.fillText(userInfo.wechat, 58, 174);
          }
          //邮箱
          Taro.getImageInfo({
            src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_email_gray.png?sign=aeaa9c0c82237be640551b27cf3e3a5e&t=1585125409`,
          }).then((res) => {
            if (!hideEmail) {
              //@ts-ignore
              context.drawImage(res.path, 178, 146, 12, 10);
              context.setTextAlign('left');
              context.fillText(userInfo.email, 194, 155);
            }
            //地址
            Taro.getImageInfo({
              src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_location_gray.png?sign=0d2086dff61b5fc45c269bab7980a1f7&t=1585125458`,
            }).then((res) => {
              if (!hideAddress) {
                //@ts-ignore
                context.drawImage(res.path, 178, 164, 12, 10);
                context.setTextAlign('left');
                that.fillTextWrap2(context, userInfo.detailAddress, 192, 174, 100, 16, 12, '#343434');
              }
              //小程序码
              Taro.getImageInfo({
                src: userInfo.wxacode,
              }).then((res) => {
                //@ts-ignore
                context.drawImage(res.path, 15, 360, 44, 44);
                context.setTextAlign('right');
                Taro.getImageInfo({
                  src: userInfo.avatar,
                }).then((res) => {

                  let arcWidth = 60;
                  //x-轴坐标
                  let xCoor = 140;
                  //y-轴坐标
                  let yCoor = 18;

                  context.beginPath();
                  context.arc(xCoor + arcWidth / 2, yCoor + arcWidth / 2, arcWidth / 2, 0, Math.PI * 2, false)
                  context.clip();
                  //@ts-ignore
                  context.drawImage(res.path, xCoor, yCoor, arcWidth, arcWidth);
                  context.restore();
                  context.setFontSize(18);
                  context.setFillStyle('#343434');
                  context.setTextAlign('center');
                  context.fillText(userInfo.name, 170, 100);
                  context.setFontSize(12);
                  context.setFillStyle('#343434');
                  context.fillText(userInfo.position, 170, 117);
                  context.fillText(userInfo.enterpriseName, 170, 132);
                  context.setFontSize(14);
                  context.setTextAlign('left');
                  context.fillText('您好,', 15, 240);
                  that.fillTextWrap(context, `我是${userInfo.enterpriseName}的${userInfo.position}${userInfo.name}`, 15, 260, 294, 20, 14);
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
   * @date 2020/3/25
   * @function: 样式4极简版
   */
  drawBallStyle4() {
    this.viewRef && this.viewRef.showLoading('海报生成中');
    let {userInfo} = this.props;
    let {hideEmail, hideAddress, hidePhone, hideWechat} = this.state;

    const context = Taro.createCanvasContext('canvas', this)
    //@ts-ignore
    const that = this;

    Taro.getImageInfo({
      src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg4.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
    }).then((res) => {
      this.roundRectColor(context, 0, 0, 335, 434, 16);
      //@ts-ignore
      context.drawImage(res.path, 10, 10, 313, 194);
      //电话
      Taro.getImageInfo({
        src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_mobile_gray.png?sign=a0b9ff52662e0b32a72ab4a78559cb02&t=1585125501`,
      }).then((res) => {
        if (!hidePhone) {
          //@ts-ignore
          context.drawImage(res.path, 38, 106, 11, 9);
          context.setFontSize(12);
          context.setFillStyle('#343434');
          context.setTextAlign('left');
          context.fillText(userInfo.phone, 53, 115);
        }
        //微信
        Taro.getImageInfo({
          src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_wechat_gray.png?sign=76fc4851c80b994c1982f9d598893b00&t=1585125546`,
        }).then((res) => {
          if (!hideWechat) {
            //@ts-ignore
            context.drawImage(res.path, 38, 124, 12, 10);
            context.setTextAlign('left');
            context.fillText(userInfo.wechat, 58, 134);
          }
          //邮箱
          Taro.getImageInfo({
            src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_email_gray.png?sign=aeaa9c0c82237be640551b27cf3e3a5e&t=1585125409`,
          }).then((res) => {
            if (!hideEmail) {
              //@ts-ignore
              context.drawImage(res.path, 38, 146, 12, 10);
              context.setTextAlign('left');
              context.fillText(userInfo.email, 58, 155);
            }
            //地址
            Taro.getImageInfo({
              src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_location_gray.png?sign=0d2086dff61b5fc45c269bab7980a1f7&t=1585125458`,
            }).then((res) => {
              if (!hideAddress) {
                //@ts-ignore
                context.drawImage(res.path, 38, 164, 12, 10);
                context.setTextAlign('left');
                context.fillText(userInfo.detailAddress, 58, 174);
              }
              //小程序码
              Taro.getImageInfo({
                src: userInfo.wxacode,
              }).then((res) => {
                //@ts-ignore
                context.drawImage(res.path, 15, 360, 44, 44);
                context.setTextAlign('right');
                Taro.getImageInfo({
                  src: userInfo.avatar,
                }).then((res) => {

                  let arcWidth = 60;
                  //x-轴坐标
                  let xCoor = 240;
                  //y-轴坐标
                  let yCoor = 24;

                  context.beginPath();
                  context.arc(xCoor + arcWidth / 2, yCoor + arcWidth / 2, arcWidth / 2, 0, Math.PI * 2, false)
                  context.clip();
                  //@ts-ignore
                  context.drawImage(res.path, xCoor, yCoor, arcWidth, arcWidth);
                  context.restore();
                  context.setFontSize(18);
                  context.setFillStyle('#343434');
                  context.setTextAlign('left');
                  context.fillText(userInfo.name, 44, 65);
                  context.setFillStyle('#343434');
                  context.fillText(userInfo.position, that.measureTextWidth(context, userInfo.name, 18, 60), 65)
                  context.setFontSize(12);
                  context.setTextAlign('left');
                  context.fillText(userInfo.enterpriseName, 44, 85);
                  context.setFontSize(14);
                  context.setTextAlign('left');
                  context.fillText('您好,', 15, 240);
                  that.fillTextWrap(context, `我是${userInfo.enterpriseName}的${userInfo.position}${userInfo.name}`, 15, 260, 294, 20, 14);
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
   * @date 2020/3/25
   * @function: 样式5实景版
   */
  drawBallStyle5() {
    this.viewRef && this.viewRef.showLoading('海报生成中');
    let {userInfo} = this.props;
    let {hideEmail, hideAddress, hidePhone, hideWechat} = this.state;

    const context = Taro.createCanvasContext('canvas', this)
    //@ts-ignore
    const that = this;

    Taro.getImageInfo({
      src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg5.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
    }).then((res) => {
      this.roundRectColor(context, 0, 0, 335, 434, 16);
      //@ts-ignore
      context.drawImage(res.path, 10, 10, 313, 194);
      //电话
      Taro.getImageInfo({
        src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_mobile_white.png?sign=f1c449e5641a4e599fe465fb92d61ffa&t=1585126741`,
      }).then((res) => {
        if (!hidePhone) {
          //@ts-ignore
          context.drawImage(res.path, 38, 106, 11, 9);
          context.setFontSize(12);
          context.setFillStyle(commonStyles.whiteColor);
          context.setTextAlign('left');
          context.fillText(userInfo.phone, 53, 115);
        }
        //微信
        Taro.getImageInfo({
          src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_wechat_white.png?sign=ade4af5a05ef6c2bc1f9bce5bf2c1102&t=1585126764`,
        }).then((res) => {
          if (!hideWechat) {
            //@ts-ignore
            context.drawImage(res.path, 38, 124, 12, 10);
            context.setTextAlign('left');
            context.fillText(userInfo.wechat, 58, 134);
          }
          //邮箱
          Taro.getImageInfo({
            src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_email_white.png?sign=18c78e0a941c1a9b9c672764e82a87e7&t=1585126677`,
          }).then((res) => {
            if (!hideEmail) {
              //@ts-ignore
              context.drawImage(res.path, 38, 146, 12, 10);
              context.setTextAlign('left');
              context.fillText(userInfo.email, 58, 155);
            }
            //地址
            Taro.getImageInfo({
              src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_location_white.png?sign=2cc8541bf5e97610964db8f657c6565c&t=1585126701`,
            }).then((res) => {
              if (!hideAddress) {
                //@ts-ignore
                context.drawImage(res.path, 38, 164, 12, 10);
                context.setTextAlign('left');
                context.setFillStyle(commonStyles.whiteColor);
                that.fillTextWrap2(context, userInfo.detailAddress, 58, 174, 180, 16, 12, commonStyles.whiteColor);
              }
              //小程序码
              Taro.getImageInfo({
                src: userInfo.wxacode,
              }).then((res) => {
                //@ts-ignore
                context.drawImage(res.path, 15, 360, 44, 44);
                context.setTextAlign('right');
                context.restore();
                context.setFontSize(18);
                context.setFillStyle(commonStyles.whiteColor);
                context.setTextAlign('left');
                context.fillText(userInfo.name, 44, 65);
                context.fillText(userInfo.position, that.measureTextWidth(context, userInfo.name, 18, 60), 65);
                context.setFontSize(12);
                context.setTextAlign('left');
                context.fillText(userInfo.enterpriseName, 44, 85);
                context.setFontSize(14);
                context.setTextAlign('left');
                context.fillText('您好,', 15, 240);
                that.fillTextWrap(context, `我是${userInfo.enterpriseName}的${userInfo.position}${userInfo.name}`, 15, 260, 294, 20, 14);
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
          toast('名片码保存成功');
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

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/12
   * @function: 文字换行
   */
  fillTextWrap2(ctx, text, x, y, maxWidth, lineHeight, fontSize, color) {
    // 设定默认最大宽度
    const systemInfo = Taro.getSystemInfoSync();
    const deciveWidth = systemInfo.screenWidth;

    maxWidth = maxWidth || deciveWidth;
    lineHeight = lineHeight || 20;
    // 校验参数
    if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
      return;
    }
    // 字符串分割为数组
    const arrText = text.split('');
    // 当前字符串及宽度
    let currentText = '';
    let currentWidth;

    ctx.setFontSize(fontSize);
    ctx.setFillStyle(color);
    ctx.setTextAlign('justify');
    for (let letter of arrText) {
      currentText += letter;
      currentWidth = ctx.measureText(currentText).width;
      if (currentWidth > maxWidth) {
        ctx.fillText(currentText, x, y);
        currentText = '';
        y += lineHeight;
      }
    }
    if (currentText) {
      ctx.fillText(currentText, x, y);
    }
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/12
   * @function: 文字换行
   */
  fillTextWrap(ctx, text, x, y, maxWidth, lineHeight, fontSize) {
    // 设定默认最大宽度
    const systemInfo = Taro.getSystemInfoSync();
    const deciveWidth = systemInfo.screenWidth;

    maxWidth = maxWidth || deciveWidth;
    lineHeight = lineHeight || 20;
    // 校验参数
    if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
      return;
    }
    // 字符串分割为数组
    const arrText = text.split('');
    // 当前字符串及宽度
    let currentText = '';
    let currentWidth;

    ctx.setFontSize(fontSize);
    ctx.setFillStyle('#3A3A3A');
    ctx.setTextAlign('justify');
    for (let letter of arrText) {
      currentText += letter;
      currentWidth = ctx.measureText(currentText).width;
      if (currentWidth > maxWidth) {
        ctx.fillText(currentText, x, y);
        currentText = '';
        y += lineHeight;
      }
    }
    if (currentText) {
      ctx.fillText(currentText, x, y);
      ctx.fillText('这是我的名片，请惠存。', x, y + 20);
      ctx.fillText('谢谢!', x, y + 40);
    }
  }


  measureTextWidth(ctx, text, fontSize, startX) {
    // 字符串分割为数组
    ctx.setFontSize(fontSize);
    let currentWidth = ctx.measureText(text).width;

    return currentWidth + startX;
  }

  render() {
    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'名片海报'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uac])}>
            <canvas style="width: 335px; height: 434px;background:#fff;margin-top:20px;border-radius:4px;"
                    canvas-id="canvas"/>
          </View>
          <View style={styleAssign([styles.uf1, styles.uje])}>
            <BottomButon title={'保存名片海报后分享'} onClick={() => {
              this.saveImage();
            }}/>
          </View>
        </View>
      </CustomSafeAreaView>);
  }
}

export default MingpianHaibao;
