/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/4/11
 * @Description: 文本多行显示
 */
import Taro, {Component} from '@tarojs/taro'
import {Text} from "@tarojs/components";
import './index.scss';

interface Props {
  text: string;
  style?: any;
}

export default class MultiLineText extends Component<Props> {

  render() {
    let {text, style} = this.props;

    return (
      <Text style={style} className={'.textStyle '}>{text}</Text>
    )
  }
}
