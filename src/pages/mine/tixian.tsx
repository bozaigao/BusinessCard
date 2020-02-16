/**
 * @filename tixian.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 提现
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  absB,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  mb,
  ml,
  mr,
  mt,
  pl,
  pr,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import {User} from "../../const/global";
import {cloudBaseUrl} from "../../api/httpurl";


interface Props {
  //获取用户信息
  getUserInfo: any;
  userInfo: User;
}

interface State {
  marginTop: number;
  year: string;
}

@connect(state => state.login, {...actions})
class TiXian extends Component<Props, State> {

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
      marginTop: 0,
      year: `${new Date().getFullYear()}`
    }
  }

  componentWillMount() {
    if (iphoneX()) {
      this.setState({marginTop: 43});
    } else {
      this.setState({marginTop: 15});
    }
    Taro.eventCenter.on('refreshUserInfo', () => {
      console.log('刷新用户信息');
      this.getUserInfo();
    });
    this.getUserInfo();
  }

  componentWillUnmount() {
    Taro.eventCenter.off('refreshUserInfo');
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfo = () => {
    this.props.getUserInfo().then((res) => {
      console.log('获取用户信息', res);
      console.log('属性', this.props.userInfo);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  render() {
    let {marginTop, year} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}
                          notNeedBottomPadding={true} notNeedTopPadding={true}>
        <View style={styleAssign([wRatio(100), hRatio(100)])}>
          <View style={styleAssign([wRatio(100), h(iphoneX() ? 322 : 322)])}>
            <Image style={styleAssign([wRatio(100), h(iphoneX() ? 242 : 222)])} src={`${cloudBaseUrl}ico_mine_bg.png`}/>
            <View style={styleAssign([wRatio(100), h(213), styles.upa, absB(0), styles.uac, styles.ujc])}>
              <View style={styleAssign([w(335), h(213), bgColor(commonStyles.whiteColor), radiusA(4),])}>
                <View style={styleAssign([wRatio(100), h(60), styles.uac, styles.ujc, bgColor('#FAF1E5'),
                  radiusTL(4), radiusTR(4)])}>
                  <Text style={styleAssign([fSize(16), color('#343434')])}>
                    累计数据
                  </Text>
                </View>
                <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(15)])}>
                  <View style={styleAssign([styles.uf1, styles.uac])}>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>
                      已结算收入(税前)
                    </Text>
                    <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                      <Text style={styleAssign([fSize(14), color('#FA6B57'), mb(5)])}>
                        ¥
                      </Text>
                      <Text style={styleAssign([fSize(24), color('#FA6B57')])}>
                        688.00
                      </Text>
                    </View>
                  </View>
                  <View style={styleAssign([w(1), h(40), bgColor('#E5E5E5')])}/>
                  <View style={styleAssign([styles.uf1, styles.uac])}>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>
                      未结算收入(税前)
                    </Text>
                    <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                      <Text style={styleAssign([fSize(14), color('#FA6B57'), mb(5)])}>
                        ¥
                      </Text>
                      <Text style={styleAssign([fSize(24), color('#FA6B57')])}>
                        0.00
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(44), styles.uac, styles.udr, styles.ujb,
            styles.upa, absT(marginTop)])}>
            <Image style={styleAssign([w(22), h(22), ml(20)])}
                   src={require('../../assets/ico_back_white.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
            <Text style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>
              提现
            </Text>
            <View style={styleAssign([w(22), h(22)])}/>
          </View>
          {/*我的提现记录*/}
          <View style={styleAssign([wRatio(100), styles.uac])}
                onClick={() => {

                }}>
            <View style={styleAssign([wRatio(100), h(51), styles.udr, styles.uac, styles.ujb, pl(20), pr(20),
              bgColor(commonStyles.whiteColor), mt(20)])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Image style={styleAssign([w(20), h(20)])} src={require('../../assets/ico_tixian.png')}/>
                <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(14)])}>
                  我的提现记录
                </Text>
              </View>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([fSize(12), color('#979797'), mr(9)])}>
                  1888.00 元
                </Text>
                <Image style={styleAssign([w(7), h(12)])} src={require('../../assets/ico_next.png')}/>
              </View>
            </View>
            <View style={styleAssign([{width: '95%'}, h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, styles.upa, absB(0)])}>
            <Text style={styleAssign([fSize(12), color('#979797'), mb(32)])}>
              发起提现后，收入会在1-3个工作日内到账
            </Text>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default TiXian;
