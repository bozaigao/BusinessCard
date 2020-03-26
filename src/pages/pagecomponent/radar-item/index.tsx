/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 雷达item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {formartSecond, styleAssign, transformTime} from "../../../utils/datatool";
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
import {operateMap, RadarModel} from "../../../const/global";
import {cloudBaseUrl} from "../../../api/httpurl";


interface Props {
  item: RadarModel;
}

interface State {
}

export default class RadarItem extends PureComponent<Props, State> {

  render() {
    let {item} = this.props;

    return (
      <TouchableButton
        customStyle={styleAssign([radiusA(4), {width: '95%'}, {marginLeft: '2.5%'}, h(156), bgColor(commonStyles.whiteColor), mt(14)])}>
        <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/radarscan/radar_detail?itemData=${JSON.stringify(item.behaviorTraceUser)}`
                });
              }}>
          <View style={styleAssign([styles.uac, styles.udr, mt(20)])}>
            <View style={styleAssign([w(46), h(46), ml(16)])}>
              <Image style={styleAssign([w(46), h(46), radiusA(23)])}
                     src={item.behaviorTraceUser.avatar}/>
              <Image style={styleAssign([w(13), h(13), styles.upa, absB(0), absR(0)])}
                     src={item.behaviorTraceUser.sex === 1 ? `${cloudBaseUrl}ico_nan.png` : `${cloudBaseUrl}ico_nv.png`}/>
            </View>
            <View style={styleAssign([ml(16)])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([fSize(12), color('#343434')])}>{item.behaviorTraceUser.name}</Text>
                <Text style={styleAssign([fSize(12), color('#979797')])}>.访客</Text>
              </View>
              <Text
                style={styleAssign([fSize(12), color('#979797'), mt(5)])}>{`来自${item.behaviorTraceUser.source}`}</Text>
            </View>
          </View>
          <View style={styleAssign([bgColor(commonStyles.colorTheme), radiusA(4), styles.uac, styles.ujc,
            w(72), h(28), radiusA(4), mr(16)])}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>置为客户</Text>
          </View>
        </View>
        <View style={styleAssign([styles.uac, styles.udr])}>
          <Text
            style={styleAssign([fSize(14), mt(3), ml(16), color(commonStyles.colorTheme)])}>他</Text>
          <Text
            style={styleAssign([fSize(14), mt(3), color('#E2BB7B')])}>{operateMap[item.behaviorType]}</Text>
          <Text
            style={styleAssign([fSize(14), mt(3), color(commonStyles.colorTheme)])}>持续时间</Text>
          <Text
            style={styleAssign([fSize(14), mt(3), color('#E2BB7B')])}>{`${formartSecond(item.duration)}`}</Text>
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(15)])}/>
        <View style={styleAssign([styles.uf1, styles.ujb, styles.udr])}>
          <View style={styleAssign([hRatio(100), styles.uac, styles.ujc])}>
            <Text
              style={styleAssign([color('#979797'), fSize(14), ml(16)])}>{`最后访问 ${transformTime(item.behaviorTraceUser.lastVisitTime)}`}</Text>
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
