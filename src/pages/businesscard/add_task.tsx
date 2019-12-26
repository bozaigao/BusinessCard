/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 新建任务
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
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
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import BottomButon from "../../compoments/bottom-buton";
import {Image, Text, Textarea, View} from "@tarojs/components";

interface Props {
}

interface State {
}

@connect(state => state.home, {...actions})
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
      showAllTask: true,
      showOnlyToday: true,
    }
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'任务中心'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor), styles.uac])}>
          <Textarea style={styleAssign([wRatio(95), h(128), pa(20), bgColor(commonStyles.whiteColor),
            mt(10)])}
                    value={''} placeholder={'例如：电话回访客户'}/>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View
            style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, h(51), pl(20), pr(20), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(14), color('#787878')])}>日期及时间</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Text style={styleAssign([fSize(14), color('#787878')])}>选择</Text>
              <Image style={styleAssign([w(7), h(13), ml(5)])} src={require('../../assets/ico_next.png')}/>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([color('#787878'), fSize(14), ml(20), mt(15)])}>关联客户</Text>
            <Image style={styleAssign([w(68), h(68), ml(20), mt(14)])} src={require('../../assets/ico_add_task.png')}/>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(10)])}/>
          </View>
          <Textarea style={styleAssign([wRatio(95), h(128), pa(20), bgColor(commonStyles.whiteColor)])}
                    value={''} placeholder={'备注'}/>
        </View>
        {/*新建任务*/}
        <BottomButon title={'保存'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default AddTask;
