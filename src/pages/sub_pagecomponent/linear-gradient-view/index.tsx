/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/5
 * @Description: 渐进色变换组件
 */
import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import './index.scss';

interface Props {
  style: any;
}

export class LinearGradientView2 extends Component<Props> {


  render() {

    let {style} = this.props;

    return (
      <View style={style}>
        <View className='.linear-gradients-view'/>
      </View>
    );
  }
}

export default LinearGradientView2;
