"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename my_video.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/4
 * @Description: 我的视频
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
const httpurl_1 = require("../../api/httpurl");
const global_1 = require("../../const/global");
const style_1 = require("../../utils/style");
let MyVideo = class MyVideo extends taro_1.Component {
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
        this.uploadFileTpWx = (path, callback) => {
            if (path.includes('tmp')) {
                this.viewRef && this.viewRef.showLoading();
                let that = this;
                let token = datatool_1.get(global_1.Enum.TOKEN);
                taro_1.default.uploadFile({
                    url: httpurl_1.FileController.uploadVideo,
                    filePath: path,
                    name: 'file',
                    header: {
                        'token': token
                    },
                    success(res) {
                        that.uploadResult = datatool_1.parseData(res.data).data;
                        callback();
                        console.log('上传文件', datatool_1.parseData(res.data).data);
                    }
                });
            }
            else {
                this.uploadResult = path;
                callback();
            }
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            this.props.update({
                videoUrl: this.uploadResult,
            }).then((res) => {
                console.log('更新我的视频', res);
                this.viewRef && this.viewRef.hideLoading();
                datatool_1.toast('信息更新成功');
                taro_1.default.navigateBack();
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.uploadResult = this.$router.params.videoUrl;
        this.state = {
            videoUrl: this.uploadResult ? this.uploadResult : ''
        };
    }
    render() {
        let { videoUrl } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'我的视频'} customCallback={() => {
            taro_1.default.navigateBack();
        }}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.mt(20), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#0C0C0C')])}>添加视频</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>添加快速说明业务的视频，可提升名片的停留时长哦~</components_1.Text>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          {videoUrl.length !== 0 ?
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.ujc])}>
                <components_1.Video style={datatool_1.styleAssign([style_1.w(335), style_1.h(203), style_1.bgColor(style_1.commonStyles.whiteColor)])} src={videoUrl} controls={true} autoplay={false} objectFit={'fill'} initialTime={1} id='video' loop={false} muted={false}/>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absR(25), style_1.absT(8)])} src={`${httpurl_1.cloudBaseUrl}ico_close.png`} onClick={() => {
                this.setState({ videoUrl: '' });
                this.uploadResult = '';
            }}/>
              </components_1.View> :
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.ujc])} onClick={() => {
                taro_1.default.chooseVideo({ compressed: true }).then((res) => {
                    console.log('视频信息', res);
                    this.setState({ videoUrl: res.tempFilePath });
                });
            }}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(203), style_1.bgColor('#F9F9F9'), style_1.default.uac, style_1.default.ujc])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(41), style_1.h(37)])} src={`${httpurl_1.cloudBaseUrl}ico_video.png`}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#4A4A4A')])}>点击上传</components_1.Text>
                  </components_1.View>
                </components_1.View>
              </components_1.View>}
        </components_1.View>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(64), style_1.default.uac, style_1.default.ujc])}>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(335), style_1.h(48), style_1.radiusA(2), style_1.bgColor(style_1.commonStyles.colorTheme),
            style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.uploadFileTpWx(videoUrl, () => {
                this.update();
                console.log('上传成功后的视频列表', this.uploadResult);
            });
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>保存</components_1.Text>
          </touchable_button_1.default>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
MyVideo = __decorate([
    redux_1.connect(state => state.Goods, Object.assign({}, actions))
], MyVideo);
exports.default = MyVideo;
//# sourceMappingURL=my_video.jsx.map