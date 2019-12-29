/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 我的人脉
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mt, pa, radiusA, w, wRatio} from "../../../utils/style";


interface Props {
  // navigation: Navigation;
}

interface State {
}

export default class MyPerson extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的人脉</Text>
        </View>
        <ScrollView
          style={styleAssign([{whiteSpace: 'nowrap'}, wRatio(95), {marginLeft: '5%'}, h(191), styles.uac, mt(16)])}
          scrollX>
          {
            [1, 2, 3, 4, 5, 6].map((value, index) => {
              console.log(value);
              return (<View
                style={styleAssign([styles.uac, w(134), h(191), ml(index !== 0 ? 10 : 0), bgColor(commonStyles.whiteColor),
                  {display: 'inline-block'}])}
                key={index}>
                <View style={styleAssign([styles.uf1, styles.uac])}>
                  <Image style={styleAssign([w(58), h(58), radiusA(29), mt(20)])}
                         src={require('../../../assets/ico_default.png')}/>
                  <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme), mt(8)])}>卢志刚</Text>
                  <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme), mt(4)])}>软件开发</Text>
                  <View style={styleAssign([styles.uac, styles.udr, mt(28)])}>
                    <View style={styleAssign([pa(5), bgColor('#EFEFEF'), radiusA(1)])}>
                      <Text style={styleAssign([fSize(12)])}>跑步</Text>
                    </View>
                    <View style={styleAssign([pa(5), bgColor('#EFEFEF'), ml(8), radiusA(1)])}>
                      <Text style={styleAssign([fSize(12)])}>剪辑</Text>
                    </View>
                  </View>
                </View>
              </View>);
            })
          }
        </ScrollView>
      </View>
    );
  }
}
