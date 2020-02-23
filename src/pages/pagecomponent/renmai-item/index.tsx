/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/23
 * @Description: 人脉item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mr, mt, radiusA, w, wRatio} from "../../../utils/style";
import {cloudBaseUrl} from "../../../api/httpurl";


interface Props {
}

interface State {
}

export default class RenMaiItem extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View
          style={styleAssign([wRatio(100), h(112), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([styles.uac, styles.udr, ml(20)])}>
            <Image style={styleAssign([w(66), h(66), radiusA(33)])} src={`${cloudBaseUrl}ico_default.png`}/>
            <View style={styleAssign([ml(22)])}>
              <Text style={styleAssign([fSize(16), color('#343434')])}>
                卢志刚
              </Text>
              <Text style={styleAssign([fSize(14), color('#ACADAD')])}>
                融智科技有限公司
              </Text>
              <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(6)])}>
                软件开发·Java工程师
              </Text>
            </View>
          </View>
          <View
            style={styleAssign([w(64), h(28), radiusA(2), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc, mr(20)])}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
              收藏名片
            </Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
      </View>
    );
  }
}
