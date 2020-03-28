/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 等级item
 */
import Taro, {Component} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import {
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  radiusA,
  w
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import {cloudBaseUrl} from "../../api/httpurl";

interface Props {
  item: {
    title: string;
    subTitle: string;
    bg: string;
    logo: string;
    buttonTitle: string;
    right: string;
  };
}

export default class LevelItem extends Component<Props> {

  render() {
    let {item} = this.props;

    return (
      <View style={styleAssign([w(335), h(182), ml(20)])}>
        <Image style={styleAssign([w(335), h(182), styles.upa, absT(0)])}
               src={`${cloudBaseUrl}${item.bg}`}/>
        <View style={styleAssign([styles.uf1])}>
          <View style={styleAssign([w(295), ml(20), styles.udr, styles.uac, styles.ujb, mt(20)])}>
            <View>
              <Text style={styleAssign([fSize(18), color('#825D22')])}>{item.title}</Text>
              <Text style={styleAssign([fSize(14), color('#825D22')])}>{item.subTitle}</Text>
            </View>
            <Image style={styleAssign([w(48), h(42)])}
                   src={`${cloudBaseUrl}${item.logo}`}/>
          </View>
          <View style={styleAssign([w(295), ml(20), styles.udr, styles.uac, styles.ujb, mt(50)])}>
            <View style={styleAssign([w(108), h(28), bgColor('#825D22'), radiusA(14),
              styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{item.buttonTitle}</Text>
            </View>
            <Text style={styleAssign([fSize(12), color('#825D22')])}>{item.right}</Text>
          </View>
        </View>
      </View>
    )
  }
}
