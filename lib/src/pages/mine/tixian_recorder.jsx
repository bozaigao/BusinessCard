"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename tixian_recorder.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 提现记录
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/distribution");
const top_header_1 = require("../../compoments/top-header");
const components_1 = require("@tarojs/components");
const tixian_recorder_item_1 = require("../../compoments/tixian-recorder-item");
let TixianRecorder = class TixianRecorder extends taro_1.Component {
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
        this.refresh = () => {
            this.pageNo = 1;
            this.withdrawList(true);
        };
        this.loadMore = () => {
            this.pageNo++;
            this.withdrawList();
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/16
         * @function: 提现记录
         */
        this.withdrawList = (refresh) => {
            this.viewRef && this.viewRef.showLoading();
            this.props.withdrawList({ pageNo: this.pageNo, pageSize: this.pageSize }).then((res) => {
                console.log('提现记录', res);
                if (res) {
                    this.viewRef && this.viewRef.hideLoading();
                    this.setState({
                        records: res.records
                    });
                    if (refresh) {
                        this.setState({
                            records: res.records
                        });
                    }
                    else if (res.records && res.records.length !== 0) {
                        this.setState({ records: this.state.records.concat(res.records) });
                    }
                    else {
                        datatool_1.toast('没有更多了');
                    }
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.state = {
            records: []
        };
        this.pageNo = 1;
        this.pageSize = 10;
    }
    componentDidShow() {
        this.refresh();
    }
    render() {
        let { records } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'提现记录'}/>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY onScrollToUpper={() => {
            this.refresh();
        }} onScrollToLower={() => {
            this.loadMore();
        }}>
          {records.map((value, index) => {
            return <tixian_recorder_item_1.default item={value} key={index}/>;
        })}
        </components_1.ScrollView>
      </safe_area_view_1.default>);
    }
};
TixianRecorder = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], TixianRecorder);
exports.default = TixianRecorder;
//# sourceMappingURL=tixian_recorder.jsx.map