/**
 * @filename introduce.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 小程序介绍
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, fSize, ml, mr, mt} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import {Text} from "@tarojs/components";
import HelpNavigationItem from "./component/help-navigation-item/index";

interface Props {
}

interface State {
}

@connect(state => state.login, {...actions})
class Introduce extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    
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
      <HelpNavigationItem/>
        <Text style={styleAssign([ml(20), mr(20), mt(15), color('#727272'), fSize(14)])}>“极易推”作为一款智能名片小程序，不满足于作为简单的名片管理工具，更立志于提升每一位用户的商业价值，在集创建、收发、管理名片为一体的基础上，开发了线上商城以及分销模式，让用户不仅能销售自己的产品和服务，还能代理“极易推”小程序，为自己创造商机。\n
          在管理名片中，“极易推”雷达通过实时抓取访客浏览行为轨迹，即访客来源、浏览名片具体内容、次数、停留时长等关键信息，进行精准的数据分析，为用户提供详细记录，从而协助用户更好地判断访客或客户意向，有利于用户更好地跟进每一位客户，促进交易，成功解决了销售行业交易难的问题。\n
          在人脉机遇中，“极易推”不仅可以根据用户所完善的名片信息为每一位用户推送匹配人脉，而且可以通过让用户自己选择期望人脉类型，从而为用户推送更精准的人脉，成功解决了销售行业获客难得问题。</Text>
      </CustomSafeAreaView>
    );
  }
}

export default Introduce;
