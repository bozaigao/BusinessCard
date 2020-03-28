/**
 * @filename task_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/28
 * @Description: 任务详情
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {debounce, styleAssign, toast, transformTime} from "../../utils/datatool";
import {
  absR,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mr,
  mt, op,
  pa,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/task_center';
import TopHeader from "../../compoments/top-header/index";
import {Image, Text, Textarea, View} from "@tarojs/components";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import {CustomerModel} from "../../const/global";
import DateTimePicker from "../../compoments/date-time-picker/index";
import './add_task.scss';
import TouchableButton from "../../compoments/touchable-button";
import DeleteNoticeModal from "../../compoments/delete-notice";

interface Props {
  updateTask: any;
  updateTask: any;
  getTask: any;
}

interface State {
  theme: string;
  date: string;
  remark: string;
  chooseCustomer: CustomerModel[];
  showDeleteNotice: boolean;
  editStyle: string;
}

@connect(state => state.login, {...actions})
class TaskDetail extends Component<Props, State> {

  private viewRef;
  private taskId;


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
    this.taskId = this.$router.params.taskId;
    this.state = {
      theme: '',
      date: '',
      remark: '',
      chooseCustomer: [],
      showDeleteNotice: false,
      editStyle: 'flex'
    }
  }

  componentDidMount() {
    this.getTask();
    Taro.eventCenter.on('chooseCustomer', (chooseCustomer) => {
      console.log('用户列表',chooseCustomer);
      this.setState({chooseCustomer:this.state.chooseCustomer.concat(chooseCustomer)});
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
   * @function: 更新任务
   */
  updateTask = () => {
    let {theme, date, remark, chooseCustomer} = this.state;

    if (theme.length === 0) {
      toast('主题不能为空');
      return;
    }
    if (date.length === 0) {
      toast('日期不能为空');
      return;
    }
    let myyear = new Date().getFullYear();
    let mymonth = new Date().getMonth() + 1;
    let myweekday = new Date().getDate();
    let dateTime = new Date(date).getTime();

    if (mymonth < 10) {
      //@ts-ignore
      mymonth = '0' + mymonth;
    }
    if (myweekday < 10) {
      //@ts-ignore
      myweekday = '0' + myweekday;
    }

    let currentTime = new Date(`${myyear}-${mymonth}-${myweekday}`).getTime();

    if (dateTime < currentTime) {
      toast('不能选择之前的日期');
      return;
    }
    let paramas = {
      id: this.taskId,
      theme,
      date,
      remark
    };

    if (chooseCustomer.length !== 0) {
      let userIds: number[] = [];

      for (let i = 0; i < chooseCustomer.length; i++) {
        userIds.push(chooseCustomer[i].id);
      }
      Object.assign(paramas, {customerIds: JSON.stringify(userIds)});
    }

    this.viewRef && this.viewRef.showLoading();
    this.props.updateTask(paramas).then((res) => {
      console.log(res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('修改成功');
        debounce(1000, () => {
          Taro.navigateBack();
        });
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/28
   * @function: 获取任务详情
   */
  getTask = () => {
    this.viewRef && this.viewRef.showLoading('加载中');
    this.props.getTask({
      id: this.taskId,
    }).then((res) => {
      console.log('获取任务详情', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        this.setState({
          theme: res.theme,
          date: transformTime(res.date),
          remark: res.remark,
          chooseCustomer: res.userList
        });
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/28
   * @function: 更新任务状态
   */
  deleteTask = () => {
    this.viewRef && this.viewRef.showLoading('加载中');
    this.props.updateTask({
      id: this.taskId,
      status: -1,
    }).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('任务删除成功');
        debounce(1000, () => {
          Taro.navigateBack();
        })
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {theme, date, remark, chooseCustomer, showDeleteNotice, editStyle} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'任务详情'}/>
        <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
        <View
          style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor), h(40), pl(20), pr(20)])}>
          <Text style={styleAssign([fSize(14), color('#727272')])}>主题</Text>
          <View style={styleAssign([styles.udr, styles.uac])}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>{theme.length}</Text>
            <Text style={styleAssign([fSize(14), color('#979797')])}>/50</Text>
          </View>
        </View>
        <Textarea style={styleAssign([wRatio(90), h(80), pl(20), pr(20), bgColor(commonStyles.whiteColor),])}
                  value={theme} placeholder={'例如：电话回访客户'}
                  onInput={(e) => {
                    this.setState({theme: e.detail.value});
                  }} maxlength={50}/>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>

        <DateTimePicker onOk={({current}) => {
          console.log('选择时间', current);
          this.setState({date: current});
        }} wrap-class="my-class" placeholder={date}/>
        <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujb, pl(20), pr(20), mt(15)])}>
            <Text style={styleAssign([color('#787878'), fSize(14)])}>关联客户</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Text style={styleAssign([color('#727272'), fSize(14)])}>{chooseCustomer.length}</Text>
              <Text
                style={styleAssign([color('#979797')])}>/100</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), styles.uWrap, styles.udr, styles.uac, pl(10), pr(10)])}>
            {
              chooseCustomer.map((value, index) => {
                return <View style={styleAssign([w(78), h(78), styles.uac, styles.ujc, ml(10), mt(10)])}
                             key={index}>
                  <Image style={styleAssign([w(73), h(73), radiusA(4)])}
                         src={value.avatar ? value.avatar : `${cloudBaseUrl}ico_default.png`}/>
                  <Image key={index} style={styleAssign([w(20), h(20), styles.upa, absR(-5), absT(-5)])}
                         src={`${cloudBaseUrl}ico_close.png`}
                         onClick={() => {
                           this.state.chooseCustomer.splice(index, 1);
                           this.setState({chooseCustomer: this.state.chooseCustomer});
                         }}/>
                </View>
              })
            }
            {
              chooseCustomer.length !== 100 &&
              <Image style={styleAssign([w(68), h(68), ml(10), mt(10)])}
                     src={`${cloudBaseUrl}ico_add_task.png`}
                     onClick={() => {
                       Taro.navigateTo({
                         url: `/pages/mine/choose_customer`
                       });
                     }}/>
            }
          </View>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(10)])}/>
        </View>
        <View
          style={styleAssign([wRatio(100), styles.uas, styles.udr, styles.ujb, bgColor(commonStyles.whiteColor), {display: editStyle}])}>
            <Textarea
              style={styleAssign([wRatio(70), h(128), pa(20), bgColor(commonStyles.whiteColor)])}
              value={remark} placeholder={'备注'}
              onInput={(e) => {
                this.setState({remark: e.detail.value});
              }} maxlength={200}/>
          <View style={styleAssign([styles.udr, styles.uac, mr(20), mt(18), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>{remark.length}</Text>
            <Text style={styleAssign([fSize(14), color('#979797')])}>/200</Text>
          </View>
        </View>
        <View style={styleAssign([styles.uf1, styles.uac, styles.uje])}>
          <View style={styleAssign([wRatio(100), h(1), bgColor('rgb(184,186,190)'), op(0.5)])}/>
          <View style={styleAssign([wRatio(100), h(68), bgColor(commonStyles.whiteColor),
            styles.uac, styles.ujc])}>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <TouchableButton customStyle={styleAssign([w(162), h(44), bo(1), bdColor(commonStyles.colorTheme),
                {borderStyle: 'solid'}, radiusA(2), styles.uac, styles.ujc])}
                               onClick={() => {
                                 this.setState({editStyle: 'none', showDeleteNotice: true});
                               }}>
                <Text style={styleAssign([fSize(16), color('#343434')])}>删除任务</Text>
              </TouchableButton>
              <TouchableButton customStyle={styleAssign([ml(10), w(162), h(44), bgColor(commonStyles.colorTheme),
                radiusA(2), styles.uac, styles.ujc])}
                               onClick={() => {
                                 this.updateTask();
                               }}>
                <Text style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>保存编辑</Text>
              </TouchableButton>
            </View>
          </View>
        </View>
        {
          showDeleteNotice && <DeleteNoticeModal
            title={'删除提醒'}
            subTitle={'删除后，任务将无法恢复，确定删除？'}
            cancelCallback={() => {
              console.log('点击了')
              this.setState({editStyle: 'flex', showDeleteNotice: false});
            }
            } confirmCallback={() => {
            this.setState({editStyle: 'flex', showDeleteNotice: false}, () => {
              this.deleteTask();
            });
          }
          }/>
        }
      </CustomSafeAreaView>
    );
  }
}

export default TaskDetail;
