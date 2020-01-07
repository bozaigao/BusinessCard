/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 我的商品
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mt, pa, radiusA, w, wRatio} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";


interface Props {
  goToMoreGoods: any;
  goToGoodsDetail: any;
}

interface State {
}

export default class MyGoods extends PureComponent<Props, State> {

  render() {

    let {goToMoreGoods, goToGoodsDetail} = this.props;

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的商品</Text>
        </View>
        <View style={styleAssign([wRatio(100), mt(16)])}>
          {
            [1, 2, 3].map((value, index) => {
              console.log(value);
              return (
                <TouchableButton
                  customStyle={styleAssign([wRatio(90), styles.udr, styles.uac, {marginLeft: '5%'}, mt(10), h(152), pa(8), bgColor(commonStyles.whiteColor)])}
                  key={index}
                  onClick={goToGoodsDetail}>
                  <Image style={styleAssign([w(120), h(120), radiusA(4)])}
                         src={require('../../../assets/ico_default.png')}/>
                  <View style={styleAssign([styles.uf1, styles.ujb])}>
                    <Text
                      style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8), mt(12), color('#373838')])}>现代简约双人木床</Text>
                    <View>
                      <Text style={styleAssign([fSize(18), color('#FA6B57'), ml(8), mt(12)])}>￥688</Text>
                      <Text style={styleAssign([fSize(16), color('#979797'), ml(8), mt(17)])}>点击了解更多</Text>
                    </View>
                  </View>
                </TouchableButton>);
            })
          }
        </View>
      </View>
    );
  }
}
