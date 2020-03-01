/**
 * @filename get_renmai.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 获取人脉
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
class GetRenmai extends Component<Props, State> {

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
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>打开极致推，进入名片首页，在人脉机遇版块点击“立即选择”，进入“选择人脉”页面，选择好了之后，后台会通过用户的人脉选择内容为用户推送相关人脉。使人脉推送更精准有效。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}ico_get_renmai_1.png`}/>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}ico_get_renmai_2.png`}/>
            </View>
          </View>
          <View style={styleAssign([styles.uf1, pl(20), pr(20)])}>
            <Text style={styleAssign([color('#343434'), fSize(16), mt(20)])}>方法二：</Text>
            <Text
              style={styleAssign([color('#727272'), fSize(14), mt(13)])}>打开极致推，进入名片首页，在人脉机遇版块除了推荐一栏需要用户选择期望人脉以外，其他栏内容则是通过用户完善名片信息之后，后台通过用户名片信息进行人脉匹配推送。</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, mt(17)])}>
              <Image style={styleAssign([w(155), h(276)])} src={`${cloudBaseUrl}ico_get_renmai_3.png`}/>
            </View>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default GetRenmai;
