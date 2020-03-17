"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename radarscan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 雷达
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const index_1 = require("../compoments/safe-area-view/index");
const datatool_1 = require("../utils/datatool");
const style_1 = require("../utils/style");
const index_2 = require("./pagecomponent/radar-item/index");
const actions = require("../actions/radar");
const redux_1 = require("@tarojs/redux");
const index_3 = require("../compoments/navigation_bar/index");
const leida_guide_1 = require("./pagecomponent/leida-guide");
let Radarscan = class Radarscan extends taro_1.Component {
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
        this.refresh = () => {
            this.pageNo = 1;
            this.getTraceList(true);
        };
        this.loadMore = () => {
            this.pageNo++;
            this.getTraceList();
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/10
         * @function: 查询我的雷达数据列表
         */
        this.getTraceList = (refresh) => {
            this.props.getTraceList({ pageNo: this.pageNo, pageSize: this.pageSize }).then((res) => {
                console.log('查询我的雷达数据列表', res);
                if (refresh) {
                    this.setState({ records: res.records });
                }
                else if (res.records && res.records.length !== 0) {
                    this.setState({ records: this.state.records.concat(res.records) });
                }
                else {
                    datatool_1.toast('没有记录了');
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.pageNo = 1;
        this.pageSize = 10;
        this.state = {
            records: [],
            showGuide: false
        };
    }
    componentWillUnmount() {
    }
    componentDidShow() {
        this.refresh();
        let showGuide = datatool_1.get('radar_guide');
        this.setState({ showGuide: !showGuide });
    }
    render() {
        let { records, showGuide } = this.state;
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        
        <index_3.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.ujc])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18)])}>雷达</components_1.Text>
          </components_1.View>
        </index_3.default>
        {records.length === 0 ?
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../assets/ico_no_data.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无记录</components_1.Text>
              </components_1.View>
            </components_1.View> :
            <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY onScrollToUpper={() => {
                this.refresh();
            }} onScrollToLower={() => {
                this.loadMore();
            }}>
              {records.map((value, index) => {
                console.log(value);
                return (<index_2.default key={index} item={value}/>);
            })}
            </components_1.ScrollView>}
        {showGuide && <leida_guide_1.default cancle={() => {
            datatool_1.save('radar_guide', true);
            this.setState({ showGuide: false });
        }}/>}
      </index_1.default>);
    }
};
Radarscan = __decorate([
    redux_1.connect(state => Object.assign(state.taskCenter, state.login), Object.assign({}, actions))
], Radarscan);
exports.default = Radarscan;
//# sourceMappingURL=radarscan.jsx.map