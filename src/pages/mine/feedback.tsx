/**
 * @filename feedback.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 用户反馈界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, commonStyles, default as styles, h, mt, pa, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/home';
import TopHeader from "../../compoments/top-header";
import {Textarea, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class Feedback extends Component<Props, State> {

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
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'投诉与建议'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor)])}>
         <Textarea
           style={styleAssign([wRatio(80), {marginLeft: '5%'}, h(160), pa(20), bgColor(commonStyles.pageDefaultBackgroundColor),
             mt(20)])}
           value={''} placeholder={'请输入你的反馈意见'}/>
        </View>
        {/*提交*/}
        <BottomButon title={'提交'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default Feedback;
