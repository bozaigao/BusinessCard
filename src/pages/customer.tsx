/**
 * @filename customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 客户
 */
import Taro, {Component} from '@tarojs/taro'
import {Image, Input, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../compoments/safe-area-view/index";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../utils/style";
import {get, getToday, save, styleAssign, toast} from "../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../actions/customer";
import CustomItem from "./component/custom-item/index";
import BottomButon from "../compoments/bottom-buton/index";
import {CustomerModel, Orientation} from "../const/global";
import ModeModal from "./component/mode-modal/index";
import ShaiXuanModal from "./component/shai-xuan-modal/index";
import NavigationBar from "../compoments/navigation_bar/index";
import SanJiao from "../compoments/sanjiao/index";
import CustomerGuide from "./component/customer-guide";
import ShareInvite from "./component/share-invite";

interface Props {
  getCustomerList?: any;
}

interface State {
  customerList: CustomerModel[];
  totalCustomers: number;
  shaiXuanMode: string;
  showMode: boolean;
  showShareInvite: boolean;
  shaiXuanValue: string;
  showShaiXuan: boolean;
  showGuide: boolean;
  //筛选开始时间
  startTime: string;
  //筛选结束时间
  endTime: string;
  name: string;
}

@connect(state => state.login, {...actions})
class Customer extends Component<Props, State> {
  private pageNo;
  private pageSize;

  constructor(props) {
    super(props);
    this.pageNo = 1;
    this.pageSize = 10;
    this.state = {
      customerList: [],
      totalCustomers: 0,
      shaiXuanMode: '最后访问时间',
      shaiXuanValue: '全部',
      showMode: false,
      showShaiXuan: false,
      startTime: '',
      endTime: '',
      name: '',
      showGuide: false,
      showShareInvite: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }


  componentDidShow() {
    this.refresh();
    Taro.eventCenter.on('refreshCustomerList', () => {
      this.refresh();
    })
    let showGuide = get('customer_guide');

    this.setState({showGuide: !showGuide});
  }

  componentWillUnmount() {
    Taro.eventCenter.off();
  }

  componentDidHide() {
    console.log('componentDidShow')
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
    let status = 'visit';
    let {shaiXuanMode, startTime, endTime, name} = this.state;

    if (shaiXuanMode === '最后访问时间') {
      status = 'visit';
    } else if (shaiXuanMode === '最后跟进时间') {
      status = 'follow';
    } else if (shaiXuanMode === '最后转入时间') {
      status = 'create';
    }

    let params = {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      status,
    };

    if (startTime.length !== 0) {
      Object.assign(params, {startDate: startTime});
    }
    if (endTime.length !== 0) {
      Object.assign(params, {endDate: endTime});
    }

    if (name.length !== 0) {
      Object.assign(params, {name});
    }

    console.log('搜索参数', params);
    this.props.getCustomerList(params).then((res) => {
      console.log('获取客户列表', res);
      if (refresh) {
        this.setState({customerList: res.records, totalCustomers: res.total});
      } else if (res.records && res.records.length !== 0) {
        this.setState({customerList: this.state.customerList.concat(res.records), totalCustomers: res.total});
      } else {
        toast('没有客户了');
      }

    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  //@ts-ignore
  onShareAppMessage(res) {
    return {
      title: `快来使用极致推小程序吧`,
      path: `/pages/businesscard`
    }
  }


  render() {

    let {customerList, totalCustomers, shaiXuanMode, showMode, showShaiXuan, showGuide, showShareInvite} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}>
        <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.ujb])}>
          <NavigationBar>
            <View style={styleAssign([{width: '65%'}, {marginLeft: '2.5%'}, h(31), op(0.7), bgColor('#F5F5F5'),
              radiusA(26), styles.uac, styles.udr])}>
              <Image style={styleAssign([w(21), h(21), ml(16)])} src={require('../assets/ico_search.png')}/>
              <Input type='text' placeholder='搜索客户姓名' style={styleAssign([ml(16), fSize(14)])}
                     onInput={(e) => {
                       this.setState({name: e.detail.value}, () => {
                         this.refresh();
                       });
                     }}/>
            </View>
          </NavigationBar>
          {/*条件筛选*/}
          <View
            style={styleAssign([wRatio(100), h(36), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
              pl(20), pr(20)])}>
            <Text style={styleAssign([color('#727272'), fSize(14)])}>{`共${totalCustomers}位客户`}</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}
                    onClick={() => {
                      this.setState({showMode: true});
                    }}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}>{shaiXuanMode}</Text>
                <SanJiao orientation={Orientation.down} style={styleAssign([ml(3)])}/>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}
                    onClick={() => {
                      this.setState({showShaiXuan: true});
                    }}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}>筛选</Text>
                <Image style={styleAssign([w(14), h(14), ml(3)])} src={require('../assets/ico_shaixuan.png')}/>
              </View>
            </View>
          </View>
        </View>
        {
          customerList.length === 0 ?
            <View
              style={styleAssign([styles.uf1, styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor), bgColor(commonStyles.pageDefaultBackgroundColor)])}>
              <View style={styleAssign([styles.uac])}>
                <Image style={styleAssign([w(78), h(69)])} src={require('../assets/ico_no_data.png')}/>
                <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂无客户</Text>
              </View>
            </View> :
            <ScrollView
              onScrollToUpper={() => {
                this.refresh();
              }}
              onScrollToLower={() => {
                this.loadMore();
              }}
              style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
              scrollY>
              {
                customerList.map((value: CustomerModel, index) => {
                  console.log(value);
                  return (
                    <CustomItem
                      key={index} customer={value} mode={shaiXuanMode.substr(0, shaiXuanMode.length - 2)}
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/customer/customer_detail?itemData=${JSON.stringify(value)}&userId=${value.userId}`
                        });
                      }}
                      viewCardCallback={() => {
                        if (value.type === 2) {
                          this.setState({showShareInvite: true});
                        } else {
                          Taro.navigateTo({
                            url: `/pages/businesscard/other_businesscard?userId=${value.userId}`
                          });
                        }
                      }
                      }
                      genJinCallback={(customer) => {
                        Taro.navigateTo({
                          url: `/pages/customer/add_genjin?itemData=${JSON.stringify(customer)}`
                        });
                      }
                      }/>);
                })
              }
            </ScrollView>
        }
        <BottomButon title={'新增客户'} onClick={() => {
          Taro.navigateTo({
            url: `/pages/customer/add_customer`
          });
        }}/>
        {
          showMode && <ModeModal
            totalPerson={totalCustomers}
            shaiXuanMode={shaiXuanMode}
            shaiXuanCallback={() => {
              this.setState({showMode: false, showShaiXuan: true});
            }
            }
            cancelCallback={() => {
              this.setState({showMode: false});
            }
            } confirmCallback={(data) => {
            this.setState({showMode: false, startTime: '', endTime: '', shaiXuanMode: data}, () => {
              this.refresh();
            });
          }
          }/>
        }
        {
          showShaiXuan && <ShaiXuanModal
            totalPerson={totalCustomers}
            shaiXuanMode={shaiXuanMode}
            startAndEndTimeCallback={(startTime, endTime) => {
              this.setState({startTime, endTime, showShaiXuan: false}, () => {
                this.refresh();
              });
            }
            }
            modeCallback={() => {
              this.setState({showShaiXuan: false, showMode: true});
            }
            }
            cancelCallback={() => {
              this.setState({showShaiXuan: false});
            }
            }/>
        }
        {
          showGuide && <CustomerGuide cancle={() => {
            save('customer_guide', true);
            this.setState({showGuide: false});
          }
          }/>
        }
        {
          showShareInvite && <ShareInvite cancelCallback={() => {
            this.setState({showShareInvite: false});
          }} confirmCallback={() => {
            this.setState({showShareInvite: false});
          }}/>
        }
      </CustomSafeAreaView>
    )
  }
}


export default Customer
