/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 底部按钮
 */
import Taro, {Component} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import styles, {bgColor, color, commonStyles, fSize, h, radiusA, w, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import TouchableButton from "../touchable-button";

interface Props {
  title: string;
  onClick: any;
}

export class BottomButon extends Component<Props> {


  render() {

    let {title, onClick} = this.props;

    return (
      <View style={styleAssign([wRatio(100), h(64), styles.uac, styles.ujc])}>
        <TouchableButton customStyle={styleAssign([w(335), h(48), radiusA(2), bgColor(commonStyles.colorTheme),
          styles.uac, styles.ujc])}
                         onClick={onClick}>
          <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>{title}</Text>
        </TouchableButton>
      </View>
    );
  }
}

export default BottomButon;
