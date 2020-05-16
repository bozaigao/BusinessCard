"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const echarts = require("./ec-canvas/echarts");
function setChartData(chart, data) {
    let option = {
        series: [
            {
                name: '访问来源',
                type: 'pie',
                center: ['40%', '50%'],
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
class PieChart extends taro_1.Component {
    constructor(props) {
        super(props);
        this.config = {
            usingComponents: {
                "ec-canvas": "./ec-canvas/ec-canvas"
            }
        };
        this.state = {
            ec: {
                lazyLoad: true
            }
        };
        this.refChart = node => (this.Chart = node);
    }
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
    render() {
        return (<ec-canvas ref={this.refChart} canvas-id="mychart-area" ec={this.state.ec}/>);
    }
}
exports.default = PieChart;
//# sourceMappingURL=PieChart.js.map