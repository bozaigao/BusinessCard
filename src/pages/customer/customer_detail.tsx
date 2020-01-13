/**
 * @filename customer_ziliao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 客户详情界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  absB,
  absR,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  ml,
  mt,
  op,
  pl,
  pr,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {parseData, styleAssign, toast} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {CustomerModel} from "../../const/global";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
  deleteCustomer?: any;
}

interface State {
  showOperate: boolean;
  customer: CustomerModel
}

@connect(state => state.login, {...actions})
class CustomerDetail extends Component<Props, State> {
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
    console.log('呵呵', parseData(this.$router.params.itemData));

    this.state = {
      customer: parseData(this.$router.params.itemData),
      showOperate: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidHide() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/14
   * @function: 删除客户
   */
  deleteCustomer = (customerUserId) => {
    this.viewRef && this.viewRef.showLoading();
    this.props.deleteCustomer({customerUserId}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      toast('删除成功');
      Taro.eventCenter.trigger('refreshCustomerList');
      Taro.navigateBack();
      console.log('删除信息', res);
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {showOperate, customer} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={''}/>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          <View style={styleAssign([styles.uac, wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.udr, wRatio(100), styles.ujb, pl(20), pr(20),
              bgColor(commonStyles.whiteColor)])}>
              <View style={styleAssign([styles.uac, styles.ujc, w(40), h(40)])}
                    onClick={() => {
                      this.setState({showOperate: true});
                    }}>
                <Image style={styleAssign([w(19), h(4)])} src={require('../../assets/ico_dot.png')}/>
              </View>
              <View style={styleAssign([styles.uac])}>
                <View style={styleAssign([w(98), h(98)])}>
                  <Image style={styleAssign([w(98), h(98)])}
                         src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : require('../../assets/ico_default.png')}/>
                  <Image style={styleAssign([w(20), h(20), styles.upa, absB(0), absR(0)])}
                         src={customer.sex === 1 ? require('../../assets/ico_nan.png') : require('../../assets/ico_nv.png')}/>
                </View>
                <Text style={styleAssign([fSize(22), color('#343434'), mt(11)])}>{customer.name}</Text>
                <Text style={styleAssign([fSize(14), color('#727272')])}>{customer.company}</Text>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Text style={styleAssign([fSize(12), color('#979797')])}>来自</Text>
                  <Text style={styleAssign([fSize(12), color('#E2BB7B')])}>名片扫码</Text>
                </View>
              </View>
              <View style={styleAssign([styles.udr, styles.uac, h(25), mt(15)])}
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/pages/customer/customer_ziliao`
                      });
                    }}>
                <Text style={styleAssign([fSize(15), color('#343434')])}>资料</Text>
                <Image style={styleAssign([w(7), h(12), ml(8)])}
                       src={require('../../assets/ico_next.png')}/>
              </View>
            </View>
            {/*加微信、联系地址*/}
            <View
              style={styleAssign([wRatio(95), styles.uac, styles.udr, h(100), bgColor(commonStyles.whiteColor)])}>
              <View
                style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                  bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4),
                  {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}>
                <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>拨打电话</Text>
                <Text style={styleAssign([color('#979797'), fSize(12)])}>15982468866</Text>
              </View>
              <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}>
                <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>加微信</Text>
                <Text style={styleAssign([color('#979797'), fSize(12)])}>点击添加微信</Text>
              </View>
              <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}>
                <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>联系地址</Text>
                <Text style={styleAssign([color('#979797'), fSize(12)])}>点击立即定位</Text>
              </View>
            </View>
          </View>
        </ScrollView>{
        showOperate && <View style={styleAssign([wRatio(100), hRatio(100), {position: 'fixed'}, absT(0)])}
                             onClick={() => {
                               this.setState({showOperate: false});
                             }}>
          <View
            style={styleAssign([wRatio(100), hRatio(100), op(0.3), bgColor(commonStyles.whiteColor), bgColor(commonStyles.colorTheme)])}/>
          <View
            style={styleAssign([wRatio(100), h(185), bgColor(commonStyles.whiteColor), radiusTL(10), radiusTR(10),
              styles.upa, absB(0)])}>
            <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}>
              <Text style={styleAssign([color('#E2BB7B'), fSize(18)])}>查看名片</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                  onClick={() => {
                    this.deleteCustomer(customer.userId);
                  }}>
              <Text style={styleAssign([color('#29292E'), fSize(18)])}>移除客户</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(5), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}>
              <Text style={styleAssign([color('#29292E'), fSize(18)])}>取消</Text>
            </View>
          </View>
        </View>
      }
      </CustomSafeAreaView>
    )
  }
}


export default CustomerDetail
