/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/1
 * @Description: 帮助头部组件
 */
import Taro, {Component} from '@tarojs/taro'
import {Image, View} from "@tarojs/components";
import {bdColor, bgColor, bo, commonStyles, default as styles, h, ml, mr, radiusA, w} from "../../../utils/style";
import {styleAssign} from "../../../utils/datatool";
import NavigationBar from "../../../compoments/navigation_bar/index";

interface Props {

}

export default class HelpNavigationItem extends Component<Props> {

  render() {

    return (
      <NavigationBar>
        <View style={styleAssign([styles.udr, styles.uac])}>
          <View
            style={styleAssign([w(100), h(32), styles.udr, styles.uac, bo(1), {borderStyle: 'solid'}, bdColor(commonStyles.pageDefaultBackgroundColor), radiusA(16), ml(20)])}>
            <Image style={styleAssign([w(9), h(15), ml(20)])}
                   src={require('../../../assets/ico_help_back.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
            <View
              style={styleAssign([w(1), h(19), bgColor(commonStyles.pageDefaultBackgroundColor), ml(15), mr(15)])}/>
            <Image style={styleAssign([w(19), h(18)])}
                   src={require('../../../assets/ico_home.png')}
                   onClick={() => {
                     Taro.reLaunch({
                       url: `/pages/businesscard`
                     });
                   }}/>
          </View>
        </View>
      </NavigationBar>
    )
  }
}
