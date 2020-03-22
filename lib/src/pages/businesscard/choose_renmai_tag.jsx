"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename choose_renmai_tag.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/7
 * @Description: 选择兴趣人脉
 */
const taro_1 = require("@tarojs/taro");
const index_1 = require("../../compoments/safe-area-view/index");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const dictActions = require("../../actions/dict");
const index_2 = require("../../compoments/navigation_bar/index");
const components_1 = require("@tarojs/components");
const httpurl_1 = require("../../api/httpurl");
let ChooseRenmaiTag = class ChooseRenmaiTag extends taro_1.Component {
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
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/8
         * @function: 获取后台配置标签
         */
        this.getDictItemList = () => {
            this.viewRef && this.viewRef.showLoading();
            this.props.getDictItemList({ dictCode: 'interest ' }).then((res) => {
                console.log('获取后台配置标签', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ interest: res });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.state = {
            chooseValue: [],
            interest: [],
        };
    }
    componentDidShow() {
        this.getDictItemList();
    }
    render() {
        let { chooseValue, interest } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 189 : 169)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 189 : 169), style_1.default.upa, style_1.absT(-5)])} src={require('../../assets/ico_xingqu_renmai.png')}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.upa, style_1.absB(30), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(22), style_1.color(style_1.commonStyles.whiteColor)])}>
              选择你感兴趣的人脉
            </components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>
              选择后将为你优先推荐此兴趣人脉
            </components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.mt(30), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uWrap, style_1.default.udr, style_1.default.uac, style_1.default.uja, style_1.pl(20), style_1.pr(20)])}>
            {interest.map((value, index) => {
            return <components_1.View onClick={() => {
                if (chooseValue.includes(value.itemText)) {
                    this.state.chooseValue.splice(this.state.chooseValue.indexOf(value.itemText), 1);
                }
                else if (chooseValue.length === 3) {
                    datatool_1.toast('最多选择3个标签');
                }
                else {
                    this.state.chooseValue.push(value.itemText);
                }
                this.setState({ chooseValue: this.state.chooseValue });
            }} key={index} style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.padding([9, 35, 9, 35]), style_1.radiusA(20), style_1.mt(20), style_1.bo(1),
                { borderStyle: 'solid', }, style_1.bdColor(chooseValue.includes(value.itemText) ? style_1.commonStyles.colorTheme : 'rgb(229,229,229)'), style_1.ml(index % 3 === 0 ? 0 : 23)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                    {value.itemText}
                  </components_1.Text>
                </components_1.View>;
        })}
          </components_1.View>
        </components_1.ScrollView>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(56)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(181), style_1.h(46), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.colorTheme), style_1.radiusA(23)])} onClick={() => {
            if (chooseValue.length !== 0) {
                taro_1.default.redirectTo({
                    url: `/pages/businesscard/choose_industry_tag?renmai=${JSON.stringify(chooseValue)}`
                });
            }
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>
              {`选好了(${chooseValue.length})`}
            </components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.mt(32), style_1.mb(20)])}>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#D2D2D2')])}>
            极易推 给你极致服务
          </components_1.Text>
        </components_1.View>
        <index_2.default style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(0)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.default.uac, style_1.default.ujc, style_1.ml(10)])} onClick={() => {
            taro_1.default.redirectTo({
                url: `/pages/businesscard/choose_industry_tag`
            });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor), style_1.default.utxdu])}>
                跳过
              </components_1.Text>
            </components_1.View>
          </components_1.View>
        </index_2.default>
      </index_1.default>);
    }
};
ChooseRenmaiTag = __decorate([
    redux_1.connect(state => state.login, Object.assign(actions, dictActions))
], ChooseRenmaiTag);
exports.default = ChooseRenmaiTag;
//# sourceMappingURL=choose_renmai_tag.jsx.map