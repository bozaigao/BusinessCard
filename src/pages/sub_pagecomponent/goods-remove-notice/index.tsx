/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/29
 * @Description: 商品移除提示
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import {
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  mt,
  op,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";


interface Props {
  cancelCallback: any;
  confirmCallback: any;
}

interface State {
}

export default class GoodsRemoveNoticeModal extends PureComponent<Props, State> {

  render() {

    let {cancelCallback, confirmCallback} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View style={styleAssign([wRatio(100), hRatio(100), styles.uac, styles.ujc])}>
          <View style={styleAssign([w(271), h(106), bgColor(commonStyles.whiteColor), radiusA(10)])}>
            <View style={styleAssign([wRatio(100), styles.uac])}>
              <Text style={styleAssign([fSize(14), color('#0C0C0C'), mt(20)])}>确认将该商品移除？</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(1), mt(15), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([styles.uf1, styles.udr, styles.uac])}>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}
                    onClick={cancelCallback}>
                <Text style={styleAssign([fSize(17), color('#343434')])}>取消</Text>
              </View>
              <View style={styleAssign([w(1), hRatio(100), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}
                    onClick={confirmCallback}>
                <Text style={styleAssign([fSize(17), color('#E2BB7B')])}>确认</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
