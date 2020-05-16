"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename my_tags.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 我的标签
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/login");
const dictActions = require("../../actions/dict");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const index_3 = require("../../compoments/bottom-buton/index");
const index_4 = require("../../compoments/touchable-button/index");
const httpurl_1 = require("../../api/httpurl");
const custom_tag_1 = require("../../compoments/custom-tag");
let MyTags = class MyTags extends taro_1.Component {
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
         * @date 2020/3/8
         * @function: 获取后台配置标签
         */
        this.getDictItemList = () => {
            this.viewRef && this.viewRef.showLoading();
            this.props.getDictItemList({ dictCode: 'user_label ' }).then((res) => {
                console.log('获取后台配置标签', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ tags: res });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/28
         * @function: 更新用户信息
         */
        this.update = () => {
            console.log('函数', this.props);
            let { chooseTags } = this.state;
            if (chooseTags.length === 0) {
                datatool_1.toast('请选择标签');
                return;
            }
            let paramas = {
                label: JSON.stringify(chooseTags)
            };
            console.log('参数错误', paramas);
            this.viewRef && this.viewRef.showLoading();
            this.props.update(paramas).then((res) => {
                console.log('更新用户信息', res);
                this.getUserInfo();
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('信息更新成功');
                    datatool_1.debounce(1000, () => {
                        taro_1.default.navigateBack();
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
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
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.state = {
            chooseTags: props.userInfo.labelArray,
            tags: [],
            showTagEdit: false
        };
        console.log(this.viewRef);
    }
    componentDidShow() {
        this.getDictItemList();
    }
    render() {
        let { chooseTags, tags, showTagEdit } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default title={'我的标签'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(16)])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>我的标签</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.ml(20)])}>(最多添加4个标签)</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(8), style_1.default.uWrap])}>
              {chooseTags.map((value, index) => {
            return (<components_1.View key={index} style={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.padding([6, 15, 6, 15]), style_1.radiusA(14)])}>
                    <index_4.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.ujc, style_1.radiusA(14),
                style_1.padding([6, 15, 6, 15]), style_1.bgColor('#E7E7E7')])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#343434')])}>{value}</components_1.Text>
                      <components_1.Image style={datatool_1.styleAssign([style_1.w(15), style_1.h(15), style_1.default.upa, style_1.absT(-5), style_1.absR(-5)])} src={`${httpurl_1.cloudBaseUrl}ico_close.png`} onClick={() => {
                this.state.chooseTags.splice(this.state.chooseTags.indexOf(value), 1);
                this.setState({ chooseTags: this.state.chooseTags });
            }}/>
                    </index_4.default>
                  </components_1.View>);
        })}
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(16), style_1.default.uae, style_1.mb(20)])}>
              <index_4.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.bgColor(style_1.commonStyles.colorTheme),
            style_1.w(95), style_1.h(28), style_1.radiusA(14), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ showTagEdit: true });
        }}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(12)])} src={`${httpurl_1.cloudBaseUrl}ico_black_add.png`}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>自定义标签</components_1.Text>
                </components_1.View>
              </index_4.default>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(14)])}>（仅限于兴趣爱好）</components_1.Text>
            </components_1.View>
          </components_1.View>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(154), style_1.mt(8), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(20), style_1.mt(16)])}>常用标签</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.mt(8),
            style_1.default.uWrap])}>
              {tags.map((value, index) => {
            return (<index_4.default key={index} customStyle={datatool_1.styleAssign([style_1.ml(24), style_1.mt(12), style_1.radiusA(14), style_1.padding([6, 16, 6, 16]), style_1.bo(1), style_1.bdColor(chooseTags.includes(value.itemText) ? '#979797' : style_1.commonStyles.colorTheme), {
                    borderStyle: 'solid'
                }])} onClick={() => {
                if (!this.state.chooseTags.includes(value.itemText)) {
                    if (chooseTags.length < 4) {
                        this.state.chooseTags.push(value.itemText);
                        this.setState({ chooseTags: this.state.chooseTags });
                    }
                    else {
                        datatool_1.toast('最多添加4个标签');
                    }
                }
            }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(chooseTags.includes(value.itemText) ? '#979797' : style_1.commonStyles.colorTheme)])}>{value.itemText}</components_1.Text>
                  </index_4.default>);
        })}
            </components_1.View>
          </components_1.View>
        </components_1.View>
        
        <index_3.default title={'保存'} onClick={() => {
            this.update();
        }}/>
        {showTagEdit && <custom_tag_1.default cancelCallback={() => {
            this.setState({ showTagEdit: false });
        }} confirmCallback={(content) => {
            this.setState({ showTagEdit: false }, () => {
                if (!this.state.chooseTags.includes(content)) {
                    if (chooseTags.length < 4) {
                        this.state.chooseTags.push(content);
                        this.setState({ chooseTags: this.state.chooseTags });
                    }
                    else {
                        datatool_1.toast('最多添加4个标签');
                    }
                }
                else {
                    datatool_1.toast('已经有该标签');
                }
            });
        }}/>}
      </index_1.default>);
    }
};
MyTags = __decorate([
    redux_1.connect(state => state.login, Object.assign(actions, dictActions))
], MyTags);
exports.default = MyTags;
//# sourceMappingURL=my_tags.jsx.map