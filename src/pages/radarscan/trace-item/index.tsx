/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 访问轨迹item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ml,
  mt,
  pa,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";


interface Props {
}

interface State {
  showDetail: boolean;
}

export default class TraceItem extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      showDetail: false
    }
  }

  render() {
    let {showDetail} = this.state;

    return (
      <View style={wRatio(100)}>
        <View style={styleAssign([wRatio(100), h(40), styles.uac, styles.ujc, mt(8)])}>
          <View
            style={styleAssign([w(335), h(40), styles.uac, styles.ujb, styles.udr, bgColor(commonStyles.whiteColor),
              pl(10), pr(10), radiusA(4)])}
            onClick={() => {
              this.setState({showDetail: !this.state.showDetail});
            }}>
            <Text style={styleAssign([fSize(14), color('#343434')])}>
              11-08 访问轨迹
            </Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Text style={styleAssign([fSize(14), color('#979797')])}>
                展开
              </Text>
              <Image style={styleAssign([w(13), h(8), ml(6)])}
                     src={showDetail ? require('../../../assets/ico_up.png') : require('../../../assets/ico_down.png')}/>
            </View>
          </View>
        </View>
        {
          showDetail && <View style={styleAssign([wRatio(100)])}>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujc])}>
              <View style={styleAssign([w(335), pa(10), styles.udr, bgColor(commonStyles.whiteColor)])}>
                <View style={styleAssign([styles.uac])}>
                  <View style={styleAssign([w(6), h(6), radiusA(3), bgColor('#979797')])}/>
                  <View style={styleAssign([w(1), hRatio(100), bgColor('#979797')])}/>
                </View>
                <View style={styleAssign([ml(13)])}>
                  <Text style={styleAssign([fSize(14), color('#343434')])}>
                    11-08 09:36
                  </Text>
                  <Text style={styleAssign([fSize(14), color('#343434')])}>
                    刘思雨 点击了你标签，你们是同乡哦，可以收藏Ta的名片
                  </Text>
                </View>
              </View>
            </View>
          </View>
        }
      </View>
    );
  }
}
