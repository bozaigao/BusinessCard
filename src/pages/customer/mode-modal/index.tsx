/**
 * @filename index.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 选择筛选模式
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Input, Text, View} from "@tarojs/components";
import {getToday, styleAssign} from "../../../utils/datatool";
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
  ml,
  mt,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button";
import CustomSafeAreaView from "../../../compoments/safe-area-view";


interface Props {
  cancelCallback: any;
  confirmCallback: any;
  shaiXuanCallback: any;
  shaiXuanMode: string;
  totalPerson:number;
}

interface State {

}

export default class ModeModal extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      startTime: '2020-01-01',
      endTime: getToday(),
      visitTime: '全部'
    }
  }

  render() {

    let {cancelCallback, confirmCallback,shaiXuanCallback,shaiXuanMode,totalPerson} = this.props;

    return (
      <CustomSafeAreaView
        customStyle={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100), bgColor(commonStyles.transparent)])}>
        <TouchableButton
          customStyle={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(0), absR(0),])}>
          <View style={styleAssign([wRatio(100), h(60), bgColor(commonStyles.whiteColor)])}/>
          <View style={styleAssign([styles.uf1, bgColor(commonStyles.blackColor), op(0.5)])}/>
        </TouchableButton>
        <View style={styleAssign([{width: '68%'}, {marginLeft: '2.5%'}, h(31), op(0.7), bgColor('#F5F5F5'),
          radiusA(26), styles.uac, styles.udr, mt(10)])}>
          <Image style={styleAssign([w(21), h(21), ml(16)])} src={require('../../../assets/ico_search.png')}/>
          <Input type='text' placeholder='搜索客户姓名' style={styleAssign([ml(16), fSize(14)])}/>
        </View>
        <View style={styleAssign([styles.uf1])}>
          {/*条件筛选*/}
          <View
            style={styleAssign([wRatio(100), h(44), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
              pl(20), pr(20)])}>
            <Text style={styleAssign([color('#727272'), fSize(14)])}>{`共${totalPerson}位客户`}</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(14)])}>{shaiXuanMode}</Text>
                <Image style={styleAssign([w(8), h(5), ml(3)])} src={require('../../../assets/ico_sanjiao_up.png')}/>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}
                      onClick={shaiXuanCallback}>筛选</Text>
                <Image style={styleAssign([w(14), h(14), ml(3)])} src={require('../../../assets/ico_shaixuan.png')}/>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*筛选内容*/}
          <View style={styleAssign([wRatio(100), h(88), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([wRatio(100), h(44), styles.ujc, bgColor(commonStyles.whiteColor)])}
                  onClick={() => {
                    confirmCallback('最后访问时间');
                  }}>
              <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20)])}>最后访问时间</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(44), styles.ujc, bgColor(commonStyles.whiteColor)])}
                  onClick={() => {
                    confirmCallback('最后跟进时间');
                  }}>
              <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20)])}>最后跟进时间</Text>
            </View>
            <View style={styleAssign([wRatio(100), h(44), styles.ujc, bgColor(commonStyles.whiteColor)])}
                  onClick={() => {
                    confirmCallback('最后转入时间');
                  }}>
              <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20)])}>最后转入时间</Text>
            </View>
          </View>
          <View style={styleAssign([styles.uf1])}
                onClick={() => {
                  cancelCallback();
                  console.log('点击')
                }}/>
        </View>
      </CustomSafeAreaView>
    );
  }
}
