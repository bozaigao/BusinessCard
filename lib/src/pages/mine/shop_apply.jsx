"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename shop_apply.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @Description: 开通店铺
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const shopActions = require("../../actions/shop");
const loginActions = require("../../actions/login");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const index_3 = require("../../compoments/bottom-buton/index");
const index_4 = require("../../compoments/list-item/index");
const httpurl_1 = require("../../api/httpurl");
let ShopApply = class ShopApply extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {};
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/5/2
         * @function: 店铺提交申请
         */
        this.shopApply = () => {
            let { name, phone, companyName, province, city, desc } = this.state;
            if (name.length === 0) {
                datatool_1.toast('姓名不能为空');
                return;
            }
            if (phone.length === 0) {
                datatool_1.toast('手机号不能为空');
                return;
            }
            if (!phone.startsWith('1') || phone.length !== 11) {
                datatool_1.toast('手机号非法');
                return;
            }
            if (companyName.length === 0) {
                datatool_1.toast('公司名字不能为空');
                return;
            }
            if (province.length === 0) {
                datatool_1.toast('详细地址不能为空');
                return;
            }
            if (desc.length === 0) {
                datatool_1.toast('主营业务描述不能为空');
                return;
            }
            let paramas = {
                name,
                phone,
                company: companyName,
                province,
                city,
                business: desc,
            };
            console.log('店铺提交申请', paramas);
            this.viewRef && this.viewRef.showLoading();
            this.props.shopApply(paramas).then((res) => {
                console.log('店铺提交申请', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    taro_1.default.redirectTo({
                        url: `/pages/mine/apply_success`
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.state = {
            name: '',
            phone: '',
            companyName: '',
            province: '',
            city: '',
            titleList: [{ title: '姓名', subtitle: '请输入姓名', value: '', hasEdit: true },
                { title: '联系方式', subtitle: '请输入手机号', value: '', hasEdit: true },
                { title: '公司名称', value: '', subtitle: '请输入公司名称', hasEdit: true },
                { title: '公司地址', value: '', subtitle: '请选地区' },],
            desc: ''
        };
    }
    componentDidMount() {
    }
    render() {
        let { titleList, desc } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default title={'开通店铺'}/>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(18)])}>填写申请</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(14), style_1.mt(18), style_1.mb(18)])}>请留下真实有效的使用者消息，我们将在12小时内尽快与您联系，若您仍有疑问也可直接咨询客服。</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.mt(10)])}>
            {titleList.map((value, index) => {
            if (value.title === '公司地址') {
                return (<components_1.Picker mode='region' onChange={(e) => {
                    console.log(e.detail);
                    titleList[3].value = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                        titleList,
                        province: e.detail.value[0],
                        city: e.detail.value[1] + e.detail.value[2]
                    });
                }} value={[]}>
                    <index_4.default textColor={'#727272'} title={value.title} subTitle={value.subtitle} value={value.value} key={index} hasEdit={value.hasEdit}/>
                  </components_1.Picker>);
            }
            return (<index_4.default textColor={'#727272'} title={value.title} value={value.value} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit} onCLick={(title) => {
            }} onTextChange={(e) => {
                if (value.title === '姓名') {
                    this.setState({ name: e.detail.value });
                }
                else if (value.title === '联系方式') {
                    this.setState({ phone: e.detail.value });
                }
                else if (value.title === '公司名称') {
                    this.setState({ companyName: e.detail.value });
                }
            }}/>);
        })}
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac, style_1.default.ujc])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272'), style_1.mt(10), style_1.ml(20)])}>公司主营业务</components_1.Text>
              </components_1.View>
               <components_1.Textarea style={datatool_1.styleAssign([style_1.wRatio(80), style_1.h(160), style_1.pa(20), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor),
            style_1.mt(10), style_1.mb(10), style_1.fSize(14)])} value={desc} placeholder={'请描述公司的主营业务'} maxlength={200} onInput={(e) => {
            this.setState({ desc: e.detail.value });
        }}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.upa, style_1.absR(30), style_1.absB(10)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>{desc.length}</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#CECECE')])}>/200</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor)])}/>
        <index_3.default title={'提交申请'} onClick={() => {
            this.shopApply();
        }}/>
      </index_1.default>);
    }
};
ShopApply = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, shopActions, loginActions))
], ShopApply);
exports.default = ShopApply;
//# sourceMappingURL=shop_apply.jsx.map