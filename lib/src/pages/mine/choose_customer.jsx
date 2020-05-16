"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename choose_customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/26
 * @Description: 选择客户界面
 */
const taro_1 = require("@tarojs/taro");
const index_1 = require("../../compoments/safe-area-view/index");
const style_1 = require("../../utils/style");
const datatool_1 = require("../../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/customer");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const index_3 = require("../../compoments/guanlian-customer/index");
let ChooseCustomer = class ChooseCustomer extends taro_1.Component {
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
            this.getCustomerList(true);
        };
        this.loadMore = () => {
            this.pageNo++;
            this.getCustomerList();
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/10
         * @function: 获取客户列表
         */
        this.getCustomerList = (refresh) => {
            let { name, chooseIds } = this.state;
            this.viewRef && this.viewRef.showLoading();
            let params = { pageNo: this.pageNo, pageSize: this.pageSize };
            if (name) {
                Object.assign(params, { name });
            }
            this.props.getCustomerList(params).then((res) => {
                console.log('获取客户列表', res, chooseIds);
                this.viewRef && this.viewRef.hideLoading();
                if (refresh) {
                    let customerArray = [];
                    for (let i = 0; i < res.records.length; i++) {
                        console.log('打印', chooseIds);
                        if (!chooseIds || chooseIds.indexOf(res.records[i].id) === -1) {
                            customerArray.push(res.records[i]);
                        }
                    }
                    this.setState({ customerList: customerArray });
                }
                else if (res.records && res.records.length !== 0) {
                    this.setState({ customerList: this.state.customerList.concat(res.records) });
                }
                else {
                    datatool_1.toast('没有客户了');
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log('呵呵', datatool_1.parseData(this.$router.params.chooseIds));
        this.pageNo = 1;
        this.pageSize = 1000;
        this.state = {
            chooseIds: datatool_1.parseData(this.$router.params.chooseIds),
            customerList: [],
            name: '',
            chooseCustomerIds: []
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentWillUnmount() {
    }
    componentDidShow() {
        this.refresh();
    }
    componentDidHide() {
    }
    render() {
        let { customerList, chooseCustomerIds } = this.state;
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} ref={(ref) => {
            this.viewRef = ref;
        }}>
        <index_2.default title={'选择客户'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(63), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
          <components_1.View style={datatool_1.styleAssign([{ width: '85%' }, style_1.h(31), style_1.op(0.7), style_1.bgColor('#F5F5F5'),
            style_1.radiusA(26), style_1.default.uac, style_1.default.udr])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(21), style_1.ml(16)])} src={require('../../assets/ico_search.png')}/>
            <components_1.Input type='text' placeholder='搜索客户姓名' style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14)])} onInput={(e) => {
            this.setState({ name: e.detail.value }, () => {
                this.refresh();
            });
        }}/>
          </components_1.View>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme)])} onClick={() => {
            let chooseCustomers = [];
            for (let i = 0; i < customerList.length; i++) {
                for (let j = 0; j < chooseCustomerIds.length; j++) {
                    if (customerList[i].id === chooseCustomerIds[j]) {
                        chooseCustomers.push(customerList[i]);
                        break;
                    }
                }
            }
            taro_1.default.eventCenter.trigger('chooseCustomer', chooseCustomers);
            taro_1.default.navigateBack();
        }}>确定</components_1.Text>
        </components_1.View>
        {customerList.length === 0 ?
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../../assets/ico_no_data.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无客户</components_1.Text>
              </components_1.View>
            </components_1.View> :
            <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY onScrollToUpper={() => {
                this.refresh();
            }} onScrollToLower={() => {
                // this.loadMore();
            }}>
              {customerList.map((value, index) => {
                return <index_3.default customer={value} key={index} backgroundColor={style_1.commonStyles.pageDefaultBackgroundColor} marginTop={10} hascheck={true} isChecked={chooseCustomerIds.includes(value.id)} onChoose={(id) => {
                    let hasData = false;
                    for (let i = 0; i < chooseCustomerIds.length; i++) {
                        if (id === chooseCustomerIds[i]) {
                            hasData = true;
                            this.state.chooseCustomerIds.splice(i, 1);
                            this.setState({ chooseCustomerIds: this.state.chooseCustomerIds }, () => {
                                console.log('点击', this.state.chooseCustomerIds);
                            });
                            break;
                        }
                    }
                    if (!hasData) {
                        this.state.chooseCustomerIds.push(id);
                        this.setState({ chooseCustomerIds: this.state.chooseCustomerIds }, () => {
                            console.log('点击', this.state.chooseCustomerIds);
                        });
                    }
                }}/>;
            })}
            </components_1.ScrollView>}
      </index_1.default>);
    }
};
ChooseCustomer = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], ChooseCustomer);
exports.default = ChooseCustomer;
//# sourceMappingURL=choose_customer.jsx.map