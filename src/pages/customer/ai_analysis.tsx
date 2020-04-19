/**
 * @filename ai_analysis.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/4/11
 * @Description: ai数据表格分析
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {
  bdColor,
  bgColor,
  bl,
  bo,
  br,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {parseData, styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/radar";
import TopHeader from "../../compoments/top-header/index";
import {Text, View} from "@tarojs/components";
import PieChart from "./PieChart";
import LineChart from './LineChart'
import './index.scss';

interface Props {
}

interface State {
  current: number;
  active: { title: string[], value: string[] };
  interest: { card: number, company: number; goods: number; }
}

@connect(state => state.login, {...actions})
class AiAnalysis extends Component<Props, State> {
  private viewRef;
  private pieChart;
  private lineChart;

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
    this.state = {
      active: parseData(this.$router.params.active),
      interest: parseData(this.$router.params.interest),
      current: 0
    }
  }

  componentDidMount() {
    let {interest, active} = this.state;
    let totalViews = interest.card + interest.company + interest.goods;
    const chartData = [
      {
        value: totalViews === 0 ? 0 : interest.card / totalViews,
        name: totalViews === 0 ? '0%' : (interest.card / totalViews) + '%'
      },
      {
        value: totalViews === 0 ? 0 : interest.goods / totalViews,
        name: totalViews === 0 ? '0%' : (interest.goods / totalViews) + '%'
      },
      {
        value: totalViews === 0 ? 0 : interest.company / totalViews,
        name: totalViews === 0 ? '0%' : (interest.company / totalViews) + '%'
      },
    ];

    console.log(active);
    this.pieChart.refresh(chartData);

    this.lineChart.refresh(active.title, active.value);
  }

  componentWillUnmount() {
  }


  componentDidHide() {
  }


  render() {
    let {current, interest} = this.state;
    let totalViews = interest.card + interest.company + interest.goods;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'AI分析'}/>
        <View style={styleAssign([styles.uf1])}>
          <View style={styleAssign([wRatio(100), h(2), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <Text style={styleAssign([fSize(16), color('#343434'), ml(20), mt(20)])}>
            兴趣占比
          </Text>
          <View style={styleAssign([wRatio(100), hRatio(40), styles.udr, styles.uac, styles.ujb])}>
            <View className="pie-chart">
              <PieChart ref={(ref) => {
                this.pieChart = ref;
              }}/>
            </View>
            <View style={styleAssign([w(230), mr(20)])}>
              <Text style={styleAssign([fSize(15), color('#343434')])}>
                {`访问浏览量：${totalViews}`}
              </Text>
              <View style={styleAssign([styles.udr, styles.uac, mt(17)])}>
                <View style={styleAssign([w(13), h(13), radiusA(2), bgColor('#E2BB7B')])}/>
                <Text style={styleAssign([fSize(12), color('#979797'), ml(5)])}>
                  {`对我名片信息感兴趣：${totalViews === 0 ? '0%' : (interest.card / totalViews) + '%'}`}
                </Text>
              </View>
              <View style={styleAssign([styles.udr, mt(17)])}>
                <View style={styleAssign([w(13), styles.uac, h(13), radiusA(2), bgColor('#825D22')])}/>
                <Text style={styleAssign([fSize(12), color('#979797'), ml(5)])}>
                  {`对我的产品感兴趣：${totalViews === 0 ? '0%' : (interest.goods / totalViews) + '%'}`}
                </Text>
              </View>
              <View style={styleAssign([styles.udr, mt(17)])}>
                <View style={styleAssign([w(13), styles.uac, h(13), radiusA(2), bgColor('#FFE0AE')])}/>
                <Text style={styleAssign([fSize(12), color('#979797'), ml(5)])}>
                  {`对我的企业感兴趣：${totalViews === 0 ? '0%' : (interest.company / totalViews) + '%'}`}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styleAssign([fSize(16), color('#343434'), ml(20), mt(20)])}>
            客户活跃度
          </Text>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, {display: 'none'}])}>
            <View
              style={styleAssign([styles.uac, styles.udr, w(205), h(30), radiusA(2), mt(30)])}>
              <View
                onClick={() => {
                  this.setState({current: 0});
                }}
                style={styleAssign([styles.uf1, styles.uac, styles.ujc, bgColor(current === 0 ? '#825D22' : commonStyles.whiteColor),
                  bo(1), br(0.5), bdColor('#825D22'), {borderStyle: 'solid'},])}>
                <Text style={styleAssign([fSize(14), color(current === 0 ? commonStyles.whiteColor : '#825D22')])}>
                  近7天
                </Text>
              </View>
              <View
                style={styleAssign([styles.uf1, styles.uac, styles.ujc, bgColor(current === 1 ? '#825D22' : commonStyles.whiteColor),
                  bo(1), bl(0.5), br(0.5), bdColor('#825D22'), {borderStyle: 'solid'},])}
                onClick={() => {
                  this.setState({current: 1});
                }}>
                <Text style={styleAssign([fSize(14), color(current === 1 ? commonStyles.whiteColor : '#825D22')])}>
                  近1月
                </Text>
              </View>
              <View
                style={styleAssign([styles.uf1, styles.uac, styles.ujc, bgColor(current === 2 ? '#825D22' : commonStyles.whiteColor),
                  bo(1), bl(0.5), br(0.5), bdColor('#825D22'), {borderStyle: 'solid'},])}
                onClick={() => {
                  this.setState({current: 2});
                }}>
                <Text style={styleAssign([fSize(14), color(current === 2 ? commonStyles.whiteColor : '#825D22')])}>
                  近3月
                </Text>
              </View>
              <View
                style={styleAssign([styles.uf1, styles.uac, styles.ujc, bgColor(current === 3 ? '#825D22' : commonStyles.whiteColor),
                  bo(1), bl(0.5), bdColor('#825D22'), {borderStyle: 'solid'},])}
                onClick={() => {
                  this.setState({current: 3});
                }}>
                <Text style={styleAssign([fSize(14), color(current === 3 ? commonStyles.whiteColor : '#825D22')])}>
                  近6月
                </Text>
              </View>
            </View>
          </View>
          <View className="line-chart">
            <LineChart ref={(ref) => {
              this.lineChart = ref;
            }}/>
          </View>
        </View>

      </CustomSafeAreaView>
    )
  }
}


export default AiAnalysis
