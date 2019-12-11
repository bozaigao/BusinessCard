"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 名片首页
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/home");
const business_card_1 = require("./business-card");
const personal_info_1 = require("./personal-info");
const my_person_1 = require("./my-person");
const my_goods_1 = require("./my-goods");
const jizhi_card_1 = require("./jizhi-card");
const my_business_1 = require("./my-business");
const my_photo_1 = require("./my-photo");
let Businesscard = class Businesscard extends taro_1.Component {
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
            navigationBarTitleText: '首页',
            disableScroll: true
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/10/8
         * @function: 获取banner数据
         */
        this.getBannerData = () => {
            this.viewRef.showLoading();
            this.props.dispatchBannerInfo().then((res) => {
                this.viewRef.hideLoading();
                this.setState({ bannerList: res.urls });
            }).catch(e => {
                this.viewRef.hideLoading();
                //android模拟器无法访问mock的本地服务所以这里处理下，在真实网络请求中不存在该问题
                this.setState({
                    bannerList: ["https://gzol.oss-cn-qingdao.aliyuncs.com/20190906161007.png",
                        "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926100637.png",
                        "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926103054.png",
                        "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926115113.png"
                    ]
                });
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/9/18
         * @function: 获取签到数据
         */
        this.getSignInPage = async () => {
            // let res = (await this.props.getSignInPage()).data;
            //
            // if (res.code === api.NetworkState.SUCCESS) {
            //   this.setState({
            //     signInPageDetail: res.data
            //   });
            // }
        };
        this.state = {
            signInPageDetail: { dateIntegrals: [], signInCount: 0 },
            bannerList: []
        };
    }
    componentDidMount() {
        // console.log('componentDidMount');
        // // 监听一个事件，接受参数
        // Taro.eventCenter.on('showJiFenModal', () => {
        //   console.log('显示对话框');
        //   this.viewRef && this.viewRef.showSignAlert()
        // });
        // this.getBannerData();
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('showJiFenModal');
        console.log('componentWillUnmount');
    }
    render() {
        console.log(style_1.screenHeight());
        let { signInPageDetail } = this.state;
        if (typeof signInPageDetail.signInCount === 'undefined') {
            signInPageDetail.signInCount = 0;
        }
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujb, style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_switch.png')}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(19)])}>名片</components_1.Text>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.ml(5)])} src={require('../../assets/ico_down.png')}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.bgColor(style_1.commonStyles.transparent), style_1.mr(20)])}/>
        </components_1.View>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <business_card_1.default />
          
          <personal_info_1.default />
          
          <my_person_1.default />
          
          <my_goods_1.default />
          
          <my_business_1.default />
          
          <my_photo_1.default />
          
          <jizhi_card_1.default />
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.ujc, style_1.default.uac, style_1.mt(74)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#D2D2D2')])}>极致名片 给您极致服务</components_1.Text>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(59), style_1.default.uac, style_1.default.ujb, style_1.default.udr, style_1.mt(57), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(32), style_1.h(32), style_1.radiusA(4), style_1.ml(21)])} src={require('../../assets/ico_default.jpeg')}/>
              <components_1.View style={datatool_1.styleAssign([style_1.ml(5)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.colorTheme)])}>关注极致信息公众号</components_1.Text>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#D2D2D2')])}>最新资讯、升级更新早知道！</components_1.Text>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.bgColor('#FAF1E5'), style_1.w(76), style_1.h(27), style_1.radiusA(30), style_1.mr(11)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#825D22'), style_1.fSize(14)])}>马上关注</components_1.Text>
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
Businesscard = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], Businesscard);
exports.default = Businesscard;
//# sourceMappingURL=businesscard.jsx.map