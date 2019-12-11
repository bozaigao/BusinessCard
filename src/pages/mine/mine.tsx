/**
 * @filename mine.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 我的
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import TopHeader from "../../compoments/top-header";


interface Props {
}

interface State {
  centerBarList: any;
  dataList: any;
}

class Mine extends Component<Props, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    disableScroll: true
  }

  state = {
    centerBarList: [],
    dataList: []
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  render() {

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'我的'}/>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {/*我的简略信息*/}
          <View style={styleAssign([wRatio(100), h(106), bgColor(commonStyles.whiteColor), styles.udr, styles.uac])}>
            <Image style={styleAssign([w(66), h(66), radiusA(33), ml(20)])}
                   src={require('../../assets/ico_default.jpeg')}/>
            <View style={styleAssign([ml(6)])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <View style={styleAssign([styles.uac, styles.udr, styles.uae])}>
                  <Text style={styleAssign([fSize(18), color(commonStyles.colorTheme)])}>王嘉怡</Text>
                  <Text
                    style={styleAssign([fSize(12), color('#A9A9A9'), ml(8)])}>销售经理</Text>
                </View>
                <View style={styleAssign([styles.uac, styles.udr, ml(80)])}>
                  <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>完善名片</Text>
                  <Image style={styleAssign([w(6), h(12), ml(8)])}
                         src={require('../../assets/ico_next.png')}/>
                </View>
              </View>
              <Text style={styleAssign([fSize(10), color('#A9A9A9'), mt(6)])}>美克美家家居集团股份有限公司</Text>
              {/*进度展示*/}
              <View style={styleAssign([styles.uac, styles.udr, mt(16)])}>
                <View style={styleAssign([bgColor('#E8E8E8'), w(140), h(6), radiusA(3)])}>
                  <View style={styleAssign([bgColor('#E8E8E8'), wRatio(80), h(6), bgColor('#0F56C5'), radiusA(3)])}/>
                </View>
                <Text style={styleAssign([fSize(10), color('#A9A9A9'), ml(8)])}>完善度96%</Text>
              </View>
            </View>
          </View>
          {/*企业信息*/}
          <View
            style={styleAssign([wRatio(100), h(60), mt(10), pl(20), pr(20), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb])}>
            <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>企业信息</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Text style={styleAssign([fSize(12), color('#A9A9A9')])}>编辑</Text>
              <Image style={styleAssign([w(6), h(12), ml(6)])} src={require('../../assets/ico_next.png')}/>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), mt(10), styles.uac, bgColor(commonStyles.whiteColor)])}>
            {
              ['商城', '海报', '工具箱', '名片夹', '任务中心'].map((value, index) => {
                return (<View style={styleAssign([wRatio(100), styles.uac])}><View
                  key={index}
                  style={styleAssign([wRatio(100), h(60), pl(20), pr(20), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb])}>
                  <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>{value}</Text>
                  <Image style={styleAssign([w(6), h(12), ml(6)])} src={require('../../assets/ico_next.png')}/>
                </View>
                  {
                    index !== 4 &&
                    <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  }
                </View>);
              })
            }
          </View>
          <View style={styleAssign([wRatio(100), mt(10), styles.uac, bgColor(commonStyles.whiteColor)])}>
            {
              ['使用小技巧', '投诉与建议', '关于极致名片'].map((value, index) => {
                return (<View style={styleAssign([wRatio(100), styles.uac])}><View
                  key={index}
                  style={styleAssign([wRatio(100), h(60), pl(20), pr(20), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb])}>
                  <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>{value}</Text>
                  <Image style={styleAssign([w(6), h(12), ml(6)])} src={require('../../assets/ico_next.png')}/>
                </View>
                  {
                    index !== 2 &&
                    <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  }
                </View>);
              })
            }
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default Mine;
