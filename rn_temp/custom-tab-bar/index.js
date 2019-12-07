import React from 'react';
import { Component } from "@tarojs/taro-rn";
import { Image, Text, View } from "@tarojs/components-rn";
import { styleAssign } from "../utils/datatool";
import TouchableButton from "../compoments/touchable-button/index.rn";
//@ts-ignore
import iconBusinesscardNormal from '../assets/ico_tabar_businesscard_normal.png';
//@ts-ignore
import iconBusinesscardPressed from '../assets/ico_tabar_businesscard_pressed.png';
//@ts-ignore
import iconTabarradarscanNormal from '../assets/ico_tabar_radarscan_normal.png';
//@ts-ignore
import iconTabarRadarscanPressed from '../assets/ico_tabar_radarscan_pressed.png';
//@ts-ignore
import iconTabarCustomerNormal from '../assets/ico_tabar_customer_normal.png';
//@ts-ignore
import iconTabarCustomerPressed from '../assets/ico_tabar_customer_pressed.png';
//@ts-ignore
import iconTabarMineNormal from '../assets/ico_tabar_mine_normal.png';
//@ts-ignore
import iconTabarMinePressed from '../assets/ico_tabar_mine_pressed.png';
import { absB, absL, bgColor, color, commonStyles, default as styles, fSize, h, iphoneX, mt, pb, w, wRatio } from "../utils/style";
let CustomTabBar = class CustomTabBar extends Component {
  constructor(props) {
    super(props);
    /**
     * @author 何晏波
     * @QQ 1054539528
     * @date 2019/9/18
     * @function: 签到
     */

    this.singIn = async () => {
      // let res = (await this.props.singIn()).data;
      //
      // if (res.code === api.NetworkState.SUCCESS) {
      //   Toast.message('签到成功');
      //   this.getSignInPage();
      // }
    };

    console.log('构造函数');
    this.state = {
      signInPageDetail: { dateIntegrals: [], signInCount: 0 },
      currentIndex: 0
    };
  }
  render() {
    let { onPress } = this.props;
    let { signInPageDetail, currentIndex } = this.state;
    console.log('更新了', currentIndex);
    if (typeof signInPageDetail.signInCount === 'undefined') {
      signInPageDetail.signInCount = 0;
    }
    return <View style={styleAssign([wRatio(100), styles.udr, styles.upa, absL(0), absB(0), h(iphoneX() ? 94 : 60), styles.uac, styles.uac, pb(iphoneX() ? 34 : 0), bgColor(commonStyles.whiteColor)])}>
        <TouchableButton customStyle={styleAssign([w(95), h(60), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])} onClick={() => {
        console.log('名片');
        onPress(0);
        this.setState({ currentIndex: 0 });
      }}>
          <View style={styleAssign([styles.uac])}>
            <Image src={currentIndex === 0 ? iconBusinesscardPressed : iconBusinesscardNormal} style={styleAssign([w(22), h(22), mt(4)])} />
            <Text style={styleAssign([fSize(12), mt(2), color(currentIndex === 0 ? commonStyles.colorTheme : '#9b9b9b')])}>名片</Text>
          </View>
        </TouchableButton>
        <TouchableButton customStyle={styleAssign([w(95), h(60), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])} onClick={() => {
        console.log('雷达');
        onPress(1);
        this.setState({ currentIndex: 1 });
      }}>
          <View style={styleAssign([styles.uac])}>
            <Image src={currentIndex === 1 ? iconTabarRadarscanPressed : iconTabarradarscanNormal} style={styleAssign([w(22), h(22), mt(4)])} />
            <Text style={styleAssign([fSize(12), mt(2), color(currentIndex === 1 ? commonStyles.colorTheme : '#9b9b9b')])}>雷达</Text>
          </View>
        </TouchableButton>
        <TouchableButton customStyle={styleAssign([w(95), h(60), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])} onClick={() => {
        console.log('客户');
        onPress(2);
        this.setState({ currentIndex: 2 });
      }}>
          <View style={styleAssign([styles.uac])}>
            <Image src={currentIndex === 2 ? iconTabarCustomerPressed : iconTabarCustomerNormal} style={styleAssign([w(22), h(22), mt(4)])} />
            <Text style={styleAssign([fSize(12), mt(2), color(currentIndex === 2 ? commonStyles.colorTheme : '#9b9b9b')])}>客户</Text>
          </View>
        </TouchableButton>
        <TouchableButton customStyle={styleAssign([w(95), h(60), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])} onClick={() => {
        console.log('我的');
        onPress(3);
        this.setState({ currentIndex: 3 });
      }}>
          <View style={styleAssign([styles.uac])}>
            <Image src={currentIndex === 3 ? iconTabarMinePressed : iconTabarMineNormal} style={styleAssign([w(22), h(22), mt(4)])} />
            <Text style={styleAssign([fSize(12), mt(2), color(currentIndex === 3 ? commonStyles.colorTheme : '#9b9b9b')])}>我的</Text>
          </View>
        </TouchableButton>
      </View>;
  }
};
export { CustomTabBar as default };