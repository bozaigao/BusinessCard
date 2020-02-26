/**
 * @filename choose_customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/26
 * @Description: 选择客户界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../compoments/safe-area-view";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../utils/style";
import {parseData, styleAssign, toast} from "../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../actions/customer";
import TopHeader from "../compoments/top-header";
import {Image, Input, ScrollView, Text, View} from "@tarojs/components";
import GuanLianCustomer from "./sub_pagecomponent/guanlian-customer";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
  deleteCustomer?: any;
  followUpList?: any;
}

interface State {

}

@connect(state => state.login, {...actions})
class ChooseCustomer extends Component<Props, State> {
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
      showOperate: false,
      currentIndex: 0,
      flowUpList: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.followUpList();
  }

  componentDidHide() {
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/28
   * @function:
   */
  followUpList = () => {
    console.log('查询客户跟进信息记录');
    this.props.followUpList({id: this.state.customer.id}).then((res) => {
      console.log('查询客户跟进信息记录', res);
      this.setState({flowUpList: res});
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  render() {

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'选择客户'}/>
        <View
          style={styleAssign([wRatio(100), h(63), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
            pl(20), pr(20)])}>
          <View style={styleAssign([{width: '85%'}, h(31), op(0.7), bgColor('#F5F5F5'),
            radiusA(26), styles.uac, styles.udr])}>
            <Image style={styleAssign([w(21), h(21), ml(16)])} src={require('../assets/ico_search.png')}/>
            <Input type='text' placeholder='搜索客户姓名' style={styleAssign([ml(16), fSize(14)])}/>
          </View>
          <Text style={styleAssign([fSize(16), color('#CECECE')])}>取消</Text>
        </View>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          <GuanLianCustomer backgroundColor={commonStyles.pageDefaultBackgroundColor} marginTop={10}/>
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}


export default ChooseCustomer
