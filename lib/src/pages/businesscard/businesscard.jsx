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
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/home");
const business_card_1 = require("./business-card");
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
        console.log('componentDidMount');
        // 监听一个事件，接受参数
        taro_1.default.eventCenter.on('showJiFenModal', () => {
            console.log('显示对话框');
            this.viewRef && this.viewRef.showSignAlert();
        });
        this.getBannerData();
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('showJiFenModal');
        console.log('componentWillUnmount');
    }
    render() {
        let { signInPageDetail } = this.state;
        if (typeof signInPageDetail.signInCount === 'undefined') {
            signInPageDetail.signInCount = 0;
        }
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 600 : 500), style_1.default.uac])} scrollY>
          
          <business_card_1.default />
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
Businesscard = __decorate([
    redux_1.connect(state => state.home, Object.assign({}, actions))
], Businesscard);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
exports.default = Businesscard;
//# sourceMappingURL=businesscard.jsx.map