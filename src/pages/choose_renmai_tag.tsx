/**
 * @filename choose_renmai_tag.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/7
 * @Description: 选择兴趣人脉
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../compoments/safe-area-view";
import {styleAssign} from "../utils/datatool";
import {
  absB,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  radiusA,
  w,
  wRatio
} from "../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../actions/login';
import NavigationBar from "../compoments/navigation_bar";
import {Image, Text, View} from "@tarojs/components";

interface Props {
  suggestionAdd: any;
}

interface State {
}

@connect(state => state.login, {...actions})
class ChooseRenmaiTag extends Component<Props, State> {

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
        <View style={styleAssign([wRatio(100), h(144)])}>
          <Image style={styleAssign([wRatio(100), h(144), styles.upa, absT(0)])}
                 src={require('../assets/ico_xingqu_renmai.png')}/>
          <View style={styleAssign([wRatio(100), styles.upa, absB(30), styles.uac, styles.ujc])}>
            <Text style={styleAssign([fSize(22), color(commonStyles.whiteColor)])}>
              选择你感兴趣的人脉
            </Text>
            <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>
              选择后将为你优先推荐此兴趣人脉
            </Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), styles.udr, styles.uWrap, mt(30), styles.uac, styles.ujc])}>
          {
            ['摄影', '舞蹈', '旅行', '书画', '健身运动', '电竞游戏', '看书', '骑行', '登山', '音乐', '看电影', '美食', '收藏', '学习', '其他'].map((value, index) => {
              return <View
                key={index}
                style={styleAssign([styles.uac, styles.ujc, w(97), h(39), radiusA(20), mt(20), bo(1),
                  {borderStyle: 'solid',}, bdColor('rgb(229,229,229)'), ml(index % 3 === 0 ? 0 : 23)])}>
                <Text style={styleAssign([fSize(14), color('#343434')])}>
                  {value}
                </Text>
              </View>;
            })
          }
        </View>
        <NavigationBar style={styleAssign([styles.upa, absT(0)])}>
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac])}>
            <View style={styleAssign([w(40), h(40), styles.uac, styles.ujc, ml(10)])}
                  onClick={() => {
                    Taro.navigateBack();
                  }}>
              <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor), styles.utxdu])}>
                跳过
              </Text>
            </View>
          </View>
        </NavigationBar>
      </CustomSafeAreaView>
    );
  }
}

export default ChooseRenmaiTag;
