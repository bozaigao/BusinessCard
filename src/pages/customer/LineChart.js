import Taro, {Component} from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";

function setChartData(chart, titles, values) {
  let option = {
    color: ["#825D22"],
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: '日活量',
      type: 'line',
      smooth: true,
      data: []
    }]
  };

  if (titles) {
    option.xAxis.data = titles;
  }

  if (values) {
    option.series[0].data = values;
  }

  console.log('配置信息',option);

  chart.setOption(option);
}

export default class LineChart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "./ec-canvas/ec-canvas"
    }
  };

  constructor(props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true
    }
  };

  refresh(titles, values) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      setChartData(chart, titles, values);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);

  render() {
    return (
      <ec-canvas
        ref={this.refChart}
        canvas-id="mychart-area"
        ec={this.state.ec}
      />
    );
  }
}
