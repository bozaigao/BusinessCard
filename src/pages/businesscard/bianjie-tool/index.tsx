/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 便捷功能
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mt, radiusA, w, wRatio} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";


interface Props {
  itemClick: any;
}

interface State {
}

export default class BianJieTool extends PureComponent<Props, State> {

  render() {
    let {itemClick} = this.props;

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>便捷功能</Text>
        </View>
        <View style={styleAssign([wRatio(100), styles.uac, mt(13)])}>
          <View style={styleAssign([w(335), h(88), bgColor(commonStyles.whiteColor), radiusA(4),
            styles.udr, styles.uac, styles.uja])}>
            {
              ['商城', '海报', '工具箱', '名片夹', '任务中心'].map((value, index) => {
                return (<TouchableButton customStyle={styleAssign([styles.uac])} key={index}
                                         onClick={() => {
                                           itemClick(value);
                                         }
                                         }>
                  <View style={styleAssign([w(24), h(24), bgColor('#4EAFFF')])}/>
                  <Text style={styleAssign([mt(10), color('#343434'), fSize(10)])}>{value}</Text>
                </TouchableButton>);
              })
            }
          </View>
        </View>
      </View>
    );
  }
}
