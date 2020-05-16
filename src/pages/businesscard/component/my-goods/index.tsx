/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 我的商品
 */
import Taro, {Component} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {parseData, styleAssign} from "../../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mt, pa, radiusA, w, wRatio, pl, pr} from "../../../../utils/style";
import TouchableButton from "../../../../compoments/touchable-button/index";
import {Goods} from "../../../../const/global";


interface Props {
  goToMoreGoods: any;
  goToGoodsDetail: any;
  goodsList: Goods[];
}

interface State {
}

export default class MyGoods extends Component<Props, State> {


  render() {

    let {goToMoreGoods, goToGoodsDetail, goodsList} = this.props;
    let listData: Goods[] = [];

    if (goodsList.length <= 3) {
      listData = goodsList;
    } else {
      listData = [goodsList[0], goodsList[1], goodsList[2]];
    }

    return (
      <View style={styleAssign([wRatio(100), pl(20), pr(20)])}>
        <View style={styleAssign([styles.uac, styles.udr, wRatio(100), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <View style={styleAssign([styles.uf1, styles.udr, styles.uac, styles.ujb])}>
            <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的商品</Text>
            <View style={styleAssign([w(40), h(40), styles.uac, styles.ujc])}
                  onClick={() => {
                    goToMoreGoods();
                  }
                  }>
              <Image style={styleAssign([w(7), h(12)])} src={require('../../../../assets/ico_next.png')}/>
            </View>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), mt(16)])}>
          {
            listData.map((value: Goods, index) => {
              console.log(value);
              return (
                <TouchableButton
                  onClick={() => {
                    goToGoodsDetail(value);
                  }}
                  customStyle={styleAssign([wRatio(100), styles.udr, styles.uac, mt(10), h(152), pa(8), bgColor(commonStyles.whiteColor)])}
                  key={index}>
                  <Image style={styleAssign([w(120), h(120), radiusA(4)])}
                         src={value.carouselUrl ? parseData(value.carouselUrl)[0] : ''}
                         onClick={(e) => {
                           e.stopPropagation();
                           goToGoodsDetail(value);
                         }}/>
                  <View style={styleAssign([styles.uf1, styles.ujb])}>
                    <Text
                      style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8), mt(12), color('#373838')])}>{value.name}</Text>
                    <View>
                      <Text style={styleAssign([fSize(18), color('#FA6B57'), ml(8), mt(12)])}>{`￥${value.price}`}</Text>
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
