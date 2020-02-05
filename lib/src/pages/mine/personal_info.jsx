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
const fileActions = require("../../actions/file");
const loginActions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const bottom_buton_1 = require("../../compoments/bottom-buton");
const list_item_1 = require("../../compoments/list-item");
const touchable_button_1 = require("../../compoments/touchable-button");
const global_1 = require("../../const/global");
const httpurl_1 = require("../../api/httpurl");
let PersonalInfo = class PersonalInfo extends taro_1.Component {
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
                    that.setState({ avatar: datatool_1.parseData(res.data).data });
                    console.log('上传文件', datatool_1.parseData(res.data).data);
                }
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            console.log('函数', this.props);
            let { avatar, name, sex, phone, industry, position, yangshi, wechat, birthday, province, city } = this.state;
            if (avatar.length === 0) {
                datatool_1.toast('头像不能为空');
                return;
            }
            if (name.length === 0) {
                datatool_1.toast('姓名不能为空');
                return;
            }
            if (phone.length === 0) {
                datatool_1.toast('电话不能为空');
                return;
            }
            if (industry.length === 0) {
                datatool_1.toast('行业不能为空');
                return;
            }
            if (position.length === 0) {
                datatool_1.toast('职位不能为空');
                return;
            }
            let paramas = {
                avatar,
                name,
                sex,
                phone,
                industry,
                position,
                yangshi,
                wechat,
                birthday,
                province,
                city
            };
            this.viewRef && this.viewRef.showLoading();
            this.props.update(paramas).then((res) => {
                console.log('更新用户信息', res);
                this.viewRef && this.viewRef.hideLoading();
                datatool_1.toast('信息更新成功');
                this.getUserInfo();
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/29
         * @function: 获取用户信息
         */
        this.getUserInfo = () => {
            this.props.getUserInfo().then((res) => {
                console.log('获取用户信息', res);
                console.log('属性', this.props.userInfo);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        // let test = this.$router.params.itemId;
        let { avatar, name, sex, phone, industry, position, yangshi, wechat, email, birthday, province, city, detailAddress } = props.userInfo;
        this.state = {
            avatar,
            name,
            sex,
            phone,
            industry,
            position,
            yangshi,
            wechat,
            email,
            birthday,
            province,
            city,
            detailAddress,
            titleList1: [{ title: '姓名', subtitle: name ? name : '必填', hasEdit: true },
                { title: '性别' },
                { title: '联系方式', subtitle: phone ? phone : '' },
                { title: '行业', subtitle: industry ? industry : '选择' },
                { title: '职位', subtitle: position ? position : '必填', hasEdit: true }],
            titleList2: [{ title: '名片样式', subtitle: '编辑' },
                { title: '微信&微信二维码', subtitle: wechat ? wechat : '' },
                { title: '邮箱', subtitle: email ? email : '选填', hasEdit: true },
                { title: '生日', subtitle: birthday ? datatool_1.transformTime(birthday) : '选填' },
                { title: '地区', subtitle: province ? province + city : '选择' },
                { title: '详细地址', subtitle: detailAddress ? detailAddress : '选填', hasEdit: true }],
        };
    }
    componentDidMount() {
        console.log('用户信息', this.props.userInfo);
        taro_1.default.eventCenter.on('industry', (industry) => {
            console.log('参数回调', industry);
            this.state.titleList1[3].subtitle = industry;
            this.setState({ industry, titleList1: this.state.titleList1 });
        });
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off();
    }
    render() {
        let { avatar, titleList1, titleList2, sex } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'个人信息'}/>

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
            <components_1.Image style={datatool_1.styleAssign([style_1.w(60), style_1.h(60), style_1.radiusA(30)])} src={avatar && avatar.length !== 0 ? avatar : require('../../assets/ico_default.png')}/>
          </touchable_button_1.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
            {titleList1.map((value, index) => {
            if (value.title === '性别') {
                return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
                      <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(51), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(20)])}>性别</components_1.Text>
                        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
                    console.log('男');
                    this.setState({ sex: 1 });
                }}>
                            <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.radiusA(9)])} src={sex === 1 ? require('../../assets/ico_checked.png') : require('../../assets/ico_nochecked.png')}/>
                            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.ml(10)])}>男</components_1.Text>
                          </touchable_button_1.default>
                          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mr(20)])} onClick={() => {
                    console.log('女');
                    this.setState({ sex: 2 });
                }}>
                            <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.radiusA(9)])} src={sex === 2 ? require('../../assets/ico_checked.png') : require('../../assets/ico_nochecked.png')}/>
                            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797'), style_1.ml(10)])}>女</components_1.Text>
                          </touchable_button_1.default>
                        </components_1.View>
                      </components_1.View>
                      <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), { marginLeft: '5%' }])}/>
                    </components_1.View>);
            }
            return (<list_item_1.default title={value.title} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit} onCLick={(title) => {
                if (title === '联系方式') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/contact_way`
                    });
                }
                else if (title === '行业') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/industry_list`,
                        success: (e) => {
                            console.log('参数回传1', e);
                        }
                    });
                }
            }} onTextChange={(e) => {
                this.setState({ name: e.detail.value });
                console.log(e);
            }}/>);
        })}
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10)])}>
            {titleList2.map((value, index) => {
            if (value.title === '生日') {
                return (<components_1.Picker mode='date' onChange={(e) => {
                    titleList2[3].subtitle = e.detail.value;
                    this.setState({
                        titleList2,
                        birthday: e.detail.value
                    });
                }} value={value.subtitle}>
                    <list_item_1.default title={value.title} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit}/>
                  </components_1.Picker>);
            }
            else if (value.title === '地区') {
                return (<components_1.Picker mode='region' onChange={(e) => {
                    console.log(e.detail);
                    titleList2[4].subtitle = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                        titleList2,
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
                }}/>
                  </components_1.Picker>);
            }
            return (<list_item_1.default title={value.title} subTitle={value.subtitle} key={index} hasEdit={value.hasEdit} onCLick={(title) => {
                if (title === '我的标签') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/my_tags`
                    });
                }
            }}/>);
        })}
          </components_1.View>
        </components_1.ScrollView>

        <bottom_buton_1.default title={'保存'} onClick={() => {
            this.update();
        }}/>
      </safe_area_view_1.default>);
    }
};
PersonalInfo = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, fileActions, loginActions))
], PersonalInfo);
exports.default = PersonalInfo;
//# sourceMappingURL=personal_info.jsx.map
