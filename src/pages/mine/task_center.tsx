/**
 * @filename task_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务中心
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {getToday, styleAssign, toast} from "../../utils/datatool";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mr,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/task_center';
import TopHeader from "../../compoments/top-header/index";
import {Image, Picker, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";
import TaskItem from "../../compoments/task-item/index";
import BottomButon from "../../compoments/bottom-buton/index";
import {Orientation, TaskModel} from "../../const/global";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import SanJiao from "../../compoments/sanjiao/index";

interface Props {
  getTaskList: any;
  updateTask: any;
}

interface State {
  showAllTask: boolean;
  showOnlyToday: boolean;
  taskItem: { title: string, children: TaskModel[] }[];
  date: string;
  currentIndex: number;
  todayTask: TaskModel[];
}

@connect(state => state.login, {...actions})
class TaskCenter extends Component<Props, State> {

  private viewRef;
  private pageNo;
  private pageSize;
  private pageNo1;
  private pageSize1;

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }

  constructor(props) {
    super(props);
    console.log(this.viewRef);
    this.state = {
      showAllTask: true,
      showOnlyToday: true,
      taskItem: [],
      date: getToday(),
      currentIndex: 0,
      todayTask: []
    }
    this.pageNo = 1;
    this.pageSize = 1000;
    this.pageNo1 = 1;
    this.pageSize1 = 1000;
  }

  componentDidShow() {
    this.setState({taskItem: []}, () => {
      this.refresh();
    });
    Taro.eventCenter.on('refreshTaskList', () => {
      console.log('刷新任务列表');
      this.setState({taskItem: []}, () => {
        this.refresh();
      });
    });
  }

  componentWillUnmount() {
    Taro.eventCenter.off('refreshTaskList');
  }


  refresh = () => {
    this.pageNo = 1;
    this.getIngTaskList(true);
  }

  refresh1 = () => {
    this.pageNo1 = 1;
    this.getFinishedTaskList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.getIngTaskList();
  }

  loadMore1 = () => {
    this.pageNo1++;
    this.getFinishedTaskList();
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
   * @function: 获取正在进行的任务列表
   */
  getIngTaskList = (refresh?: boolean) => {
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
          this.state.taskItem.push({title: '正在进行中', children: res.records});
        }
        this.setState({taskItem: this.state.taskItem, todayTask: res.records});
      } else if (res.records && res.records.length !== 0) {
      } else {
        toast('没有任务了');
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
   * @function: 获取已完成的任务列表
   */
  getFinishedTaskList = (refresh?: boolean) => {
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
          this.state.taskItem.push({title: '已完成', children: res.records});
        }
        this.setState({taskItem: this.state.taskItem});
      } else if (res.records && res.records.length !== 0) {
      } else {
        toast('没有任务了');
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/1
   * @function: 更新任务状态
   */
  taskUpdate = (taskId, status) => {
    this.viewRef && this.viewRef.showLoading('加载中');
    this.props.updateTask({
      id: taskId,
      status,
    }).then((res) => {
      console.log('更新任务状态', res, taskId);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        this.setState({taskItem: []}, () => {
          this.refresh();
          this.refresh1();
          toast('状态更新成功');
        });
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {showAllTask, showOnlyToday, taskItem, date, currentIndex, todayTask} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'任务中心'}/>
        {/*顶部切换*/}
        <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujb, mt(10)])}>
          <View style={styleAssign([w(18), h(18), ml(20)])}/>
          <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}>
            <TouchableButton customStyle={styleAssign([styles.uac])}
                             onClick={() => {
                               this.setState({currentIndex: 0, taskItem: [],todayTask: [], date: getToday()}, () => {
                                 this.refresh();
                               });
                             }}>
              <Text style={styleAssign([fSize(16), color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>今日任务</Text>
              <View
                style={styleAssign([w(60), h(2), bgColor(currentIndex === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(10), radiusA(1)])}/>
            </TouchableButton>
            <TouchableButton customStyle={styleAssign([styles.uac, ml(23)])}
                             onClick={() => {
                               this.setState({currentIndex: 1, date: '', taskItem: [], todayTask: []}, () => {
                                 console.log(this.state.date)
                                 this.refresh();
                                 this.refresh1();
                               });
                             }}>
              <Text style={styleAssign([fSize(16), color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>全部任务</Text>
              <View
                style={styleAssign([w(60), h(2), bgColor(currentIndex === 1 ? '#E2BB7B' : commonStyles.whiteColor), mt(10), radiusA(1)])}/>
            </TouchableButton>
          </View>
          <Picker mode='date' onChange={(e) => {
            this.setState({date: e.detail.value, taskItem: []}, () => {
              this.refresh();
              this.refresh1();
            });
          }} value={date}>
            <Image style={styleAssign([w(18), h(18), mr(20)])} src={`${cloudBaseUrl}ico_date.png`}/>
          </Picker>
        </View>
        {/*任务列表*/}
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY
                    onScrollToUpper={() => {
                    }}
                    onScrollToLower={() => {
                    }}>
          {
            currentIndex === 1 ?
              <View style={styleAssign([styles.uf1])}>
                {/*正在进行*/}
                {
                  taskItem.map((value, index) => {
                    let showItem = false;

                    if (index === 0) {
                      showItem = showAllTask;
                    } else {
                      showItem = showOnlyToday;
                    }

                    return (<View key={index}>
                      <TouchableButton
                        onClick={() => {
                          if (index === 0) {
                            this.setState({showAllTask: !this.state.showAllTask});
                          } else {
                            this.setState({showOnlyToday: !this.state.showOnlyToday});
                          }
                        }}
                        customStyle={styleAssign([wRatio(100), h(40), styles.udr, styles.uac, styles.ujb, pl(20), pr(20), bgColor(commonStyles.whiteColor), mt(10)])}>
                        <View style={styleAssign([styles.uac, styles.udr, bgColor(commonStyles.whiteColor)])}>
                          <SanJiao orientation={showItem ? Orientation.down : Orientation.right}/>
                          <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(10)])}>{value.title}</Text>
                        </View>
                        <Text style={styleAssign([fSize(14), color('#787878')])}>{`(${value.children.length})`}</Text>
                      </TouchableButton>
                      {
                        showItem && <View>
                          {
                            value.children.map((itemValue, itemIndex) => {
                              return (<TaskItem key={itemIndex} itemData={itemValue}
                                                finishCallback={(id) => {
                                                  this.taskUpdate(id, 1);
                                                }
                                                }
                                                deleteCallback={(id) => {
                                                  this.taskUpdate(id, -1);
                                                }
                                                }/>);
                            })
                          }
                        </View>
                      }
                    </View>);
                  })
                }
                {
                  taskItem.length === 0 &&
                  <View style={styleAssign([styles.uac, mt(48)])}>
                    <Image style={styleAssign([w(78), h(69)])} src={require('../../assets/ico_no_data.png')}/>
                    <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂无任务</Text>
                  </View>
                }
              </View> :
              <View style={styleAssign([styles.uf1])}>
                {
                  todayTask.map((itemValue, itemIndex) => {
                    return (<TaskItem
                      isTodayTask={true}
                      key={itemIndex} itemData={itemValue} finishCallback={(id) => {
                      this.taskUpdate(id, 1);
                    }
                    } deleteCallback={(id) => {
                      this.taskUpdate(id, -1);
                    }
                    }/>);
                  })
                }
                {
                  todayTask.length === 0 &&
                  <View style={styleAssign([styles.uac, mt(48)])}>
                    <Image style={styleAssign([w(78), h(69)])} src={require('../../assets/ico_no_data.png')}/>
                    <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂无任务</Text>
                  </View>
                }
              </View>
          }
        </ScrollView>
        {/*新建任务*/}
        <BottomButon title={'新建任务'} onClick={() => {
          Taro.navigateTo({
            url: `/pages/mine/add_task`
          });
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default TaskCenter;
