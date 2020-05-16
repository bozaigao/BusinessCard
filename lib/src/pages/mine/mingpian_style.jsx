"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename mingpian_style.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/24
 * @Description: 名片样式
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
const index_4 = require("../../compoments/card-style1/index");
const index_5 = require("../../compoments/card-style2/index");
const index_6 = require("../../compoments/card-style4/index");
const index_7 = require("../../compoments/card-style5/index");
const index_8 = require("../../compoments/card-style3/index");
let MingpianStyle = class MingpianStyle extends taro_1.Component {
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
        console.log('参数', this.$router.params);
        let publicInfoArr = [];
        if (this.$router.params.hidePhone === '1') {
            publicInfoArr.push('手机');
        }
        if (this.$router.params.hideWechat === '1') {
            publicInfoArr.push('微信');
        }
        if (this.$router.params.hideEmail === '1') {
            publicInfoArr.push('邮箱');
        }
        if (this.$router.params.hideAddress === '1') {
            publicInfoArr.push('地址');
        }
        this.state = {
            //@ts-ignore
            userInfo: null,
            publicInfoArr,
            style: parseInt(this.$router.params.style, 10),
            hidePhone: this.$router.params.hidePhone === '0',
            hideWechat: this.$router.params.hideWechat === '0',
            hideEmail: this.$router.params.hideEmail === '0',
            hideAddress: this.$router.params.hideAddress === '0',
        };
    }
    render() {
        let { userInfo } = this.props;
        let { publicInfoArr, style, hidePhone, hideWechat, hideEmail, hideAddress } = this.state;
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        <index_2.default title={'名片样式'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.uac])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(346), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
              <components_1.Swiper current={style} style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc, style_1.h(246)])} onChange={(e) => {
            this.setState({ style: e.detail.current }, () => {
            });
        }}>
                <components_1.SwiperItem style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc])}>
                  <index_4.default hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress} userInfo={userInfo}/>
                </components_1.SwiperItem>
                <components_1.SwiperItem style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc])}>
                  <index_5.default hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress} userInfo={userInfo}/>
                </components_1.SwiperItem>
                <components_1.SwiperItem style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc])}>
                  <index_8.default hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress} userInfo={userInfo}/>
                </components_1.SwiperItem>
                <components_1.SwiperItem style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc])}>
                  <index_6.default hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress} userInfo={userInfo}/>
                </components_1.SwiperItem>
                <components_1.SwiperItem style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc])}>
                  <index_7.default hidePhone={hidePhone} hideWechat={hideWechat} hideEmail={hideEmail} hideAddress={hideAddress} userInfo={userInfo}/>
                </components_1.SwiperItem>
              </components_1.Swiper>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.wRatio(100)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mt(15)])}>对外公开信息</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(10)])}>
              {['手机', '微信', '邮箱', '地址'].map((value, index) => {
            return <components_1.View onClick={() => {
                if (this.state.publicInfoArr.includes(value)) {
                    this.state.publicInfoArr.splice(publicInfoArr.indexOf(value), 1);
                    if (value === '手机') {
                        this.setState({ hidePhone: true });
                    }
                    else if (value === '微信') {
                        this.setState({ hideWechat: true });
                    }
                    else if (value === '邮箱') {
                        this.setState({ hideEmail: true });
                    }
                    else if (value === '地址') {
                        this.setState({ hideAddress: true });
                    }
                }
                else {
                    this.state.publicInfoArr.push(value);
                    if (value === '手机') {
                        this.setState({ hidePhone: false });
                    }
                    else if (value === '微信') {
                        this.setState({ hideWechat: false });
                    }
                    else if (value === '邮箱') {
                        this.setState({ hideEmail: false });
                    }
                    else if (value === '地址') {
                        this.setState({ hideAddress: false });
                    }
                }
                this.setState({ publicInfoArr: this.state.publicInfoArr });
            }} key={index} style={datatool_1.styleAssign([style_1.w(58), style_1.h(36), style_1.radiusA(2), style_1.default.uac, style_1.default.ujc, style_1.ml(index === 0 ? 20 : 10)])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absT(0)])} src={publicInfoArr.includes(value) ? require('../../assets/ico_setting_choosed.png') : require('../../assets/ico_setting_nochoos.png')}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(publicInfoArr.includes(value) ? '#835E1B' : style_1.commonStyles.colorTheme)])}>{value}</components_1.Text>
                  </components_1.View>;
        })}
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.wRatio(100)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(20), style_1.mt(15)])}>选择版式</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.mt(15), style_1.mb(20), style_1.pl(20), style_1.pr(20)])}>
              {[{ icon: require('../../assets/ico_mingpian_style_1.png'), title: '商务版' },
            { icon: require('../../assets/ico_mingpian_style_2.png'), title: '黑金版' },
            { icon: require('../../assets/ico_mingpian_style_3.png'), title: '简约版' },
            { icon: require('../../assets/ico_mingpian_style_4.png'), title: '极简版' },
            { icon: require('../../assets/ico_mingpian_style_5.png'), title: '实景版' }].map((value, index) => {
            return <components_1.View style={datatool_1.styleAssign([style_1.default.uac])} key={index} onClick={() => {
                this.setState({ style: index });
            }}>
                    <components_1.View style={datatool_1.styleAssign([style_1.w(69), style_1.h(42), style_1.default.uac, style_1.default.ujc, style_1.bo(1), style_1.bdColor(style === index ? 'rgb(116,87,42)' : 'rgb(229,229,229)'), { borderStyle: style === index ? 'solid' : 'dashed' }])}>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(67), style_1.h(41)])} src={value.icon}/>
                    </components_1.View>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#ACACAC')])}>{value.title}</components_1.Text>
                  </components_1.View>;
        })}
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
        <index_3.default title={'完成'} onClick={() => {
            taro_1.default.eventCenter.trigger('updateCardStyle', {
                cardStyle: `${style}`,
                hidePhone: hidePhone ? 0 : 1,
                hideWechat: hideWechat ? 0 : 1,
                hideEmail: hideEmail ? 0 : 1,
                hideAddress: hideAddress ? 0 : 1,
            });
            taro_1.default.navigateBack();
        }}/>
      </index_1.default>);
    }
};
MingpianStyle = __decorate([
    redux_1.connect(state => Object.assign(state.taskCenter, state.login), Object.assign({}, actions))
], MingpianStyle);
exports.default = MingpianStyle;
//# sourceMappingURL=mingpian_style.jsx.map