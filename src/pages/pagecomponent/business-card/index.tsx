/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 个人名片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absB,
  absL,
  absR,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  fWeight,
  h,
  ml, mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import {cloudBaseUrl} from "../../../api/httpurl";
import {User} from "../../../const/global";


interface Props {
  shareClick: any;
  collectCallback: any;
  visitorCallback: any;
  viewMyCardCallback: any;
  gotoCardCallback: any;
  userInfo: User;
  holderCount: number;
  visitorCount: number;
}

interface State {
}

export default class Card extends PureComponent<Props, State> {

  render() {
    let {holderCount,visitorCount} = this.props;

    let {shareClick, collectCallback, visitorCallback, viewMyCardCallback, gotoCardCallback, userInfo} = this.props;

    return (
      <View style={styleAssign([wRatio(100), styles.uac, mt(20)])}>
        <View style={styleAssign([w(334), h(249), bgColor(commonStyles.whiteColor), radiusA(10)])}>
          <View style={styleAssign([wRatio(100), h(202), bgColor('rgb(211,199,195)'), radiusA(10),
            styles.udr, styles.uje])}>
            <Image style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}
                   src={require('../../../assets/ico_business_card_bg.png')}/>
            <View style={styleAssign([wRatio(100), h(204), styles.upa, absT(0)])}>
              <View
                style={styleAssign([wRatio(100), h(204), radiusA(10), styles.upa, absL(0), absT(0)])}/>
              <View style={styleAssign([styles.upa, absL(20), absT(15)])}>
                <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                       src={userInfo.avatar}/>
                <View style={styleAssign([styles.uae, styles.udr, mt(6)])}>
                  <Text style={styleAssign([fSize(18), fWeight('bold')])}>{userInfo.name}</Text>
                  <Text style={styleAssign([fSize(12), ml(8)])}>{userInfo.position}</Text>
                </View>
                <Text style={styleAssign([fSize(12), color('#343434')])}>{userInfo.company}</Text>
              </View>
              <View style={styleAssign([styles.uae, styles.upa, absB(26), absR(24)])}>
                {/*电话号码*/}
                <View style={styleAssign([styles.uac, styles.udr])}>
                  <Text
                    style={styleAssign([fSize(12), color('#343434')])}>{userInfo.phone}</Text>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_mobile.png`}/>
                </View>
                {/*微信号*/}
                <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                  <Text
                    style={styleAssign([fSize(12), color('#343434')])}>{userInfo.wechat}</Text>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_wechat.png`}/>
                </View>
                {/*邮箱*/}
                <View style={styleAssign([styles.uac, styles.udr, mt(8)])}>
                  <Text
                    style={styleAssign([fSize(12), color('#343434')])}>{userInfo.email ? userInfo.email : '邮箱信息未对外公开'}</Text>
                  <Image style={styleAssign([w(12), h(10), ml(8)])} src={`${cloudBaseUrl}ico_card_email.png`}/>
                </View>
                {/*地址*/}
                <View style={styleAssign([styles.udr, mt(8)])}>
                  <Text
                    style={styleAssign([fSize(12), color('#343434')])}>{userInfo.detailAddress}</Text>
                  <Image style={styleAssign([w(9), h(11), ml(8), mt(4)])} src={`${cloudBaseUrl}ico_card_location.png`}/>
                </View>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(45), styles.udr, styles.uac, styles.ujb])}
                onClick={gotoCardCallback}>
            <Text
              style={styleAssign([fSize(12), color('#29292E'), ml(16)])}>我的名片</Text>
            <View style={styleAssign([styles.udr, styles.uac, mr(16)])}>
              <Image style={styleAssign([w(18), h(18)])} src={require('../../../assets/ico_mingpianma.png')}/>
              <Image style={styleAssign([w(7), h(12), ml(12)])} src={require('../../../assets/ico_next.png')}/>
            </View>
          </View>
        </View>
        {/*拨打电话等操作*/}
        <View style={styleAssign([wRatio(100), h(144), bgColor(commonStyles.whiteColor), styles.uac, mt(20)])}>
          <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(20)])}>
            <View style={styleAssign([styles.uf1, styles.uac])}
                  onClick={collectCallback}>
              <Text style={styleAssign([fSize(18), color('#343434'), fWeight('bold')])}>{holderCount}</Text>
              <View style={styleAssign([styles.udr, styles.uac])}>
                <Image style={styleAssign([w(11), h(11)])} src={`${cloudBaseUrl}ico_star_gray.png`}/>
                <Text style={styleAssign([fSize(12), color('#979797'), ml(5)])}>收藏</Text>
              </View>
            </View>
            <View style={styleAssign([w(1), h(25), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([styles.uf1, styles.uac])} onClick={visitorCallback}>
              <Text style={styleAssign([fSize(18), color('#343434'), fWeight('bold')])}>{visitorCount}</Text>
              <View style={styleAssign([styles.udr, styles.uac])}>
                <Image style={styleAssign([w(11), h(11)])} src={`${cloudBaseUrl}ico_person_gray.png`}/>
                <Text style={styleAssign([fSize(12), color('#979797'), ml(5)])}>访客</Text>
              </View>
            </View>
          </View>
          {/*完善分享名片*/}
          <View
            style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujc, h(44), bgColor(commonStyles.whiteColor), mt(20)])}>
            <View style={styleAssign([styles.udr, styles.uac])}>
              <TouchableButton
                customStyle={styleAssign([w(160), radiusA(4), styles.uac, styles.ujc, bo(1), {borderStyle: 'solid'}, bdColor(commonStyles.colorTheme),
                  bgColor(commonStyles.whiteColor), h(44)])}
                onClick={viewMyCardCallback}>
                <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>查看名片</Text>
              </TouchableButton>
              <TouchableButton
                customStyle={styleAssign([w(160), radiusA(4), ml(15), styles.uac, styles.ujc, bo(1), h(44),
                  bdColor(commonStyles.colorTheme), bgColor(commonStyles.colorTheme)])}
                onClick={shareClick}>
                <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>分享名片</Text>
              </TouchableButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
