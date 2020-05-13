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
const style_1 = require("../utils/style");
const datatool_1 = require("../utils/datatool");
const redux_1 = require("@tarojs/redux");
const actions = require("../actions/login");
const index_1 = require("../compoments/touchable-button/index");
const index_2 = require("../compoments/list-item/index");
const httpurl_1 = require("../api/httpurl");
const index_3 = require("../compoments/safe-area-view/index");
const index_4 = require("../compoments/navigation_bar/index");
const mine_guide1_1 = require("./component/mine_guide1");
const mine_guide2_1 = require("./component/mine_guide2");
const singleline_text_1 = require("../compoments/singleline-text");
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
        this.config = {};
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/29
         * @function: 获取用户信息
         */
        this.getUserInfo = () => {
            this.props.getUserInfo().then((res) => {
                this.props.updateUserInfo(res);
                console.log('获取用户信息', res);
                console.log('属性', this.props.userInfo);
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.state = { showGuide1: false, showGuide2: false };
    }
    componentDidShow() {
        this.getUserInfo();
        let showGuide1 = datatool_1.get('mine_guide1');
        this.setState({ showGuide1: !showGuide1 });
        let showGuide2 = datatool_1.get('mine_guide2');
        this.setState({ showGuide2: !showGuide2 && !!showGuide1 });
    }
    componentDidHide() {
    }
    render() {
        let { userInfo } = this.props;
        let { showGuide1, showGuide2 } = this.state;
        return (<index_3.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? 264 : 244), style_1.default.upa, style_1.absT(0)])} src={require('../assets/ico_mine_bg.png')}/>
          <index_4.default>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(style_1.commonStyles.whiteColor)])}>我的</components_1.Text>
            </components_1.View>
          </index_4.default>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.wRatio(100), style_1.default.ujb, style_1.mt(25)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(66), style_1.h(66), style_1.ml(20), style_1.radiusA(33)])} src={userInfo.avatar}/>
                <components_1.View style={datatool_1.styleAssign([style_1.ml(14)])}>
                  <singleline_text_1.default text={userInfo.name ? userInfo.name : '无名氏'} style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(style_1.commonStyles.whiteColor)])}/>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(140), style_1.h(6), style_1.radiusA(3), style_1.mt(13), style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.wRatio(userInfo.cardPercent), style_1.h(6), style_1.radiusA(3), style_1.default.uac, style_1.bgColor('#E2BB7B')])}/>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(10), style_1.color(style_1.commonStyles.whiteColor), style_1.mt(8)])}>{`完善度${userInfo.cardPercent}%`}</components_1.Text>
                </components_1.View>
              </components_1.View>
              
              <components_1.View style={datatool_1.styleAssign([style_1.mr(20)])}>
                <components_1.View>
                  <index_1.default customStyle={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/perform_info`
            });
        }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color(style_1.commonStyles.whiteColor)])}>完善名片</components_1.Text>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(7), style_1.h(12), style_1.ml(8)])} src={`${httpurl_1.cloudBaseUrl}ico_next_white.png`}/>
                  </index_1.default>
                  <index_1.default customStyle={datatool_1.styleAssign([style_1.mt(25), style_1.w(66), style_1.h(28), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/tequan`
            });
        }}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absT(0)])} src={require('../assets/open_tequan_bg.png')}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#825D22')])}>开通特权</components_1.Text>
                  </index_1.default>
                </components_1.View>
              </components_1.View>
            </components_1.View>
            
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(100), style_1.default.uac, style_1.mt(22)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(335), style_1.h(100)])} src={require('../assets/ico_fenxiao.png')} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/fenxiao_center`
            });
        }}/>
            </components_1.View>
            
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.uja, style_1.mt(27), style_1.mb(10)])}>
              {[{
                title: '商城',
                icon: require('../assets/ico_shop.png')
            }, {
                title: '海报',
                icon: require('../assets/ico_haibao.png')
            }, {
                title: '工具箱',
                icon: require('../assets/ico_toolkit.png')
            }, {
                title: '任务中心',
                icon: require('../assets/ico_task.png')
            }].map((value, index) => {
            return (<index_1.default customStyle={datatool_1.styleAssign([style_1.default.uac])} key={index} onClick={() => {
                if (value.title === '商城') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/goods_manage`
                    });
                }
                else if (value.title === '海报') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/haibao`
                    });
                }
                else if (value.title === '工具箱') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/tool_box`
                    });
                }
                else if (value.title === '任务中心') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/task_center`
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
                    </index_1.default>);
        })}
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
            {[{ title: '使用小技巧' },
            { title: '投诉与建议' },
            { title: '关于极易推' }].map((value, index) => {
            return (<index_2.default title={value.title} key={index} onCLick={(title) => {
                if (title === '投诉与建议') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/feedback`
                    });
                }
                else if (title === '关于极易推') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/about_us`
                    });
                }
                else {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/help`
                    });
                }
            }}/>);
        })}
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
        </components_1.View>
        {showGuide1 && <mine_guide1_1.default cancle={() => {
            datatool_1.save('mine_guide1', true);
            this.setState({ showGuide1: false, showGuide2: true });
        }} viewFenXiao={() => {
            datatool_1.save('mine_guide1', true);
            this.setState({ showGuide1: false, showGuide2: true }, () => {
                taro_1.default.navigateTo({
                    url: `/pages/mine/fenxiao_center`
                });
            });
        }}/>}
        {showGuide2 && <mine_guide2_1.default cancle={() => {
            datatool_1.save('mine_guide2', true);
            this.setState({ showGuide2: false });
        }} openTeQuan={() => {
            datatool_1.save('mine_guide2', true);
            this.setState({ showGuide2: false }, () => {
                taro_1.default.navigateTo({
                    url: `/pages/mine/tequan`
                });
            });
        }}/>}
      </index_3.default>);
    }
};
Mine = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Mine);
exports.default = Mine;
//# sourceMappingURL=mine.jsx.map