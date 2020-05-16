/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @function: 我的照片
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, ml, mt, radiusA, w, wRatio, pl, pr} from "../../utils/style";


interface Props {
  photos: string[];
  addRadarTrace: any;
}

interface State {
}

export default class MyPhoto extends PureComponent<Props, State> {

  render() {
    let {photos, addRadarTrace} = this.props;

    return (
      <View style={styleAssign([wRatio(100), pl(20), pr(20) ])}>
        <View style={styleAssign([styles.uac, styles.udr, wRatio(100), mt(32)])}>
          <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>我的照片</Text>
        </View>
        <View
          style={styleAssign([{width: '100%'}, mt(16), bgColor(commonStyles.whiteColor)])}>
          {
            photos.map((value, index) => {
              return <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])} key={index}>
                <Image
                  onClick={() => {
                    addRadarTrace('view_your_photos');
                    Taro.previewImage({
                      current: value,
                      urls: photos
                    })
                  }}
                  style={styleAssign([radiusA(4), wRatio(95), bgColor(commonStyles.whiteColor)])}
                  src={value} mode={'widthFix'}/>
              </View>;
            })
          }
        </View>
      </View>
    );
  }
}
