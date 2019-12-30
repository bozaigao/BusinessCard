/**
 * @filename my_tags.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 我的标签
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  absR,
  absT, bdColor,
  bgColor, bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  padding,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import TouchableButton from "../../compoments/touchable-button";

interface Props {
}

interface State {

}

@connect(state => state.login, {...actions})
class MyTags extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }

  constructor(props) {
    super(props);
    console.log(this.viewRef);
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'我的标签'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          {/*我的标签*/}
          <View style={styleAssign([wRatio(100), h(153), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(16)])}>
              <Text style={styleAssign([fSize(16), color('#343434')])}>我的标签</Text>
              <Text style={styleAssign([fSize(12), color('#979797'), ml(20)])}>长按拖动可以排序(最多添加4个标签)</Text>
            </View>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(8)])}>
              {
                ['90后', '夜跑', '旅行', '摄影'].map((value, index) => {
                  return (<View
                    key={index}
                    style={styleAssign([styles.uac, styles.ujc, padding([6, 15, 6, 15]), radiusA(14)])}>
                    <TouchableButton customStyle={styleAssign([styles.uac, styles.ujc, radiusA(14),
                      padding([6, 15, 6, 15]), bgColor('#E7E7E7')])}>
                      <Text style={styleAssign([fSize(12), color('#343434')])}>{value}</Text>
                      <Image style={styleAssign([w(15), h(15), styles.upa, absT(-5), absR(-5)])}
                             src={require('../../assets/ico_close.png')}/>
                    </TouchableButton>
                  </View>);
                })
              }
            </View>
            <View style={styleAssign([styles.udr, mt(16), styles.uae])}>
              <TouchableButton
                customStyle={styleAssign([styles.uac, styles.udr, ml(20), bgColor(commonStyles.colorTheme),
                  w(95), h(28), radiusA(14), styles.uac, styles.ujc])}>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <Image style={styleAssign([w(12), h(12)])} src={require('../../assets/ico_black_add.png')}/>
                  <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>自定义标签</Text>
                </View>
              </TouchableButton>
              <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme), ml(14)])}>（仅限于兴趣爱好）</Text>
            </View>
          </View>
          {/*常用标签*/}
          <View style={styleAssign([wRatio(100), h(154), mt(8), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(20), mt(16)])}>常用标签</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(8),
              styles.uWrap])}>
              {
                ['90后', '看电影', '电竞游戏', '运动', '健身', '看书', '旅行'].map((value, index) => {
                  return (<TouchableButton key={index}
                                customStyle={styleAssign([ml(24), mt(12), radiusA(14), padding([6, 16, 6, 16]), bo(1), bdColor(commonStyles.colorTheme), {
                                  borderStyle: 'solid'
                                }])}>
                    <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme)])}>{value}</Text>
                  </TouchableButton>);
                })
              }
            </View>
          </View>
        </View>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default MyTags;
