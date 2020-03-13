"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename customer_remark.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/14
 * @Description: 客户添加备注
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
const list_item_1 = require("../../compoments/list-item");
const touchable_button_1 = require("../../compoments/touchable-button");
const global_1 = require("../../const/global");
const httpurl_1 = require("../../api/httpurl");
const bottom_buton_1 = require("../../compoments/bottom-buton");
let CustomerRemark = class CustomerRemark extends taro_1.Component {
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
         * @date 2020/1/14
         * @function: 修改客户备注等信息
         */
        this.updatePrivateCustomer = () => {
            this.viewRef && this.viewRef.showLoading();
            this.props.updatePrivateCustomer({
                id: this.id,
                name: this.state.name,
                phone: this.state.phone,
                remark: this.state.desc,
                aboutUrl: this.avatarArr[0]
            }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('修改成功');
                }
                console.log('获取客户详细资料', res);
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
        this.id = this.$router.params.id;
        this.avatarArr = [];
        this.uploading = false;
        this.uploadCount = 0;
        this.uploadResultArr = [];
        this.state = {
            name: '',
            phone: '',
            desc: '',
            avatar: { path: '' },
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
        let { desc, avatar } = this.state;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={'备注'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollY>
          <list_item_1.default title={'备注名'} subTitle={'请输入备注名'} hasEdit={true} onTextChange={(data) => {
            this.setState({ name: data.detail.value });
        }} textColor={'#727272'}/>
          <list_item_1.default title={'手机'} subTitle={'请输入手机号'} hasEdit={true} onTextChange={(data) => {
            this.setState({ phone: data.detail.value });
        }} textColor={'#727272'}/>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(183), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
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
          {avatar.path.length === 0 ? <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(204), style_1.mt(10), style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
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
            this.updatePrivateCustomer();
        }}/>
      </safe_area_view_1.default>);
    }
};
CustomerRemark = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], CustomerRemark);
exports.default = CustomerRemark;
//# sourceMappingURL=customer_remark.jsx.map