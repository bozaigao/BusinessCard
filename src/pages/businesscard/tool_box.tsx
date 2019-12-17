/**
 * @filename tool_box.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 工具箱
*/
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, radiusA, w, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/home';
import TopHeader from "../../compoments/top-header";
import {Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class ToolBox extends Component<Props, State> {

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

    }
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'任务中心'}/>

        {/*新建任务*/}
        <View style={styleAssign([wRatio(100), h(64), styles.uac, styles.ujc])}>
          <TouchableButton customStyle={styleAssign([w(335), h(48), radiusA(2), bgColor(commonStyles.colorTheme),
            styles.uac, styles.ujc])}>
            <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>确定</Text>
          </TouchableButton>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default ToolBox;
