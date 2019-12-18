/**
 * @filename add_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 添加商品
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  bdColor,
  bgColor, bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio, mb,
  ml,
  mt, pa, pb,
  pl,
  pr, radiusA, w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/home';
import TopHeader from "../../compoments/top-header";
import {Image, Input, ScrollView, Text, Textarea, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class AddGoods extends Component<Props, State> {

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
    this.state = {}
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'添加商品'}/>
        <ScrollView style={styleAssign([wRatio(100), hRatio(100),pb(5), bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY>
          {/*商品基本信息*/}
          <View style={styleAssign([wRatio(100), h(295), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View style={styleAssign([wRatio(100), styles.uac])}>
              {
                [{title: '商品名称', placeHolder: '15个字以内'}, {title: '参考价格', placeHolder: '必填'}].map((value, index) => {
                  return (<View style={styleAssign([wRatio(100)])} key={index}>
                    <View
                      style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                      <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>{value.title}</Text>
                      <Input type='text' value={''}
                             style={styleAssign([ml(16), fSize(14), {textAlign: 'right'}])}
                             placeholder={value.placeHolder}/>
                    </View>
                    <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  </View>);
                })
              }
              <View
                style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
                <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>轮播图(最多5张)</Text>
              </View>
              <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), mt(10), mb(20)])}>
                <View
                  style={styleAssign([ml(20), w(105), h(105), bgColor(commonStyles.pageDefaultBackgroundColor), radiusA(4), styles.uac, styles.ujc])}>
                  <Image style={styleAssign([w(40), h(40)])} src={require('../../assets/ico_add.png')}/>
                </View>
              </View>
            </View>
          </View>
          {/*商品简介*/}
          <View style={styleAssign([wRatio(100), h(259), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View
              style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
              <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>商品简介</Text>
            </View>
            <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <Textarea value={''}
                      placeholder={'请输入公司简介'}
                      style={styleAssign([w(300), h(140), fSize(16), mt(10), ml(20),
                        bgColor(commonStyles.pageDefaultBackgroundColor), pa(16)])}/>
          </View>
          {/*详情图*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View
              style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
              <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>详情图</Text>
            </View>
            <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100), mt(10), mb(20)])}>
              <View
                style={styleAssign([ml(20), w(105), h(105), bgColor(commonStyles.pageDefaultBackgroundColor), radiusA(4), styles.uac, styles.ujc])}>
                <Image style={styleAssign([w(40), h(40)])} src={require('../../assets/ico_add.png')}/>
              </View>
            </View>
          </View>
        </ScrollView>
        {/*保存和上架*/}
        <View style={styleAssign([wRatio(100), h(63), bgColor(commonStyles.whiteColor),
          styles.uac, styles.ujc])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <TouchableButton customStyle={styleAssign([w(162), h(47), bo(1), bdColor(commonStyles.colorTheme),
              {borderStyle: 'solid'}, radiusA(2), styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(20), color('#343434')])}>保存商品</Text>
            </TouchableButton>
            <TouchableButton customStyle={styleAssign([ml(10), w(162), h(47), bgColor(commonStyles.colorTheme),
              radiusA(2), styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>立即上架</Text>
            </TouchableButton>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default AddGoods;
