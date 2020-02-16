/**
 * @filename tixian_page.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 微信提现界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign, toast} from "../../utils/datatool";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/distribution';
import TopHeader from "../../compoments/top-header";
import {Image, Input, Text, View} from "@tarojs/components";
import {BaseCoin} from "../../const/global";

interface Props {
  //申请提现
  withdraw: any;
}

interface State {
  money: string;
  withdrawIncome: string;
}

@connect(state => state.login, {...actions})
class TixianPage extends Component<Props, State> {

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
    console.log(this.viewRef);
    this.state = {
      money: '',
      withdrawIncome: this.$router.params.withdrawIncome
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/16
   * @function: 申请提现
   */
  withdraw = () => {
    this.viewRef.showLoading();
    let {money} = this.state;

    this.props.withdraw({money: parseInt(money, 10) * BaseCoin}).then((res) => {
      console.log('申请提现', res);
      this.viewRef.hideLoading();
      if (!res) {
        toast('提现成功');
      }
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {withdrawIncome} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={''}/>
        <View style={styleAssign([wRatio(100), h(16), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(14), color('#343434'), ml(20), mt(20)])}>
              提现金额
            </Text>
            <View style={styleAssign([wRatio(100), h(60), styles.uac, styles.udr, mt(20)])}>
              <Text style={styleAssign([fSize(28), color('#343434'), ml(20)])}>
                ￥
              </Text>
              <Input type='number' autoFocus={true} style={styleAssign([ml(16), fSize(28)])}
                     onInput={(e) => {
                       this.setState({money: e.detail.value});
                     }}/>
            </View>
            <View
              style={styleAssign([wRatio(90), h(1), {marginLeft: '5%'}, bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([styles.uac, styles.udr, mt(10), ml(20)])}>
              <Text style={styleAssign([fSize(12), color('#979797')])}>
                当前余额：
              </Text>
              <Text style={styleAssign([fSize(12), color('#FA6B57')])}>
                {`￥${withdrawIncome}`}
              </Text>
              <Text style={styleAssign([fSize(12), color('#576A94')])}>
                ，攒够100元可以提现，手续费2%
              </Text>
            </View>
            <Text style={styleAssign([fSize(14), color('#343434'), ml(20), mt(20)])}>
              提现方式
            </Text>
            <View
              style={styleAssign([wRatio(90), h(1), mt(16), {marginLeft: '5%'}, bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100), h(62), styles.uac, styles.udr, styles.ujb, pl(20), pr(20)])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Image style={styleAssign([w(26), h(26)])} src={require('../../assets/ico_wechat_tixian.png')}/>
                <Text style={styleAssign([fSize(14), color('#343434'), ml(10)])}>
                  微信
                </Text>
              </View>
              <Image style={styleAssign([w(18), h(18)])} src={require('../../assets/ico_wechat_done.png')}/>
            </View>
          </View>
          <View style={styleAssign([styles.uac, mt(20)])}>
            <Text style={styleAssign([fSize(10), color('#979797')])}>
              申请的提现会直接打款到您的微信钱包，请注意查看通知
            </Text>
            <Text style={styleAssign([fSize(10), color('#979797'), mt(10)])}>
              提现到账时间为1-3个工作日之内
            </Text>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(36)])}>
            <View style={styleAssign([w(335), h(44), radiusA(2), styles.uac, styles.ujc,
              bgColor('#E2BB7B')])}
                  onClick={() => {
                    this.withdraw();
                  }}>
              <Text style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>
                提现
              </Text>
            </View>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default TixianPage;
