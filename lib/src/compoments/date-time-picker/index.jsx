"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const utils_1 = require("./utils");
require("./index.scss");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const httpurl_1 = require("../../api/httpurl");
class DateTimePicker extends taro_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            yearList: [],
            monthLsit: [],
            dayList: [],
            hourList: [],
            minuteList: [],
            selectIndexList: [1, 1, 1, 1, 1],
            fmtInitValue: "",
            current: '',
            visible: false,
            hasChange: false,
            year: '',
            month: '',
            day: '',
            hour: '',
            minute: '',
        };
        // 打开时间选择的模态框 - 根据当前时间初始化picker-view的数据
        this.openModal = () => {
            const { current, fmtInitValue } = this.state;
            const selectIndexList = [];
            const arr = utils_1.getArrWithTime(current || fmtInitValue || utils_1.getDate()); //优先当前选择的值，其次默认值，其次当前值
            const { yearList, monthLsit, dayList, hourList, minuteList } = utils_1.getPickerViewList();
            const [year, month, day, hour, minute] = arr;
            //根据arr  数据索引
            selectIndexList[0] = yearList.indexOf(arr[0] + '年');
            selectIndexList[1] = monthLsit.indexOf(arr[1] + '月');
            selectIndexList[2] = dayList.indexOf(arr[2] + '日');
            selectIndexList[3] = hourList.indexOf(arr[3] + '点');
            selectIndexList[4] = minuteList.indexOf(arr[4] + '分');
            this.setState({
                selectIndexList,
                visible: true,
                yearList,
                monthLsit,
                dayList,
                hourList,
                minuteList,
                year,
                month,
                day,
                hour,
                minute
            });
        };
        // 取消
        this.cancelHandel = () => {
            this.setState({
                visible: false,
                hasChange: false,
            });
            const { year, month, day, hour, minute } = this.state;
            const current = utils_1.formatDate(year, month, day, hour, minute);
            this.props.onCancel && this.props.onCancel({ current });
        };
        // 确定
        this.okHandel = () => {
            const { year, month, day, hour, minute } = this.state;
            const current = utils_1.formatDate(year, month, day, hour, minute);
            this.setState({
                current,
                hasChange: false,
                visible: false,
            });
            this.props.onOk && this.props.onOk({ current });
        };
        // 切换
        this.changeHandel = (e) => {
            const selectIndexList = e.detail.value;
            const [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex] = selectIndexList;
            const { yearList, monthLsit, dayList, hourList, minuteList } = this.state;
            const yearStr = yearList[yearIndex];
            const monthStr = monthLsit[monthIndex];
            const dayStr = dayList[dayIndex];
            const hourStr = hourList[hourIndex];
            const minuteStr = minuteList[minuteIndex];
            const year = Number(yearStr.substr(0, yearStr.length - 1));
            const month = Number(monthStr.substr(0, monthStr.length - 1));
            const day = Number(dayStr.substr(0, dayStr.length - 1));
            const hour = Number(hourStr.substr(0, hourStr.length - 1));
            const minute = Number(minuteStr.substr(0, minuteStr.length - 1));
            // 更新年、天数
            const newDayList = utils_1.getDayList(year, month);
            this.setState({
                dayList: newDayList,
                year,
                month,
                day,
                hour,
                minute,
                hasChange: true,
            });
        };
        // 清除数据
        this.clear = () => {
            this.setState({
                current: ''
            });
            this.props.onClear && this.props.onClear({ current: '' });
        };
    }
    componentDidMount() {
        const { initValue } = this.props;
        const fmtInitValue = utils_1.getDate(initValue);
        this.setState({ fmtInitValue });
    }
    render() {
        const { visible, current, yearList, monthLsit, dayList, hourList, minuteList, selectIndexList } = this.state;
        const { placeholder = '请选择时间' } = this.props;
        return (<components_1.View className="datetime-picker-wrap wrap-class">
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.h(51), style_1.pl(20), style_1.pr(20), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>日期及时间</components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.Text onClick={() => {
            if (!this.props.disabled) {
                this.openModal();
            }
        }} style={datatool_1.styleAssign([style_1.color('#787878')])}>
              {current || placeholder}
            </components_1.Text>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(13), style_1.ml(5)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
          </components_1.View>
        </components_1.View>
        {visible
            && <components_1.View className="wrapper">
          
          <components_1.View className="model-box-bg" onClick={this.cancelHandel}></components_1.View>
          <components_1.View className="model-box">
            <components_1.View className="model-picker">
              <components_1.View className="button-model">
                <components_1.Text class="btn-txt1" onClick={this.cancelHandel}>取消</components_1.Text>
                <components_1.Text class="btn-txt2" onClick={this.okHandel}>确定</components_1.Text>
              </components_1.View>
              <components_1.View className="cont_model">
                <components_1.PickerView className="pick-view" indicatorStyle="height: 50px;" value={selectIndexList} onChange={this.changeHandel}>
                  
                  <components_1.PickerViewColumn className="picker-view-column">
                    {yearList.length && yearList.map((item, index) => <components_1.View key={String(index)} className="pick-view-column-item">{item}</components_1.View>)}
                  </components_1.PickerViewColumn>
                  
                  <components_1.PickerViewColumn className="picker-view-column">
                    {monthLsit.length && monthLsit.map((item, index) => <components_1.View key={String(index)} className="pick-view-column-item">{item}</components_1.View>)}
                  </components_1.PickerViewColumn>
                  
                  <components_1.PickerViewColumn className="picker-view-column">
                    {dayList.length && dayList.map((item, index) => <components_1.View key={String(index)} className="pick-view-column-item">{item}</components_1.View>)}
                  </components_1.PickerViewColumn>
                  
                  <components_1.PickerViewColumn className="picker-view-column">
                    {hourList.length && hourList.map((item, index) => <components_1.View key={String(index)} className="pick-view-column-item">{item}</components_1.View>)}
                  </components_1.PickerViewColumn>
                  
                  <components_1.PickerViewColumn className="picker-view-column">
                    {minuteList.length && minuteList.map((item, index) => <components_1.View key={String(index)} className="pick-view-column-item">{item}</components_1.View>)}
                  </components_1.PickerViewColumn>
                </components_1.PickerView>
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.View>}
      </components_1.View>);
    }
}
DateTimePicker.externalClasses = ['wrap-class', 'select-item-class'];
exports.default = DateTimePicker;
//# sourceMappingURL=index.jsx.map