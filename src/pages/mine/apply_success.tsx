/**
 * @filename apply_success.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 申请成功后的中间页
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, mt, w, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as shopActions from '../../actions/shop';
import * as loginActions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Image, Text, View} from "@tarojs/components";

interface Props {

}

interface State {
}

@connect(state => state.login, {...shopActions, ...loginActions})
class ApplySuccess extends Component<Props, State> {

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
  }



  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'提交成功'}/>
        <View style={styleAssign([styles.uac, wRatio(100), mt(84)])}>
          <Image style={styleAssign([w(176), h(129)])} src={require('../../assets/apply_success.png')}/>
          <Text style={styleAssign([fSize(20), color('#E2BB7B'), mt(29)])}>
            提交成功!
          </Text>
          <Text style={styleAssign([fSize(16), color('#979797'), mt(14)])}>
            您的信息已提交成功，我们的客服将在12
          </Text>
          <Text style={styleAssign([fSize(16), color('#979797')])}>
            小时内与您联系，请保持您的电话畅通。
          </Text>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default ApplySuccess;
