/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {styleAssign, transformTime} from "../../../utils/datatool";
import styles, {
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  mb,
  ml,
  mr,
  mt,
  pl,
  pr,
  pt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";
import {TaskModel} from "../../../const/global";


interface Props {
  itemData: TaskModel;
}

interface State {
}

export default class TaskItem extends PureComponent<Props, State> {

  render() {
    let {itemData} = this.props;

    return (
      <View style={styleAssign([wRatio(100), h(143), styles.uac, styles.ujc, mt(10), mb(10)])}>
        <View style={styleAssign([w(335), h(153), bgColor(commonStyles.whiteColor), radiusA(4)])}>
          <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujb,
            pl(16), pr(16), pt(20)])}>
            <Text style={styleAssign([fSize(16), color('#343434')])}>{itemData.theme}</Text>
            <TouchableButton
              customStyle={styleAssign([w(72), h(28), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc])}>
              <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>移至完成</Text>
            </TouchableButton>
          </View>
          <Text style={styleAssign([fSize(12), color('#343434'), mt(10), ml(20)])}>{itemData.remark}</Text>
          <View
            style={styleAssign([wRatio(100), h(1), mt(16), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View style={styleAssign([styles.uf1, styles.uac, styles.udr, styles.ujb])}>
            <Text style={styleAssign([fSize(10), color('#A6A6A6'), mt(4), ml(20)])}>{transformTime(itemData.createTime)}</Text>
            <TouchableButton customStyle={styleAssign([styles.uac, styles.ujc, mr(16),styles.utxdu])}>
              <Text style={styleAssign([color('#313137'), fSize(12)])}>查看关联客户</Text>
            </TouchableButton>
          </View>
        </View>
      </View>
    );
  }
}
