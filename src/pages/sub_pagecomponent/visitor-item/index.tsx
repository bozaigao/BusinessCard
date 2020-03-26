/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 访问item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign, transformTime} from "../../../utils/datatool";
import styles, {
  absB,
  absR,
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import {VisitorRecordModel} from "../../../const/global";
import {cloudBaseUrl} from "../../../api/httpurl";


interface Props {
  item: VisitorRecordModel;
}

interface State {
}

export default class VisitorItem extends PureComponent<Props, State> {

  render() {
    let {item} = this.props;

    return (
      <TouchableButton
        customStyle={styleAssign([radiusA(4), {width: '95%'}, {marginLeft: '2.5%'}, h(156), bgColor(commonStyles.whiteColor), mt(14)])}>
        <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}>
          <View style={styleAssign([styles.uac, styles.udr, mt(20)])}>
            <View style={styleAssign([w(46), h(46), ml(16)])}>
              <Image style={styleAssign([w(46), h(46), radiusA(23)])}
                     src={item.visitor.avatar}/>
              <Image style={styleAssign([w(13), h(13), styles.upa, absB(0), absR(0)])}
                     src={item.visitor.sex === 2 ?`${cloudBaseUrl}ico_nv.png` : `${cloudBaseUrl}ico_nan.png`}/>
            </View>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(12), color('#343434')])}>{item.visitor.name}</Text>
              <Text style={styleAssign([fSize(12), color('#979797'), mt(5)])}>{`来自${item.visitor.source}`}</Text>
            </View>
          </View>
          <View style={styleAssign([bgColor(commonStyles.colorTheme), radiusA(4), styles.uac, styles.ujc,
            w(72), h(28), radiusA(4), mr(16)])}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>置为客户</Text>
          </View>
        </View>
        <View>
          <Text
            style={styleAssign([fSize(14), mt(3), ml(16), color(commonStyles.colorTheme)])}>{`累计访问次数(${item.visitCount}) · 查看名片(${item.cardCount}) · 查看商品(${item.goodsCount})`}</Text>
          <Text style={styleAssign([ml(16), fSize(14), color(commonStyles.colorTheme)])}>
            {`查看企业(${item.companyCount})`}
          </Text>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(15)])}/>
        <View style={styleAssign([styles.uf1, styles.ujb, styles.udr])}>
          <View style={styleAssign([hRatio(100), styles.uac, styles.ujc])}>
            <Text
              style={styleAssign([color('#E2BB7B'), fSize(14), ml(16)])}>{`最后访问 ${transformTime(item.lastVisitTime)}`}</Text>
          </View>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}>
              <Text style={styleAssign([color('#343434'), fSize(14), styles.utxdu])}>查看名片</Text>
            </View>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}>
              <Text style={styleAssign([color('#343434'), fSize(14), styles.utxdu])}>添加微信</Text>
            </View>
          </View>
        </View>
      </TouchableButton>
    );
  }
}
