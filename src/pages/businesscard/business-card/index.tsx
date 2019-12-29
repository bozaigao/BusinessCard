/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 个人名片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absL,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  h,
  ma,
  ml,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";


interface Props {
  shareClick: any;
}

interface State {
}

export default class Card extends PureComponent<Props, State> {

  render() {

    let {shareClick} = this.props;

    return (
      <View style={styleAssign([wRatio(100), styles.uac])}>
        <View style={styleAssign([wRatio(95), h(204), bgColor('rgb(211,199,195)'), radiusA(10),
          styles.udr, styles.uje])}>
          <Image style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}
                 src={require('../../../assets/ico_default.png')}/>
          <View style={styleAssign([ma(20)])}>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Text style={styleAssign([fSize(18)])}>王嘉怡</Text>
              <Text style={styleAssign([fSize(12)])}>销售经理</Text>
            </View>
            <Text
              style={styleAssign([fSize(12), mt(30), mt(5)])}>15982468866@qq.com</Text>
            <Text
              style={styleAssign([fSize(12), mt(5)])}>{`四川省成都市武侯区盛和\n二路18号富森美家居`}</Text>
          </View>
        </View>
        {/*拨打电话等操作*/}
        <View style={styleAssign([wRatio(100), h(204), bgColor(commonStyles.whiteColor), styles.uac, mt(20)])}>
          <View
            style={styleAssign([wRatio(100), styles.uac, styles.udr, h(60), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>访客</Text>
            </View>
            <View style={styleAssign([w(1), h(25), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>收藏</Text>
            </View>
          </View>
          {/*完善分享名片*/}
          <View
            style={styleAssign([wRatio(95), styles.uac, styles.udr, h(44), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac])}>
              <TouchableButton
                customStyle={styleAssign([w(160), radiusA(4), styles.uac, styles.ujc, bo(1), {borderStyle: 'solid'}, bdColor(commonStyles.colorTheme),
                  bgColor(commonStyles.whiteColor), h(44)])}>
                <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>完善名片</Text>
              </TouchableButton>
              <TouchableButton
                customStyle={styleAssign([w(160), radiusA(4), ml(15), styles.uac, styles.ujc, bo(1), h(44),
                  bdColor(commonStyles.colorTheme), bgColor(commonStyles.colorTheme)])}
                onClick={shareClick}>
                <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>分享名片</Text>
              </TouchableButton>
            </View>
          </View>
          {/*加微信、联系地址*/}
          <View
            style={styleAssign([wRatio(95), styles.uac, styles.udr, h(100), bgColor(commonStyles.whiteColor)])}>
            <View
              style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
                bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4)])}>
              <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>拨打电话</Text>
              <Text style={styleAssign([color('#979797'), fSize(12)])}>15982468866</Text>
            </View>
            <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
              bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15)])}>
              <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>加微信</Text>
              <Text style={styleAssign([color('#979797'), fSize(12)])}>点击添加微信</Text>
            </View>
            <View style={styleAssign([styles.uac, styles.ujc, styles.uf1, h(54), styles.uac,
              bo(1), bdColor('#e8e8e8'), {borderStyle: 'solid'}, radiusA(4), ml(15)])}>
              <Text style={styleAssign([color(commonStyles.colorTheme), fSize(12)])}>联系地址</Text>
              <Text style={styleAssign([color('#979797'), fSize(12)])}>点击立即定位</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
