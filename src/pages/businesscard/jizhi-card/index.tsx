/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 极致名片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absB,
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  ml,
  mt,
  pa,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";


interface Props {
  // navigation: Navigation;
}

interface State {
}

export default class JiZhiCard extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>极致名片</Text>
        </View>
        {
          [1, 2].map((value, index) => {
            console.log(value);
            return (<View style={styleAssign([wRatio(100)])} key={index}>
              <View
                style={styleAssign([{width: '95%'}, {marginLeft: '2.5%'}, mt(16), h(193), bgColor(commonStyles.whiteColor),])}>
                <View style={styleAssign([styles.udr, styles.ujb, pa(16)])}>
                  <View style={styleAssign([])}>
                    <Text style={styleAssign([fSize(18), color(commonStyles.colorTheme)])}>尹龙海</Text>
                    <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme), mt(4)])}>项目经理</Text>
                    <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme), mt(4)])}>四川极致信息技术有限公司</Text>
                  </View>
                  <Image style={styleAssign([w(66), h(66), radiusA(33)])}
                         src={require('../../../assets/ico_default.jpeg')}/>
                </View>
                <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme), mt(8), ml(16)])}>18980668468</Text>
                <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme), ml(16)])}>LY8866321</Text>
                <View style={styleAssign([wRatio(100), styles.upa, absB(0)])}>
                  <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  <View
                    style={styleAssign([wRatio(100), h(44), styles.udr, styles.uac])}>
                    <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
                      <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>拨打电话</Text>
                    </View>
                    <View style={styleAssign([w(1), h(19), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                    <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
                      <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>分享名片</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>);
          })
        }
      </View>
    );
  }
}
