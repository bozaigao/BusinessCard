"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../utils/datatool");
const touchable_button_1 = require("../compoments/touchable-button");
//@ts-ignore
const ico_tabar_businesscard_normal_png_1 = require("../assets/ico_tabar_businesscard_normal.png");
//@ts-ignore
const ico_tabar_businesscard_pressed_png_1 = require("../assets/ico_tabar_businesscard_pressed.png");
//@ts-ignore
const ico_tabar_radarscan_normal_png_1 = require("../assets/ico_tabar_radarscan_normal.png");
//@ts-ignore
const ico_tabar_radarscan_pressed_png_1 = require("../assets/ico_tabar_radarscan_pressed.png");
//@ts-ignore
const ico_tabar_customer_normal_png_1 = require("../assets/ico_tabar_customer_normal.png");
//@ts-ignore
const ico_tabar_customer_pressed_png_1 = require("../assets/ico_tabar_customer_pressed.png");
//@ts-ignore
const ico_tabar_mine_normal_png_1 = require("../assets/ico_tabar_mine_normal.png");
//@ts-ignore
const ico_tabar_mine_pressed_png_1 = require("../assets/ico_tabar_mine_pressed.png");
const style_1 = require("../utils/style");
class CustomTabBar extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/9/18
         * @function: 签到
         */
        this.singIn = async () => {
            // let res = (await this.props.singIn()).data;
            //
            // if (res.code === api.NetworkState.SUCCESS) {
            //   Toast.message('签到成功');
            //   this.getSignInPage();
            // }
        };
        console.log('构造函数');
        this.state = {
            signInPageDetail: { dateIntegrals: [], signInCount: 0 },
            currentIndex: 0
        };
    }
    render() {
        let { onPress } = this.props;
        let { signInPageDetail, currentIndex } = this.state;
        console.log('更新了', currentIndex);
        if (typeof signInPageDetail.signInCount === 'undefined') {
            signInPageDetail.signInCount = 0;
        }
        return (<components_1.View style={datatool_1.styleAssign([
            style_1.wRatio(100),
            style_1.default.upa,
            style_1.absL(0),
            style_1.absB(0),
            style_1.h(style_1.iphoneX() ? 96 : 62),
            style_1.default.uac,
            style_1.default.uac,
            style_1.pb(style_1.iphoneX() ? 34 : 0),
            style_1.bgColor(style_1.commonStyles.whiteColor),
        ])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(2), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.udr])}>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(95), style_1.h(60), style_1.default.uac, style_1.default.ujc,
            style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            console.log('名片');
            onPress(0);
            this.setState({ currentIndex: 0 });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
              <components_1.Image src={currentIndex === 0 ? ico_tabar_businesscard_pressed_png_1.default : ico_tabar_businesscard_normal_png_1.default} style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mt(4)])}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(2), style_1.color(currentIndex === 0 ? style_1.commonStyles.colorTheme : '#9b9b9b')])}>名片</components_1.Text>
            </components_1.View>
          </touchable_button_1.default>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(95), style_1.h(60), style_1.default.uac, style_1.default.ujc,
            style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            console.log('雷达');
            onPress(1);
            this.setState({ currentIndex: 1 });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
              <components_1.Image src={currentIndex === 1 ? ico_tabar_radarscan_pressed_png_1.default : ico_tabar_radarscan_normal_png_1.default} style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mt(4)])}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(2), style_1.color(currentIndex === 1 ? style_1.commonStyles.colorTheme : '#9b9b9b')])}>雷达</components_1.Text>
            </components_1.View>
          </touchable_button_1.default>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(95), style_1.h(60), style_1.default.uac, style_1.default.ujc,
            style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            console.log('客户');
            onPress(2);
            this.setState({ currentIndex: 2 });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
              <components_1.Image src={currentIndex === 2 ? ico_tabar_customer_pressed_png_1.default : ico_tabar_customer_normal_png_1.default} style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mt(4)])}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(2), style_1.color(currentIndex === 2 ? style_1.commonStyles.colorTheme : '#9b9b9b')])}>客户</components_1.Text>
            </components_1.View>
          </touchable_button_1.default>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(95), style_1.h(60), style_1.default.uac, style_1.default.ujc,
            style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            console.log('我的');
            onPress(3);
            this.setState({ currentIndex: 3 });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
              <components_1.Image src={currentIndex === 3 ? ico_tabar_mine_pressed_png_1.default : ico_tabar_mine_normal_png_1.default} style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mt(4)])}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.mt(2), style_1.color(currentIndex === 3 ? style_1.commonStyles.colorTheme : '#9b9b9b')])}>我的</components_1.Text>
            </components_1.View>
          </touchable_button_1.default>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = CustomTabBar;
//# sourceMappingURL=index.jsx.map