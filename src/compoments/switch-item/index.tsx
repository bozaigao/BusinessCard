/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: switch item组件
 */
import Taro, {Component} from '@tarojs/taro'
import {Switch, Text, View} from "@tarojs/components";
import {bgColor, color, commonStyles, default as styles, fSize, h, pl, pr, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";

interface Props {
  title: string;
}

export default class SwitchItem extends Component<Props> {

  render() {
    let {title} = this.props;

    return (
      <View style={styleAssign([wRatio(100), styles.uac])}>
        <View style={styleAssign([wRatio(100), h(51), bgColor(commonStyles.whiteColor), styles.uac,
          styles.udr, styles.ujb, pl(20), pr(20)])}>
          <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>{title}</Text>
          <Switch color={'#E2BB7B'}/>
        </View>
        <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
      </View>
    )
  }
}
