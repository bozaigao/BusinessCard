/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 极致名片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {ScrollView, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mt, w, wRatio} from "../../../../utils/style";
import CompanyCard from "../../../../compoments/company_card";


interface Props {
  // navigation_bar: NavigationBar;
}

interface State {
}

export default class JiZhiCard extends PureComponent<Props, State> {

  render() {

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>极致名片</Text>
        </View>
        <ScrollView
          style={styleAssign([wRatio(100), styles.uac, {whiteSpace: 'nowrap'}])}
          scrollX>
          {
            [1, 2].map((value, index) => {
              console.log(value);
              return (<CompanyCard key={index}/>);
            })
          }
        </ScrollView>
      </View>
    );
  }
}
