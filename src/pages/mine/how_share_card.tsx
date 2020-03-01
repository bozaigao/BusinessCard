/**
 * @filename how_share_card.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 怎么分享名片
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
class HowShareCard extends Component<Props, State> {

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
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>打开极致推，进入名片首页，点击“分享名片”，选择“微信好友”，即可将自己的名片分享到微信聊天界面中。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_share_card_1.png`}/>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_share_card_2.png`}/>
            </View>
          </View>
          <View style={styleAssign([styles.uf1, pl(20), pr(20)])}>
            <Text style={styleAssign([color('#343434'), fSize(16), mt(20)])}>方法二：</Text>
            <Text
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>打开极致推，进入名片首页，点击“分享名片”，选择“名片海报”，即可生成一张自己的名片海报，点击“保存名片海报后分享”，即可将名片海报分享到微信或朋友圈。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_share_card_3.png`}/>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_share_card_4.png`}/>
            </View>
          </View>
          <View style={styleAssign([styles.uf1, pl(20), pr(20)])}>
            <Text style={styleAssign([color('#343434'), fSize(16), mt(20)])}>方法三：</Text>
            <Text
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>打开极致推，进入名片首页，点击名片右下方“名片码”，即可让客户直接通过微信扫一扫进入你的名片。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_share_card_5.png`}/>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}how_share_card_6.png`}/>
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default HowShareCard;
