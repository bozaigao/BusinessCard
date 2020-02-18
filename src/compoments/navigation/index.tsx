/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/18
 * @Description: 导航条
 */
import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import {bgColor, default as styles, mb, wRatio} from "../../utils/style";
import {Global} from "../../const/global";

declare let global: Global;

interface Props {
  style?: any;
  children?: any;
}


export default class Navigation extends Component<Props> {

  constructor(props) {
    super(props);
  }


  render() {
    let {style, children} = this.props;

    return (
      <View
        style={styleAssign([wRatio(100), {height: `${global.menuButton.height + (global.menuButton.top - global.statusBarHeight) * 2 + global.statusBarHeight}px`},
          styles.ujb, styles.udr, styles.uae, style])}>
        <View style={styleAssign([wRatio(100),{height:`${global.menuButton.height}px`}, mb(global.menuButton.top - global.statusBarHeight),
        styles.ujc,bgColor('red')])}>
          {children}
        </View>
      </View>
    )
  }
}
