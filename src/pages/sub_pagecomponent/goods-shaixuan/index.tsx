/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 商品筛选modal
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
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
  mr,
  mt,
  op,
  pl,
  pr,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import {Orientation} from "../../../const/global";
import NavigationBar from "../../../compoments/navigation_bar/index";
import SanJiao from "../../../compoments/sanjiao/index";
import CustomSafeAreaView from "../../../compoments/safe-area-view";


interface Props {
  cancel: any;
  totalGoods: number;
  mode: string;
  onClickMode: any;
  onClickShop: any;
}

interface State {
  currentIndex: number;
}

export default class GoodsShaiXuan extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
  }

  render() {
    let {cancel, totalGoods, onClickMode, onClickShop, mode} = this.props;
    let {currentIndex} = this.state;

    return (
      <CustomSafeAreaView
        customStyle={styleAssign([{
          position: 'fixed',
          zIndex: Infinity
        }, absT(0), absR(0), wRatio(100), hRatio(100), bgColor(commonStyles.transparent)])}>
        <NavigationBar>
          <View
            style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
            <Image style={styleAssign([w(22), h(22), ml(20)])}
                   src={require('../../../assets/ico_back.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}
                    onClick={() => {
                      this.setState({currentIndex: 0}, () => {
                        // this.refresh();
                      });
                    }}>
                <View style={styleAssign([styles.uac])}>
                  <Text style={styleAssign([fSize(18), color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>商品管理</Text>
                  <View
                    style={styleAssign([w(72), h(2), bgColor(currentIndex === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                </View>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}
                    onClick={onClickShop}>
                <View style={styleAssign([styles.uac])}>
                  <Text style={styleAssign([fSize(18), color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>我的商铺</Text>
                  <View
                    style={styleAssign([w(72), h(2), bgColor(currentIndex === 1 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                </View>
              </View>
            </View>
            <View style={styleAssign([w(22), h(22), mr(20)])}/>
          </View>
        </NavigationBar>
        <View style={styleAssign([wRatio(100), h(36), styles.uac, styles.udr, styles.ujb,
          pl(20), pr(20), bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <Text style={styleAssign([fSize(14), color('#0D0D0D')])}>管理</Text>
            <Text style={styleAssign([fSize(14), color('#787878')])}>{`(共${totalGoods}件商品)`}</Text>
          </View>
          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                           onClick={cancel}>
            <Text style={styleAssign([fSize(14), color('#0D0D0D')])}>{mode}</Text>
            <SanJiao orientation={Orientation.up} style={styleAssign([ml(8)])}/>
          </TouchableButton>
        </View>
        <View style={styleAssign([wRatio(100)])}>
          {
            ['全部', '已上架', '已下架'].map((value, index) => {
              return (<TouchableButton key={index}
                                       customStyle={styleAssign([wRatio(100), h(44), styles.udr, styles.uac,bgColor(commonStyles.whiteColor)])}
                                       onClick={() => {
                                         onClickMode(value);
                                       }}>
                <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20)])}>{value}</Text>
              </TouchableButton>);
            })
          }
        </View>
        <View
          style={styleAssign([styles.uf1, op(0.3), bgColor(commonStyles.whiteColor), bgColor(commonStyles.colorTheme)])}
        onClick={cancel}/>
      </CustomSafeAreaView>
    );
  }
}


