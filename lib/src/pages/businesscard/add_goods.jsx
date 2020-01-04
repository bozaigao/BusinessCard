"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 添加商品
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/goods");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
const httpurl_1 = require("../../api/httpurl");
const global_1 = require("../../const/global");
let AddGoods = class AddGoods extends taro_1.Component {
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
         * @date 2020/1/4
         * @function: 更新商品
         */
        this.updateGoods = () => {
            let { name, price, introduction } = this.state;
            if (name.length === 0) {
                datatool_1.toast('名字不能为空');
                return;
            }
            if (introduction.length === 0) {
                datatool_1.toast('简介不能为空');
                return;
            }
            if (this.carouselUrls.length === 0) {
                datatool_1.toast('请选择轮播图');
                return;
            }
            if (this.detailUrls.length === 0) {
                datatool_1.toast('请选择详情图');
                return;
            }
            this.viewRef && this.viewRef.showLoading('更新中');
            this.props.updateGoods({
                id: this.itemData.id,
                name,
                price,
                carouselUrl: JSON.stringify(this.carouselUrls),
                detailUrl: JSON.stringify(this.detailUrls),
                introduction
            }).then((res) => {
                datatool_1.toast('商品更新成功');
                taro_1.default.eventCenter.trigger('goodsListRefresh');
                console.log('更新商品信息', res);
                this.viewRef && this.viewRef.hideLoading();
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/29
         * @function: 添加任务
         */
        this.addGoods = () => {
            let { name, price, introduction } = this.state;
            if (name.length === 0) {
                datatool_1.toast('名字不能为空');
                return;
            }
            if (introduction.length === 0) {
                datatool_1.toast('简介不能为空');
                return;
            }
            if (this.carouselUrls.length === 0) {
                datatool_1.toast('请选择轮播图');
                return;
            }
            if (this.detailUrls.length === 0) {
                datatool_1.toast('请选择详情图');
                return;
            }
            this.viewRef && this.viewRef.showLoading('上传中');
            this.props.addGoods({
                name,
                price,
                carouselUrl: JSON.stringify(this.carouselUrls),
                detailUrl: JSON.stringify(this.detailUrls),
                introduction
            }).then((res) => {
                datatool_1.toast('商品添加成功');
                taro_1.default.eventCenter.trigger('goodsListRefresh');
                console.log('添加商品信息', res);
                this.viewRef && this.viewRef.hideLoading();
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
         * @function: 将文件上传到微信服务
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
        console.log(this.viewRef);
        let carouselUrlsLocalTmp = [], detailUrlsLocalTmp = [];
        this.itemData = datatool_1.parseData(this.$router.params.itemData);
        if (this.itemData) {
            datatool_1.parseData(this.itemData.carouselUrl).forEach((item) => {
                carouselUrlsLocalTmp.push({ path: item });
            });
            datatool_1.parseData(this.itemData.detailUrl).forEach((item) => {
                detailUrlsLocalTmp.push({ path: item });
            });
        }
        console.log('传递参数', this.itemData);
        this.state = {
            name: this.itemData ? this.itemData.name : '',
            price: this.itemData ? '' + this.itemData.price : '0',
            introduction: this.itemData ? this.itemData.introduction : '',
            carouselUrlsLocal: carouselUrlsLocalTmp,
            detailUrlsLocal: detailUrlsLocalTmp,
            edit: datatool_1.parseData(this.$router.params.edit)
        };
        this.carouselUrls = this.itemData ? datatool_1.parseData(this.itemData.carouselUrl) : [];
        this.detailUrls = this.itemData ? datatool_1.parseData(this.itemData.detailUrl) : [];
        this.uploading = false;
        this.uploadCount = 0;
        this.uploadResultArr = [];
    }
    render() {
        let { carouselUrlsLocal, detailUrlsLocal, edit, introduction, name, price } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={edit ? '编辑商品' : '添加商品'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.pb(5), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac])}>
              {[{ title: '商品名称', placeHolder: '15个字以内' }, { title: '参考价格', placeHolder: '选填' }].map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])} key={index}>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>{value.title}</components_1.Text>
                      <components_1.Input type={value.title === '商品名称' ? 'text' : 'number'} value={value.title === '商品名称' ? name : price} style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14), { textAlign: 'right' }])} placeholder={value.placeHolder} onInput={(e) => {
                if (value.title === '商品名称') {
                    this.setState({ name: e.detail.value });
                }
                else {
                    this.setState({ price: e.detail.value });
                }
            }}/>
                    </components_1.View>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
                  </components_1.View>);
        })}
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>轮播图(最多5张)</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.mb(10), style_1.pl(10), style_1.pr(10), style_1.default.udr, style_1.default.uWrap])}>
                {carouselUrlsLocal.map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.w(105), style_1.h(105), style_1.ml(10), style_1.mb(10),])}>
                        <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(105), style_1.h(105), style_1.radiusA(2)])} src={value.path}/>
                        <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absR(-5), style_1.absT(-5)])} src={require('../../assets/ico_close.png')} onClick={() => {
                this.carouselUrls.splice(index, 1);
                carouselUrlsLocal.splice(index, 1);
                console.log('删除后的列表', carouselUrlsLocal, this.carouselUrls);
                this.setState({ carouselUrlsLocal }, () => {
                    console.log('剩余图片', this.state.carouselUrlsLocal);
                });
            }}/>
                      </components_1.View>);
        })}
                {carouselUrlsLocal.length < 5 && <touchable_button_1.default onClick={() => {
            taro_1.default.chooseImage({ count: 5 - carouselUrlsLocal.length }).then((res) => {
                console.log('本地上传图片', res.tempFiles);
                this.setState({ carouselUrlsLocal: this.state.carouselUrlsLocal.concat(res.tempFiles) });
                this.uploadFileList(res.tempFiles, () => {
                    this.carouselUrls.push(...this.uploadResultArr);
                    console.log('上传成功后的图片列表', this.carouselUrls);
                });
            });
        }} customStyle={datatool_1.styleAssign([style_1.ml(10), style_1.mb(20), style_1.w(105), style_1.h(105), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40)])} src={require('../../assets/ico_goods_add.png')}/>
                  </touchable_button_1.default>}
              </components_1.View>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(259), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>商品简介</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.Textarea value={introduction} placeholder={'请输入公司简介'} style={datatool_1.styleAssign([style_1.w(300), style_1.h(140), style_1.fSize(16), style_1.mt(10), style_1.ml(20),
            style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.pa(16)])} onInput={(e) => {
            this.setState({ introduction: e.detail.value });
        }}/>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(55), style_1.pl(20), style_1.pr(20), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C')])}>详情图</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(10), style_1.mb(10), style_1.pl(10), style_1.pr(10), style_1.default.udr, style_1.default.uWrap])}>
              {detailUrlsLocal.map((value, index) => {
            return (<components_1.View style={datatool_1.styleAssign([style_1.w(105), style_1.h(105), style_1.mb(10), style_1.ml(10)])}>
                      <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(105), style_1.h(105), style_1.radiusA(2)])} src={value.path}/>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absR(-5), style_1.absT(-5)])} src={require('../../assets/ico_close.png')} onClick={() => {
                this.detailUrls.splice(index, 1);
                detailUrlsLocal.splice(index, 1);
                this.setState({ detailUrlsLocal });
            }}/>
                    </components_1.View>);
        })}
              {detailUrlsLocal.length < 9 && <touchable_button_1.default onClick={() => {
            taro_1.default.chooseImage({ count: 9 - detailUrlsLocal.length }).then((res) => {
                this.setState({ detailUrlsLocal: this.state.detailUrlsLocal.concat(res.tempFiles) });
                this.uploadFileList(res.tempFiles, () => {
                    this.detailUrls.push(...this.uploadResultArr);
                    console.log('上传成功后的图片列表', this.detailUrls);
                });
            });
        }} customStyle={datatool_1.styleAssign([style_1.ml(10), style_1.mb(20), style_1.w(105), style_1.h(105), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40)])} src={require('../../assets/ico_goods_add.png')}/>
                </touchable_button_1.default>}
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(63), style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.default.uac, style_1.default.ujc])}>
          {edit ? <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.ml(10), style_1.w(335), style_1.h(47), style_1.bgColor(style_1.commonStyles.colorTheme),
            style_1.radiusA(2), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.updateGoods();
        }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>保存</components_1.Text>
                </touchable_button_1.default>
              </components_1.View> :
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(162), style_1.h(47), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme),
                { borderStyle: 'solid' }, style_1.radiusA(2), style_1.default.uac, style_1.default.ujc])} onClick={() => {
                this.addGoods();
            }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color('#343434')])}>保存商品</components_1.Text>
                </touchable_button_1.default>
                <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.ml(10), style_1.w(162), style_1.h(47), style_1.bgColor(style_1.commonStyles.colorTheme),
                style_1.radiusA(2), style_1.default.uac, style_1.default.ujc])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(20), style_1.color(style_1.commonStyles.whiteColor)])}>立即上架</components_1.Text>
                </touchable_button_1.default>
              </components_1.View>}
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
AddGoods = __decorate([
    redux_1.connect(state => state.Goods, Object.assign({}, actions))
], AddGoods);
exports.default = AddGoods;
//# sourceMappingURL=add_goods.jsx.map