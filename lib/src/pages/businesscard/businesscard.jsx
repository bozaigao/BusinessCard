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
const touchable_button_1 = require("../../compoments/touchable-button");
const share_modal_1 = require("./share-modal");
const bianjie_tool_1 = require("./bianjie-tool");
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
            disableScroll: true
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
            showShare: false
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
    /**
     * @author 何晏波
     * @QQ 1054539528
     * @date 2019/10/8
     * @function: 获取banner数据
     */
    // getBannerData = () => {
    //   this.viewRef.showLoading();
    //   this.props.dispatchBannerInfo().then((res) => {
    //     this.viewRef.hideLoading();
    //     this.setState({bannerList: res.urls});
    //
    //   }).catch(e => {
    //     this.viewRef.hideLoading();
    //     //android模拟器无法访问mock的本地服务所以这里处理下，在真实网络请求中不存在该问题
    //     this.setState({
    //       bannerList: ["https://gzol.oss-cn-qingdao.aliyuncs.com/20190906161007.png",
    //         "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926100637.png",
    //         "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926103054.png",
    //         "https://gzol.oss-cn-qingdao.aliyuncs.com/20190926115113.png"
    //       ]
    //     });
    //     console.log('报错啦', e);
    //   });
    // }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('showJiFenModal');
        console.log('componentWillUnmount');
    }
    render() {
        console.log(this.viewRef);
        let { signInPageDetail, showShare } = this.state;
        if (typeof signInPageDetail.signInCount === 'undefined') {
            signInPageDetail.signInCount = 0;
        }
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujb, style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_switch.png')}/>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            console.log('点击了哦');
            taro_1.default.navigateTo({
                url: `/pages/businesscard/qiehuan_businesscard`
            });
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(19)])}>名片</components_1.Text>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.ml(5)])} src={require('../../assets/ico_down.png')}/>
          </touchable_button_1.default>
          <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.bgColor(style_1.commonStyles.transparent), style_1.mr(20)])}/>
        </components_1.View>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
          
          <business_card_1.default shareClick={() => {
            this.setState({ showShare: true });
        }}/>
          
          <personal_info_1.default />
          
          <my_person_1.default />
          
          <bianjie_tool_1.default itemClick={(value) => {
            if (value === '任务中心') {
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/task_center`
                });
            }
            else if (value === '工具箱') {
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/tool_box`
                });
            }
            else if (value === '海报') {
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/haibao`
                });
            }
            else if (value === '名片夹') {
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/mingpianjia`
                });
            }
            else if (value === '商城') {
                taro_1.default.navigateTo({
                    url: `/pages/businesscard/goods_manage`
                });
            }
        }}/>
          
          <my_goods_1.default goToMoreGoods={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/more_goods`
            });
        }} goToGoodsDetail={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/goods_detail`
            });
        }}/>
          
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
        
        <touchable_button_1.default onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/add_businesscard`
            });
        }} customStyle={datatool_1.styleAssign([style_1.w(70), style_1.h(70), style_1.default.uac, style_1.default.ujc, style_1.default.upa, style_1.absR(10), style_1.absB(5)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.default.uac, style_1.w(70), style_1.h(70), style_1.default.upa, style_1.absT(0), style_1.absR(0)])} src={require('../../assets/ico_add_card_bg.png')}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(26), style_1.h(19)])} src={require('../../assets/ico_add_card_img.png')}/>
            <components_1.Text style={datatool_1.styleAssign([style_1.color(style_1.commonStyles.colorTheme), style_1.fSize(10), style_1.mt(2)])}>创建</components_1.Text>
          </components_1.View>
        </touchable_button_1.default>
        {showShare && <share_modal_1.default cancle={() => {
            this.setState({ showShare: false });
        }} wechatShare={() => {
        }} haibao={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/mingpian_haibao`
            });
        }}/>}
      </safe_area_view_1.default>);
    }
};
Businesscard = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], Businesscard);
exports.default = Businesscard;
//# sourceMappingURL=businesscard.jsx.map