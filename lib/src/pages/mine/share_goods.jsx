"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename share_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/23
 * @Description: 商品分享
 */
const taro_1 = require("@tarojs/taro");
const index_1 = require("../../compoments/safe-area-view/index");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const actions = require("../../actions/login");
const redux_1 = require("@tarojs/redux");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const index_3 = require("../../compoments/bottom-buton/index");
let ShareGoods = class ShareGoods extends taro_1.Component {
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
        this.state = {
            imageTempPath: ''
        };
    }
    componentDidMount() {
        this.drawBall();
    }
    drawBall() {
        this.viewRef && this.viewRef.showLoading();
        let { userInfo } = this.props;
        const context = taro_1.default.createCanvasContext('canvas', this);
        //@ts-ignore
        const that = this;
        this.roundRectColor(context, 0, 0, 335, 497, 4);
        taro_1.default.getImageInfo({
            src: userInfo.avatar,
        }).then((res) => {
            let arcWidth = 44;
            //x-轴坐标
            let xCoor = 18;
            //y-轴坐标
            let yCoor = 18;
            context.beginPath();
            context.arc(xCoor + arcWidth / 2, yCoor + arcWidth / 2, arcWidth / 2, 0, Math.PI * 2, false);
            context.clip();
            //@ts-ignore
            context.drawImage(res.path, xCoor, yCoor, arcWidth, arcWidth);
            context.restore();
            context.setFontSize(18);
            context.fillText(`${userInfo.name} 为您推荐`, 70, 48);
            taro_1.default.getImageInfo({
                src: this.$router.params.photo,
            }).then((res) => {
                let fengMianWidth = 300;
                let fengMianHeight = 321;
                //@ts-ignore
                context.drawImage(res.path, xCoor, yCoor + 61, fengMianWidth, fengMianHeight);
                context.fillText(`${this.$router.params.name}`, xCoor, fengMianHeight + 68 + arcWidth);
                context.fillText('参考价格：', xCoor, fengMianHeight + 96 + arcWidth);
                context.setFontSize(24);
                context.setFillStyle('#FA541C');
                context.fillText(`¥${this.$router.params.price}`, xCoor + 90, fengMianHeight + 96 + arcWidth);
                context.setFillStyle('#979797');
                context.setFontSize(12);
                context.fillText('长按识别二维码', xCoor + 220, fengMianHeight + 100 + arcWidth);
                taro_1.default.getImageInfo({
                    src: userInfo.wxacode,
                }).then((res) => {
                    //@ts-ignore
                    context.drawImage(res.path, xCoor + 248, fengMianHeight + 45 + arcWidth, 40, 40);
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
                console.log('保存图片', this.state.imageTempPath);
                taro_1.default.saveImageToPhotosAlbum({
                    filePath: this.state.imageTempPath
                }).then(res => {
                    that.viewRef && that.viewRef.hideLoading();
                    datatool_1.toast('保存成功');
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
                        datatool_1.toast('保存成功');
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
    /**
     * @author 何晏波
     * @QQ 1054539528
     * @date 2020/3/12
     * @function: 绘制圆角填充色矩形
     */
    roundRectColor(context, x, y, w, h, r) {
        context.save();
        context.setFillStyle(style_1.commonStyles.whiteColor);
        context.setStrokeStyle(style_1.commonStyles.whiteColor);
        context.setLineJoin('round'); //交点设置成圆角
        context.setLineWidth(r);
        context.strokeRect(x + r / 2, y + r / 2, w - r, h - r);
        context.fillRect(x + r, y + r, w - r * 2, h - r * 2);
        context.stroke();
        context.closePath();
    }
    render() {
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <index_2.default title={'分享商品'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <canvas style="width: 335px; height: 497px;background:#fff;margin-top:20px;border-radius:4px;" canvas-id="canvas"/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uje])}>
            <index_3.default title={'保存商品海报后分享'} onClick={() => {
            this.saveImage();
        }}/>
          </components_1.View>
        </components_1.View>
      </index_1.default>);
    }
};
ShareGoods = __decorate([
    redux_1.connect(state => Object.assign(state.taskCenter, state.login), Object.assign({}, actions))
], ShareGoods);
exports.default = ShareGoods;
//# sourceMappingURL=share_goods.jsx.map