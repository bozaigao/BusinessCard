/**
 * @filename mingpianma.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/7
 * @Description: 名片码
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../utils/datatool";
import {bgColor, commonStyles} from "../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../actions/login';
import TopHeader from "../compoments/top-header";

interface Props {
  suggestionAdd: any;
}

interface State {
}

@connect(state => state.login, {...actions})
class Mingpianma extends Component<Props, State> {

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
      content: ''
    }
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'名片码'}/>
      </CustomSafeAreaView>
    );
  }
}

export default Mingpianma;
