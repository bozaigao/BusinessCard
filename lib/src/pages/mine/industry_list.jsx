"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename industry_list.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/29
 * @Description: 行业列表
 */
const taro_1 = require("@tarojs/taro");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/dict");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
let IndustryList = class IndustryList extends taro_1.Component {
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
            
        };
        this.getIndustryList = () => {
            this.viewRef && this.viewRef.showLoading();
            this.props.getIndustryList().then((res) => {
                console.log('获取行业信息', res);
                this.viewRef && this.viewRef.hideLoading();
                this.setState({ industryList: res });
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.state = {
            industryList: [],
            currentIndex: -1
        };
        console.log('收到参数了', this.$router.params.id);
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidShow() {
        this.getIndustryList();
    }
    componentDidHide() {
    }
    render() {
        let { industryList, currentIndex } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={'选择行业'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          {industryList.map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
                  <touchable_button_1.default key={index} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
                this.setState({ currentIndex: index });
            }}>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.ujc])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.ml(20)])}>{value.name}</components_1.Text>
                    </components_1.View>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor('#EAEAEA')])}/>
                  </touchable_button_1.default>
                  {currentIndex === index && value.children.map((item, itemIndex) => {
                return (<touchable_button_1.default key={itemIndex} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.bgColor('#F7F7F7')])} onClick={() => {
                    taro_1.default.eventCenter.trigger('industry', `${value.name}/${item.name}`);
                    taro_1.default.navigateBack();
                }}>
                        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.bgColor('#F7F7F7'), style_1.default.ujc])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.ml(20)])}>{item.name}</components_1.Text>
                        </components_1.View>
                        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor('#EAEAEA')])}/>
                      </touchable_button_1.default>);
            })}
                </components_1.View>);
        })}
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
IndustryList = __decorate([
    redux_1.connect(state => state.Dict, Object.assign({}, actions))
], IndustryList);
exports.default = IndustryList;
//# sourceMappingURL=industry_list.jsx.map
