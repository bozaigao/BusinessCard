/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 商品分享
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Button, Image, Text, View} from "@tarojs/components";
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
import TouchableButton from "../../../compoments/touchable-button/index";


interface Props {
  friendShare: any;
  downloadPic: any;
  wechatShare: any;
  cancle: any;
}

interface State {
}

export default class ShareModal extends PureComponent<Props, State> {

  render() {

    let {friendShare, downloadPic, cancle} = this.props;

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
          <View style={styleAssign([wRatio(100), h(148), styles.udr, styles.uac, styles.ujb])}>
            <Button openType={'share'}
                    style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.whiteColor)])}>
              <Image style={styleAssign([w(62), h(62)])} src={require('../../../../assets/ico_wechat.png')}/>
              <Text style={styleAssign([fSize(13), color('#0C0C0C'), mt(5)])}>微信好友</Text>
            </Button>
            <Button style={styleAssign([styles.uac, styles.uf1, bgColor(commonStyles.whiteColor)])}
                    onClick={friendShare}>
              <Image style={styleAssign([w(62), h(62)])} src={require('../../../assets/ico_wechat_friend.png')}/>
              <Text style={styleAssign([fSize(13), color('#0C0C0C'), mt(5)])}>朋友圈</Text>
            </Button>
            <Button style={styleAssign([styles.uac, styles.uf1, bgColor(commonStyles.whiteColor)])}
                    onClick={downloadPic}>
              <Image style={styleAssign([w(62), h(62)])} src={require('../../../assets/ico_download_pic.png')}/>
              <Text style={styleAssign([fSize(13), color('#0C0C0C'), mt(5)])}>保存到手机</Text>
            </Button>
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
