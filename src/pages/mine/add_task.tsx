/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 新建任务
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {debounce, styleAssign, toast} from "../../utils/datatool";
import {
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mr,
  mt,
  pa,
  pl,
  pr,
  radiusA,
  w,
  wRatio,
  pt,
  hRatio,
  screenHeight
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/task_center';
import TopHeader from "../../compoments/top-header/index";
import BottomButon from "../../compoments/bottom-buton/index";
import {Image, Text, Textarea, View, ScrollView} from "@tarojs/components";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import {CustomerModel} from "../../const/global";
import DateTimePicker from "../../compoments/date-time-picker/index";
import './add_task.scss';
import SingleLineText from "../../compoments/singleline-text";

interface Props {
  addTask: any;
}

interface State {
  theme: string;
  date: string;
  remark: string;
  chooseCustomer: CustomerModel[];
}

@connect(state => state.login, {...actions})
class AddTask extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {}

  constructor(props) {
    super(props);
    console.log(this.viewRef);
    this.state = {
      theme: '',
      date: '',
      remark: '',
      chooseCustomer: []
    }
  }

  componentDidShow() {
    Taro.eventCenter.on('chooseCustomer', (chooseCustomer) => {
      this.setState({chooseCustomer:this.state.chooseCustomer.concat(chooseCustomer)});
    });
  }

  componentWillUnmount() {
    Taro.eventCenter.off('chooseCustomer');
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 添加任务
   */
  addTask = () => {
    let {theme, date, remark, chooseCustomer} = this.state;

    if (theme.length === 0) {
      toast('主题不能为空');
      return;
    }
    if (date.length === 0) {
      toast('日期不能为空');
      return;
    }
    if (chooseCustomer.length === 0) {
      toast('请选择关联客户');
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
      toast('不能选择之前的日期');
      return;
    }
    let paramas = {
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
    this.props.addTask(paramas).then((res) => {
      console.log(res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('任务添加成功');
        debounce(1000, () => {
          Taro.navigateBack();
        });
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {theme, date, remark, chooseCustomer} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'新建任务'}/>
        <ScrollView style={styleAssign([wRatio(100), h(screenHeight())])} scrollY>
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View
            style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor), h(40), pl(20), pr(20)])}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>主题</Text>
            <View style={styleAssign([styles.udr, styles.uac])}>
              <Text style={styleAssign([fSize(14), color('#727272')])}>{theme.length}</Text>
              <Text style={styleAssign([fSize(14), color('#979797')])}>/50</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(90), h(80), pl(20), pr(20), pt(10), bgColor(commonStyles.whiteColor),])}>
            <Textarea style={styleAssign([wRatio(100), h(80), bgColor(commonStyles.whiteColor),])}
              value={theme} placeholder={'例如：电话回访客户'}
              onInput={(e) => {
                this.setState({theme: e.detail.value});
              }} maxlength={50}/>
          </View>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <DateTimePicker onOk={({current}) => {
            console.log('选择时间', current);
            this.setState({date: current});
          }} wrap-class="my-class"/>
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
                  return <View style={styleAssign([w(78), h(98), styles.uac, ml(10), mt(10)])}
                               key={index}>
                    <Image style={styleAssign([w(73), h(73), radiusA(4)])}
                           src={value.avatar ? value.avatar : `${cloudBaseUrl}ico_default.png`}/>
                    <SingleLineText text={value.name} style={styleAssign([fSize(14), color('#343434'), mt(5)])}/>
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
                         let chooseIds: any = [];
                         for (let i = 0; i < chooseCustomer.length; i++) {
                           chooseIds.push(chooseCustomer[i].id);
                         }
                         Taro.navigateTo({
                           url: `/pages/mine/choose_customer?chooseIds=${JSON.stringify(chooseIds)}`
                         });
                       }}/>
              }
            </View>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(10)])}/>
          </View>
          <View
            style={styleAssign([wRatio(100), styles.uas, styles.udr, styles.ujb, bgColor(commonStyles.whiteColor)])}>
              <Textarea style={styleAssign([wRatio(70), h(128), pa(20), bgColor(commonStyles.whiteColor)])}
                        value={remark} placeholder={'备注'}
                        onInput={(e) => {
                          this.setState({remark: e.detail.value});
                        }} maxlength={200}/>
            <View style={styleAssign([styles.udr, styles.uac, mr(20), mt(18), bgColor(commonStyles.whiteColor)])}>
              <Text style={styleAssign([fSize(14), color('#727272')])}>{remark.length}</Text>
              <Text style={styleAssign([fSize(14), color('#979797')])}>/200</Text>
            </View>
          </View>
        </ScrollView>
        {/*新建任务*/}
        <View style={styleAssign([styles.uf1, styles.uje])}>
          <BottomButon title={'保存'} onClick={() => {
            this.addTask();
          }}/>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default AddTask;
