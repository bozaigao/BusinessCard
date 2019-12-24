/**
 * @filename customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 客户
 */
import Taro, {Component} from '@tarojs/taro'
import {Image, Input, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  mb,
  ml,
  mr, mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/home";
import CustomItem from "./custom-item";
import TouchableButton from "../../compoments/touchable-button";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
}

@connect(state => state.home, {...actions})
class Customer extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
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


  render() {

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), h(99), bgColor(commonStyles.whiteColor), styles.ujb])}>
            <View style={styleAssign([{width: '68%'}, {marginLeft: '2.5%'}, h(31), op(0.7), bgColor('#F5F5F5'),
              radiusA(26), styles.uac, styles.udr,mt(10)])}>
              <Image style={styleAssign([w(21), h(21), ml(16)])} src={require('../../assets/ico_search.png')}/>
              <Input type='text' placeholder='搜索客户姓名' style={styleAssign([ml(16), fSize(14)])}/>
            </View>
            {/*条件筛选*/}
            <View
              style={styleAssign([wRatio(100), styles.uac, styles.ujb, styles.udr, mb(10)])}>
              <Text style={styleAssign([fSize(14), color('#787878'), ml(20)])}>共2位客户</Text>
              <Text style={styleAssign([fSize(14), color('#787878')])}>最后跟进时间</Text>
              <Text style={styleAssign([fSize(14), color('#787878'), mr(20)])}>筛选</Text>
            </View>
          </View>
          <ScrollView
            style={styleAssign([styles.uf1, styles.uac])}
            scrollY>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
                console.log(value);
                return (<CustomItem key={index} onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/customer/customer_detail`
                  });
                }
                }/>);
              })
            }
          </ScrollView>
          <View style={styleAssign([wRatio(100), h(80), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
            <TouchableButton customStyle={styleAssign([w(335), h(44), radiusA(4), bgColor('#0F56C5'),
              styles.uac, styles.ujc])}
            onClick={()=>{
              Taro.navigateTo({
                url: `/pages/customer/add_customer`
              });
            }}>
              <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>新增客户</Text>
            </TouchableButton>
          </View>
        </View>
      </CustomSafeAreaView>
    )
  }
}


export default Customer
