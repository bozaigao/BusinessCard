"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 客户
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const index_1 = require("../compoments/safe-area-view/index");
const style_1 = require("../utils/style");
const datatool_1 = require("../utils/datatool");
//@ts-ignore
const redux_1 = require("@tarojs/redux");
const actions = require("../actions/customer");
const index_2 = require("./component/custom-item/index");
const index_3 = require("../compoments/bottom-buton/index");
const global_1 = require("../const/global");
const index_4 = require("./component/mode-modal/index");
const index_5 = require("./component/shai-xuan-modal/index");
const index_6 = require("../compoments/navigation_bar/index");
const index_7 = require("../compoments/sanjiao/index");
const customer_guide_1 = require("./component/customer-guide");
const share_invite_1 = require("./component/share-invite");
let Customer = class Customer extends taro_1.Component {
    constructor(props) {
        super(props);
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
            let status = 'visit';
            let { shaiXuanMode, startTime, endTime, name } = this.state;
            if (shaiXuanMode === '最后访问时间') {
                status = 'visit';
            }
            else if (shaiXuanMode === '最后跟进时间') {
                status = 'follow';
            }
            else if (shaiXuanMode === '最后转入时间') {
                status = 'create';
            }
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                status,
            };
            if (startTime.length !== 0) {
                Object.assign(params, { startDate: startTime });
            }
            if (endTime.length !== 0) {
                Object.assign(params, { endDate: endTime });
            }
            if (name.length !== 0) {
                Object.assign(params, { name });
            }
            console.log('搜索参数', params);
            this.props.getCustomerList(params).then((res) => {
                console.log('获取客户列表', res);
                if (refresh) {
                    this.setState({ customerList: res.records, totalCustomers: res.total });
                }
                else if (res.records && res.records.length !== 0) {
                    this.setState({ customerList: this.state.customerList.concat(res.records), totalCustomers: res.total });
                }
                else {
                    datatool_1.toast('没有客户了');
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        this.pageNo = 1;
        this.pageSize = 1000;
        this.state = {
            customerList: [],
            totalCustomers: 0,
            shaiXuanMode: '最后转入时间',
            shaiXuanValue: '全部',
            showMode: false,
            showShaiXuan: false,
            startTime: '',
            endTime: '',
            name: '',
            showGuide: false,
            showShareInvite: false
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentDidShow() {
        this.refresh();
        taro_1.default.eventCenter.on('refreshCustomerList', () => {
            this.refresh();
        });
        let showGuide = datatool_1.get('customer_guide');
        this.setState({ showGuide: !showGuide });
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off();
    }
    componentDidHide() {
        console.log('componentDidShow');
    }
    //@ts-ignore
    onShareAppMessage(res) {
        return {
            title: `快来使用极易推小程序吧`,
            path: `/pages/businesscard`
        };
    }
    render() {
        let { customerList, totalCustomers, shaiXuanMode, showMode, showShaiXuan, showGuide, showShareInvite } = this.state;
        return (<index_1.default customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])} notNeedBottomPadding={true}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <index_6.default>
            <components_1.View style={datatool_1.styleAssign([{ width: '65%' }, { marginLeft: '2.5%' }, style_1.h(31), style_1.op(0.7), style_1.bgColor('#F5F5F5'),
            style_1.radiusA(26), style_1.default.uac, style_1.default.udr])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(21), style_1.ml(16)])} src={require('../assets/ico_search.png')}/>
              <components_1.Input type='text' placeholder='搜索客户姓名' style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14)])} onInput={(e) => {
            this.setState({ name: e.detail.value }, () => {
                this.refresh();
            });
        }}/>
            </components_1.View>
          </index_6.default>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{`共${totalCustomers}位客户`}</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            this.setState({ showMode: true });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{shaiXuanMode}</components_1.Text>
                <index_7.default orientation={global_1.Orientation.down} style={datatool_1.styleAssign([style_1.ml(3)])}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])} onClick={() => {
            this.setState({ showShaiXuan: true });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>筛选</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(14), style_1.h(14), style_1.ml(3)])} src={require('../assets/ico_shaixuan.png')}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          {customerList.length === 0 ?
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../assets/ico_no_data.png')}/>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无客户</components_1.Text>
                </components_1.View>
              </components_1.View> :
            <components_1.ScrollView onScrollToUpper={() => {
                this.refresh();
            }} onScrollToLower={() => {
                // this.loadMore();
            }} style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(style_1.iphoneX() ? style_1.screenHeight() - 270 : style_1.screenHeight() - 200), style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY>
                {customerList.map((value, index) => {
                console.log(value);
                return (<index_2.default key={index} customer={value} mode={shaiXuanMode.substr(0, shaiXuanMode.length - 2)} onClick={() => {
                    taro_1.default.navigateTo({
                        url: `/pages/customer/customer_detail?id=${value.id}&userId=${value.userId}`
                    });
                }} viewCardCallback={() => {
                    if (value.type === 2) {
                        this.setState({ showShareInvite: true });
                    }
                    else {
                        taro_1.default.navigateTo({
                            url: `/pages/businesscard/other_businesscard?userId=${value.userId}`
                        });
                    }
                }} genJinCallback={(customer) => {
                    taro_1.default.navigateTo({
                        url: `/pages/customer/add_genjin?itemData=${JSON.stringify(customer)}`
                    });
                }}/>);
            })}
              </components_1.ScrollView>}
          <index_3.default title={'新增客户'} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/customer/add_customer`
            });
        }}/>
        </components_1.View>
        {showMode && <index_4.default totalPerson={totalCustomers} shaiXuanMode={shaiXuanMode} shaiXuanCallback={() => {
            this.setState({ showMode: false, showShaiXuan: true });
        }} cancelCallback={() => {
            this.setState({ showMode: false });
        }} confirmCallback={(data) => {
            this.setState({ showMode: false, startTime: '', endTime: '', shaiXuanMode: data }, () => {
                this.refresh();
            });
        }}/>}
        {showShaiXuan && <index_5.default totalPerson={totalCustomers} shaiXuanMode={shaiXuanMode} startAndEndTimeCallback={(startTime, endTime) => {
            this.setState({ startTime, endTime, showShaiXuan: false }, () => {
                this.refresh();
            });
        }} modeCallback={() => {
            this.setState({ showShaiXuan: false, showMode: true });
        }} cancelCallback={() => {
            this.setState({ showShaiXuan: false });
        }}/>}
        {showGuide && <customer_guide_1.default cancle={() => {
            datatool_1.save('customer_guide', true);
            this.setState({ showGuide: false });
        }}/>}
        {showShareInvite && <share_invite_1.default cancelCallback={() => {
            this.setState({ showShareInvite: false });
        }} confirmCallback={() => {
            this.setState({ showShareInvite: false });
        }}/>}
      </index_1.default>);
    }
};
Customer = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], Customer);
exports.default = Customer;
//# sourceMappingURL=customer.jsx.map