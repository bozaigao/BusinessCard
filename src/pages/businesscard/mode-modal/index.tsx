/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 选择筛选模式
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
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
  op,
  padding,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";
import CustomSafeAreaView from "../../../compoments/safe-area-view";


interface Props {
  cancelCallback: any;
  confirmCallback: any;
  collectCallback: any;
  myVisitorCallback: any;
}

interface State {
  topHeight: number;
  bottomHeight: number;
}

export default class ModeModal extends PureComponent<Props, State> {

  componentWillMount() {
    //这里只要是针对微信小程序设置自定义tabBar后的iphoneX高度适配
    if (iphoneX()) {
      this.setState({topHeight: 43, bottomHeight: 44});
    } else {
      this.setState({topHeight: 15});
    }
  }

  render() {

    let {cancelCallback, collectCallback, myVisitorCallback} = this.props;
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
        <View
          style={styleAssign([wRatio(100), h(iphoneX() ? 47 : 44), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
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
        <View style={styleAssign([styles.uf1])}>
          <View
            style={styleAssign([wRatio(100), h(44), styles.uac, styles.ujc, styles.udr, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
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
            <Text style={styleAssign([color('#727272'), fSize(14)])}>{`共${2}位访客`}</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}
                    onClick={() => {
                      // this.setState({showMode: true});
                    }}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}>最后访问时间</Text>
                <Image style={styleAssign([w(8), h(5), ml(3)])} src={require('../../../assets/ico_sanjiao_down.png')}/>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}>筛选</Text>
                <Image style={styleAssign([w(14), h(14), ml(3)])} src={require('../../../assets/ico_shaixuan.png')}/>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*筛选内容*/}
          <View style={styleAssign([wRatio(100), h(214), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mt(16)])}>访问时间</Text>
            <View style={styleAssign([styles.uac, styles.udr, pl(20), mt(12)])}>
              {
                ['全部', '今日', '本周', '本月', '近半年'].map((value, index) => {
                  return <View key={index} style={styleAssign([padding([3, 5, 3, 5]), radiusA(2),
                    styles.uac, styles.ujc, ml(index !== 0 ? 20 : 0), bgColor('#E4E4E4')])}>
                    <Text style={styleAssign([color('#0C0C0C'), fSize(14)])}>{value}</Text>
                  </View>;
                })
              }
            </View>
            <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mt(16)])}>自定义时间</Text>
            <View style={styleAssign([styles.uac, styles.udr, wRatio(100), pl(20), mt(14)])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([color('#979797'), fSize(14)])}>2019-03-18</Text>
                <Image style={styleAssign([w(8), h(5), ml(3)])} src={require('../../../assets/ico_sanjiao_down.png')}/>
              </View>
              <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20), mr(20)])}>至</Text>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([color('#979797'), fSize(14)])}>2019-04-20</Text>
                <Image style={styleAssign([w(8), h(5), ml(3)])} src={require('../../../assets/ico_sanjiao_down.png')}/>
              </View>
            </View>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(10)])}/>
            <View style={styleAssign([styles.uf1, styles.uac, styles.uje])}>
              <View style={styleAssign([styles.uac, styles.udr, mb(15)])}>
                <View style={styleAssign([w(52), h(27), radiusA(4), styles.uac, styles.ujc])}>
                  <Text style={styleAssign([color(commonStyles.colorTheme), fSize(16)])}>重置</Text>
                </View>
                <View style={styleAssign([w(52), h(27), radiusA(4), styles.uac, styles.ujc,
                  bgColor(commonStyles.colorTheme), ml(130)])}>
                  <Text style={styleAssign([color(commonStyles.whiteColor), fSize(16)])}>确定</Text>
                </View>
              </View>
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
