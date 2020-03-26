/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 名片夹item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mr, mt, radiusA, w, wRatio} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";
import {cloudBaseUrl} from "../../../api/httpurl";


interface Props {
  // navigation_bar: NavigationBar;
}

interface State {
}

export default class MingPianJiaItem extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100), h(106), styles.uac, mt(10)])}>
        <View style={styleAssign([w(335), h(106), bgColor(commonStyles.whiteColor), radiusA(4),
          styles.uac, styles.udr])}>
          <Image style={styleAssign([w(66), h(66), radiusA(33), ml(16)])}
                 src={`${cloudBaseUrl}ico_default.png`}/>
          <View style={styleAssign([styles.uf1, styles.udr, styles.uac, styles.ujb])}>
            <View style={styleAssign([ml(12)])}>
              <Text style={styleAssign([color('#343434'), fSize(16)])}>卢志刚</Text>
              <Text style={styleAssign([color('#979797'), fSize(12), mt(10)])}>技术顾问</Text>
              <Text style={styleAssign([color('#979797'), fSize(12)])}>南方科技有限公司</Text>
            </View>
            <View style={styleAssign([mr(16)])}>
              <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, styles.uje])}>
                <View style={styleAssign([w(6), h(6), radiusA(3), bgColor(commonStyles.colorTheme)])}/>
                <View style={styleAssign([ml(5), w(6), h(6), radiusA(3), bgColor(commonStyles.colorTheme)])}/>
                <View style={styleAssign([ml(5), w(6), h(6), radiusA(3), bgColor(commonStyles.colorTheme)])}/>
              </TouchableButton>
              <TouchableButton
                customStyle={styleAssign([mt(34), styles.uac, styles.ujc, radiusA(2), bgColor(commonStyles.colorTheme),
                  w(72), h(28)])}>
                <Text style={styleAssign([color(commonStyles.whiteColor), fSize(10)])}>置为客户</Text>
              </TouchableButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
