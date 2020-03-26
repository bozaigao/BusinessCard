/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 我的模块ListItem
*/
import Taro, {Component} from '@tarojs/taro'
import {Text, View} from "@tarojs/components";
import {bgColor, color, commonStyles, default as styles, fSize, h, ml, mr, w, wRatio} from "../../../utils/style";
import {styleAssign} from "../../../utils/datatool";

interface Props {
  title: any;
  subTitle?: any;
}

export default class ListItem extends Component<Props> {

  render() {
    let {title, subTitle} = this.props;


    return (
      <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}>
        <View style={styleAssign([wRatio(100), h(55), styles.udr, styles.uac, styles.ujb])}>
          <View style={styleAssign([ml(20)])}>
            <Text style={styleAssign([fSize(14), color('#242424')])}>{title}</Text>
          </View>
          <Text style={styleAssign([fSize(14), mr(20), color('#B7B7B7')])}>{subTitle ? subTitle : ''}</Text>
        </View>
        <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
      </View>
    )
  }
}
