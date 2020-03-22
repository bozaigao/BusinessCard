"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename customer_ziliao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 手动录入客户
 */
const taro_1 = require("@tarojs/taro");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/customer");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
const list_item_1 = require("../../compoments/list-item");
const bottom_buton_1 = require("../../compoments/bottom-buton");
const global_1 = require("../../const/global");
const httpurl_1 = require("../../api/httpurl");
let AddCustomer = class AddCustomer extends taro_1.Component {
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
         * @date 2020/1/9
         * @function: 手动录入客户
         */
        this.addPrivateCustomer = () => {
            let { name, sex, company, phone, position, wechat, birthday, province, city, industry, detailAddress, email } = this.state;
            if (name.length === 0) {
                datatool_1.toast('备注名不能为空');
                return;
            }
            if (phone.length === 0) {
                datatool_1.toast('手机不能为空');
                return;
            }
            if (phone.length !== 11 || !phone.startsWith('1')) {
                datatool_1.toast('手机号非法');
                return;
            }
            if (!datatool_1.isLegalEmail(email)) {
                datatool_1.toast('请输入有效的邮箱');
                return;
            }
            let paramas = {
                name,
                sex,
                company,
                phone,
                industry,
                position,
                province,
                city,
                detailAddress,
                birthday,
                wechat,
                avatar: this.avatarArr[0],
                email
            };
            this.viewRef && this.viewRef.showLoading();
            this.props.addPrivateCustomer(paramas).then((res) => {
                console.log('手动录入客户', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('录入成功');
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
         * @date 2019/12/29
         * @function: 文件列表上传
         */
        this.uploadFileList = (paths, callback) => {
            if (!this.uploading) {
                this.uploadResultArr = [];
                this.uploadCount = 0;
                this.uploading = true;
                for (let i = 0; i < paths.length; i++) {
                    this.uploadFileTpWx(paths[i].path, callback, paths.length);
                }
            }
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 将文件通过微信Api上传到服务端
         */
        this.uploadFileTpWx = (path, callback, length) => {
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
                    that.uploadCount++;
                    that.uploadResultArr.push(datatool_1.parseData(res.data).data);
                    if (that.uploadCount === length) {
                        that.uploading = false;
                        callback();
                    }
                    console.log('上传文件', datatool_1.parseData(res.data).data);
                }
            });
        };
        this.uploading = false;
        this.uploadCount = 0;
        this.uploadResultArr = [];
        this.avatarArr = [];
        this.state = {
            top1List: [{ title: '备注名', subtitle: '请输入备注名', hasEdit: true, must: true },
                { title: '手机', subtitle: '请输入手机号', hasEdit: true, must: true },
                { title: '性别', value: '男', hasEdit: false },
                { title: '公司', subtitle: '请输入公司名', hasEdit: true },
                { title: '行业', subtitle: '请选择', hasEdit: false },
                { title: '职位', subtitle: '请输入职位', hasEdit: true }],
            top2List: [{ title: '地区', subtitle: '请选择', hasEdit: false },
                { title: '详细地址', subtitle: '请输入详细地址', hasEdit: true },
                { title: '生日', subtitle: '请选择', hasEdit: false },
                { title: '微信号', subtitle: '请输入微信号', hasEdit: true },
                { title: '邮箱', subtitle: '请输入邮箱号', hasEdit: true }],
            avatar: { path: '' },
            name: '',
            phone: '',
            sex: 1,
            company: '',
            industry: '',
            position: '',
            province: '',
            city: '',
            detailAddress: '',
            birthday: '',
            wechat: '',
            email: '',
            desc: '',
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentDidMount() {
        taro_1.default.eventCenter.on('industry', (industry) => {
            console.log('参数回调', industry);
            this.state.top1List[4].subtitle = industry;
            this.setState({ industry, top1List: this.state.top1List });
        });
    }
    componentDidHide() {
    }
    render() {
        let { top1List, top2List, sex, desc, birthday, avatar } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={'手动添加'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
            {top1List.map((value, index) => {
            if (value.title === '性别') {
                return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
                      <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(51), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.ml(20)])}>性别</components_1.Text>
                        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
                    console.log('男');
                    this.setState({ sex: 1 });
                }}>
                            <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.radiusA(9)])} src={sex === 1 ? `${httpurl_1.cloudBaseUrl}ico_checked.png` : `${httpurl_1.cloudBaseUrl}ico_nochecked.png`}/>
                            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.ml(10)])}>男</components_1.Text>
                          </touchable_button_1.default>
                          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mr(20)])} onClick={() => {
                    console.log('女');
                    this.setState({ sex: 2 });
                }}>
                            <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.radiusA(9)])} src={sex === 2 ? `${httpurl_1.cloudBaseUrl}ico_checked.png` : `${httpurl_1.cloudBaseUrl}ico_nochecked.png`}/>
                            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.ml(10)])}>女</components_1.Text>
                          </touchable_button_1.default>
                        </components_1.View>
                      </components_1.View>
                      <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), { marginLeft: '5%' }])}/>
                    </components_1.View>);
            }
            return (<list_item_1.default title={value.title} subTitle={value.subtitle} key={index} must={value.must} hasEdit={value.hasEdit} onCLick={(title) => {
                if (title === '行业') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/industry_list`,
                        success: (e) => {
                            console.log('参数回传1', e);
                        }
                    });
                }
            }} onTextChange={(data) => {
                if (value.title === '备注名') {
                    this.setState({ name: data.detail.value });
                }
                else if (value.title === '手机') {
                    this.setState({ phone: data.detail.value });
                }
                else if (value.title === '公司') {
                    this.setState({ company: data.detail.value });
                }
                else if (value.title === '职位') {
                    this.setState({ position: data.detail.value });
                }
            }} textColor={'#727272'}/>);
        })}
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
            {top2List.map((value, index) => {
            if (value.title === '生日') {
                return (<components_1.Picker mode='date' onChange={(e) => {
                    this.state.top2List[2].subtitle = e.detail.value;
                    this.setState({ birthday: e.detail.value, top2List: this.state.top2List });
                }} value={birthday}>
                    <list_item_1.default title={value.title} subTitle={value.subtitle} key={index} hasEdit={false} textColor={'#727272'}/>
                  </components_1.Picker>);
            }
            else if (value.title === '地区') {
                return (<components_1.Picker mode='region' onChange={(e) => {
                    console.log(e.detail);
                    this.state.top2List[0].subtitle = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                        top2List: this.state.top2List,
                        province: e.detail.value[0],
                        city: e.detail.value[1] + e.detail.value[2]
                    });
                }} value={[]}>
                    <list_item_1.default title={value.title} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit} onTextChange={(e) => {
                    console.log(e);
                    if (value.subtitle === '邮箱') {
                        this.setState({ email: e.detail.value });
                    }
                    else if (value.subtitle === '地址') {
                        this.setState({ detailAddress: e.detail.value });
                    }
                }} textColor={'#727272'}/>
                  </components_1.Picker>);
            }
            return (<list_item_1.default title={value.title} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit} onCLick={(title) => {
                if (title === '行业') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/industry_list`,
                        success: (e) => {
                            console.log('参数回传1', e);
                        }
                    });
                }
            }} onTextChange={(data) => {
                if (value.title === '详细地址') {
                    this.setState({ detailAddress: data.detail.value });
                }
                else if (value.title === '微信号') {
                    this.setState({ wechat: data.detail.value });
                }
                else if (value.title === '邮箱') {
                    this.setState({ email: data.detail.value });
                }
            }} textColor={'#727272'}/>);
        })}
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(203), style_1.mt(10), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#CECECE'), style_1.ml(20), style_1.mt(18)])}>描述</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(160)])}>
            <components_1.Textarea value={desc} style={datatool_1.styleAssign([style_1.ml(20), style_1.w(300), style_1.pa(20), style_1.mr(20), style_1.fSize(14), style_1.radiusA(4), style_1.mt(4), style_1.h(160),
            style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} onInput={(e) => {
            this.setState({ desc: e.detail.value });
        }} placeholder={'请输入您对客户的备注描述，帮助您更好地追踪客户~'} maxlength={600}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.upa, style_1.absR(30), style_1.absB(10)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>{desc.length}</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#CECECE')])}>/600</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          {avatar.path.length === 0 ? <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            taro_1.default.chooseImage({ count: 1 }).then((res) => {
                console.log('路径', res);
                this.setState({ avatar: res.tempFiles[0] });
                this.uploadFileList(res.tempFiles, () => {
                    this.avatarArr.push(...this.uploadResultArr);
                    console.log('上传成功后的图片列表', this.avatarArr);
                });
            });
        }}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(176), style_1.mt(16), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(20), style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.default.uac, style_1.default.ujc])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(19)])} src={`${httpurl_1.cloudBaseUrl}ico_camera.png`}/>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACADAD'), style_1.mt(10)])}>添加与客户相关的图片</components_1.Text>
                </components_1.View>
              </touchable_button_1.default> :
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(335), style_1.h(176)])} src={avatar.path} mode={'aspectFit'}/>
              </components_1.View>}
        </components_1.ScrollView>
        
        <bottom_buton_1.default title={'保存'} onClick={() => {
            this.addPrivateCustomer();
        }}/>
      </safe_area_view_1.default>);
    }
};
AddCustomer = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], AddCustomer);
exports.default = AddCustomer;
//# sourceMappingURL=add_customer.jsx.map