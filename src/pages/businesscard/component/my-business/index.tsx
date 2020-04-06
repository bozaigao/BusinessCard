/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @function: 我的企业
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, Video, View} from "@tarojs/components";
import {styleAssign} from "../../../../utils/datatool";
import styles, {
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../../utils/style";
import {User} from "../../../../const/global";


interface Props {
  userInfo: User;
  addRadarTrace: any;
}

interface State {
}

export default class MyBusiness extends PureComponent<Props, State> {

  render() {
    let {userInfo, addRadarTrace} = this.props;

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的企业</Text>
        </View>
        <View
          style={styleAssign([{width: '95%'}, {marginLeft: '2.5%'}, mt(16), h(270), bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([wRatio(100), h(76), styles.udr, styles.uac, styles.ujb, pl(16), pr(16)])}>
            <View style={styleAssign([styles.udr, styles.uac])}>
              <Image style={styleAssign([w(40), h(40), radiusA(4)])} src={userInfo.enterpriseLogo}/>
              {
                userInfo.enterpriseName.length !== 0 &&
                <Text style={styleAssign([fSize(16), color('#313137'), ml(6)])}>{userInfo.enterpriseName}</Text>
              }
            </View>
            <View style={styleAssign([w(72), h(28), radiusA(4), styles.uac, styles.ujc,
              bo(1), bdColor(commonStyles.colorTheme), {borderStyle: 'solid'}])}>
              <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme)])}>进入官网</Text>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {
            userInfo.enterpriseVideo.length !== 0 &&
            <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
              <Video
                style={styleAssign([wRatio(90), hRatio(90), bgColor(commonStyles.whiteColor)])}
                src={userInfo.enterpriseVideo}
                onPlay={() => {
                  addRadarTrace('play_company_video');
                }}
                autoplay={false}
                objectFit={'fill'}
                poster='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3466612495,3967902081&fm=26&gp=0.jpg'
                initialTime={1}
                id='video'
                loop={false}
                muted={false}
                showPlayBtn={true}
                showProgress={true}/>
            </View>
          }
        </View>
      </View>
    );
  }
}
