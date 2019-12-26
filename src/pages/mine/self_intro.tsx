/**
 * @filename self_intro.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 自我描述
 */
import {Component, Config} from '@tarojs/taro'
import {Text, Textarea, View} from '@tarojs/components'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, mt, pa, wRatio,ml} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class SelfIntro extends Component<Props, State> {

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
        <TopHeader title={'自我描述'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor)])}>
         <Textarea
           style={styleAssign([wRatio(80), {marginLeft: '5%'}, h(160), pa(20), bgColor(commonStyles.pageDefaultBackgroundColor),
             mt(20), fSize(14)])}
           value={''} placeholder={'Hi，您好，我是…公司的…,我在…行业已有…年，主要负责…工作，有着丰富的…经验以及非常专业的相关知识，如果您有意向与我司合作，请直接联系我。'}/>
          <Text style={styleAssign([fSize(16), color('#313137'), ml(20), mt(20)])}>查看模板</Text>
        </View>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default SelfIntro;
