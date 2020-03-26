/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 筛选
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Input, Picker, Text, View} from "@tarojs/components";
import {
  getHalfYearStartDate,
  getMonthEndDate,
  getMonthStartDate,
  getToday,
  getWeekEndDate,
  getWeekStartDate,
  styleAssign
} from "../../../utils/datatool";
import {
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  mb,
  ml,
  mr,
  mt,
  op,
  padding,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import CustomSafeAreaView from "../../../compoments/safe-area-view/index";
import NavigationBar from "../../../compoments/navigation_bar/index";
import SanJiao from "../../../compoments/sanjiao/index";
import {Orientation} from "../../../const/global";


interface Props {
  cancelCallback: any;
  startAndEndTimeCallback: any;
  modeCallback: any;
  shaiXuanMode: string;
  totalPerson: number;
}

interface State {
  startTime: string;
  endTime: string;
  visitTime: string;
  shaiXuanTimes: string;
}

export default class ShaiXuanModal extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      startTime: '2020-01-01',
      endTime: getToday(),
      visitTime: '全部',
      shaiXuanTimes: '全部',
    }
  }

  render() {

    let {
      cancelCallback, modeCallback, shaiXuanMode, totalPerson, startAndEndTimeCallback
    } = this.props;
    let {startTime, endTime, visitTime} = this.state;

    return (
      <CustomSafeAreaView
        customStyle={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100), bgColor(commonStyles.transparent)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(0), absR(0),])}>
          <View style={styleAssign([wRatio(100), h(60), bgColor(commonStyles.whiteColor)])}/>
          <View style={styleAssign([styles.uf1, bgColor(commonStyles.blackColor), op(0.5)])}/>
        </TouchableButton>
        <NavigationBar style={styleAssign([bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([{width: '65%'}, {marginLeft: '2.5%'}, h(31), op(0.7), bgColor('#F5F5F5'),
            radiusA(26), styles.uac, styles.udr])}>
            <Image style={styleAssign([w(21), h(21), ml(16)])} src={require('../../../assets/ico_search.png')}/>
            <Input type='text' placeholder='搜索客户姓名' style={styleAssign([ml(16), fSize(14)])}/>
          </View>
        </NavigationBar>
        <View style={styleAssign([styles.uf1])}>
          {/*条件筛选*/}
          <View
            style={styleAssign([wRatio(100), h(36), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
              pl(20), pr(20)])}>
            <Text style={styleAssign([color('#727272'), fSize(14)])}>{`共${totalPerson}位客户`}</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}
                    onClick={modeCallback}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}>{shaiXuanMode}</Text>
                <SanJiao orientation={Orientation.down} style={styleAssign([ml(3)])}/>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(14)])}>筛选</Text>
                <Image style={styleAssign([w(14), h(14), ml(3)])}
                       src={require('../../../assets/ico_shaixuan_orange.png')}/>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*筛选内容*/}
          <View style={styleAssign([wRatio(100), h(214), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mt(10)])}>时间范围</Text>
            <View style={styleAssign([styles.uac, styles.udr, pl(20), mt(12)])}>
              {
                ['全部', '今日', '本周', '本月'].map((value, index) => {
                  return <View key={index} style={styleAssign([padding([3, 5, 3, 5]), radiusA(2),
                    styles.uac, styles.ujc, ml(index !== 0 ? 20 : 0), bgColor(visitTime === value ? '#E4E4E4' : commonStyles.transparent)])}
                               onClick={() => {
                                 switch (value) {
                                   case '全部':
                                     this.setState({visitTime: value, startTime: '', endTime: ''});
                                     break;
                                   case '今日':
                                     this.setState({visitTime: value, startTime: getToday(), endTime: getToday()});
                                     break;
                                   case '本周':
                                     this.setState({
                                       visitTime: value,
                                       startTime: getWeekStartDate(),
                                       endTime: getWeekEndDate()
                                     });
                                     break;
                                   case '本月':
                                     this.setState({
                                       visitTime: value,
                                       startTime: getMonthStartDate(),
                                       endTime: getMonthEndDate()
                                     });
                                     break;
                                   case '近半年':
                                     this.setState({
                                       visitTime: value,
                                       startTime: getHalfYearStartDate(),
                                       endTime: getToday()
                                     });
                                     break;
                                   default:
                                     this.setState({visitTime: value, startTime: '', endTime: ''});
                                     break;
                                 }
                                 this.setState({visitTime: value});
                               }}>
                    <Text style={styleAssign([color('#0C0C0C'), fSize(14)])}>{value}</Text>
                  </View>;
                })
              }
            </View>
            <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mt(16)])}>自定义时间</Text>
            <View style={styleAssign([styles.uac, styles.udr, wRatio(100), pl(20), mt(14)])}>
              <Picker mode='date' onChange={(e) => {
                this.setState({startTime: e.detail.value});
              }} value={startTime}>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Text style={styleAssign([color('#979797'), fSize(14)])}>{startTime}</Text>
                  <Image style={styleAssign([w(8), h(5), ml(3)])}
                         src={require('../../../assets/ico_sanjiao_down.png')}/>
                </View>
              </Picker>
              <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mr(20)])}>至</Text>
              <Picker mode='date' onChange={(e) => {
                this.setState({endTime: e.detail.value});
              }} value={endTime}>
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Text style={styleAssign([color('#979797'), fSize(14)])}>{endTime}</Text>
                  <Image style={styleAssign([w(8), h(5), ml(3)])}
                         src={require('../../../assets/ico_sanjiao_down.png')}/>
                </View>
              </Picker>
            </View>
            <View
              style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(10)])}/>
            <View style={styleAssign([styles.uf1, styles.uac, styles.uje])}>
              <View style={styleAssign([styles.uac, styles.udr, mb(15)])}>
                <View style={styleAssign([w(52), h(27), radiusA(4), styles.uac, styles.ujc])}
                      onClick={() => {
                        this.setState({visitTime: '全部', startTime: '2020-01-01', endTime: getToday()});
                      }}>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(16)])}>重置</Text>
                </View>
                <View style={styleAssign([w(52), h(27), radiusA(4), styles.uac, styles.ujc,
                  bgColor(commonStyles.colorTheme), ml(130)])}
                      onClick={() => {
                        startAndEndTimeCallback(startTime, endTime);
                      }}>
                  <Text style={styleAssign([color(commonStyles.whiteColor), fSize(16)])}>确定</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styleAssign([styles.uf1])}
                onClick={() => {
                  cancelCallback();
                  console.log('点击')
                }}/>
        </View>
      </CustomSafeAreaView>
    );
  }
}
