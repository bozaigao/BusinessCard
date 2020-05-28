/**
 * @filename about_us.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 关于我们
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, commonStyles, h, default as styles, wRatio, w, fSize, color, mt, pl, pr} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, Text, View} from "@tarojs/components";

interface Props {
}

interface State {
}

@connect(state => state.login, {...actions})
class AboutUs extends Component<Props, State> {

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
        <TopHeader title={'关于极易推'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([wRatio(100), h(186), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.uac])}>
              <Image style={styleAssign([w(61), h(61)])} src={require('../../assets/ico_logo.png')}/>
              <Text style={styleAssign([fSize(18), color('#0C0C0C'), mt(3)])}>极易推</Text>
              <Text style={styleAssign([fSize(14), color('#979797'), mt(6)])}>V1.0.0</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(1), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([wRatio(80), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>
          <View
            style={styleAssign([wRatio(100), h(120), styles.uac, styles.ujc, mt(46), pl(20), pr(20)])}>
            <Text style={styleAssign([fSize(14), color('#727272'), mt(3)])}>极易推，一款基于社交做成交，针对个体使用的智能名片小程序，致力于提升每一位用户的商业价值。 \n\n极易推是集创建、收发、管理名片为一体的高效率工具，极易推的存在让你的名片不仅为你代言，更为你的产品和服务代言，真正做到一键分享，轻松获客。</Text>
          </View>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc])}>
            <Text style={styleAssign([fSize(12), color('#D2D2D2'), mt(147)])}>©2020四川极致信息技术有限公司</Text>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default AboutUs;
