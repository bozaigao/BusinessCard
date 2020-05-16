"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename tequan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 特权详情
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/tequan");
const components_1 = require("@tarojs/components");
const index_2 = require("../../compoments/linear-gradient-view2/index");
const httpurl_1 = require("../../api/httpurl");
const index_3 = require("../../compoments/navigation_bar/index");
const global_1 = require("../../const/global");
let RenmaiTaoCanDetail = class RenmaiTaoCanDetail extends taro_1.Component {
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
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/1
         * @function: 购买套餐
         */
        this.purchasePackage = (packageId) => {
            this.viewRef && this.viewRef.showLoading();
            this.props.purchasePackage({ packageId }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    console.log('购买套餐', res);
                    taro_1.default.requestPayment({
                        timeStamp: res.timeStamp,
                        nonceStr: res.nonceStr,
                        package: res.package,
                        signType: res.signType,
                        paySign: res.paySign,
                        success(res) {
                            console.log('支付成功', res);
                        },
                        fail(res) {
                            console.log('支付失败', res);
                        }
                    });
                }
                console.log('获取特权套餐', res);
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.type = this.$router.params.type;
        this.packageId = this.$router.params.packageId;
        this.openState = this.$router.params.openState;
        this.state = {
            scrollTop: 0,
            shopStatus: this.$router.params.shopStatus
        };
    }
    render() {
        let { scrollTop, shopStatus } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>

        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])} scrollY onScroll={(e) => {
            this.setState({ scrollTop: e.detail.scrollTop });
            console.log(e.detail);
        }}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 222 : 182), style_1.mt(0)])}>
            <index_2.default style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 222 : 182)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.default.upa, style_1.absB(20), style_1.pl(37), style_1.pr(37)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(42), style_1.h(42)])} src={this.type === 'renmai' ? `${httpurl_1.cloudBaseUrl}ico_renmai_2.png` : `${httpurl_1.cloudBaseUrl}ico_renmai_1.png`}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(this.type === 'renmai' ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}>
                  更多人脉
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(42), style_1.h(42)])} src={this.type === 'fangke' ? `${httpurl_1.cloudBaseUrl}ico_fangke_2.png` : `${httpurl_1.cloudBaseUrl}ico_fangke_1.png`}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(this.type === 'fangke' ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}>
                  查看访客
                </components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(42), style_1.h(42)])} src={this.type === 'shop' ? `${httpurl_1.cloudBaseUrl}ico_shop_2.png` : `${httpurl_1.cloudBaseUrl}ico_shop_1.png`}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(this.type === 'shop' ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}>
                  开通店铺
                </components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          {this.type === 'renmai' ?
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#825D22'), style_1.ml(20), style_1.mt(13)])}>
                每月增30个精准人脉推荐
              </components_1.Text> : (this.type === 'shop' ?
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#825D22'), style_1.ml(20), style_1.mt(13)])}>
                提升你的产品线上推广效果
              </components_1.Text> :
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#825D22'), style_1.ml(20), style_1.mt(13)])}>
                随时了解谁对你感兴趣
              </components_1.Text>)}
          <components_1.View style={datatool_1.styleAssign([style_1.w(34), style_1.h(2), style_1.radiusA(1), style_1.bgColor('#825D22'), style_1.ml(21), style_1.mt(7)])}/>
          {this.type === 'renmai' ?
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(12), style_1.mt(20)])}>
                开通人脉特权，突破人脉获取限制，精准获客
              </components_1.Text> : (this.type === 'shop' ?
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(12), style_1.mt(20)])}>
                开通店铺，展示更多产品，直接进行线上交易
              </components_1.Text> :
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(12), style_1.mt(20)])}>
                开通查看访客特权，突破查看访客7天限制
              </components_1.Text>)}
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(126), style_1.default.uac, style_1.default.ujc, style_1.mt(7)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(346), style_1.h(126)])} src={this.type === 'renmai' ? `${httpurl_1.cloudBaseUrl}ico_renmai.png` : (this.type === 'shop' ? `${httpurl_1.cloudBaseUrl}ico_shop.png` : `${httpurl_1.cloudBaseUrl}ico_fangke.png`)}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.w(346), style_1.h(126), style_1.default.upa, style_1.absT(0)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
                {this.type === 'renmai' ?
            <components_1.View style={datatool_1.styleAssign([style_1.mt(40), style_1.ml(10)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                        普通用户人脉推荐
                      </components_1.Text>
                      <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                          每月为
                        </components_1.Text>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#E2BB7B')])}>
                          固定值
                        </components_1.Text>
                      </components_1.View>
                    </components_1.View> :
            (this.type === 'shop' ?
                <components_1.View style={datatool_1.styleAssign([style_1.mt(40), style_1.ml(10)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                          普通用户名片首页展示
                        </components_1.Text>
                        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                            展示
                          </components_1.Text>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#E2BB7B')])}>
                            部分产品
                          </components_1.Text>
                        </components_1.View>
                      </components_1.View> :
                <components_1.View style={datatool_1.styleAssign([style_1.mt(40), style_1.ml(10)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                          普通用户可查看
                        </components_1.Text>
                        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                            近
                          </components_1.Text>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#E2BB7B')])}>
                            7天内访客
                          </components_1.Text>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                            信息
                          </components_1.Text>
                        </components_1.View>
                      </components_1.View>)}
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
                {this.type === 'renmai' ?
            <components_1.View style={datatool_1.styleAssign([style_1.mt(40), style_1.ml(30)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                        普通用户人脉推荐
                      </components_1.Text>
                      <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                          推荐每月增
                        </components_1.Text>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>
                          30个
                        </components_1.Text>
                      </components_1.View>
                    </components_1.View> :
            (this.type === 'shop' ?
                <components_1.View style={datatool_1.styleAssign([style_1.mt(40), style_1.ml(30)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                          特权用户拥有 个人
                        </components_1.Text>
                        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>
                            个人
                          </components_1.Text>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme)])}>
                            专属店铺
                          </components_1.Text>
                        </components_1.View>
                      </components_1.View> :
                <components_1.View style={datatool_1.styleAssign([style_1.mt(40), style_1.ml(30)])}>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                          特权用户可查看
                        </components_1.Text>
                        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>
                            全部访客
                          </components_1.Text>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                            信息
                          </components_1.Text>
                        </components_1.View>
                      </components_1.View>)}
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.ml(20), style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(14), style_1.bgColor('#E2BB7B')])}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.ml(7)])}>
              服务用户
            </components_1.Text>
          </components_1.View>
          {this.type === 'renmai' ?
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mt(13)])}>
                开通人脉特权以及开通试用的所有用户
              </components_1.Text> :
            (this.type === 'shop' ?
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mt(13)])}>
                  开通店铺特权的所有用户
                </components_1.Text> :
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mt(13)])}>
                  开通查看全部访客特权的所有用户
                </components_1.Text>)}
          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.ml(20), style_1.mt(20)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(14), style_1.bgColor('#E2BB7B')])}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.ml(7)])}>
              特权介绍
            </components_1.Text>
          </components_1.View>
          {this.type === 'renmai' ?
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mr(20), style_1.mt(13)])}>
                开通人脉特权以及开通试用的用户，可在选择开通时间期限内使用名片程序中获取更多人脉资源的特权功能，一旦开通此项特权，我们将每日为用户提供更丰富且精准的人脉资源，累计每月将比普通用户多推荐30个优质人脉，并且所获取的人脉转化为客户的概率将提升80%。\n
                若您已开通此特权，请在特权到期前24小时内进行续费开通，以免到期后服务中断给您带来不便。
              </components_1.Text> :
            (this.type === 'shop' ?
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mr(20), style_1.mt(13)])}>
                  开通店铺的用户，可在选择开通时间期限内使用个人商铺程序，包括程序中的所有功能，一旦开通此项特权，我们将免费为用户装修个人店铺，并上架用户专属商品。店铺可展示商品更全面的信息，并进行线上交易。\n
                  由于开通店铺特权需要专门为用户开通店铺程序，操作比较复杂，所以暂不提供试用，并且开通店铺后可以进行线上交易，因此需要用户填写申请表以提供必要信息，后续则需要用户提供商品的相关资料信息，望用户能积极配合我们的工作人员，若给您带来不便，望谅解。\n
                  若您已开通此特权，可在特权到期前提前联系客服申请继续开通，以免到期后服务中断给您带来不便，若服务中断后需要再次开通的用户也可联系客服帮助恢复。
                </components_1.Text> :
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20), style_1.mr(20), style_1.mt(13)])}>
                  开通查看全部访客特权以及开通试用的用户，可在此时间期限内使用名片程序中查看全部访客的特权功能，而普通用户则只能查看近7天内访客信息。一旦开通此项特权，我们不仅将为用户提供全部访客信息，保证用户不错过任何一位潜在客户，并且还将为用户提供访客更全面、精准的分析数据。让用户更全面了解访客对自己名片的兴趣点，以便用户更有针对性地跟进访客，最终提升将访客转化为客户的概率，获客率将比普通用户高80%。
                  若您已开通此特权，请在特权到期前24小时内进行续费开通，以免到期后服务中断给您带来不便。
                </components_1.Text>)}
        </components_1.ScrollView>
        <index_3.default style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(0), style_1.op((300 - scrollTop) / 300)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.wRatio(100), style_1.h(44), style_1.default.ujb, style_1.default.udr, style_1.default.uac])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_back_white.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
          </components_1.View>
        </index_3.default>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.uac, style_1.default.ujc, style_1.mt(21), style_1.mb(16)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(44), style_1.default.uac, style_1.default.ujc, style_1.radiusA(2), style_1.bgColor('#E2BB7B')])} onClick={() => {
            if (this.type === 'shop') {
                if (shopStatus === `${global_1.ShopStatus.NO_APPLY}`) {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/shop_apply`
                    });
                }
            }
            else {
                this.purchasePackage(this.packageId);
            }
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>{`${this.type === 'shop' ? (shopStatus === `${global_1.ShopStatus.NO_APPLY}` ? '立即申请' : '已申请') : (this.openState === '0' ? '立即开通' : '继续开通')}`}</components_1.Text>
          </components_1.View>
        </components_1.View>
      </index_1.default>);
    }
};
RenmaiTaoCanDetail = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], RenmaiTaoCanDetail);
exports.default = RenmaiTaoCanDetail;
//# sourceMappingURL=renmai_taocan_detail.jsx.map