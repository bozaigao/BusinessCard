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
  absB,
  absR,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  ma,
  ml,
  mt,
  pl,
  pr, pt,
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
  currentIndex: number;
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
    this.state = {
      currentIndex: 0
    }
  }


  render() {
    let {currentIndex} = this.state;

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
              ['热点话题', '早晚问候', '每日励志', '人才招聘', '节日节气'].map((value, index) => {
                console.log(value);
                return (
                  <View style={styleAssign([styles.uac, mt(5), ml(index !== 0 ? 20 : 0), {display: 'inline-block'}])}
                        key={index}
                        onClick={() => {
                          this.setState({currentIndex: index});
                        }}>
                    <Text
                      style={styleAssign([fSize(14), color(index === currentIndex ? '#E2BB7B' : commonStyles.colorTheme)])}>{value}</Text>
                    <View
                      style={styleAssign([w(50), h(2), radiusA(1), bgColor(index === currentIndex ? '#E2BB7B' : commonStyles.whiteColor), mt(5),
                        ml(5)])}/>
                  </View>);
              })
            }
          </ScrollView>
          <View style={styleAssign([wRatio(100), h(4), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <ScrollView
            style={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor), wRatio(100), hRatio(100)])}
            scrollY>
            <View style={styleAssign([styles.uWrap, styles.udr, pl(14), pr(14), bgColor(commonStyles.whiteColor)])}>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, index) => {
                  console.log(value);
                  return (
                    <View style={styleAssign([ma(4), w(107), h(247), bgColor(commonStyles.whiteColor),
                      radiusA(4)])}
                          key={index}>
                      <View style={styleAssign([w(107), h(178), radiusA(4)])}>
                        <Image style={styleAssign([w(107), h(178), radiusA(4)])}
                               src={`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582355731670&di=55fa50f48a87b1399348f669bf581b97&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F341%2F16456.jpg`}/>
                        <Image style={styleAssign([w(20), h(20), radiusA(10), styles.upa, absB(5), absR(5)])}
                               src={`https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582356001454&di=25b8ab4031e2bacf6ca011bceee981b6&imgtype=0&src=http%3A%2F%2Fwww.hntianwang.com%2Fdata%2Fupload%2Fimage%2F20171015%2F1508057715985296.jpg`}/>
                      </View>
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
