/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 各个方向的三角标
 */
import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";
import {scaleSize, styleAssign} from "../../utils/datatool";
import {Orientation} from "../../const/global";


interface Props {
  orientation: Orientation;
  style?: any;
  size?: number;
}

export default class SanJiao extends Component<Props> {

  render() {
    let {orientation, style, size} = this.props;

    size = size ? size : 6;

    if (orientation === Orientation.up) {
      return (
        <View style={styleAssign([{
          width: 0,
          height: 0,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          borderRightWidth: scaleSize(size),
          borderRightColor: 'transparent',
          borderLeftWidth: scaleSize(size),
          borderLeftColor: 'transparent',
          borderBottomWidth: scaleSize(size),
          borderBottomColor: '#787878',
          borderStyle: 'solid',
        }, style])}/>
      );
    } else if (orientation === Orientation.down) {
      return (
        <View style={styleAssign([{
          width: 0,
          height: 0,
          borderTopWidth: scaleSize(size),
          borderTopColor: '#787878',
          borderRightWidth: scaleSize(size),
          borderRightColor: 'transparent',
          borderLeftWidth: scaleSize(size),
          borderLeftColor: 'transparent',
          borderBottomWidth: 0,
          borderBottomColor: 'transparent',
          borderStyle: 'solid',
        }, style])}/>
      );
    } else if (orientation === Orientation.left) {
      return (
        <View style={styleAssign([{
          width: 0,
          height: 0,
          borderTopWidth: scaleSize(size),
          borderTopColor: 'transparent',
          borderRightWidth: scaleSize(size),
          borderRightColor: '#787878',
          borderLeftWidth: 0,
          borderLeftColor: 'transparent',
          borderBottomWidth: scaleSize(size),
          borderBottomColor: 'transparent',
          borderStyle: 'solid',
        }, style])}/>
      );
    }

    return (
      <View style={styleAssign([{
        width: 0,
        height: 0,
        borderTopWidth: scaleSize(size),
        borderTopColor: 'transparent',
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderLeftWidth: scaleSize(size),
        borderLeftColor: '#787878',
        borderBottomWidth: scaleSize(size),
        borderBottomColor: 'transparent',
        borderStyle: 'solid',
      }, style])}/>
    );
  }
}
