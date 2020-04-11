"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename task_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务中心
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
const index_3 = require("../../compoments/touchable-button/index");
const index_4 = require("../sub_pagecomponent/task-item/index");
const index_5 = require("../../compoments/bottom-buton/index");
const global_1 = require("../../const/global");
const httpurl_1 = require("../../api/httpurl");
const sanjiao_1 = require("../../compoments/sanjiao");
let TaskCenter = class TaskCenter extends taro_1.Component {
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
        this.refresh = () => {
            this.pageNo = 1;
            this.getIngTaskList(true);
        };
        this.refresh1 = () => {
            this.pageNo1 = 1;
            this.getFinishedTaskList(true);
        };
        this.loadMore = () => {
            this.pageNo++;
            this.getIngTaskList();
        };
        this.loadMore1 = () => {
            this.pageNo1++;
            this.getFinishedTaskList();
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/4
         * @function: 获取正在进行的任务列表
         */
        this.getIngTaskList = (refresh) => {
            this.viewRef && this.viewRef.showLoading('加载中');
            this.props.getTaskList({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                status: 0,
                date: this.state.date
            }).then((res) => {
                console.log('获取正在进行的任务列表', res);
                this.viewRef && this.viewRef.hideLoading();
                if (refresh) {
                    if (res.records.length !== 0) {
                        this.state.taskItem.push({ title: '正在进行中', children: res.records });
                    }
                    this.setState({ taskItem: this.state.taskItem, todayTask: res.records });
                }
                else if (res.records && res.records.length !== 0) {
                }
                else {
                    datatool_1.toast('没有任务了');
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/4
         * @function: 获取已完成的任务列表
         */
        this.getFinishedTaskList = (refresh) => {
            this.viewRef && this.viewRef.showLoading('加载中');
            this.props.getTaskList({
                pageNo: this.pageNo1,
                pageSize: this.pageSize1,
                status: 1,
                date: this.state.date
            }).then((res) => {
                console.log('获取已完成的任务列表', res);
                this.viewRef && this.viewRef.hideLoading();
                if (refresh) {
                    if (res.records.length !== 0) {
                        this.state.taskItem.push({ title: '已完成', children: res.records });
                    }
                    this.setState({ taskItem: this.state.taskItem });
                }
                else if (res.records && res.records.length !== 0) {
                }
                else {
                    datatool_1.toast('没有任务了');
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/3/1
         * @function: 更新任务状态
         */
        this.taskUpdate = (taskId, status) => {
            this.viewRef && this.viewRef.showLoading('加载中');
            this.props.updateTask({
                id: taskId,
                status,
            }).then((res) => {
                console.log('更新任务状态', res, taskId);
                this.viewRef && this.viewRef.hideLoading();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.setState({ taskItem: [] }, () => {
                        this.refresh();
                        this.refresh1();
                        datatool_1.toast('状态更新成功');
                    });
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.state = {
            showAllTask: true,
            showOnlyToday: true,
            taskItem: [],
            date: '',
            currentIndex: 0,
            todayTask: []
        };
        this.pageNo = 1;
        this.pageSize = 1000;
        this.pageNo1 = 1;
        this.pageSize1 = 1000;
    }
    componentDidShow() {
        this.setState({ taskItem: [] }, () => {
            this.refresh();
            this.refresh1();
        });
        taro_1.default.eventCenter.on('refreshTaskList', () => {
            console.log('刷新任务列表');
            this.setState({ taskItem: [] }, () => {
                this.refresh();
                this.refresh1();
            });
        });
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('refreshTaskList');
    }
    render() {
        let { showAllTask, showOnlyToday, taskItem, date, currentIndex, todayTask } = this.state;
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <index_2.default title={'任务中心'}/>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.uac, style_1.default.udr, style_1.default.ujb, style_1.mt(10)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.ml(20)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.default.ujb])}>
            <index_3.default customStyle={datatool_1.styleAssign([style_1.default.uac])} onClick={() => {
            this.setState({ currentIndex: 0, taskItem: [], date: '' }, () => {
                this.refresh();
                this.refresh1();
            });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>全部任务</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(60), style_1.h(2), style_1.bgColor(currentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10), style_1.radiusA(1)])}/>
            </index_3.default>
            <index_3.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.ml(23)])} onClick={() => {
            this.setState({ currentIndex: 1, date: datatool_1.getToday(), taskItem: [] }, () => {
                console.log(this.state.date);
                this.refresh();
            });
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>今日任务</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(60), style_1.h(2), style_1.bgColor(currentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10), style_1.radiusA(1)])}/>
            </index_3.default>
          </components_1.View>
          <components_1.Picker mode='date' onChange={(e) => {
            this.setState({ date: e.detail.value, taskItem: [] }, () => {
                this.refresh();
                this.refresh1();
            });
        }} value={date}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(18), style_1.h(18), style_1.mr(20)])} src={`${httpurl_1.cloudBaseUrl}ico_date.png`}/>
          </components_1.Picker>
        </components_1.View>
        
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY onScrollToUpper={() => {
        }} onScrollToLower={() => {
        }}>
          {currentIndex === 0 ?
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
                
                {taskItem.map((value, index) => {
                let showItem = false;
                if (index === 0) {
                    showItem = showAllTask;
                }
                else {
                    showItem = showOnlyToday;
                }
                return (<components_1.View key={index}>
                      <index_3.default onClick={() => {
                    if (index === 0) {
                        this.setState({ showAllTask: !this.state.showAllTask });
                    }
                    else {
                        this.setState({ showOnlyToday: !this.state.showOnlyToday });
                    }
                }} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(40), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(20), style_1.pr(20), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.mt(10)])}>
                        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                          <sanjiao_1.default orientation={showItem ? global_1.Orientation.down : global_1.Orientation.right}/>
                          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0C0C0C'), style_1.ml(10)])}>{value.title}</components_1.Text>
                        </components_1.View>
                        <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>{`(${value.children.length})`}</components_1.Text>
                      </index_3.default>
                      {showItem && <components_1.View>
                          {value.children.map((itemValue, itemIndex) => {
                    return (<index_4.default key={itemIndex} itemData={itemValue} finishCallback={(id) => {
                        this.taskUpdate(id, 1);
                    }} deleteCallback={(id) => {
                        this.taskUpdate(id, -1);
                    }}/>);
                })}
                        </components_1.View>}
                    </components_1.View>);
            })}
                {taskItem.length === 0 &&
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(48)])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../../assets/ico_no_data.png')}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无任务</components_1.Text>
                  </components_1.View>}
              </components_1.View> :
            <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
                {todayTask.map((itemValue, itemIndex) => {
                return (<index_4.default key={itemIndex} itemData={itemValue} finishCallback={(id) => {
                    this.taskUpdate(id, 1);
                }} deleteCallback={(id) => {
                    this.taskUpdate(id, -1);
                }}/>);
            })}
                {todayTask.length === 0 &&
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(48)])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../../assets/ico_no_data.png')}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无任务</components_1.Text>
                  </components_1.View>}
              </components_1.View>}
        </components_1.ScrollView>
        
        <index_5.default title={'新建任务'} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/add_task`
            });
        }}/>
      </index_1.default>);
    }
};
TaskCenter = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], TaskCenter);
exports.default = TaskCenter;
//# sourceMappingURL=task_center.jsx.map
