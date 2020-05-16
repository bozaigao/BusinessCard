"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename task_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/28
 * @Description: 任务详情
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/task_center");
const index_2 = require("../../compoments/top-header/index");
const components_1 = require("@tarojs/components");
const httpurl_1 = require("../../api/httpurl");
const index_3 = require("../../compoments/date-time-picker/index");
require("./add_task.scss");
const touchable_button_1 = require("../../compoments/touchable-button");
const delete_notice_1 = require("../../compoments/delete-notice");
const singleline_text_1 = require("../../compoments/singleline-text");
let TaskDetail = class TaskDetail extends taro_1.Component {
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
         * @date 2020/1/4
         * @function: 更新任务
         */
        this.updateTask = () => {
            let { theme, date, remark, chooseCustomer } = this.state;
            if (theme.length === 0) {
                datatool_1.toast('主题不能为空');
                return;
            }
            if (date.length === 0) {
                datatool_1.toast('日期不能为空');
                return;
            }
            let myyear = new Date().getFullYear();
            let mymonth = new Date().getMonth() + 1;
            let myweekday = new Date().getDate();
            let myhour = new Date().getHours();
            let myminutes = new Date().getMinutes();
            let dateTime = new Date(date).getTime();
            if (mymonth < 10) {
                //@ts-ignore
                mymonth = '0' + mymonth;
            }
            if (myweekday < 10) {
                //@ts-ignore
                myweekday = '0' + myweekday;
            }
            let currentTime = new Date(`${myyear}-${mymonth}-${myweekday} ${myhour}:${myminutes}`).getTime();
            if (dateTime < currentTime) {
                datatool_1.toast('不能选择之前的日期');
                return;
            }
            let paramas = {
                id: this.taskId,
                theme,
                date,
                remark
            };
            if (chooseCustomer.length !== 0) {
                let userIds = [];
                for (let i = 0; i < chooseCustomer.length; i++) {
                    userIds.push(chooseCustomer[i].id);
                }
                Object.assign(paramas, { customerIds: JSON.stringify(userIds) });
            }
            this.viewRef && this.viewRef.showLoading();
            this.props.updateTask(paramas).then((res) => {
                console.log(res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('修改成功');
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
         * @date 2020/3/28
         * @function: 获取任务详情
         */
        this.getTask = () => {
            this.viewRef && this.viewRef.showLoading('加载中');
            this.props.getTask({
                id: this.taskId,
            }).then((res) => {
                console.log('获取任务详情', res);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({
                        theme: res.theme,
                        date: datatool_1.transformTime(res.date),
                        remark: res.remark,
                        chooseCustomer: res.userList
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
         * @date 2020/3/28
         * @function: 更新任务状态
         */
        this.deleteTask = () => {
            this.viewRef && this.viewRef.showLoading('加载中');
            this.props.updateTask({
                id: this.taskId,
                status: -1,
            }).then((res) => {
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('任务删除成功');
                    datatool_1.debounce(1000, () => {
                        taro_1.default.navigateBack();
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        this.taskId = this.$router.params.taskId;
        this.state = {
            theme: '',
            date: '',
            remark: '',
            chooseCustomer: [],
            showDeleteNotice: false,
            editStyle: 'flex',
            canEdit: this.$router.params.status !== '1'
        };
    }
    componentDidMount() {
        this.getTask();
        taro_1.default.eventCenter.on('chooseCustomer', (chooseCustomer) => {
            console.log('用户列表', chooseCustomer);
            this.setState({ chooseCustomer });
        });
    }
    render() {
        let { theme, date, remark, chooseCustomer, showDeleteNotice, editStyle, canEdit } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default title={'任务详情'}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(10), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor), style_1.h(40), style_1.pl(20), style_1.pr(20)])}>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>主题</components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>{theme.length}</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797')])}>/50</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.Textarea disabled={!canEdit} style={datatool_1.styleAssign([style_1.wRatio(90), style_1.h(80), style_1.pl(20), style_1.pr(20), style_1.bgColor(style_1.commonStyles.whiteColor),])} value={theme} placeholder={'例如：电话回访客户'} onInput={(e) => {
            this.setState({ theme: e.detail.value });
        }} maxlength={50}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>

        <index_3.default disabled={!canEdit} onOk={({ current }) => {
            console.log('选择时间', current);
            this.setState({ date: current });
        }} wrap-class="my-class" placeholder={date}/>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.pl(20), style_1.pr(20), style_1.mt(15)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#787878'), style_1.fSize(14)])}>关联客户</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{chooseCustomer.length}</components_1.Text>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#979797')])}>/100</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uWrap, style_1.default.udr, style_1.default.uac, style_1.pl(10), style_1.pr(10)])}>
            {chooseCustomer.map((value, index) => {
            return <components_1.View style={datatool_1.styleAssign([style_1.w(78), style_1.default.uac, style_1.default.ujc, style_1.ml(10), style_1.mt(10)])} key={index}>
                  <components_1.Image style={datatool_1.styleAssign([style_1.w(73), style_1.h(73), style_1.radiusA(4)])} src={value.avatar ? value.avatar : `${httpurl_1.cloudBaseUrl}ico_default.png`}/>
                  <singleline_text_1.default text={value.name} style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434'), style_1.mt(5)])}/>
                  {canEdit &&
                <components_1.Image key={index} style={datatool_1.styleAssign([style_1.w(20), style_1.h(20), style_1.default.upa, style_1.absR(-5), style_1.absT(-5)])} src={`${httpurl_1.cloudBaseUrl}ico_close.png`} onClick={() => {
                    this.state.chooseCustomer.splice(index, 1);
                    this.setState({ chooseCustomer: this.state.chooseCustomer }, () => {
                        console.log('用于数据', this.state.chooseCustomer);
                    });
                }}/>}
                </components_1.View>;
        })}
            {chooseCustomer.length !== 100 && canEdit &&
            <components_1.Image style={datatool_1.styleAssign([style_1.w(68), style_1.h(68), style_1.ml(10), style_1.mt(10)])} src={`${httpurl_1.cloudBaseUrl}ico_add_task.png`} onClick={() => {
                let chooseIds = [];
                for (let i = 0; i < chooseCustomer.length; i++) {
                    chooseIds.push(chooseCustomer[i].id);
                }
                taro_1.default.navigateTo({
                    url: `/pages/mine/choose_customer?chooseIds=${JSON.stringify(chooseIds)}`
                });
            }}/>}
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor), style_1.mt(10)])}/>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uas, style_1.default.udr, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor), { display: editStyle }])}>
            <components_1.Textarea disabled={!canEdit} style={datatool_1.styleAssign([style_1.wRatio(70), style_1.h(128), style_1.pa(20), style_1.bgColor(style_1.commonStyles.whiteColor)])} value={remark} placeholder={'备注'} onInput={(e) => {
            this.setState({ remark: e.detail.value });
        }} maxlength={200}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.default.uac, style_1.mr(20), style_1.mt(18), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#727272')])}>{remark.length}</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797')])}>/200</components_1.Text>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.uje])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor('rgb(184,186,190)'), style_1.op(0.5)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(68), style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.default.uac, style_1.default.ujc])}>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              {!canEdit ?
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.ml(10), style_1.w(335), style_1.h(44), style_1.bgColor(style_1.commonStyles.colorTheme),
                style_1.radiusA(2), style_1.default.uac, style_1.default.ujc])} onClick={() => {
                this.setState({ editStyle: 'none', showDeleteNotice: true });
            }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>删除任务</components_1.Text>
                  </touchable_button_1.default> :
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.w(162), style_1.h(44), style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme),
                { borderStyle: 'solid' }, style_1.radiusA(2), style_1.default.uac, style_1.default.ujc])} onClick={() => {
                this.setState({ editStyle: 'none', showDeleteNotice: true });
            }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#343434')])}>删除任务</components_1.Text>
                  </touchable_button_1.default>}
              {canEdit &&
            <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.ml(10), style_1.w(162), style_1.h(44), style_1.bgColor(style_1.commonStyles.colorTheme),
                style_1.radiusA(2), style_1.default.uac, style_1.default.ujc])} onClick={() => {
                this.updateTask();
            }}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>保存编辑</components_1.Text>
                </touchable_button_1.default>}
            </components_1.View>
          </components_1.View>
        </components_1.View>
        {showDeleteNotice && <delete_notice_1.default title={'删除提醒'} subTitle={'删除后，任务将无法恢复，确定删除？'} cancelCallback={() => {
            console.log('点击了');
            this.setState({ editStyle: 'flex', showDeleteNotice: false });
        }} confirmCallback={() => {
            this.setState({ editStyle: 'flex', showDeleteNotice: false }, () => {
                this.deleteTask();
            });
        }}/>}
      </index_1.default>);
    }
};
TaskDetail = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], TaskDetail);
exports.default = TaskDetail;
//# sourceMappingURL=task_detail.jsx.map