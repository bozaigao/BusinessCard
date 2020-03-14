/**
 * @filename choose_renmai_tag.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/7
 * @Description: 选择兴趣人脉
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {styleAssign} from "../../utils/datatool";
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
  iphoneX,
  ml,
  mt,
  radiusA,
  w,
  wRatio, padding, pl, pr, mb
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import * as dictActions from '../../actions/dict';
import NavigationBar from "../../compoments/navigation_bar/index";
import {Image, Text, View, ScrollView} from "@tarojs/components";
import {NetworkState} from "../../api/httpurl";

interface Props {
  suggestionAdd: any;
  getDictItemList: any;
}

interface State {
  chooseValue: string[];
  interest: any[];
}

@connect(state => state.login, Object.assign(actions, dictActions))
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
    this.state = {
      chooseValue: [],
      interest: [],
    }
  }


  componentDidShow() {
    this.getDictItemList();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/8
   * @function: 获取后台配置标签
   */
  getDictItemList = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.getDictItemList({dictCode: 'interest '}).then((res) => {
      console.log('获取后台配置标签', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        this.setState({interest: res});
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {chooseValue, interest} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <View style={styleAssign([wRatio(100), h(iphoneX() ? 189 : 169)])}>
          <Image style={styleAssign([wRatio(100), h(iphoneX() ? 189 : 169), styles.upa, absT(-5)])}
                 src={require('../../assets/ico_xingqu_renmai.png')}/>
          <View style={styleAssign([wRatio(100), styles.upa, absB(30), styles.uac, styles.ujc])}>
            <Text style={styleAssign([fSize(22), color(commonStyles.whiteColor)])}>
              选择你感兴趣的人脉
            </Text>
            <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>
              选择后将为你优先推荐此兴趣人脉
            </Text>
          </View>
        </View>
        <ScrollView
          style={styleAssign([styles.uf1, mt(30), styles.uac, bgColor(commonStyles.whiteColor)])}
          scrollY>
          <View style={styleAssign([wRatio(100), styles.uWrap, styles.udr, styles.uac, styles.uja, pl(20), pr(20)])}>
            {
              interest.map((value, index) => {
                return <View
                  onClick={() => {
                    if (chooseValue.includes(value.itemText)) {
                      this.state.chooseValue.splice(this.state.chooseValue.indexOf(value.itemText), 1);
                    } else {
                      this.state.chooseValue.push(value.itemText);
                    }
                    this.setState({chooseValue: this.state.chooseValue});
                  }}
                  key={index}
                  style={styleAssign([styles.uac, styles.ujc, padding([9, 35, 9, 35]), radiusA(20), mt(20), bo(1),
                    {borderStyle: 'solid',}, bdColor(chooseValue.includes(value.itemText) ? commonStyles.colorTheme : 'rgb(229,229,229)'), ml(index % 3 === 0 ? 0 : 23)])}>
                  <Text style={styleAssign([fSize(14), color('#343434')])}>
                    {value.itemText}
                  </Text>
                </View>;
              })
            }
          </View>
        </ScrollView>
        <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(56)])}>
          <View
            style={styleAssign([w(181), h(46), styles.uac, styles.ujc, bgColor(commonStyles.colorTheme), radiusA(23)])}
            onClick={() => {
              Taro.navigateBack();
            }}>
            <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>
              {`选好了(${chooseValue.length})`}
            </Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(32), mb(20)])}>
          <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>
            极易推 给你极致服务
          </Text>
        </View>
        <NavigationBar style={styleAssign([styles.upa, absT(0)])}>
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac])}>
            <View style={styleAssign([w(40), h(40), styles.uac, styles.ujc, ml(10)])}
                  onClick={() => {
                    Taro.redirectTo({
                      url: `/pages/businesscard/choose_industry_tag`
                    });
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
