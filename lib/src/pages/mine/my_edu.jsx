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
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const bottom_buton_1 = require("../../compoments/bottom-buton");
const list_item_1 = require("../../compoments/list-item");
const wenhou_modal_1 = require("../sub_pagecomponent/wenhou-modal");
const httpurl_1 = require("../../api/httpurl");
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
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            let { wenHouYU, list } = this.state;
            if (list[0].value && list[0].value.length === 0) {
                datatool_1.toast('请输入学校名称');
                return;
            }
            if (list[1].value && list[1].value.length === 0) {
                datatool_1.toast('请选择学历');
                return;
            }
            if (list[2].value && list[2].value.length === 0) {
                datatool_1.toast('请输入你的专业');
                return;
            }
            if (this.schoolTimeStart === 0 || this.schoolTimeEnd === 0) {
                datatool_1.toast('请选择在校时间');
                return;
            }
            if (wenHouYU.length === 0) {
                datatool_1.toast('请输入问候语');
                return;
            }
            this.viewRef && this.viewRef.showLoading();
            let params = {
                school: list[0].value && list[0].value,
                educationBackground: list[1].value && list[1].value,
                profession: list[2].value && list[2].value,
                schoolTimeStart: `${this.schoolTimeStart}`,
                schoolTimeEnd: `${this.schoolTimeEnd}`,
                schoolfellowGreeting: wenHouYU
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
        this.schoolTimeStart = this.$router.params.schoolTimeStart;
        this.schoolTimeEnd = this.$router.params.schoolTimeEnd;
        this.placeHolder = '校友您好，很高兴能遇到你！你可以收藏我的名片哦~';
        this.state = {
            list: [{ title: '学校', subtitle: '请输入学校名称', value: this.$router.params.school, hasEdit: true },
                { title: '学历', subtitle: '选择', value: this.$router.params.educationBackground },
                { title: '专业', subtitle: '请输入专业名称', value: this.$router.params.profession, hasEdit: true },
                { title: '在校时间', subtitle: '选择', value: this.schoolTimeStart + '-' + this.schoolTimeEnd }],
            wenHouYU: this.$router.params.schoolfellowGreeting,
            wenHouYUTmp: this.$router.params.schoolfellowGreeting,
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
        let selectorRange = ['博士', '研究生', '专科', '高中'];
        let multiSelectorRange = [['2015', '2016', '2017', '2018', '2019'], ['到'], ['2020', '2021', '2022', '2023', '2024']];
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={'教育经历'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.mt(10)])}>
            {list.map((value, index) => {
            if (value.title === '学历') {
                return (<components_1.Picker mode='selector' onChange={(e) => {
                    this.state.list[1].value = selectorRange[e.detail.value];
                    this.setState({ list: this.state.list });
                }} range={selectorRange} value={0}>
                    <list_item_1.default textColor={'#727272'} title={value.title} value={value.value} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit}/></components_1.Picker>);
            }
            else if (value.title === '在校时间') {
                return (<components_1.Picker mode='multiSelector' onChange={(e) => {
                    this.schoolTimeStart = multiSelectorRange[0][e.detail.value[0]];
                    this.schoolTimeEnd = multiSelectorRange[2][e.detail.value[2]];
                    this.state.list[3].value = multiSelectorRange[0][e.detail.value[0]] + '-' + multiSelectorRange[2][e.detail.value[2]];
                    this.setState({ list: this.state.list });
                }} range={multiSelectorRange} value={[4, 0, 0]}>
                    <list_item_1.default textColor={'#727272'} title={value.title} value={value.value} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit}/></components_1.Picker>);
            }
            return (<list_item_1.default textColor={'#727272'} value={value.value} title={value.title} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit} onTextChange={(e) => {
                if (value.title === '学校') {
                    this.state.list[0].value = e.detail.value;
                    this.setState({ list: this.state.list });
                }
                else if (value.title === '专业') {
                    this.state.list[2].value = e.detail.value;
                    this.setState({ list: this.state.list });
                }
                console.log(e);
            }}/>);
        })}
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(161), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.pl(20), style_1.pr(20),])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>同校问候语</components_1.Text>
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

          
          <bottom_buton_1.default title={'保存'} onClick={() => {
            this.update();
        }}/>
        </components_1.View>
        {showWenHouYu && <wenhou_modal_1.default type={wenhou_modal_1.WenHouType.EDUCATION} cancle={() => {
            this.setState({ showWenHouYu: false, wenHouYU: wenHouYUTmp, placeHolder: this.placeHolder });
        }} wenHouYu={wenHouYUTmp} userInfo={this.props.userInfo}/>}
      </safe_area_view_1.default>);
    }
};
MyEdu = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], MyEdu);
exports.default = MyEdu;
//# sourceMappingURL=my_edu.jsx.map