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
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  fWeight,
  h,
  ml,
  mr,
  mt,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import {cloudBaseUrl} from "../../../api/httpurl";
import {User} from "../../../const/global";
import CardStyle5 from "../../../compoments/card-style5/index";
import CardStyle1 from "../../../compoments/card-style1/index";
import CardStyle2 from "../../../compoments/card-style2/index";
import CardStyle4 from "../../../compoments/card-style4/index";
import CardStyle3 from "../../../compoments/card-style3/index";


interface Props {
  shareClick: any;
  collectCallback: any;
  visitorCallback: any;
  viewMyCardCallback: any;
  gotoCardCallback: any;
  userInfo: User;
  holderCount: number;
  visitorCount: number;
  cardStyle: string;
  hidePhone: number;
  hideWechat: number;
  hideEmail: number;
  hideAddress: number;
}

interface State {
}

export default class Card extends PureComponent<Props, State> {

  render() {
    let {holderCount, visitorCount, cardStyle, hidePhone, hideWechat, hideEmail, hideAddress} = this.props;

    let {shareClick, collectCallback, visitorCallback, viewMyCardCallback, gotoCardCallback, userInfo} = this.props;
    //@ts-ignore
    let cardChild = null;

    if (cardStyle === '0') {
      //@ts-ignore
      cardChild = <CardStyle1 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    } else if (cardStyle === '1') {
      //@ts-ignore
      cardChild = <CardStyle2 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    } else if (cardStyle === '2') {
      //@ts-ignore
      cardChild = <CardStyle3 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    } else if (cardStyle === '3') {
      //@ts-ignore
      cardChild = <CardStyle4 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    } else if (cardStyle === '4') {
      //@ts-ignore
      cardChild = <CardStyle5 userInfo={userInfo} width={334} height={202} hidePhone={hidePhone === 0}
                              hideAddress={hideAddress === 0} hideEmail={hideEmail === 0}
                              hideWechat={hideWechat === 0}/>
    }

    return (
      <View style={styleAssign([wRatio(100), styles.uac, mt(20)])}>
        <View style={styleAssign([w(334), h(249), bgColor(commonStyles.whiteColor), radiusA(10)])}>
          {cardChild}
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
