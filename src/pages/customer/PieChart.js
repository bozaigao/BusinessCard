import Taro, {Component} from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";

function setChartData(chart, data) {
  let option = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        center: ['35%', '50%'],
        radius: [0, '60%'],
        color: ["#825D22", "#FFE0AE", "#E2BB7B"],
        data: data,
        label: {
          normal: {
            position: 'inner',
            show: false
          }
        },
        // 修改字体颜色的代码begin
        itemStyle: {
          normal: {
            label: {
              textStyle: {
                color: 'black',
                fontSize: 10,
                fontWeight: 'bolder'
              }
            },
            labelLine: {
              lineStyle: {
                color: 'black'
              }
            }
          }
        },
      }
    ]
  };
  chart.setOption(option);
}

export default class PieChart extends Component {
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

  refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
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
