/**
 * @filename how_perform_card.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 怎么完善名片
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
class HowPerformCard extends Component<Props, State> {

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
            <Text style={styleAssign([color('#343434'), fSize(16), mt(20)])}>方法一：</Text>
            <Text
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>打开极致推，进入名片首页，点击“完善名片”，即可完善名片基本信息、个人简介和企业信息等。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_perform_card_1.png`}/>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_perform_card_2.png`}/>
            </View>
          </View>
          <View style={styleAssign([styles.uf1, pl(20), pr(20)])}>
            <Text style={styleAssign([color('#343434'), fSize(16), mt(20)])}>方法二：</Text>
            <Text
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>打开极致推，进入“我的”页面，点击“完善名片”入口，即可完善名片基本信息、个人简介和企业信息等。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_perform_card_3.png`}/>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_perform_card_4.png`}/>
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default HowPerformCard;
