/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 选择筛选模式
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {getToday, styleAssign} from "../../../utils/datatool";
import {
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  mb,
  ml,
  mr,
  mt,
  op, pb,
  pl,
  pr, pt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";
import CustomSafeAreaView from "../../../compoments/safe-area-view";
import NavigationBar from "../../../compoments/navigation_bar";
import {Orientation} from "../../../const/global";
import SanJiao from "../../../compoments/sanjiao";


interface Props {
  cancelCallback: any;
  confirmCallback: any;
  collectCallback: any;
  myVisitorCallback: any;
  shaiXuanCallback: any;
  shaiXuanMode: string;
  totalPerson: number;
}

interface State {

}

export default class ModeModal extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      startTime: '2020-01-01',
      endTime: getToday(),
      visitTime: '全部'
    }
  }

  render() {

    let {cancelCallback, collectCallback, myVisitorCallback, confirmCallback, shaiXuanCallback, shaiXuanMode, totalPerson} = this.props;
    let visitorSubCurrentIndex = 0, currentIndex = 0;

    return (
      <CustomSafeAreaView
        customStyle={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100), bgColor(commonStyles.transparent)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(0), absR(0),])}>
          <View style={styleAssign([wRatio(100), h(60), bgColor(commonStyles.whiteColor)])}/>
          <View style={styleAssign([styles.uf1, bgColor(commonStyles.blackColor), op(0.5)])}/>
        </TouchableButton>
        <NavigationBar style={styleAssign([bgColor(commonStyles.whiteColor)])}>
          <View
            style={styleAssign([wRatio(100), h(iphoneX() ? 47 : 44), styles.udr, styles.uac, styles.ujb])}>
            <Image style={styleAssign([w(22), h(22), ml(20)])}
                   src={require('../../../assets/ico_back.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <View style={styleAssign([styles.uac])}>
                  <Text style={styleAssign([fSize(18), color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>访客</Text>
                  <View
                    style={styleAssign([w(36), h(2), bgColor(currentIndex === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                </View>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}
                    onClick={collectCallback}>
                <View style={styleAssign([styles.uac])}>
                  <Text style={styleAssign([fSize(18), color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>收藏</Text>
                  <View
                    style={styleAssign([w(36), h(2), bgColor(currentIndex === 1 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                </View>
              </View>
            </View>
            <View style={styleAssign([w(22), h(22), mr(20)])}/>
          </View>
        </NavigationBar>
        <View style={styleAssign([styles.uf1])}>
          <View
            style={styleAssign([wRatio(100), pt(10), pb(10), styles.uac, styles.ujc, styles.udr, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View
                style={styleAssign([styles.uac, styles.ujc, bgColor(visitorSubCurrentIndex === 0 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2)])}>
                <Text
                  style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(visitorSubCurrentIndex === 0 ? commonStyles.whiteColor : '#343434')])}>谁访问了我</Text>
              </View>
              <View
                style={styleAssign([styles.uac, styles.ujc, bgColor(visitorSubCurrentIndex === 1 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2), ml(63)])}
                onClick={myVisitorCallback}>
                <Text
                  style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(visitorSubCurrentIndex === 1 ? commonStyles.whiteColor : '#343434')])}>我访问了谁</Text>
              </View>
            </View>
          </View>
          {/*条件筛选*/}
          <View
            style={styleAssign([wRatio(100), h(36), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
              pl(20), pr(20)])}>
            <Text style={styleAssign([color('#727272'), fSize(14)])}>{`共${totalPerson}位访客`}</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(14)])}>{shaiXuanMode}</Text>
                <SanJiao orientation={Orientation.up} style={styleAssign([ml(3)])}/>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}
                      onClick={shaiXuanCallback}>筛选</Text>
                <Image style={styleAssign([w(14), h(14), ml(3)])} src={require('../../../assets/ico_shaixuan.png')}/>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*筛选内容*/}
          <View style={styleAssign([wRatio(100), h(88), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([wRatio(100), h(44), styles.ujc, bgColor(commonStyles.whiteColor)])}
                  onClick={() => {
                    confirmCallback('最后访问时间');
                  }}>
              <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20)])}>最后访问时间</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(44), styles.ujc, bgColor(commonStyles.whiteColor)])}
                  onClick={() => {
                    confirmCallback('最多访问次数');
                  }}>
              <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20)])}>最多访问次数</Text>
            </View>
          </View>
          <View style={styleAssign([styles.uf1])}
                onClick={() => {
                  cancelCallback();
                  console.log('点击')
                }}/>
        </View>
      </CustomSafeAreaView>
    );
  }
}
