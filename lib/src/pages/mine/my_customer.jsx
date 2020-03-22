"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename my_customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 我的客户
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const safe_area_view_1 = require("../../compoments/safe-area-view");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/distribution");
const my_customer_item_1 = require("../sub_pagecomponent/my_customer_item");
const top_header_1 = require("../../compoments/top-header");
let MyCustomer = class MyCustomer extends taro_1.Component {
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
            this.myCustomerList(true);
        };
        this.loadMore = () => {
            this.pageNo++;
            this.myCustomerList();
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/2/16
         * @function: 获取我的客户列表
         */
        this.myCustomerList = (refresh) => {
            let { type, content } = this.state;
            let params = { pageNo: this.pageNo, pageSize: this.pageSize };
            if (type.length !== 0) {
                params = { pageNo: this.pageNo, pageSize: this.pageSize, type };
            }
            if (content.length !== 0) {
                params = { pageNo: this.pageNo, pageSize: this.pageSize, type, content };
            }
            this.viewRef && this.viewRef.showLoading();
            this.props.myCustomerList(params).then((res) => {
                console.log('获取我的客户列表', res);
                console.log('属性', this.props.userInfo);
                if (res) {
                    this.viewRef && this.viewRef.hideLoading();
                    this.setState({
                        total: res.total,
                        customerList: res.records
                    });
                    if (refresh) {
                        this.setState({
                            total: res.total,
                            customerList: res.records
                        });
                    }
                    else if (res.records && res.records.length !== 0) {
                        this.setState({ customerList: this.state.customerList.concat(res.records), total: res.total });
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
        this.pageNo = 1;
        this.pageSize = 10;
        this.state = {
            currentIndex: 0,
            total: 0,
            customerList: [],
            type: '',
            content: ''
        };
    }
    componentDidShow() {
        this.refresh();
    }
    componentDidHide() {
    }
    render() {
        let { currentIndex, total, customerList } = this.state;
        let child;
        if (currentIndex === 0) {
            child = <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(70), style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
          <components_1.View style={datatool_1.styleAssign([{ width: '80%' }, style_1.h(29), style_1.op(0.7), style_1.bgColor(style_1.commonStyles.whiteColor),
                style_1.radiusA(26), style_1.default.uac, style_1.default.udr, style_1.mt(10)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(21), style_1.ml(16)])} src={require('../../assets/ico_search.png')}/>
            <components_1.Input type='text' placeholder='搜索客户姓名/ID' style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14)])} onInput={(e) => {
                this.setState({ content: e.detail.value }, () => {
                    this.refresh();
                });
            }}/>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(10), style_1.mb(10)])}>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>
            您目前拥有
          </components_1.Text>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#825D22'), style_1.ml(2), style_1.mr(2)])}>
            {total}
          </components_1.Text>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>
            位客户
          </components_1.Text>
        </components_1.View>
      </components_1.View>;
        }
        return (<safe_area_view_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <top_header_1.default title={'我的客户'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(30), style_1.mt(20), style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.ml(36)])} onClick={() => {
            this.setState({ currentIndex: 0, type: '', content: '' }, () => {
                this.refresh();
            });
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>
              全部
            </components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.w(25), style_1.h(2), style_1.radiusTR(2), style_1.bgColor(currentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(5)])}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.ml(50)])} onClick={() => {
            this.setState({ currentIndex: 1, type: 'share', content: '' }), () => {
                this.refresh();
            };
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>
              分享绑定
            </components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.w(54), style_1.h(2), style_1.radiusTR(2), style_1.bgColor(currentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(5)])}/>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mr(36)])} onClick={() => {
            this.setState({ currentIndex: 2, type: 'buy', content: '' }, () => {
                this.refresh();
            });
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color(currentIndex === 2 ? '#E2BB7B' : '#0C0C0C')])}>
              购买绑定
            </components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.w(54), style_1.h(2), style_1.radiusTR(2), style_1.bgColor(currentIndex === 2 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(5)])}/>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          {child}
          {customerList.length === 0 ?
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../../assets/ico_no_data.png')}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无客户</components_1.Text>
                </components_1.View>
              </components_1.View> :
            <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY onScrollToUpper={() => {
                this.refresh();
            }} onScrollToLower={() => {
                this.loadMore();
            }}>
                {customerList.map((value, index) => {
                return <my_customer_item_1.default item={value} key={index}/>;
            })}
              </components_1.ScrollView>}
        </components_1.View>
      </safe_area_view_1.default>);
    }
};
MyCustomer = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], MyCustomer);
exports.default = MyCustomer;
//# sourceMappingURL=my_customer.jsx.map