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
import {Image, Picker, Text, Textarea, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";
import {cloudBaseUrl} from "../../api/httpurl";

interface Props {
  addTask: any;
}

interface State {
  theme: string;
  date: string;
  remark: string;
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
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
   * @function: 添加任务
   */
  addTask = () => {
    let {theme, date, remark} = this.state;

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

    this.viewRef && this.viewRef.showLoading();
    this.props.addTask(paramas).then((res) => {
      console.log(res);
      this.viewRef && this.viewRef.hideLoading();
      toast('任务添加成功');
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {theme, date, remark} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'任务中心'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor), styles.uac])}>
          <Textarea style={styleAssign([wRatio(95), h(128), pa(20), bgColor(commonStyles.whiteColor),
            mt(10)])}
                    value={theme} placeholder={'例如：电话回访客户'}
                    onInput={(e) => {
                      this.setState({theme: e.detail.value});
                    }}/>
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
            <Image style={styleAssign([w(68), h(68), ml(20), mt(14)])} src={`${cloudBaseUrl}ico_add_task.png`}/>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(10)])}/>
          </View>
          <Textarea style={styleAssign([wRatio(95), h(128), pa(20), bgColor(commonStyles.whiteColor)])}
                    value={remark} placeholder={'备注'}
                    onInput={(e) => {
                      this.setState({remark: e.detail.value});
                    }}/>
        </View>
        {/*新建任务*/}
        <BottomButon title={'保存'} onClick={() => {
          this.addTask();
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default AddTask;
