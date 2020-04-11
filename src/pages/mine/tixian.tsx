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
import NavigationBar from "../../compoments/navigation_bar";


interface Props {
  //获取用户信息
  getUserInfo: any;
  updateUserInfo: any;
  userInfo: User;
}

interface State {
  year: string;
  //可提现金额 单位分
  withdrawIncome: string;
  //已提现金额 单位分
  withdrawIncomeStat: string;
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

  }

  constructor(props) {
    super(props);
    this.state = {
      year: `${new Date().getFullYear()}`,
      withdrawIncome: this.$router.params.withdrawIncome,
      withdrawIncomeStat: this.$router.params.withdrawIncomeStat
    }
  }

  componentWillMount() {
    this.getUserInfo();
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
      this.props.updateUserInfo(res);
      console.log('获取用户信息', res);
      console.log('属性', this.props.userInfo);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  render() {
    let {withdrawIncome, withdrawIncomeStat} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}
                          notNeedBottomPadding={true}>
        <View style={styleAssign([wRatio(100), hRatio(100)])}>
          <View style={styleAssign([wRatio(100), h(iphoneX() ? 322 : 322)])}>
            <Image style={styleAssign([wRatio(100), h(iphoneX() ? 242 : 222)])}
                   src={require('../../assets/ico_mine_bg.png')}/>
            <View style={styleAssign([wRatio(100), h(213), styles.upa, absB(0), styles.uac, styles.ujc])}>
              <View style={styleAssign([w(335), h(213), bgColor(commonStyles.whiteColor), radiusA(4),])}>
                <View style={styleAssign([wRatio(100), h(60), styles.uac, styles.ujc, bgColor('#FAF1E5'),
                  radiusTL(4), radiusTR(4)])}>
                  <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                    <Text style={styleAssign([fSize(16), color('#343434')])}>
                      可提现金额
                    </Text>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>
                      (税前)
                    </Text>
                  </View>
                </View>
                <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
                  <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                    <Text style={styleAssign([fSize(18), color('#FA6B57'), mb(5)])}>
                      ¥
                    </Text>
                    <Text style={styleAssign([fSize(28), color('#FA6B57')])}>
                      {withdrawIncome}
                    </Text>
                  </View>
                  <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(28)])}>
                    <View
                      style={styleAssign([w(201), h(41), radiusA(21), bgColor(parseInt(withdrawIncome, 10) === 0 ? '#CCCCCC' : '#E2BB7B'),
                        styles.uac, styles.ujc])}
                      onClick={() => {
                        if (parseInt(withdrawIncome, 10) !== 0) {
                          Taro.navigateTo({
                            url: `/pages/mine/tixian_page?withdrawIncome=${withdrawIncome}`
                          });
                        }
                      }}>
                      <Text style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>
                        提现
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <NavigationBar style={styleAssign([styles.upa, absT(0)])}>
            <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujb])}>
              <Image style={styleAssign([w(22), h(22), ml(20)])}
                     src={require('../../assets/ico_back_white.png')}
                     onClick={() => {
                       Taro.navigateBack();
                     }}/>
              <Text style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>
                提现
              </Text>
              <View style={styleAssign([w(22), h(22), mr(20)])}/>
            </View>
          </NavigationBar>
          {/*我的提现记录*/}
          <View style={styleAssign([wRatio(100), styles.uac])}
                onClick={() => {

                }}>
            <View style={styleAssign([wRatio(100), h(51), styles.udr, styles.uac, styles.ujb, pl(20), pr(20),
              bgColor(commonStyles.whiteColor), mt(20)])}
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/mine/tixian_recorder`
                    });
                  }}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Image style={styleAssign([w(20), h(20)])} src={require('../../assets/ico_tixian.png')}/>
                <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(14)])}>
                  我的提现记录
                </Text>
              </View>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([fSize(12), color('#979797'), mr(9)])}>
                  {`${withdrawIncomeStat} 元`}
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
