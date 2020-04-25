/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/5
 * @Description: 删除提示
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
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
} from "../../utils/style";
import TouchableButton from "../touchable-button";


interface Props {
  title: string;
  subTitle: string;
  cancelCallback: any;
  confirmCallback: any;
}

interface State {
}

export default class DeleteNoticeModal extends PureComponent<Props, State> {

  render() {

    let {cancelCallback, confirmCallback, title, subTitle} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View style={styleAssign([wRatio(100), hRatio(100), styles.uac, styles.ujc])}>
          <View style={styleAssign([w(335), h(167), bgColor(commonStyles.whiteColor), radiusA(10)])}>
            <View style={styleAssign([wRatio(100), styles.uac])}>
              <Text style={styleAssign([fSize(20), color('#313137'), mt(20)])}>{title}</Text>
              <Text style={styleAssign([fSize(18), color('#787878'), mt(20),w(280)])}>{subTitle}</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(1), mt(15), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([styles.uf1, styles.udr, styles.uac])}>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}
                    onClick={cancelCallback}>
                <Text style={styleAssign([fSize(20), color('#343434')])}>取消</Text>
              </View>
              <View style={styleAssign([w(1), hRatio(100), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}
                    onClick={confirmCallback}>
                <Text style={styleAssign([fSize(20), color('#E2BB7B')])}>确认</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
