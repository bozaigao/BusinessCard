/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/16
 * @Description: 名片切换item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import {
  absB,
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
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";


interface Props {
  cancle: any;
}

interface State {
}

export default class ShareModal extends PureComponent<Props, State> {

  render() {

    let {cancle} = this.props;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          onClick={cancle}
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0)])}/>
        <View style={styleAssign([wRatio(100), h(194), bgColor(commonStyles.whiteColor), styles.upa, absB(0)])}>
          {/*微信分享、名片海报*/}
          <View style={styleAssign([wRatio(100), h(148), styles.udr, styles.uac])}>
            <View style={styleAssign([styles.uf1, styles.uac])}>
              <Image style={styleAssign([w(62), h(62)])} src={require('../../../assets/ico_wechat.png')}/>
              <Text style={styleAssign([fSize(13), color('#0C0C0C'), mt(5)])}>微信好友</Text>
            </View>
            <View style={styleAssign([styles.uf1, styles.uac])}>
              <Image style={styleAssign([w(62), h(62)])} src={require('../../../assets/ico_haibao.png')}/>
              <Text style={styleAssign([fSize(13), color('#0C0C0C'), mt(5)])}>名片海报</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*取消*/}
          <TouchableButton
            onClick={cancle}
            customStyle={styleAssign([wRatio(100), h(40), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>取消</Text>
          </TouchableButton>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
        </View>
      </View>
    );
  }
}
