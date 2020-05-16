"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const index_1 = require("../../compoments/top-header/index");
const actions = require("../../actions/login");
const index_2 = require("../../compoments/safe-area-view/index");
const index_3 = require("../../compoments/bottom-buton/index");
const redux_1 = require("@tarojs/redux");
let MingpianHaibao = class MingpianHaibao extends taro_1.Component {
    constructor(props) {
        super(props);
        this.posterUrl = this.$router.params.posterUrl;
        this.state = {
            //@ts-ignore
            userInfo: null,
            imageTempPath: '',
        };
    }
    componentDidMount() {
        this.drawPoster();
    }
    /**
     * @author 何晏波
     * @QQ 1054539528
     * @date 2020/5/3
     * @function: 绘制海报
     */
    drawPoster() {
        this.viewRef && this.viewRef.showLoading('海报生成中');
        let { userInfo } = this.props;
        const context = taro_1.default.createCanvasContext('canvas', this);
        //@ts-ignore
        const that = this;
        taro_1.default.getImageInfo({
            src: this.posterUrl,
        }).then((res) => {
            //@ts-ignore
            context.drawImage(res.path, 0, 0, 251, 417);
            //名片二维码
            taro_1.default.getImageInfo({
                src: userInfo.wxacode,
            }).then((res) => {
                //@ts-ignore
                context.drawImage(res.path, 205, 370, 40, 40);
                context.draw(false, () => {
                    that.viewRef && that.viewRef.hideLoading();
                    taro_1.default.canvasToTempFilePath({
                        canvasId: 'canvas',
                        success: function (res) {
                            console.log('获得图片临时路径', res);
                            // 获得图片临时路径
                            that.setState({
                                imageTempPath: res.tempFilePath
                            });
                        }
                    });
                });
            });
        });
    }
    /**
     * @author 何晏波
     * @QQ 1054539528
     * @date 2020/3/12
     * @function: 保存存图片
     */
    saveImage() {
        let that = this;
        that.viewRef && that.viewRef.showLoading();
        // 查看是否授权
        taro_1.default.getSetting({
            complete() {
                console.log(444);
            }
        }).then(res => {
            if (res.authSetting['scope.writePhotosAlbum']) {
                taro_1.default.saveImageToPhotosAlbum({
                    filePath: this.state.imageTempPath
                }).then(res => {
                    that.viewRef && that.viewRef.hideLoading();
                    datatool_1.toast('海报保存成功');
                    taro_1.default.previewImage({
                        current: this.state.imageTempPath,
                        urls: [this.state.imageTempPath] // 需要预览的图片http链接列表
                    });
                    console.log(res);
                });
            }
            else {
                taro_1.default.authorize({
                    scope: 'scope.writePhotosAlbum',
                }).then(() => {
                    taro_1.default.saveImageToPhotosAlbum({
                        filePath: this.state.imageTempPath
                    }).then(res => {
                        that.viewRef && that.viewRef.hideLoading();
                        datatool_1.toast('名片码保存成功');
                        taro_1.default.previewImage({
                            current: this.state.imageTempPath,
                            urls: [this.state.imageTempPath] // 需要预览的图片http链接列表
                        });
                        console.log(res);
                    });
                });
            }
        }).catch((e) => {
            console.log(e);
        });
    }
    render() {
        return (<index_2.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_1.default title={'海报'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
            <canvas style="width: 251px; height: 417px;background:#fff;margin-top:40px;border-radius:4px;" canvas-id="canvas"/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uje])}>
            <index_3.default title={'保存海报后分享'} onClick={() => {
            this.saveImage();
        }}/>
          </components_1.View>
        </components_1.View>
      </index_2.default>);
    }
};
MingpianHaibao = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], MingpianHaibao);
exports.default = MingpianHaibao;
//# sourceMappingURL=poster_share.jsx.map