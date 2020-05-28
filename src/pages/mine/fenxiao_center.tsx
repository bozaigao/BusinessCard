/**
 * @filename fenxiao_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 分销中心
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
  pa,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/distribution";
import {BaseCoin, User} from "../../const/global";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import NavigationBar from "../../compoments/navigation_bar";


interface Props {
  //分销中心主页-我的收益
  userIncome: any;
  myCustomerCount: any;
  userInfo: User;
}

interface State {
  //等级 gold黄金 platinum铂金 diamond 钻石 partner 皇冠
  level: string;
  //未结算收入 单位分
  noSettlement: number;
  //已结算收入 单位分
  totalIncome: number;
  //可提现金额 单位分
  withdrawIncome: number;
  //已提现金额 单位分
  withdrawIncomeStat: number;
  //新增客户数量
  newAddCustomerNum: number;
}


@connect(state => state.login, {...actions})
class FenxiaoCenter extends Component<Props, State> {

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
      level: 'gold',
      noSettlement: 0,
      totalIncome: 0,
      withdrawIncome: 0,
      withdrawIncomeStat: 0,
      newAddCustomerNum: 0
    }
  }

  componentWillMount() {
    this.userIncome();
    this.myCustomerCount();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 分销中心主页-我的收益
   */
  userIncome = () => {
    this.props.userIncome().then((res) => {
      console.log('分销中心主页-我的收益', res);
      if (res) {
        this.setState({
          level: res.level,
          noSettlement: res.noSettlement,
          totalIncome: res.totalIncome,
          withdrawIncome: res.withdrawIncome,
          withdrawIncomeStat: res.withdrawIncomeStat
        });
      }
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 我的新增客户数量
   */
  myCustomerCount = () => {
    this.props.myCustomerCount().then((res) => {
      console.log('我的新增客户数量', res);
      if (res !== NetworkState.FAIL) {
        this.setState({
          newAddCustomerNum: res,
        });
      }
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  render() {

    let {userInfo} = this.props;
    let {level, noSettlement, totalIncome, withdrawIncome, withdrawIncomeStat, newAddCustomerNum} = this.state;
    let levelIcon = require('../../assets/ico_gold.png');

    switch (level) {
      case 'gold':
        levelIcon = require('../../assets/ico_gold.png');
        break;
      case 'platinum':
        levelIcon = require('../../assets/ico_gold.png');
        break;
      case 'diamond':
        levelIcon = require('../../assets/ico_gold.png');
        break;
      case 'partner':
        levelIcon = require('../../assets/ico_partner.png');
        break;
      default:
        break;
    }

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}
                          notNeedBottomPadding={true}>
        <View style={styleAssign([wRatio(100), hRatio(100)])}>
          <View style={styleAssign([wRatio(100), h(iphoneX() ? 292 : 252)])}>
            <Image style={styleAssign([wRatio(100), h(iphoneX() ? 262 : 222)])}
                   src={require('../../assets/ico_mine_bg.png')}/>
            <View style={styleAssign([wRatio(100), h(112), styles.upa, absB(0), styles.uac, styles.ujc])}>
              <View style={styleAssign([w(335), h(112), bgColor(commonStyles.whiteColor), radiusA(4),
                pa(16)])}>
                <Text style={styleAssign([fSize(14), color('#343434')])}>
                  我的收益
                </Text>
                <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(15)])}>
                  <View style={styleAssign([styles.uf1])}>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>
                      已结算收入(税前)
                    </Text>
                    <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                      <Text style={styleAssign([fSize(14), color('#FA6B57'), mb(5)])}>
                        ¥
                      </Text>
                      <Text style={styleAssign([fSize(24), color('#FA6B57')])}>
                        {(totalIncome / BaseCoin).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styleAssign([w(2), h(40), bgColor('#E5E5E5')])}/>
                  <View style={styleAssign([styles.uf1, pl(16)])}>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>
                      未结算收入(税前)
                    </Text>
                    <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                      <Text style={styleAssign([fSize(14), color('#FA6B57'), mb(5)])}>
                        ¥
                      </Text>
                      <Text style={styleAssign([fSize(24), color('#FA6B57')])}>
                        {(noSettlement / BaseCoin).toFixed(2)}
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
                分销中心
              </Text>
              <View style={styleAssign([w(22), h(22), mr(22)])}/>
            </View>
          </NavigationBar>
          {/*用户头像信息*/}
          <View style={styleAssign([styles.upa, absT(iphoneX() ? 105 : 75), wRatio(100)])}>
            <View style={styleAssign([styles.udr, wRatio(100), styles.ujb])}>
              <View style={styleAssign([styles.udr, styles.uac])}>
                <Image style={styleAssign([w(40), h(40), ml(20), radiusA(33)])}
                       src={userInfo.avatar ? userInfo.avatar : `${cloudBaseUrl}ico_default.png`}/>
                <View style={styleAssign([ml(18)])}>
                  <View style={styleAssign([styles.uac, styles.udr])}>
                    <Text
                      style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>{userInfo.name ? userInfo.name : '无名氏'}</Text>
                    <Text
                      style={styleAssign([fSize(12), color(commonStyles.whiteColor), ml(10)])}>{`ID：${userInfo.id}`}</Text>
                  </View>
                  <Image style={styleAssign([w(82), h(23), mt(5)])}
                         src={levelIcon}/>
                </View>
              </View>
            </View>
          </View>
          {/*收益提现*/}
          <View style={styleAssign([wRatio(100), h(112), mt(10), styles.uac, styles.ujc])}>
            <View style={styleAssign([w(335), h(112), bgColor(commonStyles.whiteColor), radiusA(4),
              pa(16)])}>
              <View style={styleAssign([wRatio(100), styles.uac, styles.ujb, styles.udr])}>
                <Text style={styleAssign([fSize(14), color('#343434')])}>
                  收益提现
                </Text>
                <Text style={styleAssign([fSize(12), color('#979797')])}>
                  {`已提现 ￥${(withdrawIncomeStat / BaseCoin).toFixed(2)}`}
                </Text>
              </View>
              <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(15)])}>
                <View style={styleAssign([styles.uf1])}>
                  <Text style={styleAssign([fSize(12), color('#979797')])}>
                    可提现收入(税前)
                  </Text>
                  <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                    <Text style={styleAssign([fSize(14), color('#FA6B57'), mb(5)])}>
                      ¥
                    </Text>
                    <Text style={styleAssign([fSize(24), color('#FA6B57')])}>
                      {(withdrawIncome / BaseCoin).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={styleAssign([styles.uf1, styles.udr, styles.uje])}>
                  <View
                    style={styleAssign([w(77), h(30), radiusA(15), bgColor(parseInt((withdrawIncome / BaseCoin).toFixed(2), 10) === 0 ? '#CCCCCC' : '#E2BB7B'),
                      styles.uac, styles.ujc])}
                    onClick={() => {
                      if (parseInt((withdrawIncome / BaseCoin).toFixed(2), 10) !== 0) {
                        Taro.navigateTo({
                          url: `/pages/mine/tixian?withdrawIncome=${(withdrawIncome / BaseCoin).toFixed(2)}&withdrawIncomeStat=${(withdrawIncomeStat / BaseCoin).toFixed(2)}`
                        });
                      }
                    }}>
                    <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>
                      提现
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/*数据中心*/}
          <View style={styleAssign([wRatio(100), styles.uac])}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/mine/data_center`
                  });
                }}>
            <View style={styleAssign([wRatio(100), h(51), styles.udr, styles.uac, styles.ujb, pl(20), pr(20),
              bgColor(commonStyles.whiteColor), mt(20)])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Image style={styleAssign([w(20), h(20)])} src={require('../../assets/ico_data_center.png')}/>
                <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(14)])}>
                  数据中心
                </Text>
              </View>
              <Image style={styleAssign([w(7), h(12)])} src={require('../../assets/ico_next.png')}/>
            </View>
            <View style={styleAssign([{width: '95%'}, h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>
          {/*我的客户*/}
          <View style={styleAssign([wRatio(100), styles.uac])}>
            <View style={styleAssign([wRatio(100), h(51), styles.udr, styles.uac, styles.ujb, pl(20), pr(20),
              bgColor(commonStyles.whiteColor)])}
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/mine/my_customer`
                    });
                  }}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Image style={styleAssign([w(20), h(20)])} src={require('../../assets/ico_my_client.png')}/>
                <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(14)])}>
                  我的客户
                </Text>
                {
                  newAddCustomerNum !== 0 &&
                  <View style={styleAssign([w(54), h(21), ml(25), radiusA(4), bgColor('#FA6B57'),
                    styles.uac, styles.ujc])}>
                    <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                      {`新增${newAddCustomerNum}人`}
                    </Text>
                  </View>
                }
              </View>
              <Image style={styleAssign([w(7), h(12)])} src={require('../../assets/ico_next.png')}/>
            </View>
            <View style={styleAssign([{width: '95%'}, h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>

        </View>
      </CustomSafeAreaView>
    );
  }
}

export default FenxiaoCenter;
