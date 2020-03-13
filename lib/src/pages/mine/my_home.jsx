"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename my_home.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/8
 * @Description: 我的家乡
 */
const taro_1 = require("@tarojs/taro");
const index_1 = require("../../compoments/safe-area-view/index");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const index_3 = require("../../compoments/bottom-buton/index");
const index_4 = require("../../compoments/list-item/index");
const index_5 = require("../sub_pagecomponent/wenhou-modal/index");
const httpurl_1 = require("../../api/httpurl");
let MyHome = class MyHome extends taro_1.Component {
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
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            let { wenHouYU } = this.state;
            if (!this.province || this.province.length === 0 || !this.city || this.city.length === 0) {
                datatool_1.toast('请选择地区');
                return;
            }
            if (!wenHouYU || wenHouYU.length === 0) {
                datatool_1.toast('请输入问候语');
                return;
            }
            this.viewRef && this.viewRef.showLoading();
            let params = {
                province: this.province,
                city: this.city,
                villagerGreeting: wenHouYU
            };
            console.log('参数错误', params);
            this.props.update(params).then((res) => {
                console.log('更新用户信息', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('保存成功');
                    datatool_1.debounce(1000, () => {
                        taro_1.default.navigateBack();
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.province = this.$router.params.province;
        this.city = this.$router.params.city;
        this.placeHolder = '同乡您好，很高兴能遇到你！你可以收藏我的名片哦~';
        this.state = {
            list: [{ title: '家乡', subtitle: '选择地址', value: this.province + this.city }],
            wenHouYU: this.$router.params.villagerGreeting,
            wenHouYUTmp: this.$router.params.villagerGreeting,
            placeHolder: this.placeHolder,
            showWenHouYu: false
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidHide() {
    }
    render() {
        let { list, wenHouYU, showWenHouYu, placeHolder, wenHouYUTmp } = this.state;
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <index_2.default title={'我的家乡'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.mt(10)])}>
            {list.map((value, index) => {
            return (<components_1.Picker mode='region' onChange={(e) => {
                this.province = e.detail.value[0];
                this.city = e.detail.value[1] + e.detail.value[2];
                this.state.list[0].value = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                this.setState({ list: this.state.list });
            }} value={[]}>
                  <index_4.default textColor={'#727272'} title={value.title} value={value.value} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit}/></components_1.Picker>);
        })}
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(161), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.pl(20), style_1.pr(20),])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>同乡问候语</components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.w(50), style_1.h(50), style_1.default.uae, style_1.default.ujc])} onClick={() => {
            if (wenHouYU.length === 0) {
                datatool_1.toast('问候语不能为空');
            }
            else {
                this.setState({ showWenHouYu: true, wenHouYU: '', placeHolder: '' });
            }
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#E2BB7B')])}>预览</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(131), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Textarea value={wenHouYU} maxlength={50} placeholder={placeHolder} style={datatool_1.styleAssign([style_1.w(305), style_1.h(91), style_1.fSize(16), style_1.ml(20),
            style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.pa(16), style_1.mb(20)])} onInput={(e) => {
            this.setState({ wenHouYU: e.detail.value, wenHouYUTmp: e.detail.value });
        }}/>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.upa, style_1.absR(30), style_1.absB(30)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>{wenHouYU.length}</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#CECECE')])}>/50</components_1.Text>
                </components_1.View>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(20), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.upa, style_1.absR(0), style_1.absB(0)])}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>

          
          <index_3.default title={'保存'} onClick={() => {
            this.update();
        }}/>
        </components_1.View>
        {showWenHouYu && <index_5.default type={index_5.WenHouType.HOME} cancle={() => {
            this.setState({ showWenHouYu: false, wenHouYU: wenHouYUTmp, placeHolder: this.placeHolder });
        }} wenHouYu={wenHouYUTmp} userInfo={this.props.userInfo}/>}
      </index_1.default>);
    }
};
MyHome = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], MyHome);
exports.default = MyHome;
//# sourceMappingURL=my_home.jsx.map