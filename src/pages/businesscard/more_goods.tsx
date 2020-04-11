/**
 * @filename more_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 更多商品
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {parseData, styleAssign} from "../../utils/datatool";
import styles, {
  absT,
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ml,
  mt,
  pa,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {User} from "../../const/global";
import TouchableButton from "../../compoments/touchable-button/index";

interface Props {
  userInfo: User;
}

interface State {

}

@connect(state => state.login, {...actions})
class MoreGoods extends Component<Props, State> {

  private viewRef;
  private goodsList;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    
  }

  constructor(props) {
    super(props);
    this.goodsList = parseData(this.$router.params.goodsList);
    console.log(this.viewRef);
  }


  render() {


    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'更多商品'}/>
        <ScrollView
          style={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor), wRatio(100), hRatio(100), mt(16)])}
          scrollY>
          {
            this.goodsList.map((value, index) => {
              console.log(value);
              return (
                <TouchableButton
                  customStyle={styleAssign([wRatio(90), styles.udr, styles.uac, {marginLeft: '5%'}, mt(10), h(152), pa(8), bgColor(commonStyles.whiteColor)])}
                  key={index}
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/mine/goods_detail?id=${value.id}`
                    });
                  }
                  }>
                  <Image style={styleAssign([w(120), h(120), radiusA(4)])}
                         src={value.carouselUrl ? parseData(value.carouselUrl)[0] : ''}/>
                  <View style={styleAssign([styles.uf1, styles.ujb])}>
                    <Text
                      style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8), mt(12), color('#373838')])}>{value.name}</Text>
                    <View>
                      <Text style={styleAssign([fSize(18), color('#FA6B57'), ml(8), mt(32)])}>{`￥${value.price}`}</Text>
                    </View>
                    <View style={styleAssign([wRatio(100), h(90),
                      styles.upa, absT(0)])}
                          onClick={() => {
                          }}/>
                  </View>
                </TouchableButton>);
            })
          }
        </ScrollView>
      </CustomSafeAreaView>);
  }
}

export default MoreGoods;
