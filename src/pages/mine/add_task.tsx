/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 新建任务
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign, toast} from "../../utils/datatool";
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
  pa,
  pl,
  pr,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/task_center';
import TopHeader from "../../compoments/top-header/index";
import BottomButon from "../../compoments/bottom-buton/index";
import {Image, Picker, ScrollView, Text, Textarea, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import {CustomerModel} from "../../const/global";
import GuanLianCustomer from "../sub_pagecomponent/guanlian-customer";

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
  config: Config = {
    disableScroll: true
  }

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

  componentDidMount() {
    Taro.eventCenter.on('chooseCustomer', (chooseCustomer) => {
      this.setState({chooseCustomer});
    })
  }

  componentWillUnmount() {
    Taro.eventCenter.off('chooseCustomer');
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
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
    if (remark.length === 0) {
      toast('备注不能为空');
      return;
    }

    let paramas = {
      theme,
      date,
      userIds: JSON.stringify([1]),
      remark
    };

    if (chooseCustomer.length !== 0) {
      let userIds: number[] = [];

      for (let i = 0; i < chooseCustomer.length; i++) {
        userIds.push(chooseCustomer[i].id);
      }
      Object.assign(paramas, {userIds: JSON.stringify(userIds)});
    }

    this.viewRef && this.viewRef.showLoading();
    this.props.addTask(paramas).then((res) => {
      console.log(res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('任务添加成功');
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
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.whiteColor)])}
          scrollY>
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View
            style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor), h(40), pl(20), pr(20)])}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>主题</Text>
            <View style={styleAssign([styles.udr, styles.uac])}>
              <Text style={styleAssign([fSize(14), color('#727272')])}>{theme.length}</Text>
              <Text style={styleAssign([fSize(14), color('#979797')])}>/50</Text>
            </View>
          </View>
          <Textarea style={styleAssign([wRatio(90), h(128), pl(20), pr(20), bgColor(commonStyles.whiteColor),])}
                    value={theme} placeholder={'例如：电话回访客户'}
                    onInput={(e) => {
                      this.setState({theme: e.detail.value});
                    }} maxlength={50}/>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <Picker mode='date' onChange={(e) => {
            this.setState({date: e.detail.value});
          }} value={date} style={styleAssign([wRatio(100)])}>
            <TouchableButton
              customStyle={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, h(51), pl(20), pr(20), bgColor(commonStyles.whiteColor)])}
              onClick={() => {

              }
              }>
              <Text style={styleAssign([fSize(14), color('#787878')])}>日期及时间</Text>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([fSize(14), color('#787878')])}>{date ? date : '选择'}</Text>
                <Image style={styleAssign([w(7), h(13), ml(5)])} src={`${cloudBaseUrl}ico_next.png`}/>
              </View>
            </TouchableButton>
          </Picker>
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([color('#787878'), fSize(14), ml(20), mt(15)])}>关联客户</Text>
            {
              chooseCustomer.length === 0 &&
              <Image style={styleAssign([w(68), h(68), ml(20), mt(14)])} src={`${cloudBaseUrl}ico_add_task.png`}
                     onClick={() => {
                       Taro.navigateTo({
                         url: `/pages/mine/choose_customer`
                       });
                     }}/>
            }
            {
              chooseCustomer.map((value, index) => {
                return <GuanLianCustomer key={index} customer={value}/>;
              })
            }
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
        <BottomButon title={'保存'} onClick={() => {
          this.addTask();
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default AddTask;
