"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename task_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务中心
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/task_center");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
const task_item_1 = require("./task-item");
const bottom_buton_1 = require("../../compoments/bottom-buton");
let TaskCenter = class TaskCenter extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {
            disableScroll: true
        };
        console.log(this.viewRef);
        this.state = {
            showAllTask: true,
            showOnlyToday: true,
        };
    }
    render() {
        let { showAllTask, showOnlyToday } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'任务中心'}/>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.mt(10)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.ml(20)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#E2BB7B')])}>全部任务</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(25), style_1.h(2), style_1.bgColor('#E2BB7B'), style_1.mt(10), style_1.radiusA(1)])}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.ml(23)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16)])}>今日任务</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(25), style_1.h(2), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10), style_1.radiusA(1)])}/>
            </components_1.View>
          </components_1.View>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.mr(20)])} src={require('../../assets/ico_date.png')}/>
        </components_1.View>
        
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          {[{ title: '正在进行', num: 2 }, { title: '已完成', num: 2 }].map((value, index) => {
            let showItem = false;
            if (index === 0) {
                showItem = showAllTask;
            }
            else {
                showItem = showOnlyToday;
            }
            return (<components_1.View key={index}>
                <touchable_button_1.default onClick={() => {
                if (index === 0) {
                    this.setState({ showAllTask: !this.state.showAllTask });
                }
                else {
                    this.setState({ showOnlyToday: !this.state.showOnlyToday });
                }
            }} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(40), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(20), style_1.pr(20), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                    <components_1.View style={{
                width: 0,
                height: 0,
                borderTopWidth: datatool_1.scaleSize(8),
                borderTopColor: showItem ? '#787878' : 'transparent',
                borderRightWidth: showItem ? datatool_1.scaleSize(8) : 0,
                borderRightColor: showItem ? 'transparent' : '#787878',
                borderLeftWidth: datatool_1.scaleSize(8),
                borderLeftColor: showItem ? 'transparent' : '#787878',
                borderBottomWidth: showItem ? 0 : datatool_1.scaleSize(8),
                borderBottomColor: 'transparent',
                borderStyle: 'solid',
            }}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(10)])}>{value.title}</components_1.Text>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>{`(${value.num})`}</components_1.Text>
                </touchable_button_1.default>
                {showItem && <components_1.View>
                    <task_item_1.default />
                    <task_item_1.default />
                  </components_1.View>}
              </components_1.View>);
        })}
        </components_1.ScrollView>
        
        <bottom_buton_1.default title={'新建任务'} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/add_task`
            });
        }}/>
      </safe_area_view_1.default>);
    }
};
TaskCenter = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], TaskCenter);
exports.default = TaskCenter;
//# sourceMappingURL=task_center.jsx.map