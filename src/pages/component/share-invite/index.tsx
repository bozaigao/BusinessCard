/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 小程序分享
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Button, Text, View} from "@tarojs/components";
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
  op, pl, pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";


interface Props {
  cancelCallback: any;
  confirmCallback: any;
}

interface State {
}

export default class ShareInvite extends PureComponent<Props, State> {

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
          <View style={styleAssign([w(271), h(132), bgColor(commonStyles.whiteColor), radiusA(10)])}>
            <View style={styleAssign([wRatio(100), styles.uac, pl(30), pr(30)])}>
              <Text style={styleAssign([fSize(14), color('#0C0C0C'), mt(20)])}>此客户暂未使用极易推小程序，你可以前去邀请</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(1), mt(15), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([styles.uf1, styles.udr, styles.uac])}>
              <Button style={styleAssign([styles.uf1, styles.uac, styles.ujc,bgColor(commonStyles.whiteColor)])}
                      onClick={cancelCallback}>
                <Text style={styleAssign([fSize(17), color('#343434')])}>取消</Text>
              </Button>
              <View style={styleAssign([w(1), hRatio(100), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <Button openType={'share'}
                      style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.whiteColor)])}
                      onClick={confirmCallback}>
                <Text style={styleAssign([fSize(17), color('#E2BB7B')])}>去邀请</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
