/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 界面头部组件
 */
import Taro, {Component} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import styles, {bgColor, commonStyles, fSize, h, ml, mr, w, wRatio} from "../../utils/style";

interface Props {
  title: string;
}

interface State {

}

export default class TopHeader extends Component<Props, State> {

  constructor(props) {
    super(props);

  }

  render() {

    let {title} = this.props;

    return (
      <View
        style={styleAssign([wRatio(100), h(44), styles.ujb, styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
        <Image style={styleAssign([w(22), h(22), ml(20)])} src={require('../../assets/ico_switch.png')}/>
        <Text style={styleAssign([fSize(19)])}>{title}</Text>
        <View style={styleAssign([w(22), h(22), bgColor(commonStyles.transparent), mr(20)])}/>
      </View>
    )
  }

}
