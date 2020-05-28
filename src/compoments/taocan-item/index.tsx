/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 套餐item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import styles, {absR, absT, bdColor, bo, color, fSize, h, mt, radiusA, w} from "../../utils/style";


interface Props {
  item: { title: string; subTitle: string; left: string; price: string; timeLimit: boolean; };
  onClick: any;
  checked: boolean;
}

interface State {
}

export default class TaoCanItem extends PureComponent<Props, State> {

  render() {
    let {item, onClick, checked} = this.props;

    return (
      <View style={styleAssign([w(335), h(80), mt(14), {marginLeft: '5%'}, styles.uje])}
            onClick={onClick}>
        <View style={styleAssign([w(335), h(72), bo(1), bdColor('#E5E5E5'), radiusA(4),
          {boxShadow: checked ? '0px 2px 5px 2px rgba(226,187,123,0.5)' : '0px 0px 0px 0px'}, styles.uac, styles.ujc,
          bo(1), bdColor('#E5E5E5'), {borderStyle: 'solid',}])}>
          <View style={styleAssign([w(293), h(46), styles.udr, styles.uac, styles.ujb])}>
            <View>
              <View style={styleAssign([styles.udr, styles.uae])}>
                <Text style={styleAssign([color(checked ? '#825D22' : '#343434'), fSize(18)])}>{item.title}</Text>
                <Text style={styleAssign([color(checked ? '#825D22' : '#343434'), fSize(14)])}>{item.subTitle}</Text>
              </View>
              <Text style={styleAssign([color(checked ? '#825D22' : '#343434'), fSize(12), mt(4)])}>{item.left}</Text>
            </View>
            <View style={styleAssign([styles.udr, styles.uac])}>
              <Text style={styleAssign([color(checked ? '#825D22' : '#343434'), fSize(12)])}>￥</Text>
              <Text style={styleAssign([color(checked ? '#825D22' : '#343434'), fSize(24)])}>{item.price}</Text>
            </View>
          </View>
        </View>
        {
          item.timeLimit && <Image style={styleAssign([w(43), h(24), styles.upa, absT(0), absR(0)])}
                                   src={require('../../assets/ico_xianshi.png')}/>
        }
      </View>
    );
  }
}
