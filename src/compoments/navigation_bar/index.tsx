/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 导航条
 */
import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import {default as styles, mb, wRatio} from "../../utils/style";
import {Global} from "../../const/global";

declare let global: Global;

interface Props {
  style?: any;
  children?: any;
}


export default class NavigationBar extends Component<Props> {

  constructor(props) {
    super(props);
  }


  render() {
    let {style, children} = this.props;

    return (
      <View
        style={styleAssign([wRatio(100), {height: `${global.menuButton.height + (global.menuButton.top - global.statusBarHeight) * 2 + global.statusBarHeight}px`},
          styles.uje, styles.udr, styles.uae, style])}>
        <View style={styleAssign([wRatio(100),{height:`${global.menuButton.height}px`}, mb(global.menuButton.top - global.statusBarHeight),
        styles.ujc])}>
          {children}
        </View>
      </View>
    )
  }
}
