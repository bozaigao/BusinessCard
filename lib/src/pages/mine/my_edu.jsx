"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename my_edu.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 教育经历
 */
const taro_1 = require("@tarojs/taro");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/home");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const bottom_buton_1 = require("../../compoments/bottom-buton");
let MyEdu = class MyEdu extends taro_1.Component {
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
        this.state = {
            list: [{ title: '学校', value: '四川美术学院' },
                { title: '学历', value: '本科' },
                { title: '专业', value: '产品设计' },
                { title: '在校时间', value: '2015-2019' }],
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidMount() {
    }
    componentDidHide() {
    }
    render() {
        let { list } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'教育经历'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.mt(10)])}>
            {list.map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])} key={index}><components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>{value.title}</components_1.Text>
                  <components_1.Input type='text' value={value.value} style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14), { textAlign: 'right' }])}/>
                </components_1.View>
                  {index !== 3 &&
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>}
                </components_1.View>);
        })}
          </components_1.View>
          
          <bottom_buton_1.default title={'保存'} onClick={() => {
        }}/>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
MyEdu = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], MyEdu);
exports.default = MyEdu;
//# sourceMappingURL=my_edu.jsx.map