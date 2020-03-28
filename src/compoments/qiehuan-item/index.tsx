/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/16
 * @Description: 名片切换item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import styles, {
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  ml,
  mt,
  pa,
  padding,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import TouchableButton from "../touchable-button";
import {cloudBaseUrl} from "../../api/httpurl";


interface Props {
  // navigation_bar: NavigationBar;
}

interface State {
}

export default class QieHanItem extends PureComponent<Props, State> {

  render() {

    return (
      <TouchableButton
        customStyle={styleAssign([styles.uac, styles.udr, w(335), h(128), radiusA(4), bgColor(commonStyles.whiteColor),
          padding([20, 16, 20, 16])])}>
        <Image style={styleAssign([w(88), h(88)])}
               src={`${cloudBaseUrl}ico_person.png`}/>
        <View style={styleAssign([wRatio(70), ml(12)])}>
          <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujb])}>
            <Text style={styleAssign([fSize(18), color('#343434')])}>王嘉怡</Text>
            <TouchableButton
              customStyle={styleAssign([w(72), h(28), radiusA(2), styles.uac, styles.ujc, bgColor(commonStyles.colorTheme)])}>
              <Text style={styleAssign([fSize(10), color(commonStyles.whiteColor)])}>正在使用</Text>
            </TouchableButton>
          </View>
          <View style={styleAssign([w(60), h(22), styles.uac, styles.ujc, pa(5), bgColor('#E2E2E2'), mt(19),
            radiusA(2)])}>
            <Text style={styleAssign([fSize(12)])}>销售经理</Text>
          </View>
          <Text style={styleAssign([fSize(10), color('#343434'), mt(10)])}>美克美家家居集团股份有限公司</Text>
        </View>
      </TouchableButton>
    );
  }
}
