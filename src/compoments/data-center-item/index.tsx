/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 数据中心item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import styles, {
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  mb,
  mt,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {BaseCoin, SettlementStats} from "../../const/global";


interface Props {
  item: SettlementStats;
}

interface State {
}

export default class DataCenterItem extends PureComponent<Props, State> {

  render() {
    let {item} = this.props

    return (
      <View style={styleAssign([wRatio(100), h(136), styles.uac, styles.ujc, mt(14)])}>
        <View style={styleAssign([w(335), h(156), bgColor(commonStyles.whiteColor), radiusA(4),])}>
          <View style={styleAssign([wRatio(100), h(50), styles.uac, styles.ujc,
            radiusTL(4), radiusTR(4)])}>
            <Text style={styleAssign([fSize(14), color('#343434')])}>
              {item.date}
            </Text>
          </View>
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(15)])}>
            <View style={styleAssign([styles.uf1, styles.uac])}>
              <Text style={styleAssign([fSize(12), color('#979797')])}>
                销售额(税前)
              </Text>
              <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                <Text style={styleAssign([fSize(14), color('#343434'), mb(5)])}>
                  ¥
                </Text>
                <Text style={styleAssign([fSize(24), color('#343434')])}>
                  {(item.totalSale / BaseCoin).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styleAssign([w(1), h(30), bgColor('#E5E5E5')])}/>
            <View style={styleAssign([styles.uf1, styles.uac])}>
              <Text style={styleAssign([fSize(12), color('#979797')])}>
                已结算收入(税前)
              </Text>
              <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                <Text style={styleAssign([fSize(14), color('#343434'), mb(5)])}>
                  ¥
                </Text>
                <Text style={styleAssign([fSize(24), color('#343434')])}>
                  {(item.totalIncome / BaseCoin).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
