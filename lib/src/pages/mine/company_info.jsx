"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename company_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 企业信息
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
const index_3 = require("../../compoments/bottom-buton/index");
const index_4 = require("../sub_pagecomponent/list-item/index");
const httpurl_1 = require("../../api/httpurl");
const global_1 = require("../../const/global");
let CompanyInfo = class CompanyInfo extends taro_1.Component {
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
         * @date 2020/3/14
         * @function: 更新企业信息
         */
        this.update = () => {
            let { enterpriseName, enterpriseWebsite, enterpriseLogo, enterpriseVideo } = this.state;
            this.viewRef && this.viewRef.showLoading();
            let that = this;
            this.props.update({
                enterpriseName,
                enterpriseWebsite,
                enterpriseLogo,
                enterpriseVideo
            }).then((res) => {
                console.log('更新企业信息', res);
                that.viewRef && that.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('信息更新成功');
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
        this.uploadFileTpWx = (path, type, callback) => {
            let { enterpriseVideo } = this.state;
            if (callback && enterpriseVideo.length !== 0 || path.length === 0) {
                callback();
                return;
            }
            let that = this;
            let token = datatool_1.get(global_1.Enum.TOKEN);
            this.viewRef && this.viewRef.showLoading();
            taro_1.default.uploadFile({
                url: type === 'image' ? httpurl_1.FileController.uploadPicture : httpurl_1.FileController.uploadVideo,
                filePath: path,
                name: 'file',
                header: {
                    'token': token
                },
                success(res) {
                    that.viewRef && that.viewRef.hideLoading();
                    if (type === 'image') {
                        that.setState({ enterpriseLogo: datatool_1.parseData(res.data).data });
                    }
                    else {
                        that.setState({ enterpriseVideo: datatool_1.parseData(res.data).data }, () => {
                            callback();
                        });
                    }
                    console.log('上传文件', datatool_1.parseData(res.data).data);
                }
            });
        };
        console.log(this.viewRef);
        this.state = {
            enterpriseName: props.userInfo.enterpriseName,
            enterpriseWebsite: props.userInfo.enterpriseWebsite,
            enterpriseLogo: props.userInfo.enterpriseLogo,
            enterpriseLogoLocal: props.userInfo.enterpriseLogo,
            enterpriseVideo: props.userInfo.enterpriseVideo,
            enterpriseVideoLocal: props.userInfo.enterpriseVideo,
        };
    }
    render() {
        let { enterpriseName, enterpriseWebsite, enterpriseLogoLocal, enterpriseVideoLocal, enterpriseLogo } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default title={'企业信息'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(20)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#242424')])}>企业名称</components_1.Text>
              </components_1.View>
              <components_1.Input type='text' value={enterpriseName} placeholder={'必填'} style={datatool_1.styleAssign([style_1.fSize(14), style_1.mr(20), { textAlign: 'right' }])} onInput={(e) => {
            this.setState({ enterpriseName: e.detail.value });
        }}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(20)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#242424')])}>企业官网</components_1.Text>
              </components_1.View>
              <components_1.Input type='text' value={enterpriseWebsite} placeholder={'选填'} style={datatool_1.styleAssign([style_1.fSize(14), style_1.mr(20), { textAlign: 'right' }])} onInput={(e) => {
            this.setState({ enterpriseWebsite: e.detail.value });
        }}/>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.default.udr, style_1.default.uac, style_1.default.ujb])}>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(20)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#242424')])}>企业LOGO</components_1.Text>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(230), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mb(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.ml(36), style_1.w(160), style_1.mt(16)])}>
              {enterpriseLogoLocal.length === 0 ?
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(160), style_1.h(160)])} src={`${httpurl_1.cloudBaseUrl}ico_click_upload.png`} onClick={() => {
                taro_1.default.chooseImage({ count: 1 }).then((res) => {
                    console.log(res);
                    this.setState({ enterpriseLogoLocal: res.tempFilePaths[0] });
                    this.uploadFileTpWx(res.tempFilePaths[0], 'image');
                });
            }}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#B7B7B7'), style_1.mt(14)])}>建议尺寸：350px*350px</components_1.Text>
                  </components_1.View> :
            <components_1.View style={datatool_1.styleAssign([style_1.w(160), style_1.h(160)])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(160), style_1.h(160)])} src={enterpriseLogoLocal}/>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absR(-5), style_1.absT(-5)])} src={`${httpurl_1.cloudBaseUrl}ico_close.png`} onClick={() => {
                this.setState({ enterpriseLogoLocal: '' });
            }}/>
                  </components_1.View>}
            </components_1.View>
          </components_1.View>
          
          <index_4.default title={'企业视频'}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(193), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mb(10)])}>
            {enterpriseVideoLocal.length === 0 ?
            <components_1.Image style={datatool_1.styleAssign([style_1.w(305), style_1.h(160)])} src={`${httpurl_1.cloudBaseUrl}ico_upload_video.png`} onClick={() => {
                taro_1.default.chooseVideo({ compressed: true }).then((res) => {
                    this.setState({ enterpriseVideoLocal: res.tempFilePath });
                });
            }}/> :
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.ujc])}>
                  <components_1.Video style={datatool_1.styleAssign([style_1.w(305), style_1.h(160), style_1.bgColor(style_1.commonStyles.whiteColor)])} src={enterpriseVideoLocal} controls={true} autoplay={false} objectFit={'fill'} initialTime={1} id='video' loop={false} muted={false}/>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absR(25), style_1.absT(-5)])} src={`${httpurl_1.cloudBaseUrl}ico_close.png`} onClick={() => {
                this.setState({ enterpriseVideoLocal: '' });
            }}/>
                </components_1.View>}
          </components_1.View>
        </components_1.ScrollView>
        
        <index_3.default title={'提交'} onClick={() => {
            if (enterpriseName.length === 0) {
                datatool_1.toast('请选输入企业名称');
                return;
            }
            if (enterpriseLogo.length === 0) {
                datatool_1.toast('请选择logo');
                return;
            }
            this.uploadFileTpWx(enterpriseVideoLocal, 'video', () => {
                this.update();
            });
        }}/>
      </index_1.default>);
    }
};
CompanyInfo = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], CompanyInfo);
exports.default = CompanyInfo;
//# sourceMappingURL=company_info.jsx.map