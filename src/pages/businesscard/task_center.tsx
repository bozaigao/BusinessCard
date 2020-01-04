/**
 * @filename task_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务中心
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {debounce, scaleSize, styleAssign, toast} from "../../utils/datatool";
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
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import TaskItem from "./task-item";
import BottomButon from "../../compoments/bottom-buton";
import {TaskModel} from "../../const/global";

interface Props {
  getTaskList: any;
}

interface State {
  showAllTask: boolean;
  showOnlyToday: boolean;
  finishedTaskList: TaskModel[];
  ingTaskList: TaskModel[];
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
      finishedTaskList: [],
      ingTaskList: []
    }
    this.pageNo = 1;
    this.pageSize = 1000;
    this.pageNo1 = 1;
    this.pageSize1 = 1000;
  }

  componentDidMount() {
    this.refresh();
    this.refresh1();
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
      status: 0
    }).then((res) => {
      console.log('获取正在进行的任务列表', res);
      this.viewRef && this.viewRef.hideLoading();
      if (refresh) {
        Taro.stopPullDownRefresh();
        this.setState({ingTaskList: res.records});
      } else if (res.records && res.records.length !== 0) {
        this.setState({ingTaskList: this.state.ingTaskList.concat(res.records)});
      } else {
        toast('没有商品了');
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
      status: 1
    }).then((res) => {
      console.log('获取已完成的任务列表', res);
      this.viewRef && this.viewRef.hideLoading();
      if (refresh) {
        Taro.stopPullDownRefresh();
        this.setState({finishedTaskList: res.records});
      } else if (res.records && res.records.length !== 0) {
        this.setState({finishedTaskList: this.state.finishedTaskList.concat(res.records)});
      } else {
        toast('没有商品了');
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {showAllTask, showOnlyToday, finishedTaskList, ingTaskList} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'任务中心'}/>
        {/*顶部切换*/}
        <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujb, mt(10)])}>
          <View style={styleAssign([w(18), h(18), ml(20)])}/>
          <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}>
            <View style={styleAssign([styles.uac])}>
              <Text style={styleAssign([fSize(16), color('#E2BB7B')])}>全部任务</Text>
              <View style={styleAssign([w(25), h(2), bgColor('#E2BB7B'), mt(10), radiusA(1)])}/>
            </View>
            <View style={styleAssign([styles.uac, ml(23)])}>
              <Text style={styleAssign([fSize(16)])}>今日任务</Text>
              <View style={styleAssign([w(25), h(2), bgColor(commonStyles.whiteColor), mt(10), radiusA(1)])}/>
            </View>
          </View>
          <Image style={styleAssign([w(18), h(18), mr(20)])} src={require('../../assets/ico_date.png')}/>
        </View>
        {/*任务列表*/}
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY
                    onScrollToUpper={() => {
                      // Taro.startPullDownRefresh();
                      // debounce(() => {
                      //   this.refresh();
                      // }, 400);
                    }}
                    onScrollToLower={() => {
                      // this.loadMore();
                    }}>
          {/*正在进行*/}
          {
            [{title: '正在进行', children: ingTaskList}, {title: '已完成', children: finishedTaskList}].map((value, index) => {
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
                    <View style={{
                      width: 0,
                      height: 0,
                      borderTopWidth: scaleSize(8),
                      borderTopColor: showItem ? '#787878' : 'transparent',
                      borderRightWidth: showItem ? scaleSize(8) : 0,
                      borderRightColor: showItem ? 'transparent' : '#787878',
                      borderLeftWidth: scaleSize(8),
                      borderLeftColor: showItem ? 'transparent' : '#787878',
                      borderBottomWidth: showItem ? 0 : scaleSize(8),
                      borderBottomColor: 'transparent',
                      borderStyle: 'solid',
                    }}/>
                    <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(10)])}>{value.title}</Text>
                  </View>
                  <Text style={styleAssign([fSize(14), color('#787878')])}>{`(${value.children.length})`}</Text>
                </TouchableButton>
                {
                  showItem && <View>
                    {
                      value.children.map((itemValue, itemIndex) => {
                        return (<TaskItem key={itemIndex} itemData={itemValue}/>);
                      })
                    }
                  </View>
                }
              </View>);
            })
          }
        </ScrollView>
        {/*新建任务*/}
        <BottomButon title={'新建任务'} onClick={() => {
          Taro.navigateTo({
            url: `/pages/businesscard/add_task`
          });
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default TaskCenter;
