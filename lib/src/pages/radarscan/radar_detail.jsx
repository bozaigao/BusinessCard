"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename radar_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 雷达详情界面
 */
const taro_1 = require("@tarojs/taro");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/radar");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const httpurl_1 = require("../../api/httpurl");
const trace_item_1 = require("../sub_pagecomponent/trace-item");
const bottom_buton_1 = require("../../compoments/bottom-buton");
let RadarDetail = class RadarDetail extends taro_1.Component {
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
            
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/16
         * @function: 雷达详情访问轨迹
         */
        this.traceList = () => {
            this.viewRef.showLoading();
            // console.log('雷达详情访问轨迹',this.state.customer.userId);
            this.props.traceList({ traceUserId: this.state.customer.userId, month: this.state.month }).then((res) => {
                console.log('雷达详情访问轨迹', res);
                this.viewRef.hideLoading();
                this.setState({ traceList: res.list, count: res.count });
            }).catch(e => {
                this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log('呵呵', datatool_1.parseData(this.$router.params.itemData));
        let month = new Date().getMonth() + 1;
        if (month < 10) {
            //@ts-ignore
            month = `0${month}`;
        }
        this.state = {
            customer: datatool_1.parseData(this.$router.params.itemData),
            currentIndex: 0,
            traceList: [],
            month: `${new Date().getFullYear()}-${month}`,
            count: 0
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidShow() {
        this.traceList();
    }
    componentDidHide() {
    }
    render() {
        let { customer, currentIndex, traceList, month, count } = this.state;
        let childView;
        if (currentIndex === 0) {
            childView = <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.wRatio(100), style_1.default.ujb,
                style_1.pl(20), style_1.pr(20), style_1.mt(10)])}>
          <components_1.Picker mode='date' onChange={(e) => {
                this.setState({ month: e.detail.value }, () => {
                });
            }} value={month} fields={'month'}>
            <components_1.View style={datatool_1.styleAssign([style_1.w(77), style_1.h(22), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.radiusA(2),
                style_1.default.udr, style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>
                {month}
              </components_1.Text>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(8), style_1.h(8), style_1.ml(5)])} src={require('../../assets/ico_xiasanjiao_white.png')}/>
            </components_1.View>
          </components_1.Picker>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797')])}>
            {`共访问了${count}次`}
          </components_1.Text>
        </components_1.View>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          {traceList.map((value, index) => {
                return <trace_item_1.default item={value} key={index} name={customer.name}/>;
            })}
        </components_1.ScrollView>
        
        <bottom_buton_1.default title={'收藏名片'} onClick={() => {
            }}/>
      </components_1.View>;
        }
        else if (currentIndex === 1) {
            childView = <components_1.View />;
        }
        else if (currentIndex === 2) {
            childView = <components_1.View />;
        }
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={''}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.wRatio(100), style_1.default.ujb, style_1.pl(20), style_1.pr(20),
            style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.w(40), style_1.h(40)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(98), style_1.h(98)])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(98), style_1.h(98), style_1.radiusA(49)])} src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absB(0), style_1.absR(0)])} src={customer.sex === 1 ? `${httpurl_1.cloudBaseUrl}ico_nan.png` : `${httpurl_1.cloudBaseUrl}ico_nv.png`}/>
                </components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(22), style_1.color('#343434'), style_1.mt(11)])}>{customer.name}</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>{customer.company}</components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797')])}>来自</components_1.Text>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#E2BB7B')])}>名片扫码</components_1.Text>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.h(25), style_1.mt(15)])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/customer/customer_ziliao?id=${customer.userId}`
            });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434')])}>资料</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_next.png`}/>
              </components_1.View>
            </components_1.View>
            
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(95), style_1.default.uac, style_1.default.udr, style_1.h(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            taro_1.default.makePhoneCall({
                phoneNumber: '15982468866'
            });
        }}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(24), style_1.h(22)])} src={require('../../assets/ico_mibile_gray.png')}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>拨打电话</components_1.Text>
                </components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>15982468866</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])} onClick={() => {
            taro_1.default.setClipboardData({
                data: 'bozaigao98'
            });
            // Taro.getClipboardData({
            //   success(res) {
            //     console.log('拷贝文件', res.data) // data
            //   }
            // })
        }}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(24), style_1.h(22)])} src={require('../../assets/ico_wechat_gray.png')}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>加微信</components_1.Text>
                </components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>点击添加微信</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1, style_1.h(54), style_1.default.uac,
            style_1.bo(1), style_1.bdColor('#e8e8e8'), { borderStyle: 'solid' }, style_1.radiusA(4), style_1.ml(15),
            { boxShadow: '0px 6px 8px 0px rgba(230,230,230,0.5' }])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(24), style_1.h(22)])} src={require('../../assets/ico_location_gray.png')}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(12)])}>联系地址</components_1.Text>
                </components_1.View>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797'), style_1.fSize(12)])}>点击立即定位</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.wRatio(100), style_1.h(44), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(12)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.h(44)])} onClick={() => {
            this.setState({ currentIndex: 0 });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex !== 0 ? '#343434' : '#E2BB7B')])}>轨迹</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.h(44)])} onClick={() => {
            this.setState({ currentIndex: 1 });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex !== 1 ? '#343434' : '#E2BB7B')])}>AI分析</components_1.Text>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.wRatio(100)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(44), style_1.h(1), style_1.bgColor(currentIndex !== 0 ? style_1.commonStyles.whiteColor : '#E2BB7B')])}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.default.uf1])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(44), style_1.h(1), style_1.bgColor(currentIndex !== 1 ? style_1.commonStyles.whiteColor : '#E2BB7B')])}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          {childView}
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
RadarDetail = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], RadarDetail);
exports.default = RadarDetail;
//# sourceMappingURL=radar_detail.jsx.map
