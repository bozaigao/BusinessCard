/**
 * @filename my_customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 我的客户
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, Input, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mr,
  mt,
  op,
  radiusA,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {debounce, styleAssign, toast} from "../../utils/datatool";
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/distribution";
import {CustomerRecord, User} from "../../const/global";
import {cloudBaseUrl} from "../../api/httpurl";
import MyCustomerItem from "./my_customer_item";
import TopHeader from "../../compoments/top-header";


interface Props {
  //我的客户列表
  myCustomerList: any;
  userInfo: User;
}

interface State {
  currentIndex: number;
  customerList: CustomerRecord[];
  total: number;
  type: string;
  content: string;
}

@connect(state => state.login, {...actions})
class MyCustomer extends Component<Props, State> {

  private pageNo;
  private pageSize;

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
    this.pageNo = 1;
    this.pageSize = 10;
    this.state = {
      currentIndex: 0,
      total: 0,
      customerList: [],
      type: '',
      content: ''
    }
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  refresh = () => {
    this.pageNo = 1;
    this.myCustomerList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.myCustomerList();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/16
   * @function: 获取我的客户列表
   */
  myCustomerList = (refresh?: boolean) => {
    let {type, content} = this.state;
    let params: any = {pageNo: this.pageNo, pageSize: this.pageSize};

    if (type.length !== 0) {
      params = {pageNo: this.pageNo, pageSize: this.pageSize, type};
    }
    if (content.length !== 0) {
      params = {pageNo: this.pageNo, pageSize: this.pageSize, type, content};
    }

    this.props.myCustomerList(params).then((res) => {
      console.log('获取我的客户列表', res);
      console.log('属性', this.props.userInfo);
      if (res) {
        this.setState({
          total: res.total,
          customerList: res.records
        });

        if (refresh) {
          Taro.stopPullDownRefresh();
          this.setState({
            total: res.total,
            customerList: res.records
          });
        } else if (res.records && res.records.length !== 0) {
          this.setState({customerList: this.state.customerList.concat(res.records), total: res.total});
        } else {
          toast('没有更多了');
        }
      }
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  render() {
    let {currentIndex, total, customerList} = this.state;
    let child;

    if (currentIndex === 0) {
      child = <View style={styleAssign([wRatio(100)])}>
        <View
          style={styleAssign([wRatio(100), h(70), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View
            style={styleAssign([{width: '80%'}, h(29), op(0.7), bgColor(commonStyles.whiteColor),
              radiusA(26), styles.uac, styles.udr, mt(10)])}>
            <Image style={styleAssign([w(21), h(21), ml(16)])} src={`${cloudBaseUrl}ico_search.png`}/>
            <Input type='text' placeholder='搜索客户姓名/ID' style={styleAssign([ml(16), fSize(14)])}
                   onInput={(e) => {
                     this.setState({content: e.detail.value}, () => {
                       this.refresh();
                     });
                   }}/>
          </View>
        </View>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(15)])}>
          <Text style={styleAssign([fSize(14), color('#727272')])}>
            您目前拥有
          </Text>
          <Text style={styleAssign([fSize(16), color('#825D22'), ml(2), mr(2)])}>
            {total}
          </Text>
          <Text style={styleAssign([fSize(14), color('#727272')])}>
            位客户
          </Text>
        </View>
      </View>;
    }

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'我的客户'}/>
        <View style={styleAssign([wRatio(100), h(30), mt(20), styles.uac, styles.udr, styles.ujb])}>
          <View style={styleAssign([styles.uac, ml(36)])}
                onClick={() => {
                  this.setState({currentIndex: 0, type: '', content: ''}, () => {
                    this.refresh();
                  });
                }}>
            <Text style={styleAssign([fSize(15), color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>
              全部
            </Text>
            <View
              style={styleAssign([w(25), h(2), radiusTR(2), bgColor(currentIndex === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(5)])}/>
          </View>
          <View style={styleAssign([styles.uac, ml(50)])}
                onClick={() => {
                  this.setState({currentIndex: 1, type: 'share', content: ''}), () => {
                    this.refresh();
                  };
                }}>
            <Text style={styleAssign([fSize(15), color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>
              分享绑定
            </Text>
            <View
              style={styleAssign([w(54), h(2), radiusTR(2), bgColor(currentIndex === 1 ? '#E2BB7B' : commonStyles.whiteColor), mt(5)])}/>
          </View>
          <View style={styleAssign([styles.uac, mr(36)])}
                onClick={() => {
                  this.setState({currentIndex: 2, type: 'buy', content: ''}, () => {
                    this.refresh();
                  });
                }}>
            <Text style={styleAssign([fSize(15), color(currentIndex === 2 ? '#E2BB7B' : '#0C0C0C')])}>
              购买绑定
            </Text>
            <View
              style={styleAssign([w(54), h(2), radiusTR(2), bgColor(currentIndex === 2 ? '#E2BB7B' : commonStyles.whiteColor), mt(5)])}/>
          </View>
        </View>
        <View style={styleAssign([styles.uf1])}>
          {
            child
          }
          <ScrollView
            style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
            scrollY
            onScrollToUpper={() => {
              Taro.startPullDownRefresh();
              debounce(() => {
                this.refresh();
              }, 400);
            }}
            onScrollToLower={() => {
              this.loadMore();
            }}>
            {
              customerList.map((value, index) => {
                return <MyCustomerItem item={value} key={index}/>;
              })
            }
          </ScrollView>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default MyCustomer;
