/**
 * @filename radar.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 雷达
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../compoments/safe-area-view/index";
import {get, save, styleAssign, toast} from "../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, mt, w, wRatio} from "../utils/style";
import RadarItem from "./component/radar-item/index";
import * as actions from '../actions/radar';
import * as customerActions from '../actions/customer';
import * as businessCardActions from '../actions/business_card';
import {connect} from "@tarojs/redux";
import {RadarModel} from "../const/global";
import NavigationBar from "../compoments/navigation_bar/index";
import LeiDaGuide from "./component/leida-guide";
import {NetworkState} from "../api/httpurl";

interface Props {
  //查询我的雷达数据列表
  getTraceList: any;
  addCustomer: any;
  updateMyCollect: any;
}

interface State {
  records: RadarModel[];
  showGuide: boolean;
}

@connect(state => Object.assign(state.taskCenter, state.login), Object.assign(customerActions, actions, businessCardActions))
class Radar extends Component<Props, State> {
  private pageNo;
  private pageSize;
  private viewRef;
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {}

  constructor(props) {
    super(props);
    this.pageNo = 1;
    this.pageSize = 10;
    this.state = {
      records: [],
      showGuide: false
    }
  }


  componentWillUnmount() {
  }

  componentDidShow() {
    this.refresh();
    let showGuide = get('radar_guide');

    this.setState({showGuide: !showGuide});
  }

  refresh = () => {
    this.pageNo = 1;
    this.getTraceList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.getTraceList();
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 查询我的雷达数据列表
   */
  getTraceList = (refresh?: boolean) => {
    this.props.getTraceList({pageNo: this.pageNo, pageSize: this.pageSize}).then((res) => {
      console.log('查询我的雷达数据列表', res);
      if (refresh) {
        this.setState({records: res.records});
      } else if (res.records && res.records.length !== 0) {
        this.setState({records: this.state.records.concat(res.records)});
      } else {
        toast('没有记录了');
      }
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 置为客户
   */
  addCustomer = (userId) => {
    this.viewRef.showLoading();
    this.props.addCustomer({customerUserId: userId}).then((res) => {
      this.viewRef.hideLoading();
      console.log('置为客户', res);
      if (res !== NetworkState.FAIL) {
        toast('设置成功');
      }
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 更新我收藏的名片
   */
  updateMyCollect = (type: number, collectedUserId: number) => {
    this.viewRef.showLoading();
    this.props.updateMyCollect({type, collectedUserId}).then((res) => {
      this.viewRef.hideLoading();
      console.log('更新我收藏的名片', res);
      if (res !== NetworkState.FAIL) {
        toast('收藏成功');
      }
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  render() {
    let {records, showGuide} = this.state;

    return (
      <CustomSafeAreaView
        ref={(ref) => {
          this.viewRef = ref;
        }}
        customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
        notNeedBottomPadding={true}>
        {/*雷达、访客切换*/}
        <NavigationBar>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc])}>
            <Text style={styleAssign([fSize(18)])}>雷达</Text>
          </View>
        </NavigationBar>
        {
          records.length === 0 ?
            <View
              style={styleAssign([styles.uf1, styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
              <View style={styleAssign([styles.uac])}>
                <Image style={styleAssign([w(78), h(69)])} src={require('../assets/ico_no_data.png')}/>
                <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂无记录</Text>
              </View>
            </View> :
            <ScrollView
              style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
              scrollY
              onScrollToUpper={() => {
                this.refresh();
              }}
              onScrollToLower={() => {
                this.loadMore();
              }}>
              {
                records.map((value, index) => {
                  console.log(value);
                  return (<RadarItem key={index} item={value}
                                     collectCallback={(userId) => {
                                       this.updateMyCollect(1, userId);
                                     }
                                     }
                                     setCustomerCallback={(userId) => {
                                       this.addCustomer(userId);
                                     }
                                     }
                  />);
                })
              }
            </ScrollView>
        }
        {
          showGuide && <LeiDaGuide cancle={() => {
            save('radar_guide', true);
            this.setState({showGuide: false});
          }
          }/>
        }
      </CustomSafeAreaView>
    )
  }
}

export default Radar;
