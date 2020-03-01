/**
 * @filename radar_gongneng.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 雷达功能
*/
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, mt, pl, pr, w, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import HelpNavigationItem from "../pagecomponent/help-navigation-item/index";
import {cloudBaseUrl} from "../../api/httpurl";

interface Props {
}

interface State {
}

@connect(state => state.login, {...actions})
class RadarGongNeng extends Component<Props, State> {

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
        <HelpNavigationItem/>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.whiteColor)])}
          scrollY>
          <View style={styleAssign([styles.uf1, pl(20), pr(20)])}>
            <Text
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>“雷达”功能可实时捕获所有访客及客户的访问行为轨迹，即访客何时查看过你的名片，在名片哪个部分停留了多长时间，分别进行了哪些操作，均有实时记录，可以通过记录了解访客的需求和兴趣点，强大的客户数据分析，帮你提高访客转化为客户的概率，也有利于你更好地跟进客户，不错过任何一个商机。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}ico_radar_gongneng.png`}/>
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default RadarGongNeng;
