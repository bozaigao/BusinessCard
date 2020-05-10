"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const multi_line_text_1 = require("../multi_line_text");
class TaskItem extends taro_1.PureComponent {
    render() {
        let { itemData, finishCallback, deleteCallback, isTodayTask } = this.props;
        let myyear = new Date().getFullYear();
        let mymonth = new Date().getMonth() + 1;
        let myweekday = new Date().getDate();
        let myhour = new Date().getHours();
        let myminutes = new Date().getMinutes();
        let dateTime = new Date(itemData.date).getTime();
        if (mymonth < 10) {
            //@ts-ignore
            mymonth = '0' + mymonth;
        }
        if (myweekday < 10) {
            //@ts-ignore
            myweekday = '0' + myweekday;
        }
        let currentTime = new Date(`${myyear}-${mymonth}-${myweekday} ${myhour}:${myminutes}`).getTime();
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(10), style_1.mb(10)])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/task_detail?taskId=${itemData.id}&status=${itemData.status}`
            });
        }}>
        <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusA(4)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.default.uac, style_1.default.udr, style_1.default.ujb,
            style_1.pl(16), style_1.pr(16), style_1.pt(20)])}>
            <multi_line_text_1.default style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434'), style_1.w(200)])} text={itemData.theme}/>
            <components_1.View onClick={(e) => {
            e.stopPropagation();
            if (itemData.status !== 1) {
                finishCallback(itemData.id);
            }
            else {
                deleteCallback(itemData.id);
            }
        }} style={datatool_1.styleAssign([style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>{`${itemData.status !== 1 ? '移至完成' : '删除任务'}`}</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.mt(16), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(40), style_1.default.uac, style_1.default.udr])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color(dateTime < currentTime ? 'red' : '#A6A6A6'), style_1.mt(4), style_1.ml(20)])}>{isTodayTask ? `今天 ${datatool_1.transformTime(itemData.date).split(' ')[1]}` : datatool_1.transformTime(itemData.date)}</components_1.Text>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = TaskItem;
//# sourceMappingURL=index.jsx.map