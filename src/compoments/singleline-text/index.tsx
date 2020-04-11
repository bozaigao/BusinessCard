/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/4/11
 * @Description: 文本单行显示
 */
import Taro, {Component} from '@tarojs/taro'
import {Text} from "@tarojs/components";

interface Props {
  text: string;
  style?: any;
}

export default class SingleLineText extends Component<Props> {

  render() {
    let {text, style} = this.props;

    return (
      <Text style={{
        ...style, display: '-webkit-box',
        overflow: 'hidden',
        '-webkit-line-clamp': 1,
        '-webkit-box-orient': 'vertical',
      }}>{text}</Text>
    )
  }
}
