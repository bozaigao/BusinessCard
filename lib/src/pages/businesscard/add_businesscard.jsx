"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/15
 * @Description: 添加名片
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const bottom_buton_1 = require("../../compoments/bottom-buton");
const touchable_button_1 = require("../../compoments/touchable-button");
const list_item_1 = require("../../compoments/list-item");
const httpurl_1 = require("../../api/httpurl");
const global_1 = require("../../const/global");
let AddBusinesscard = class AddBusinesscard extends taro_1.Component {
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
         * @date 2020/3/15
         * @function: 解密微信小程序手机号
         */
        this.decryptPhone = (data) => {
            this.viewRef && this.viewRef.showLoading();
            this.props.decryptPhone({ encryptedData: data.encryptedData, iv: data.iv, cloudID: data.cloudID }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    let { listData } = this.state;
                    let temp = listData;
                    temp[1].value = res;
                    this.setState({ listData: temp }, () => {
                        console.log('解密微信小程序手机号', res);
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            let { listData, showPhone } = this.state;
            if (!listData[0].value || listData[0].value.length === 0) {
                datatool_1.toast('请先填写姓名');
                return;
            }
            if (!listData[2].value || listData[2].value.length === 0) {
                datatool_1.toast('请先填写公司');
                return;
            }
            if (!listData[3].value || listData[3].value.length === 0) {
                datatool_1.toast('请先填写行业');
                return;
            }
            if (!datatool_1.isLegalEmail(listData[7].value)) {
                datatool_1.toast('请输入有效的邮箱');
                return;
            }
            this.viewRef && this.viewRef.showLoading();
            this.props.update({
                avatar: this.avatar,
                name: listData[0].value,
                company: listData[2].value,
                industry: listData[3].value,
                position: listData[4].value,
                province: this.province,
                city: this.city,
                wechat: listData[6].value,
                email: listData[7].value,
                showPhone,
                phone: listData[1].value
            }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    if (this.props.userInfo.cardPercent === 0) {
                        datatool_1.toast('名片创建成功');
                    }
                    else {
                        datatool_1.toast('名片完善成功');
                    }
                    datatool_1.debounce(1000, () => {
                        taro_1.default.navigateBack();
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 将文件通过微信Api上传到服务端
         */
        this.uploadFileTpWx = (path) => {
            let that = this;
            let token = datatool_1.get(global_1.Enum.TOKEN);
            taro_1.default.uploadFile({
                url: httpurl_1.FileController.uploadPicture,
                filePath: path,
                name: 'file',
                header: {
                    'token': token
                },
                success(res) {
                    that.avatar = datatool_1.parseData(res.data).data;
                    console.log('上传文件', datatool_1.parseData(res.data).data);
                }
            });
        };
        let { name, avatar, company, industry, position, province, city, wechat, email, showPhone } = props.userInfo;
        this.avatar = avatar;
        this.province = province;
        this.city = city;
        this.state = {
            showPhone,
            signInPageDetail: { dateIntegrals: [], signInCount: 0 },
            listData: [
                { title: '姓名', subtitle: '请输入姓名', value: name, hasEdit: true, must: true },
                { title: '手机', value: props.userInfo.phone },
                {
                    title: '公司',
                    subtitle: '请输入公司名',
                    value: company,
                    hasEdit: true,
                    must: true
                }, {
                    title: '行业',
                    subtitle: '请选择行业',
                    value: industry,
                    must: true
                },
                { title: '职位', subtitle: '请输入职业', value: position, hasEdit: true },
                { title: '地区', subtitle: '请选择地区', value: province + city, },
                {
                    title: '微信号',
                    subtitle: '请输入微信号',
                    value: wechat,
                    hasEdit: true
                }, {
                    title: '邮箱',
                    subtitle: '请输入邮箱',
                    value: email,
                    hasEdit: true
                }
            ],
            avatar: avatar,
        };
    }
    componentDidMount() {
        taro_1.default.eventCenter.on('industry', (industry) => {
            console.log('参数回调', industry);
            this.state.listData[3].value = industry;
            this.setState({ listData: this.state.listData });
        });
    }
    render() {
        console.log(this.viewRef);
        let { signInPageDetail } = this.state;
        if (typeof signInPageDetail.signInCount === 'undefined') {
            signInPageDetail.signInCount = 0;
        }
        let { listData, avatar, showPhone } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} notNeedBottomPadding={true}>
        <top_header_1.default title={'创建名片'} backgroundColor={style_1.commonStyles.whiteColor}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(86), style_1.default.uac, style_1.default.udr, style_1.default.ujb,
            style_1.bgColor(style_1.commonStyles.whiteColor), style_1.pl(20), style_1.pr(20)])} onClick={() => {
            taro_1.default.chooseImage({ count: 1 }).then((res) => {
                console.log('图片路径', res.tempFiles[0].path);
                this.setState({ avatar: res.tempFiles[0].path });
                this.uploadFileTpWx(res.tempFiles[0].path);
            });
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>头像</components_1.Text>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(60), style_1.h(60), style_1.radiusA(30)])} src={avatar && avatar.length !== 0 ? avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
          </touchable_button_1.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          
          {listData.map((value, index) => {
            if (value.title === '地区') {
                return (<components_1.Picker mode='region' onChange={(e) => {
                    console.log(e.detail);
                    this.province = e.detail.value[0];
                    this.city = e.detail.value[1] + e.detail.value[2];
                    this.state.listData[5].value = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                        listData: this.state.listData
                    });
                }} value={[]}>
                  <list_item_1.default title={value.title} must={value.must} subTitle={value.subtitle} value={value.value} key={index} hasEdit={value.hasEdit}/>
                </components_1.Picker>);
            }
            else if (value.title === '手机') {
                return <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac,
                    style_1.default.ujb, style_1.pl(20), style_1.pr(5)])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.redColor)])}>*</components_1.Text>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>{value.title}</components_1.Text>
                    </components_1.View>
                    {value.value && value.value.length !== 0 ?
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.mr(20), style_1.color(style_1.commonStyles.colorTheme)])}>{value.value}</components_1.Text> :
                    <components_1.Button style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mr(0), style_1.bgColor(style_1.commonStyles.whiteColor)])} openType={'getPhoneNumber'} onGetPhoneNumber={(e) => {
                        console.log('获取手机号', e);
                        this.decryptPhone(e.detail);
                    }}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#825D22'), style_1.default.utxdu])}>获取手机号</components_1.Text>
                        </components_1.Button>}
                  </components_1.View>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), { marginLeft: '5%' }])}/>
                </components_1.View>;
            }
            return (<list_item_1.default title={value.title} must={value.must} subTitle={value.subtitle} key={index} value={value.value} hasEdit={value.hasEdit} onCLick={(title) => {
                if (title === '行业') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/industry_list`
                    });
                }
            }} onTextChange={(e) => {
                if (value.title === '姓名') {
                    this.state.listData[0].value = e.detail.value;
                    this.setState({ listData: this.state.listData });
                }
                else if (value.title === '公司') {
                    this.state.listData[2].value = e.detail.value;
                    this.setState({ listData: this.state.listData });
                }
                else if (value.title === '行业') {
                    this.state.listData[3].value = e.detail.value;
                    this.setState({ listData: this.state.listData });
                }
                else if (value.title === '职位') {
                    this.state.listData[4].value = e.detail.value;
                    this.setState({ listData: this.state.listData });
                }
                else if (value.title === '微信号') {
                    this.state.listData[6].value = e.detail.value;
                    this.setState({ listData: this.state.listData });
                }
                else if (value.title === '邮箱') {
                    this.state.listData[7].value = e.detail.value;
                    this.setState({ listData: this.state.listData });
                }
                console.log(e);
            }}/>);
        })}
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(50), style_1.pl(20), style_1.pr(20), style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>分享自己的名片给朋友时展示手机号</components_1.Text>
              <components_1.Switch color={'#E2BB7B'} checked={showPhone === 1} onChange={(e) => {
            this.setState({ showPhone: e.detail.value ? 1 : 0 });
        }}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(336), style_1.h(0.5), style_1.bgColor('#E5E5E5'), style_1.ml(20), style_1.op(0.3)])}/>
          </components_1.View>
        </components_1.ScrollView>
        
        <bottom_buton_1.default title={'保存'} onClick={this.update}/>
      </safe_area_view_1.default>);
    }
};
AddBusinesscard = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], AddBusinesscard);
exports.default = AddBusinesscard;
//# sourceMappingURL=add_businesscard.jsx.map