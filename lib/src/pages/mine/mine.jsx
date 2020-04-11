"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename perform_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 我的
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const touchable_button_1 = require("../../compoments/touchable-button");
const list_item_1 = require("../../compoments/list-item");
let Mine = class Mine extends taro_1.Component {
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
         * @date 2019/12/29
         * @function: 获取用户信息
         */
        this.getUserInfo = () => {
            this.props.getUserInfo().then((res) => {
                console.log('获取用户信息', res);
                console.log('属性', this.props.userInfo);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.state = {
            marginTop: 0,
        };
    }
    componentDidMount() {
        //这里只要是针对微信小程序设置自定义tabBar后的iphoneX高度适配
        if (style_1.iphoneX()) {
            this.setState({ marginTop: 43 });
        }
        else {
            this.setState({ marginTop: 15 });
        }
        taro_1.default.eventCenter.on('refreshUserInfo', () => {
            console.log('刷新用户信息');
            this.getUserInfo();
        });
        this.getUserInfo();
    }
    componentWillUnmount() {
        // Taro.eventCenter.off('refreshUserInfo');
    }
    componentDidShow() {
    }
    componentDidHide() {
    }
    render() {
        let { marginTop } = this.state;
        let { userInfo } = this.props;
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} notNeedBottomPadding={true} notNeedTopPadding={true}>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100)])} scrollY>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(242), style_1.bgColor(style_1.commonStyles.colorTheme)])}>

              <components_1.View style={datatool_1.styleAssign([style_1.mt(marginTop), style_1.wRatio(100), style_1.h(44), style_1.default.ujb, style_1.default.udr, style_1.default.uac])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(14), style_1.ml(20)])}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(19), style_1.color(style_1.commonStyles.whiteColor)])}>我的</components_1.Text>
                <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.bgColor(style_1.commonStyles.transparent), style_1.mr(20)])}/>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(150), style_1.bgColor(style_1.commonStyles.whiteColor)])}/>

            <components_1.View style={datatool_1.styleAssign([style_1.default.upa, style_1.absT(100), style_1.wRatio(100)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.wRatio(100), style_1.default.ujb])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.ml(20), style_1.radiusA(33)])} src={userInfo.avatar ? userInfo.avatar : require('../../assets/ico_default.png')}/>
                  <components_1.View style={datatool_1.styleAssign([style_1.ml(14)])}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(style_1.commonStyles.whiteColor)])}>{userInfo.name ? userInfo.name : '无名氏'}</components_1.Text>
                    <components_1.View style={datatool_1.styleAssign([style_1.w(140), style_1.h(6), style_1.radiusA(3), style_1.mt(13), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
                      <components_1.View style={datatool_1.styleAssign([style_1.w(113), style_1.h(6), style_1.radiusA(3), style_1.default.uac, style_1.bgColor('#E2BB7B')])}/>
                    </components_1.View>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color(style_1.commonStyles.whiteColor), style_1.mt(8)])}>完善度88%</components_1.Text>
                  </components_1.View>
                </components_1.View>

                <components_1.View style={datatool_1.styleAssign([style_1.mr(20)])}>
                  <components_1.View>
                    <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/perform_info`
            });
        }}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>完善名片</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(8)])} src={require('../../assets/ico_next_white.png')}/>
                    </touchable_button_1.default>
                    <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.mt(25), style_1.w(66), style_1.h(28), style_1.radiusA(4), style_1.bgColor('#E2BB7B'), style_1.default.uac, style_1.default.ujc])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#825D22')])}>开通特权</components_1.Text>
                    </touchable_button_1.default>
                  </components_1.View>
                </components_1.View>
              </components_1.View>

              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(100), style_1.default.uac, style_1.mt(24)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(335), style_1.h(100)])} src={require('../../assets/ico_fenxiao.png')}/>
              </components_1.View>

              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.uja, style_1.mt(27)])}>
                {[{
                title: '商城',
                icon: require('../../assets/ico_haibao.png')
            }, {
                title: '海报',
                icon: require('../../assets/ico_haibao.png')
            }, {
                title: '工具箱',
                icon: require('../../assets/ico_toolkit.png')
            }, {
                title: '任务中心',
                icon: require('../../assets/ico_task.png')
            }].map((value, index) => {
            return (<touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac])} key={index} onClick={() => {
                if (value.title === '商城') {
                    taro_1.default.navigateTo({
                        url: `/pages/businesscard/goods_manage`
                    });
                }
                else if (value.title === '海报') {
                    taro_1.default.navigateTo({
                        url: `/pages/businesscard/haibao`
                    });
                }
                else if (value.title === '工具箱') {
                    taro_1.default.navigateTo({
                        url: `/pages/businesscard/tool_box`
                    });
                }
                else if (value.title === '任务中心') {
                    taro_1.default.navigateTo({
                        url: `/pages/businesscard/task_center`
                    });
                }
                else if (value.title === '名片夹') {
                    taro_1.default.navigateTo({
                        url: `/pages/businesscard/mingpianjia`
                    });
                }
            }}>
                        <components_1.Image style={datatool_1.styleAssign([style_1.w(28), style_1.h(28)])} src={value.icon}/>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color('#343434'), style_1.mt(7)])}>{value.title}</components_1.Text>
                      </touchable_button_1.default>);
        })}
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
              {[{ title: '使用小技巧' },
            { title: '投诉与建议' },
            { title: '关于极致名片' }].map((value, index) => {
            return (<list_item_1.default title={value.title} key={index} onCLick={(title) => {
                if (title === '投诉与建议') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/feedback`
                    });
                }
                else if (title === '关于极致名片') {
                }
            }}/>);
        })}
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
Mine = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Mine);
exports.default = Mine;
//# sourceMappingURL=mine.jsx.map
