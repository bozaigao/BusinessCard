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
import {RadarModel} from "../../../const/global";
import {cloudBaseUrl} from "../../../api/httpurl";
import SingleLineText from "../../../compoments/singleline-text";


interface Props {
  item: RadarModel;
  //收藏
  collectCallback: any;
  //置为客户
  setCustomerCallback: any;
}

interface State {
}

export default class RadarItem extends PureComponent<Props, State> {

  render() {
    let {item, collectCallback, setCustomerCallback} = this.props;

    return (
      <TouchableButton
        customStyle={styleAssign([radiusA(4), {width: '95%'}, {marginLeft: '2.5%'}, h(175), bgColor(commonStyles.whiteColor), mt(14)])}>
        <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/radar/radar_detail?userId=${item.behaviorTraceUser.userId}`
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
                <SingleLineText style={styleAssign([fSize(12), color('#343434')])}
                                text={item.behaviorTraceUser.name}/>
                <Text
                  style={styleAssign([fSize(12), color('#979797')])}>{item.relationStatus !== 2 ? '.访客' : '.客户'}</Text>
              </View>
              <Text
                style={styleAssign([fSize(12), color('#979797'), mt(5)])}>{`来自${item.behaviorTraceUser.source}`}</Text>
            </View>
          </View>
          {
            item.relationStatus !== 2 &&
            <View style={styleAssign([bgColor(commonStyles.colorTheme), radiusA(4), styles.uac, styles.ujc,
              w(72), h(28), radiusA(4), mr(16)])}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.relationStatus === 0) {
                      collectCallback(item.behaviorTraceUser.userId);
                    } else if (item.relationStatus === 1) {
                      setCustomerCallback(item.behaviorTraceUser.userId);
                    }
                  }}>
              <Text
                style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{item.relationStatus === 0 ? '收藏' : `置为客户`}</Text>
            </View>
          }
        </View>
        <View style={styleAssign([styles.uac, styles.udr, mt(3)])}>
          <Text
            style={styleAssign([fSize(14), ml(16), color(commonStyles.colorTheme)])}>在您的名片停留了</Text>
          <Text
            style={styleAssign([fSize(14), color('#E2BB7B')])}>{`${formartSecond(item.duration)}`}</Text>
          <Text
            style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>{`,这是${item.behaviorTraceUser.sex === 2 ? '她' : '他'}`}</Text>
          <Text
            style={styleAssign([fSize(14), color('#E2BB7B')])}>{`第${item.time}次查看您的名片`}</Text>
        </View>
        <Text
          style={styleAssign([fSize(14), color(commonStyles.colorTheme), ml(15)])}>，建议重点关注持续跟进，成交在望</Text>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(15)])}/>
        <View style={styleAssign([styles.uf1, styles.ujb, styles.udr])}>
          <View style={styleAssign([hRatio(100), styles.uac, styles.ujc])}>
            <Text
              style={styleAssign([color('#979797'), fSize(13), ml(16)])}>{`最后访问 ${transformTime(item.lastVisitTime)}`}</Text>
          </View>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/businesscard/other_businesscard?userId=${item.behaviorTraceUser.userId}`
                    });
                  }}>
              <Text style={styleAssign([color('#343434'), fSize(14), styles.utxdu])}>查看名片</Text>
            </View>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}
                  onClick={() => {
                    Taro.setClipboardData({
                      data: item.behaviorTraceUser.wechat
                    });
                  }}>
              <Text style={styleAssign([color('#343434'), fSize(14), styles.utxdu])}>添加微信</Text>
            </View>
          </View>
        </View>
      </TouchableButton>
    );
  }
}
