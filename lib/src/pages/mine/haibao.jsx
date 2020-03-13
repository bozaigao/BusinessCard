"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename haibao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 海报
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const index_3 = require("../../compoments/touchable-button/index");
let Haibao = class Haibao extends taro_1.Component {
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
            currentIndex: 0
        };
    }
    render() {
        let { currentIndex } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default title={'海报'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.default.uac])}>
          
          <components_1.ScrollView style={datatool_1.styleAssign([{ whiteSpace: 'nowrap' }, style_1.wRatio(100), style_1.h(41), { paddingLeft: '5%' },
            style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollX>
            {['热点话题', '早晚问候', '每日励志', '人才招聘', '节日节气'].map((value, index) => {
            console.log(value);
            return (<components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(5), style_1.ml(index !== 0 ? 20 : 0), { display: 'inline-block' }])} key={index} onClick={() => {
                this.setState({ currentIndex: index });
            }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(index === currentIndex ? '#E2BB7B' : style_1.commonStyles.colorTheme), style_1.fWeight(index === currentIndex ? 'bold' : 'normal')])}>{value}</components_1.Text>
                    <components_1.View style={datatool_1.styleAssign([style_1.w(50), style_1.h(2), style_1.radiusA(1), style_1.bgColor(index === currentIndex ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(5),
                style_1.ml(3)])}/>
                  </components_1.View>);
        })}
          </components_1.ScrollView>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(4), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.ScrollView style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.wRatio(100), style_1.hRatio(100)])} scrollY>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uWrap, style_1.default.udr, style_1.pl(14), style_1.pr(14), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
            console.log(value);
            return (<components_1.View style={datatool_1.styleAssign([style_1.ma(4), style_1.w(107), style_1.h(247), style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.radiusA(4)])} key={index}>
                      <components_1.View style={datatool_1.styleAssign([style_1.w(107), style_1.h(178), style_1.radiusA(4)])}>
                        <components_1.Image style={datatool_1.styleAssign([style_1.w(107), style_1.h(178), style_1.radiusA(4)])} src={`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582355731670&di=55fa50f48a87b1399348f669bf581b97&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F341%2F16456.jpg`}/>
                        <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.radiusA(10), style_1.default.upa, style_1.absB(5), style_1.absR(5)])} src={`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582356001454&di=25b8ab4031e2bacf6ca011bceee981b6&imgtype=0&src=http%3A%2F%2Fwww.hntianwang.com%2Fdata%2Fupload%2Fimage%2F20171015%2F1508057715985296.jpg`}/>
                      </components_1.View>
                      <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
                        <index_3.default customStyle={datatool_1.styleAssign([style_1.w(72), style_1.h(28), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme), { borderStyle: 'solid' },
                style_1.default.uac, style_1.default.ujc, style_1.radiusA(4)])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>立即使用</components_1.Text>
                        </index_3.default>
                      </components_1.View>
                    </components_1.View>);
        })}
            </components_1.View>
          </components_1.ScrollView>
        </components_1.View>
      </index_1.default>);
    }
};
Haibao = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Haibao);
exports.default = Haibao;
//# sourceMappingURL=haibao.jsx.map