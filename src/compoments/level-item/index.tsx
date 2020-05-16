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
    let tColor = '#FFFFFF';
    let subTColor = '#FFFFFF';
    let rColor = '#FFFFFF';
    let bBtnBgColor = '#825D22';
    if(item.title === '结识更多人脉'){
      tColor = '#FFFFFF';
      subTColor = '#E5E5E5';
      rColor = '#E5E5E5';
      bBtnBgColor = '#E2BB7B';
    }else if(item.title === '查看全部访客'){
      tColor = '#825D22';
      subTColor = '#825D22';
      rColor = '#825D22';
      bBtnBgColor = '#825D22';
    }else if(item.title === '开通店铺'){
      tColor = '#8A5433';
      subTColor = '#8A5433';
      rColor = '#8A5433';
      bBtnBgColor = '#8A5433';
    };

    return (
      <View style={styleAssign([w(335), h(182), ml(20)])}>
        <Image style={styleAssign([w(335), h(182), styles.upa, absT(0)])}
               src={`${cloudBaseUrl}${item.bg}`}/>
        <View style={styleAssign([styles.uf1])}>
          <View style={styleAssign([w(295), ml(20), styles.udr, styles.uac, styles.ujb, mt(20)])}>
            <View>
              <Text style={styleAssign([fSize(18), color(tColor)])}>{item.title}</Text>
              <Text style={styleAssign([fSize(14), color(subTColor)])}>{item.subTitle}</Text>
            </View>
            <Image style={styleAssign([w(48), h(42)])}
                   src={`${cloudBaseUrl}${item.logo}`}/>
          </View>
          <View style={styleAssign([w(295), ml(20), styles.udr, styles.uac, styles.ujb, mt(50)])}>
            <View style={styleAssign([w(108), h(28), bgColor(bBtnBgColor), radiusA(14),
              styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{item.buttonTitle}</Text>
            </View>
            <Text style={styleAssign([fSize(12), color(rColor)])}>{item.right}</Text>
          </View>
        </View>
      </View>
    )
  }
}
