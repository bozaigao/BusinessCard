/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 商品管理item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {parseData, styleAssign, transformTime} from "../../../utils/datatool";
import styles, {
  absL, absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  h,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";
import {Goods} from "../../../const/global";


interface Props {
  itemData: Goods;
  moreCallback: any;
  xiajiaCallback: any;
  notTopGoodsCallback: any;
}

interface State {
}

export default class GoodsManageItem extends PureComponent<Props, State> {

  render() {
    let {itemData, moreCallback, xiajiaCallback,notTopGoodsCallback} = this.props;

    return (
      <View style={styleAssign([wRatio(100), h(189), bgColor(commonStyles.whiteColor), mt(10)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(16)])}>
          <View style={styleAssign([w(90), h(90)])}>
            <Image style={styleAssign([w(90), h(90), radiusA(4)])} src={parseData(itemData.carouselUrl)[0]}/>
            {
              itemData.showHomepage === 1 && <Image style={styleAssign([w(36), h(36), styles.upa, absL(0), absT(0)])}
                                                    src={require('../../../assets/ico_top.png')}/>
            }
          </View>
          <View style={styleAssign([ml(12)])}>
            <Text style={styleAssign([fSize(18), color('#343434')])}>{itemData.name}</Text>
            <View style={styleAssign([styles.uac, styles.udr, mt(16)])}>
              <Text style={styleAssign([fSize(12), color('#A6A6A6')])}>参考价格：</Text>
              <Text style={styleAssign([fSize(18), color('#FA541C')])}>{`¥${itemData.price}`}</Text>
            </View>
            <Text
              style={styleAssign([fSize(12), color('#A6A6A6'), mt(4)])}>{`创建时间：${transformTime(itemData.createTime)}`}</Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), h(120), styles.upa, absT(0)])}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/businesscard/goods_detail?itemData=${JSON.stringify(itemData)}`
                });
              }}/>
        <View
          style={styleAssign([wRatio(95), h(1), {marginLeft: '2.5%'}, bgColor(commonStyles.pageDefaultBackgroundColor), mt(20)])}/>
        {/*底部操作栏*/}
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
          pl(20), pr(20)])}>
          <View style={styleAssign([styles.udr, styles.uac])}>
            {/*更多*/}
            <TouchableButton
              customStyle={styleAssign([w(52), h(28), radiusA(4), bo(1), bdColor(commonStyles.colorTheme),
                {borderStyle: 'solid'}, styles.uac, styles.ujc])}
              onClick={() => {
                moreCallback(itemData);
              }}>
              <Text style={styleAssign([fSize(12), color('#343434')])}>更多</Text>
            </TouchableButton>
            {/*下架商品*/}
            <TouchableButton
              onClick={() => {
                xiajiaCallback(itemData);
              }}
              customStyle={styleAssign([ml(32), w(72), h(28), radiusA(4), bo(1), bdColor(commonStyles.colorTheme),
                {borderStyle: 'solid'}, styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(12), color('#343434')])}>下架商品</Text>
            </TouchableButton>
          </View>
          {/*是否展示操作*/}
          <TouchableButton
            onClick={() => {
              notTopGoodsCallback(itemData);
            }}
            customStyle={styleAssign([w(72), h(28), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc])}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>取消展示</Text>
          </TouchableButton>
        </View>
      </View>
    );
  }
}
