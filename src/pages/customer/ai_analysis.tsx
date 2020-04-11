/**
 * @filename ai_analysis.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/4/11
 * @Description: ai数据表格分析
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {bgColor, commonStyles} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import TopHeader from "../../compoments/top-header/index";
import {View} from "@tarojs/components";
import PieChart from "./PieChart";
import LineChart from './LineChart'

interface Props {
}

interface State {

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
  }

  componentDidMount() {
    const chartData = [
      {value: 335, name: '直接访问'},
      {value: 310, name: '邮件营销'},
      {value: 234, name: '联盟广告'},
      {value: 135, name: '视频广告'},
      {value: 1548, name: '搜索引擎'}
    ];

    this.pieChart.refresh(chartData);

    this.lineChart.refresh();
  }

  componentWillUnmount() {
  }


  componentDidHide() {
  }


  render() {
    let {desc, customer} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'添加跟进'}/>
        <View className="pie-chart">
          <PieChart ref={(ref) => {
            this.pieChart = ref;
          }}/>
        </View>
        <View className="line-chart">
          <LineChart ref={(ref) => {
            this.lineChart = ref;
          }}/>
        </View>
      </CustomSafeAreaView>
    )
  }
}


export default AiAnalysis
