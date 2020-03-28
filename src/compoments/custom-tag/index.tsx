/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/21
 * @Description: 自定义标签
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Input, Text, View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import {
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  op,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import TouchableButton from "../touchable-button";


interface Props {
  cancelCallback: any;
  confirmCallback: any;
}

interface State {
  content: string;
}

export default class CustomTag extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  render() {

    let {cancelCallback, confirmCallback} = this.props;
    let {content} = this.state;

    return (
      <View
        style={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.blackColor), op(0.5), styles.upa, absT(0), absR(0),])}/>
        <View style={styleAssign([wRatio(100), hRatio(100), styles.uac, styles.ujc])}>
          <View style={styleAssign([w(300), h(127), bgColor(commonStyles.whiteColor), radiusA(10)])}>
            <View
              style={styleAssign([wRatio(100), styles.uac, styles.ujc, h(60), bgColor(commonStyles.pageDefaultBackgroundColor), radiusTL(10), radiusTR(10)])}>
              <Input type='text' value={''}
                     focus
                     maxLength={11}
                     placeholder={'请输入标签'}
                     style={styleAssign([wRatio(90), h(100), {marginLeft: '5%'}, {marginRight: '5%'}, fSize(18)])}
                     onInput={(e) => {
                       this.setState({content: e.detail.value});
                     }}/>
            </View>
            <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([styles.uf1, styles.udr, styles.uac])}>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}
                    onClick={cancelCallback}>
                <Text style={styleAssign([fSize(20), color('#343434')])}>取消</Text>
              </View>
              <View style={styleAssign([w(1), hRatio(100), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([styles.uf1, styles.uac, styles.ujc])}
                    onClick={() => {
                      confirmCallback(content);
                    }}>
                <Text style={styleAssign([fSize(20), color('#E2BB7B')])}>确认</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
