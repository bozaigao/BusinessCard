/**
 * @filename radar_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 雷达详情界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  absB,
  absR,
  bdColor,
  bgColor,
  bo,
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
import {parseData, styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/radar";
import TopHeader from "../../compoments/top-header";
import {Image, Picker, ScrollView, Text, View} from "@tarojs/components";
import {BehaviorTraceUser, FlowUpListModel} from "../../const/global";
import {cloudBaseUrl} from "../../api/httpurl";
import TraceItem from "./trace-item";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
  traceList?: any;
}

interface State {
  customer: BehaviorTraceUser
  currentIndex: number;
  count: number;
  flowUpList: FlowUpListModel[];
  date: string;
}

@connect(state => state.login, {...actions})
class RadarDetail extends Component<Props, State> {
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
      currentIndex: 0,
      flowUpList: [],
      date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
      count: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.traceList();
  }

  componentDidHide() {
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/16
   * @function: 雷达详情访问轨迹
   */
  traceList = () => {
    this.viewRef.showLoading();
    // console.log('雷达详情访问轨迹',this.state.customer.userId);
    this.props.traceList({traceUserId: 1}).then((res) => {
      console.log('雷达详情访问轨迹', res);
      this.viewRef.hideLoading();
      this.setState({flowUpList: res, count: res.count});
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {customer, currentIndex, flowUpList, date, count} = this.state;
    let childView;

    if (currentIndex === 0) {
      childView = <View style={styleAssign([styles.uf1])}>
        <View style={styleAssign([styles.uac, styles.udr, wRatio(100), styles.ujb,
          pl(20), pr(20), mt(10)])}>
          <Picker mode='date' onChange={(e) => {
            this.setState({date: e.detail.value}, () => {
            });
          }} value={date} fields={'month'}>
            <View style={styleAssign([w(77), h(22), bgColor(commonStyles.colorTheme), radiusA(2),
              styles.udr, styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                {date}
              </Text>
              <Image style={styleAssign([w(8), h(8), ml(5)])}
                     src={require('../../assets/ico_xiasanjiao_white.png')}/>
            </View>
          </Picker>
          <Text style={styleAssign([fSize(14), color('#979797')])}>
            {`共访问了${count}次`}
          </Text>
        </View>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
          <TraceItem/>
        </ScrollView>
        {/*收藏名片*/}
        <BottomButon title={'收藏名片'} onClick={() => {
        }}/>
      </View>;
    } else if (currentIndex === 1) {
      childView = <View/>;
    } else if (currentIndex === 2) {
      childView = <View/>;
    }

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={''}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uac, wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.udr, wRatio(100), styles.ujb, pl(20), pr(20),
              bgColor(commonStyles.whiteColor)])}>
              <View style={styleAssign([styles.uac, styles.ujc, w(40), h(40)])}/>
              <View style={styleAssign([styles.uac])}>
                <View style={styleAssign([w(98), h(98)])}>
                  <Image style={styleAssign([w(98), h(98), radiusA(49)])}
                         src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${cloudBaseUrl}ico_default.png`}/>
                  <Image style={styleAssign([w(20), h(20), styles.upa, absB(0), absR(0)])}
                         src={customer.sex === 1 ? `${cloudBaseUrl}ico_nan.png` : `${cloudBaseUrl}ico_nv.png`}/>
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
                        url: `/pages/customer/customer_ziliao?id=${customer.userId}`
                      });
                    }}>
                <Text style={styleAssign([fSize(15), color('#343434')])}>资料</Text>
                <Image style={styleAssign([w(7), h(12), ml(8)])}
                       src={`${cloudBaseUrl}ico_next.png`}/>
              </View>
            </View>
            {/*加微信、联系地址*/}
            <View
              style={styleAssign([wRatio(95), styles.uac, styles.udr, h(100), bgColor(commonStyles.whiteColor)])}>
              <View
                style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                  bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4),
                  {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                onClick={() => {
                  Taro.makePhoneCall({
                    phoneNumber: '15982468866' //仅为示例，并非真实的电话号码
                  })
                }}>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Image style={styleAssign([w(24), h(22)])} src={require('../../assets/ico_mibile_gray.png')}/>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>拨打电话</Text>
                </View>
                <Text style={styleAssign([color('#979797'), fSize(12)])}>15982468866</Text>
              </View>
              <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}
                    onClick={() => {
                      Taro.setClipboardData({
                        data: 'bozaigao98'
                      });
                      // Taro.getClipboardData({
                      //   success(res) {
                      //     console.log('拷贝文件', res.data) // data
                      //   }
                      // })
                    }}>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Image style={styleAssign([w(24), h(22)])} src={require('../../assets/ico_wechat_gray.png')}/>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>加微信</Text>
                </View>
                <Text style={styleAssign([color('#979797'), fSize(12)])}>点击添加微信</Text>
              </View>
              <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15),
                {boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5'}])}>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Image style={styleAssign([w(24), h(22)])} src={require('../../assets/ico_location_gray.png')}/>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>联系地址</Text>
                </View>
                <Text style={styleAssign([color('#979797'), fSize(12)])}>点击立即定位</Text>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100)])}>
            <View style={styleAssign([styles.udr, styles.uac, styles.ujb,
              wRatio(100), h(44), bgColor(commonStyles.whiteColor), mt(12)])}>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, h(44)])}
                    onClick={() => {
                      this.setState({currentIndex: 0});
                    }}>
                <Text
                  style={styleAssign([fSize(15), color(currentIndex !== 0 ? '#343434' : '#E2BB7B')])}>轨迹</Text>
              </View>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc, h(44)])}
                    onClick={() => {
                      this.setState({currentIndex: 1});
                    }}>
                <Text
                  style={styleAssign([fSize(15), color(currentIndex !== 1 ? '#343434' : '#E2BB7B')])}>AI分析</Text>
              </View>
            </View>
            <View style={styleAssign([styles.uac, styles.udr, styles.ujb, wRatio(100)])}>
              <View style={styleAssign([styles.uac, styles.ujc, styles.uf1])}>
                <View
                  style={styleAssign([w(44), h(1), bgColor(currentIndex !== 0 ? commonStyles.whiteColor : '#E2BB7B')])}/>
              </View>
              <View style={styleAssign([styles.uac, styles.ujc, styles.uf1])}>
                <View
                  style={styleAssign([w(44), h(1), bgColor(currentIndex !== 1 ? commonStyles.whiteColor : '#E2BB7B')])}/>
              </View>
            </View>
          </View>
          {childView}
        </View>
      </CustomSafeAreaView>
    )
  }
}


export default RadarDetail
