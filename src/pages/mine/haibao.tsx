/**
 * @filename haibao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 海报
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  bdColor,
  bgColor, bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h, hRatio, ma,
  ml,
  mt, pa,
  pl, pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";

interface Props {
}

interface State {

}

@connect(state => state.login, {...actions})
class Haibao extends Component<Props, State> {

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
        <TopHeader title={'海报'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor), styles.uac])}>
          {/*导航条*/}
          <ScrollView
            style={styleAssign([{whiteSpace: 'nowrap'}, wRatio(100), h(41), {paddingLeft: '5%'},
              bgColor(commonStyles.whiteColor)])}
            scrollX>
            {
              ['热点话题', '早晚问候', '业绩催单', '人才招聘', '节日海报', '热点话题', '早晚问候', '业绩催单', '人才招聘', '节日海报'].map((value, index) => {
                console.log(value);
                return (<View style={styleAssign([styles.uac, mt(5), ml(20), {display: 'inline-block'}])}
                              key={index}>
                  <Text
                    style={styleAssign([fSize(14), color(index === 0 ? '#E2BB7B' : commonStyles.colorTheme)])}>{value}</Text>
                  <View
                    style={styleAssign([w(25), h(2), radiusA(1), bgColor(index === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(5),
                      ml(15)])}/>
                </View>);
              })
            }
          </ScrollView>
          <View style={styleAssign([wRatio(100), h(4), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <ScrollView
            style={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor), wRatio(100), hRatio(100), mt(16)])}
            scrollY>
            <View style={styleAssign([styles.uWrap, styles.udr, pl(14), pr(14)])}>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
                  console.log(value);
                  return (
                    <View style={styleAssign([ma(5), w(105), h(267), pa(8), bgColor(commonStyles.whiteColor),
                      radiusA(4)])}
                          key={index}>
                      <Image style={styleAssign([w(97), h(186), radiusA(4)])}
                             src={require('../../assets/ico_default.png')}/>
                      <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
                        <TouchableButton
                          customStyle={styleAssign([w(72), h(28), bo(1), bdColor(commonStyles.colorTheme), {borderStyle: 'solid'},
                            styles.uac, styles.ujc, radiusA(4)])}>
                          <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>立即使用</Text>
                        </TouchableButton>
                      </View>
                    </View>);
                })
              }
            </View>
          </ScrollView>
        </View>
      </CustomSafeAreaView>);
  }
}

export default Haibao;
