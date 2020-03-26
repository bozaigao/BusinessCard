/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 访问轨迹item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign, transformTime} from "../../../utils/datatool";
import styles, {
  bgColor,
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
} from "../../../utils/style";
import {BehaviorTrace, operateMap} from "../../../const/global";


interface Props {
  item: { day: string; behaviorTraceList: BehaviorTrace[] };
  name: string;
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
    let {item, name} = this.props;
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
              {`${item.day} 访问轨迹`}
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
        <View style={styleAssign([wRatio(100)])}>
          {
            showDetail && item.behaviorTraceList.map((value: BehaviorTrace, index) => {
              return <View style={styleAssign([wRatio(100)])} key={index}>
                <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujc])}>
                  <View style={styleAssign([w(335), pl(10), pr(10), styles.udr, bgColor(commonStyles.whiteColor)])}>
                    <View style={styleAssign([styles.uac])}>
                      <View style={styleAssign([w(6), h(6), radiusA(3), bgColor('#979797')])}/>
                      <View style={styleAssign([w(1), hRatio(100), bgColor('#979797')])}/>
                    </View>
                    <View style={styleAssign([ml(13)])}>
                      <Text style={styleAssign([fSize(14), color('#343434')])}>
                        {transformTime(value.time)}
                      </Text>
                      <Text style={styleAssign([fSize(14), color('#343434')])}>
                        {name}
                      </Text>
                      <Text style={styleAssign([fSize(14), color('#E2BB7B')])}>
                        {operateMap[value.behaviorType]}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>;
            })
          }
        </View>
      </View>
    );
  }
}
