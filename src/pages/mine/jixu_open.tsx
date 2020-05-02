/**
 * @filename jixu_open.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @Description: 继续开通
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
import CompanyCard from "../../compoments/company_card/index";

interface Props {

}

interface State {
}

@connect(state => state.login, {...shopActions, ...loginActions})
class JixuOpen extends Component<Props, State> {

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
        <TopHeader title={'继续开通'}/>
        <View style={styleAssign([styles.uac, wRatio(100), mt(84)])}>
          <Image style={styleAssign([w(80), h(72)])} src={require('../../assets/ico_my_shop.png')}/>
          <Text style={styleAssign([fSize(15), color('#343434'), mt(33)])}>
            您的店铺即将到期，继续开通需联系客服
          </Text>
          <View style={styleAssign([wRatio(100), {paddingLeft: '5%'},mt(20)])}>
            <CompanyCard/>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default JixuOpen;
