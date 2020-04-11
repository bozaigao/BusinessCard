"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename help.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 使用帮助
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const help_list_item_1 = require("../sub_pagecomponent/help-list-item");
let Help = class Help extends taro_1.Component {
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
        console.log(this.viewRef);
    }
    render() {
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'使用帮助'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          {['极致推有什么用？', '如何完善名片信息？如何完善名片信息？',
            '如何分享自己的名片？', '客户可以通过哪些途径查看名片？',
            '如何获取自己的人脉？', '如何开通自己的商铺？',
            '雷达功能有什么作用？', '如何开启消息提醒？',
            '如何修改名片样式？'].map((value, index) => {
            return <help_list_item_1.default key={index} title={value} onClick={() => {
                if (value === '极致推有什么用？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/introduce`
                    });
                }
                else if (value === '如何完善名片信息？如何完善名片信息？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/how_perform_card`
                    });
                }
                else if (value === '如何分享自己的名片？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/how_share_card`
                    });
                }
                else if (value === '客户可以通过哪些途径查看名片？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/view_card`
                    });
                }
                else if (value === '如何获取自己的人脉？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/get_renmai`
                    });
                }
                else if (value === '如何开通自己的商铺？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/open_shop`
                    });
                }
                else if (value === '雷达功能有什么作用？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/radar_gongneng`
                    });
                }
                else if (value === '如何开启消息提醒？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/open_message_notice`
                    });
                }
                else if (value === '如何修改名片样式？') {
                    taro_1.default.navigateTo({
                        url: `/pages/mine/update_card_style`
                    });
                }
            }}/>;
        })}

          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(86), style_1.default.ujc, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color('#D2D2D2')])}>极易推 给您极致服务</components_1.Text>
          </components_1.View>
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
Help = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Help);
exports.default = Help;
//# sourceMappingURL=help.jsx.map
