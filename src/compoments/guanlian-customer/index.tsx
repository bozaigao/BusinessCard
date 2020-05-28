/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 关联客户
 */
import Taro, {Component} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import {cloudBaseUrl} from "../../api/httpurl";
import {CustomerModel} from "../../const/global";

interface Props {
  hascheck?: boolean;
  isChecked?: boolean;
  backgroundColor?: string;
  marginTop?: number;
  onChoose?: any;
  customer: CustomerModel;
}

export default class GuanLianCustomer extends Component<Props> {


  render() {
    let {backgroundColor, marginTop, customer, hascheck, isChecked, onChoose} = this.props;

    return (
      <View
        style={styleAssign([wRatio(100), styles.uac, styles.ujc, bgColor(backgroundColor ? backgroundColor : commonStyles.whiteColor),
          mt(marginTop ? marginTop : 0)])}
        onClick={() => {
          onChoose && onChoose(customer.id);
        }
        }>
        <View
          style={styleAssign([wRatio(90), h(96), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb])}>
          <View style={styleAssign([styles.udr, styles.uac])}>
            <Image style={styleAssign([w(64), h(64), radiusA(32), ml(20)])}
                   src={customer.avatar ? customer.avatar : `${cloudBaseUrl}ico_default.png`}/>
            <View style={styleAssign([ml(18)])}>
              <View style={styleAssign([styles.udr, styles.uac])}>
                <Text style={styleAssign([color('#343434'), fSize(18)])}>{customer.name}</Text>
                {/* <Text style={styleAssign([color('#A9A9A9'), fSize(14), ml(8)])}>{customer.position}</Text> */}
              </View>
              <Text style={styleAssign([color('#A9A9A9'), fSize(12), mt(8)])}>{customer.company}</Text>
            </View>
          </View>
          {
            hascheck &&
            <Image style={styleAssign([w(25), h(25), mr(14)])}
                   src={isChecked ? require('../../assets/ico_checked.png') : require('../../assets/ico_nocheck.png')}/>
          }
        </View>
      </View>
    )
  }
}
