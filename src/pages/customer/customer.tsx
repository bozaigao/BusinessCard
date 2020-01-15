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
import {debounce, styleAssign, toast} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import CustomItem from "./custom-item";
import BottomButon from "../../compoments/bottom-buton";
import {CustomerModel} from "../../const/global";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
  getCustomerList?: any;
}

interface State {
  customerList: CustomerModel[];
  totalCustomers: number;
}

@connect(state => state.login, {...actions})
class Customer extends Component<Props, State> {
  private viewRef;
  private pageNo;
  private pageSize;

  constructor(props) {
    super(props);
    this.pageNo = 1;
    this.pageSize = 10;
    this.state = {
      customerList: [],
      totalCustomers: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
    Taro.eventCenter.off();
  }

  componentDidMount() {
    this.refresh();
    Taro.eventCenter.on('refreshCustomerList', () => {
      this.refresh();
    })
  }

  componentDidHide() {
  }

  refresh = () => {
    this.pageNo = 1;
    this.getCustomerList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.getCustomerList();
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/10
   * @function: 获取客户列表
   */
  getCustomerList = (refresh?: boolean) => {

    this.viewRef && this.viewRef.showLoading();
    this.props.getCustomerList({pageNo: this.pageNo, pageSize: this.pageSize}).then((res) => {
      console.log('获取客户列表', res);
      this.viewRef && this.viewRef.hideLoading();
      if (refresh) {
        Taro.stopPullDownRefresh();
        this.setState({customerList: res.records, totalCustomers: res.total});
      } else if (res.records && res.records.length !== 0) {
        this.setState({customerList: this.state.customerList.concat(res.records), totalCustomers: res.total});
      } else {
        toast('没有客户了');
      }

    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {

    let {customerList,totalCustomers} = this.state;

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
              <Text style={styleAssign([fSize(14), color('#787878'), ml(20)])}>{`共${totalCustomers}位客户`}</Text>
              <Text style={styleAssign([fSize(14), color('#787878')])}>最后跟进时间</Text>
              <Text style={styleAssign([fSize(14), color('#787878'), mr(20)])}>筛选</Text>
            </View>
          </View>
          <ScrollView
            onScrollToUpper={() => {
              Taro.startPullDownRefresh();
              debounce(() => {
                this.refresh();
              }, 400);
            }}
            onScrollToLower={() => {
              this.loadMore();
            }}
            style={styleAssign([styles.uf1, styles.uac])}
            scrollY>
            {
              customerList.map((value: CustomerModel, index) => {
                console.log(value);
                return (<CustomItem key={index} customer={value} onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/customer/customer_detail?itemData=${JSON.stringify(value)}`
                  });
                }}
                genJinCallback={(customer)=>{
                  Taro.navigateTo({
                    url: `/pages/customer/add_genjin?itemData=${JSON.stringify(customer)}`
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
