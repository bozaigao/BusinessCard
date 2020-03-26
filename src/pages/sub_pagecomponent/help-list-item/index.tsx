/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 帮助ListItem
 */
import Taro, {Component} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import {bgColor, color, commonStyles, default as styles, fSize, h, ml, pl, pr, w, wRatio} from "../../../utils/style";
import {styleAssign} from "../../../utils/datatool";

interface Props {
  title: any;
  onClick: any;
}

export default class HelpListItem extends Component<Props> {

  render() {
    let {title, onClick} = this.props;


    return (
      <View style={styleAssign([wRatio(100)])}
            onClick={onClick}>
        <View
          style={styleAssign([wRatio(100), h(55), styles.uac, styles.udr, styles.ujb, pl(20), pr(20), bgColor(commonStyles.whiteColor)])}>
          <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>{title}</Text>
          <Image style={styleAssign([w(8), h(14), ml(9)])} src={require('../../../assets/ico_next.png')}/>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
      </View>
    )
  }
}
