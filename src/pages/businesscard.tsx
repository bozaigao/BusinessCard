/**
 * @filename businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 名片首页
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Button, Image, ScrollView, Text, View} from "@tarojs/components";
//@ts-ignore
import CustomSafeAreaView from "../compoments/safe-area-view/index";
//@ts-ignore
import {get, save, styleAssign} from "../utils/datatool";
import {
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  fWeight,
  h,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../actions/task_center';
import * as loginActions from '../actions/login';
import MyPerson from "./pagecomponent/my-person/index";
import ShareModal from "./pagecomponent/share-modal/index";
import {User} from "../const/global";
import NavigationBar from "../compoments/navigation_bar/index";
import {cloudBaseUrl, NetworkState} from "../api/httpurl";
import BusinessCardGuide1 from "./pagecomponent/business-card-guide1";
import BusinessCardGuide2 from "./pagecomponent/business-card-guide2";
import BusinessCardGuide3 from "./pagecomponent/business-card-guide3";
import TouchableButton from "../compoments/touchable-button";

interface Props {
  //获取用户信息
  getUserInfo: any;
  updateUserInfo: any;
  getRecommendSetting: any;
  recommendSettingStatus: any;
  getRecommend: any;
  userInfo: User;
}

interface State {
  showShare: boolean;
  recommendIsSet: boolean;
  showGuide1: boolean;
  showGuide2: boolean;
  showGuide3: boolean;
  recommendList: any[];
  imageTempPath:string;
}

@connect(state => Object.assign(state.taskCenter, state.login), Object.assign(actions, loginActions))
class Businesscard extends Component<Props, State> {


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
      showShare: false,
      recommendIsSet: false,
      recommendList: [],
      showGuide1: false,
      showGuide2: false,
      showGuide3: false,
      imageTempPath:''
    }
  }

  componentDidShow() {
    this.getUserInfo();
    this.getRecommendSetting();
    this.recommendSettingStatus();
    this.getRecommend('schoolfellow');

    let showGuide1 = get('business_guide1');

    this.setState({showGuide1: !showGuide1});

    let showGuide2 = get('business_guide2');

    this.setState({showGuide2: !showGuide2 && !!showGuide1});

    let showGuide3 = get('business_guide3');

    this.setState({showGuide3: !showGuide3 && !!showGuide2 && !!showGuide1});
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
        context.drawImage(res.path, 325, 90, 11, 9);
        context.setFontSize(12);
        context.setFillStyle('#343434');
        context.setTextAlign('right');
        context.fillText(userInfo.phone, 310, 100);
        //微信
        Taro.getImageInfo({
          src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_wechat.png?sign=d69e311e5b1e06c521c064611bd9d30a&t=1584028318`,
        }).then((res) => {
          //@ts-ignore
          context.drawImage(res.path, 325, 110, 12, 10);
          context.setTextAlign('right');
          context.fillText(userInfo.wechat, 310, 120);
          //邮箱
          Taro.getImageInfo({
            src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_email.png?sign=f35e0d13f139b041fdb849c2e143e5ce&t=1584030793`,
          }).then((res) => {
            //@ts-ignore
            context.drawImage(res.path, 325, 130, 12, 10);
            context.setTextAlign('right');
            context.fillText(userInfo.email ? userInfo.email : '邮箱信息未对外公开', 310, 140);
            //地址
            Taro.getImageInfo({
              src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_location.png?sign=c3abda7fa28594034f71a597086f5864&t=1584030919`,
            }).then((res) => {
              //@ts-ignore
              context.drawImage(res.path, 325, 150, 12, 10);
              context.setTextAlign('right');
              context.fillText(userInfo.detailAddress, 310, 160);
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

  componentWillUnmount() {
    Taro.eventCenter.off('recommend');
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/14
   * @function: 获取人脉推荐
   */
  getRecommend = (recommendType) => {
    this.props.getRecommend({recommendType}).then((res) => {
      if (res !== NetworkState.FAIL) {
        this.setState({recommendList: res});
      }
      console.log('获取人脉推荐', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/14
   * @function: 人脉推荐是否设置
   */
  recommendSettingStatus = () => {
    this.props.recommendSettingStatus().then((res) => {
      if (res !== NetworkState.FAIL) {
        this.setState({recommendIsSet: res === 1});
      }
      console.log('人脉推荐是否设置', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/14
   * @function: 人脉推荐行业和兴趣设置查询
   */
  getRecommendSetting = () => {
    this.props.getRecommendSetting().then((res) => {
      console.log('人脉推荐行业和兴趣设置查询', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/29
   * @function: 更新用户基本资料
   */
  updateUserInfo = (res) => {
    let {userInfo} = this.props;

    userInfo.avatar = res.userInfo.avatarUrl;
    userInfo.city = res.userInfo.city;
    userInfo.province = res.userInfo.province;
    userInfo.name = res.userInfo.nickName;
    userInfo.sex = res.gender;
    this.props.updateUserInfo(userInfo);
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfo = () => {
    this.props.getUserInfo().then((res) => {
      this.props.updateUserInfo(res);
      this.drawBall();
      console.log('重新更新用户信息', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  //@ts-ignore
  onShareAppMessage(res) {
    let {imageTempPath} = this.state;

    console.log('分享图片', imageTempPath)
    return {
      title: `${this.props.userInfo.name}的名片分享`,
      path: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`,
      imageUrl: imageTempPath
    }
  }


  render() {

    let {showShare, recommendIsSet, recommendList, showGuide1, showGuide2, showGuide3} = this.state;
    let {userInfo} = this.props;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}
      >
        {/*切换名片*/}
        <NavigationBar>
          <View
            style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujc])}>
            <Text style={styleAssign([fSize(18), color('#343434')])}>名片</Text>
          </View>
        </NavigationBar>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {/*个人名片*/}
          {
            userInfo && userInfo.id &&
            <View style={styleAssign([wRatio(100), styles.uac, mt(10)])}>
              <View style={styleAssign([wRatio(100), h(249),styles.uac, bgColor(commonStyles.redColor), radiusA(10)])}>
                <canvas style="width: 335px; height: 204px;background:#fff;"
                        canvas-id="canvas"/>
                <View style={styleAssign([w(335), h(45), styles.udr, styles.uac, styles.ujb])}
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/businesscard/ming_pian_ma`
                        });
                      }}>
                  <Text
                    style={styleAssign([fSize(12), color('#29292E'), ml(16)])}>我的名片</Text>
                  <View style={styleAssign([styles.udr, styles.uac, mr(16)])}>
                    <Image style={styleAssign([w(18), h(18)])} src={require('../assets/ico_mingpianma.png')}/>
                    <Image style={styleAssign([w(7), h(12), ml(12)])} src={require('../assets/ico_next.png')}/>
                  </View>
                </View>
              </View>
              {/*拨打电话等操作*/}
              <View style={styleAssign([wRatio(100), h(144), bgColor(commonStyles.whiteColor), styles.uac, mt(20)])}>
                <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(20)])}>
                  <View style={styleAssign([styles.uf1, styles.uac])}
                        onClick={() => {
                          Taro.navigateTo({
                            url: `/pages/businesscard/my_collect?currentIndex=1`
                          });
                        }}>
                    <Text style={styleAssign([fSize(18), color('#343434'), fWeight('bold')])}>118</Text>
                    <View style={styleAssign([styles.udr, styles.uac])}>
                      <Image style={styleAssign([w(11), h(11)])} src={`${cloudBaseUrl}ico_star_gray.png`}/>
                      <Text style={styleAssign([fSize(12), color('#979797'), ml(5)])}>收藏</Text>
                    </View>
                  </View>
                  <View style={styleAssign([w(1), h(25), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  <View style={styleAssign([styles.uf1, styles.uac])} onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/businesscard/my_collect?currentIndex=0`
                    });
                  }}>
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
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`
                        });
                      }}>

                      <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>查看名片</Text>
                    </TouchableButton>
                    <TouchableButton
                      customStyle={styleAssign([w(160), radiusA(4), ml(15), styles.uac, styles.ujc, bo(1), h(44),
                        bdColor(commonStyles.colorTheme), bgColor(commonStyles.colorTheme)])}
                      onClick={() => {
                        this.setState({showShare: true});
                      }}>
                      <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>分享名片</Text>
                    </TouchableButton>
                  </View>
                </View>
              </View>
            </View>
          }
          {/*我的人脉*/}
          <MyPerson chooseCallback={() => {
            Taro.navigateTo({
              url: `/pages/businesscard/choose_renmai_tag`
            });
          }} hasSelected={recommendIsSet} recommendList={recommendList}
                    indexChangeCallback={(index) => {
                      if (index === 0) {
                        this.getRecommend('recommend');
                      } else if (index === 1) {
                        this.getRecommend('interest');
                      } else if (index === 2) {
                        this.getRecommend('villager');
                      } else if (index === 3) {
                        this.getRecommend('schoolfellow');
                      }
                    }}/>
          {/*slogan*/}
          <View style={styleAssign([wRatio(100), h(66), styles.ujc, styles.uac])}>
            <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>极易推 给您极致服务</Text>
          </View>
        </ScrollView>
        {/*创建名片*/}
        <Button lang={'zh_CN'} openType={'getUserInfo'} onGetUserInfo={(data) => {
          // console.log('更新用户信息', token);
          if (!userInfo.avatar) {
            this.updateUserInfo(data.detail);
          }
          Taro.navigateTo({
            url: `/pages/businesscard/add_businesscard`
          });
        }} style={styleAssign([wRatio(100), h(55), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([w(335), h(41), styles.uac, styles.ujc, bgColor('#FAF1E5'), radiusA(30)])}>
            <Text
              style={styleAssign([fSize(14), color('#825D22')])}>{userInfo.cardPercent ? `名片完善度${userInfo.cardPercent}，点击完善` : '创建您的专属名片'}</Text>
          </View>
        </Button>
        {
          showShare && <ShareModal cancle={() => {
            this.setState({showShare: false});
          }
          } wechatShare={(imageTempPath) => {
            this.imageTempPath = imageTempPath;
          }
          } haibao={() => {
            Taro.navigateTo({
              url: `/pages/businesscard/mingpian_haibao`
            });
          }
          }/>
        }
        {
          showGuide1 && <BusinessCardGuide1 cancle={() => {
            save('business_guide1', true);
            this.setState({showGuide1: false, showGuide2: true});
          }
          } createCard={() => {
            save('business_guide1', true);
            this.setState({showGuide1: false, showGuide2: true}, () => {
              Taro.navigateTo({
                url: `/pages/businesscard/add_businesscard`
              });
            });
          }
          }/>
        }
        {
          showGuide2 && <BusinessCardGuide2 cancle={() => {
            save('business_guide2', true);
            this.setState({showGuide2: false, showGuide3: true});
          }
          } viewCard={() => {
            save('business_guide2', true);
            this.setState({showGuide2: false, showGuide3: true}, () => {
              Taro.navigateTo({
                url: `/pages/businesscard/other_businesscard?userId=${this.props.userInfo.id}`
              });
            });
          }
          }/>
        }
        {
          showGuide3 && <BusinessCardGuide3 cancle={() => {
            save('business_guide3', true);
            this.setState({showGuide3: false});
          }
          } shareCard={() => {
            save('business_guide3', true);
            this.setState({showGuide3: false, showShare: true});
          }
          }/>
        }
      </CustomSafeAreaView>
    )
  }
}

export default Businesscard;
