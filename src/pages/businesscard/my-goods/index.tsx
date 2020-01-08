/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 我的商品
 */
import Taro, {Component} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {parseData, styleAssign} from "../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mt, pa, radiusA, w, wRatio} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";
import {Goods} from "../../../const/global";


interface Props {
  goToMoreGoods: any;
  goToGoodsDetail: any;
  goodsList: Goods[];
}

interface State {
}

export default class MyGoods extends Component<Props, State> {

  componentDidMount() {
    // console.log('北部属性',this.props.goodsList);

  }

  render() {

    let {goToMoreGoods, goToGoodsDetail, goodsList} = this.props;
    let listData: Goods[] = [];

    if (goodsList.length <= 3) {
      listData = goodsList;
    } else {
      listData = [goodsList[0], goodsList[1], goodsList[2]];
    }

    console.log('北部属性', this.props.goodsList);

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的商品</Text>
        </View>
        <View style={styleAssign([wRatio(100), mt(16)])}>
          {
            listData.map((value: Goods, index) => {
              console.log(value);
              return (
                <TouchableButton
                  customStyle={styleAssign([wRatio(90), styles.udr, styles.uac, {marginLeft: '5%'}, mt(10), h(152), pa(8), bgColor(commonStyles.whiteColor)])}
                  key={index}
                  onClick={() => {
                    goToGoodsDetail(value);
                  }}>
                  <Image style={styleAssign([w(120), h(120), radiusA(4)])}
                         src={value.carouselUrl ? parseData(value.carouselUrl)[0] : ''}/>
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
