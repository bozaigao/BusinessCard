/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 收藏item
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
import TouchableButton from "../../../compoments/touchable-button";
import {CollectItemModel} from "../../../const/global";
import {cloudBaseUrl} from "../../../api/httpurl";


interface Props {
  operate: any;
  setCustomer: any;
  item: CollectItemModel;
}

interface State {
}

export default class CollectItem extends PureComponent<Props, State> {

  render() {
    let {operate, item, setCustomer} = this.props;

    return (
      <TouchableButton
        customStyle={styleAssign([radiusA(4), {width: '95%'}, {marginLeft: '2.5%'}, h(156), bgColor(commonStyles.whiteColor), mt(14)])}>
        <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}>
          <View style={styleAssign([styles.uac, styles.udr, mt(20)])}>
            <View style={styleAssign([w(66), h(66), ml(16)])}>
              <Image style={styleAssign([w(66), h(66), radiusA(33)])}
                     src={item.avatar}/>
              <Image style={styleAssign([w(13), h(13), styles.upa, absB(0), absR(0)])}
                     src={`${cloudBaseUrl}ico_nan.png`}/>
            </View>
            <View style={styleAssign([ml(16)])}>
              <Text style={styleAssign([fSize(16), color('#343434')])}>{item.name}</Text>
              <Text style={styleAssign([fSize(14), color('#979797'), mt(16)])}>{item.position}</Text>
              <Text style={styleAssign([fSize(14), color('#979797'), mt(2)])}>{item.company}</Text>
            </View>
          </View>
          <View style={styleAssign([bgColor(commonStyles.colorTheme), radiusA(4), styles.uac, styles.ujc,
            w(72), h(28), radiusA(4), mr(16)])}
                onClick={()=>{
                  setCustomer(item.userId);
                }}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>置为客户</Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(15)])}/>
        <View style={styleAssign([styles.uf1, styles.ujb, styles.udr])}>
          <View style={styleAssign([hRatio(100), styles.uac, styles.ujc])}>
            <Text
              style={styleAssign([color('#979797'), fSize(12), ml(16)])}>{`收藏时间 ${transformTime(item.collectTime)}`}</Text>
          </View>
          <View style={styleAssign([styles.uac, styles.ujc, styles.udr, w(40), mr(16)])}
                onClick={() => {
                  operate(item);
                }}>
            <Image style={styleAssign([w(19), h(4)])} src={`${cloudBaseUrl}ico_three_dot.png`}/>
          </View>
        </View>
      </TouchableButton>
    );
  }
}
