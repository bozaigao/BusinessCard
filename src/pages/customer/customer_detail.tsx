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
  absR, bdColor,
  bgColor, bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h, ml,
  mt,
  pl, pr, radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, View} from "@tarojs/components";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
}

@connect(state => state.login, {...actions})
class CustomerDetail extends Component<Props, State> {

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
    this.state = {}
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


  render() {

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={''}/>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          <View style={styleAssign([styles.uac, wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.udr, wRatio(100), styles.ujb, pl(20), pr(20),
              bgColor(commonStyles.whiteColor)])}>
              <Image style={styleAssign([w(19), h(4), mt(27)])} src={require('../../assets/ico_dot.png')}/>
              <View style={styleAssign([styles.uac])}>
                <View style={styleAssign([w(98), h(98)])}>
                  <Image style={styleAssign([w(98), h(98)])} src={require('../../assets/ico_default.png')}/>
                  <Image style={styleAssign([w(20), h(20), styles.upa, absB(0), absR(0)])}
                         src={require('../../assets/ico_nv.png')}/>
                </View>
                <Text style={styleAssign([fSize(22), color('#343434'), mt(11)])}>刘思雨</Text>
                <Text style={styleAssign([fSize(14), color('#727272')])}>保利房地产集团有限公司</Text>
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
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}


export default CustomerDetail
