"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename my_photo.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/4
 * @Description: 我的照片
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
const touchable_button_1 = require("../../compoments/touchable-button");
const httpurl_1 = require("../../api/httpurl");
const global_1 = require("../../const/global");
let maxLength = 9;
let MyPhoto = class MyPhoto extends taro_1.Component {
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
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            this.viewRef && this.viewRef.showLoading();
            this.props.update({
                photoUrl: JSON.stringify(this.state.myPhotoUrl),
            }).then((res) => {
                console.log('更新我的照片', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('信息更新成功');
                }
                datatool_1.debounce(1000, () => {
                    taro_1.default.navigateBack();
                });
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.myPhotoUrl = datatool_1.parseData(this.$router.params.myPhotoUrl);
        let myPhotoUrlTmp = [];
        if (this.myPhotoUrl) {
            datatool_1.parseData(this.myPhotoUrl).forEach((item) => {
                myPhotoUrlTmp.push({ path: item });
            });
        }
        this.state = {
            myPhotoUrlsLocal: myPhotoUrlTmp,
            myPhotoUrl: datatool_1.parseData(this.myPhotoUrl) ? datatool_1.parseData(this.myPhotoUrl) : []
        };
        this.uploading = false;
        this.uploadCount = 0;
        this.uploadResultArr = [];
    }
    render() {
        let { myPhotoUrlsLocal, myPhotoUrl } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'我的照片'} customCallback={() => {
            taro_1.default.navigateBack();
        }}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#0C0C0C')])}>上传照片</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#787878')])}>{`${myPhotoUrl.length}/9`}</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.mb(10), style_1.pl(10), style_1.pr(10), style_1.default.udr, style_1.default.uWrap])}>
            {myPhotoUrlsLocal.map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.w(105), style_1.h(105), style_1.ml(10), style_1.mb(10),])}>
                    <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(105), style_1.h(105), style_1.radiusA(2)])} src={value.path}/>
                    <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absR(-5), style_1.absT(-5)])} src={`${httpurl_1.cloudBaseUrl}ico_close.png`} onClick={() => {
                this.state.myPhotoUrl.splice(index, 1);
                myPhotoUrlsLocal.splice(index, 1);
                console.log('删除后的列表', myPhotoUrlsLocal, myPhotoUrl);
                this.setState({ myPhotoUrlsLocal }, () => {
                    console.log('剩余图片', this.state.myPhotoUrlsLocal);
                });
            }}/>
                  </components_1.View>);
        })}
            {myPhotoUrlsLocal.length < maxLength && <touchable_button_1.default onClick={() => {
            taro_1.default.chooseImage({ count: maxLength - myPhotoUrlsLocal.length }).then((res) => {
                console.log('本地上传图片', res.tempFiles);
                this.setState({ myPhotoUrlsLocal: this.state.myPhotoUrlsLocal.concat(res.tempFiles) });
                this.uploadFileList(res.tempFiles, () => {
                    this.state.myPhotoUrl.push(...this.uploadResultArr);
                    this.setState({ myPhotoUrl: this.state.myPhotoUrl });
                    console.log('上传成功后的图片列表', myPhotoUrl);
                });
            });
        }} customStyle={datatool_1.styleAssign([style_1.ml(10), style_1.mb(20), style_1.w(105), style_1.h(105), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40)])} src={`${httpurl_1.cloudBaseUrl}ico_goods_add.png`}/>
              </touchable_button_1.default>}
          </components_1.View>
        </components_1.View>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(64), style_1.default.uac, style_1.default.ujc])}>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(335), style_1.h(48), style_1.radiusA(2), style_1.bgColor(style_1.commonStyles.colorTheme),
            style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.update();
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>保存</components_1.Text>
          </touchable_button_1.default>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
MyPhoto = __decorate([
    redux_1.connect(state => state.Goods, Object.assign({}, actions))
], MyPhoto);
exports.default = MyPhoto;
//# sourceMappingURL=my_photo.jsx.map