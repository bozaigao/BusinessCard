"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const echarts = require("./ec-canvas/echarts");
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
        option.series.data = values;
    }
    console.log('配置信息', option);
    chart.setOption(option);
}
class LineChart extends taro_1.Component {
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
    render() {
        return (<ec-canvas ref={this.refChart} canvas-id="mychart-area" ec={this.state.ec}/>);
    }
}
exports.default = LineChart;
//# sourceMappingURL=LineChart.js.map