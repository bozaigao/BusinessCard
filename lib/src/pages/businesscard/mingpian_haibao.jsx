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
        this.config = {
            navigationBarTitleText: 'canvas测试'
        };
        this.state = {
            imageTempPath: ''
        };
    }
    componentWillMount() {
        this.drawBall();
    }
    drawBall() {
        this.viewRef && this.viewRef.showLoading();
        let { userInfo } = this.props;
        const context = taro_1.default.createCanvasContext('canvas', this);
        //@ts-ignore
        const that = this;
        taro_1.default.getImageInfo({
            src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
        }).then((res) => {
            this.roundRectColor(context, 0, 0, 335, 434, 16);
            //@ts-ignore
            context.drawImage(res.path, 10, 10, 313, 194);
            //电话
            taro_1.default.getImageInfo({
                src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_mobile.png?sign=16ccd18da0a7c3bbcbb3bf1f8a582b0d&t=1584026985`,
            }).then((res) => {
                //@ts-ignore
                context.drawImage(res.path, 295, 90, 11, 9);
                context.setFontSize(12);
                context.setFillStyle('#343434');
                context.setTextAlign('right');
                context.fillText(userInfo.phone, 290, 100);
                //微信
                taro_1.default.getImageInfo({
                    src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_wechat.png?sign=d69e311e5b1e06c521c064611bd9d30a&t=1584028318`,
                }).then((res) => {
                    //@ts-ignore
                    context.drawImage(res.path, 295, 110, 12, 10);
                    context.setTextAlign('right');
                    context.fillText(userInfo.wechat, 290, 120);
                    //邮箱
                    taro_1.default.getImageInfo({
                        src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_email.png?sign=f35e0d13f139b041fdb849c2e143e5ce&t=1584030793`,
                    }).then((res) => {
                        //@ts-ignore
                        context.drawImage(res.path, 295, 130, 12, 10);
                        context.setTextAlign('right');
                        context.fillText(userInfo.email ? userInfo.email : '邮箱信息未对外公开', 290, 140);
                        //地址
                        taro_1.default.getImageInfo({
                            src: `https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_card_location.png?sign=c3abda7fa28594034f71a597086f5864&t=1584030919`,
                        }).then((res) => {
                            //@ts-ignore
                            context.drawImage(res.path, 295, 150, 12, 10);
                            context.setTextAlign('right');
                            context.fillText(userInfo.detailAddress, 290, 160);
                            //小程序码
                            taro_1.default.getImageInfo({
                                src: `https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/1a6fe6b5-a397-476c-8ddb-ab1c50d016fauser_20_1583967075205.jpg`,
                            }).then((res) => {
                                //@ts-ignore
                                context.drawImage(res.path, 15, 360, 44, 44);
                                context.setTextAlign('right');
                                taro_1.default.getImageInfo({
                                    src: userInfo.avatar,
                                }).then((res) => {
                                    let arcWidth = 60;
                                    //x-轴坐标
                                    let xCoor = 30;
                                    //y-轴坐标
                                    let yCoor = 20;
                                    context.beginPath();
                                    context.arc(xCoor + arcWidth / 2, yCoor + arcWidth / 2, arcWidth / 2, 0, Math.PI * 2, false);
                                    context.clip();
                                    //@ts-ignore
                                    context.drawImage(res.path, xCoor, yCoor, arcWidth, arcWidth);
                                    context.restore();
                                    context.setFontSize(18);
                                    context.setFillStyle(style_1.commonStyles.colorTheme);
                                    context.fillText(userInfo.name, 34, 115);
                                    context.setFontSize(12);
                                    context.fillText(userInfo.position, 100, 115);
                                    context.fillText(userInfo.company, 34, 140);
                                    context.setFontSize(14);
                                    context.fillText('您好,', 15, 240);
                                    that.fillTextWrap(context, `我是${userInfo.company}的 ${userInfo.position}${userInfo.name}`, 15, 260, 294, 20, 14);
                                    context.fillText('这是我的名片，请惠存。', 15, 300);
                                    context.fillText('谢谢!', 15, 320);
                                    context.setFillStyle('#E2BB7B');
                                    context.fillText('长按识别二维码 收下名片', 70, 390);
                                    context.setStrokeStyle(style_1.commonStyles.pageDefaultBackgroundColor);
                                    context.moveTo(0, 340);
                                    context.lineTo(335, 340);
                                    context.stroke();
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
                    });
                });
            });
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
    /**
     * @author 何晏波
     * @QQ 1054539528
     * @date 2020/3/12
     * @function: 保存s存图片
     */
    saveImage() {
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
     * @function: 文字换行
     */
    fillTextWrap(ctx, text, x, y, maxWidth, lineHeight, fontSize) {
        // 设定默认最大宽度
        const systemInfo = taro_1.default.getSystemInfoSync();
        const deciveWidth = systemInfo.screenWidth;
        maxWidth = maxWidth || deciveWidth;
        lineHeight = lineHeight || 20;
        // 校验参数
        if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
            return;
        }
        // 字符串分割为数组
        const arrText = text.split('');
        // 当前字符串及宽度
        let currentText = '';
        let currentWidth;
        ctx.setFontSize(fontSize);
        ctx.setFillStyle('#3A3A3A');
        ctx.setTextAlign('justify');
        for (let letter of arrText) {
            currentText += letter;
            currentWidth = ctx.measureText(currentText).width;
            if (currentWidth > maxWidth) {
                ctx.fillText(currentText, x, y);
                currentText = '';
                y += lineHeight;
            }
        }
        if (currentText) {
            ctx.fillText(currentText, x, y);
        }
    }
    render() {
        return (<index_2.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_1.default title={'名片海报'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
            <canvas style="width: 335px; height: 434px;background:#fff;margin-top:20px;border-radius:4px;" canvas-id="canvas"/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uje])}>
            <index_3.default title={'保存名片海报后分享'} onClick={() => {
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
//# sourceMappingURL=mingpian_haibao.jsx.map