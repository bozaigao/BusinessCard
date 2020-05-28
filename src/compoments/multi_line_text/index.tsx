/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 文本多行显示
 */
import Taro, {Component} from '@tarojs/taro'
import {Text} from "@tarojs/components";
import './index.scss';
import './index1.scss';

interface Props {
  text: string;
  center?: boolean;
  style?: any;
}

export default class MultiLineText extends Component<Props> {

  render() {
    let {text, style, center} = this.props;

    return (
      <Text style={style} className={center ? '.textStyle' : '.textStyle1'}>{text}</Text>
    )
  }
}
