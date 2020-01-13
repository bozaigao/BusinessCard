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
  mr,
  mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import CustomItem from "./custom-item";
import TouchableButton from "../../compoments/touchable-button";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
  getCustomerList?: any;
}

interface State {
}

@connect(state => state.login, {...actions})
class Customer extends Component<Props, State> {
  private viewRef;

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
    this.getCustomerList();
  }

  componentDidHide() {
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/10
   * @function: 获取客户列表
   */
  getCustomerList = () => {

    this.viewRef && this.viewRef.showLoading();
    this.props.getCustomerList({pageNo: 1, pageSize: 20}).then((res) => {
      console.log('获取客户列表', res);
      this.viewRef && this.viewRef.hideLoading();
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), h(99), bgColor(commonStyles.whiteColor), styles.ujb])}>
            <View style={styleAssign([{width: '68%'}, {marginLeft: '2.5%'}, h(31), op(0.7), bgColor('#F5F5F5'),
              radiusA(26), styles.uac, styles.udr, mt(10)])}>
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
          <BottomButon title={'新增客户'} onClick={() => {
            Taro.navigateTo({
              url: `/pages/customer/add_customer`
            });
          }}/>
        </View>
      </CustomSafeAreaView>
    )
  }
}


export default Customer
