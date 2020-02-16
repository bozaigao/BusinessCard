/**
 * @filename data_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 数据中心
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, Picker, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  absB,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  iphoneX,
  mb,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/distribution";
import {BaseCoin, SettlementStats, User} from "../../const/global";
import {cloudBaseUrl} from "../../api/httpurl";
import DataCenterItem from "../businesscard/data-center-item";


interface Props {
  //数据中心
  settlementRecord: any;
  userInfo: User;
}

interface State {
  marginTop: number;
  year: string;
  settlementStatsList: SettlementStats[];
  totalIncome: number;
  totalSale: number;
}

@connect(state => state.login, {...actions})
class DataCenter extends Component<Props, State> {
  private viewRef;
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }

  constructor(props) {
    super(props);
    this.state = {
      marginTop: 0,
      year: `${new Date().getFullYear()}`,
      settlementStatsList: [],
      totalIncome: 0,
      totalSale: 0
    }
  }

  componentDidMount() {
    if (iphoneX()) {
      this.setState({marginTop: 43});
    } else {
      this.setState({marginTop: 15});
    }
    this.settlementRecord();
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/16
   * @function: 数据中心
   */
  settlementRecord = () => {
    let {year} = this.state;

    this.viewRef.showLoading();
    this.props.settlementRecord({year}).then((res) => {
      console.log('数据中心', res);
      console.log('属性', this.props.userInfo);
      this.viewRef.hideLoading();
      if (res) {
        this.setState({
          settlementStatsList: res.settlementStats,
          totalIncome: res.totalIncome,
          totalSale: res.totalSale
        });
      }
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  render() {
    let {marginTop, year, settlementStatsList, totalIncome, totalSale} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.pageDefaultBackgroundColor)])}
                          notNeedBottomPadding={true} notNeedTopPadding={true}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <View style={styleAssign([wRatio(100), hRatio(100)])}>
          <View style={styleAssign([wRatio(100), h(iphoneX() ? 262 : 242)])}>
            <Image style={styleAssign([wRatio(100), h(iphoneX() ? 242 : 222)])} src={`${cloudBaseUrl}ico_mine_bg.png`}/>
            <View style={styleAssign([wRatio(100), h(156), styles.upa, absB(0), styles.uac, styles.ujc])}>
              <View style={styleAssign([w(335), h(156), bgColor(commonStyles.whiteColor), radiusA(4),])}>
                <View style={styleAssign([wRatio(100), h(60), styles.uac, styles.ujc, bgColor('#FAF1E5'),
                  radiusTL(4), radiusTR(4)])}>
                  <Text style={styleAssign([fSize(16), color('#343434')])}>
                    累计数据
                  </Text>
                </View>
                <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(15)])}>
                  <View style={styleAssign([styles.uf1, styles.uac])}>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>
                      销售额(税前)
                    </Text>
                    <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                      <Text style={styleAssign([fSize(14), color('#FA6B57'), mb(5)])}>
                        ¥
                      </Text>
                      <Text style={styleAssign([fSize(24), color('#FA6B57')])}>
                        {(totalSale / BaseCoin).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styleAssign([w(1), h(40), bgColor('#E5E5E5')])}/>
                  <View style={styleAssign([styles.uf1, styles.uac])}>
                    <Text style={styleAssign([fSize(12), color('#979797')])}>
                      已结算收入(税前)
                    </Text>
                    <View style={styleAssign([styles.udr, styles.uae, mt(4)])}>
                      <Text style={styleAssign([fSize(14), color('#FA6B57'), mb(5)])}>
                        ¥
                      </Text>
                      <Text style={styleAssign([fSize(24), color('#FA6B57')])}>
                        {(totalIncome / BaseCoin).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(44), styles.uac, styles.udr, styles.ujb,
            styles.upa, absT(marginTop)])}>
            <Image style={styleAssign([w(22), h(22), ml(20)])}
                   src={require('../../assets/ico_back_white.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
            <Text style={styleAssign([fSize(18), color(commonStyles.whiteColor)])}>
              数据中心
            </Text>
            <View style={styleAssign([w(22), h(22)])}/>
          </View>
          <View style={styleAssign([styles.uf1, pl(20), pr(20), mt(20)])}>
            <Picker mode='date' onChange={(e) => {
              this.setState({year: e.detail.value}, () => {
                this.settlementRecord();
              });
            }} value={year} fields={'year'}>
              <View style={styleAssign([w(63), h(22), bgColor(commonStyles.colorTheme), radiusA(2),
                styles.udr, styles.uac, styles.ujc])}>
                <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                  {year}
                </Text>
                <Image style={styleAssign([w(8), h(8), ml(5)])}
                       src={require('../../assets/ico_xiasanjiao_white.png')}/>
              </View>
            </Picker>
            <ScrollView
              style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
              scrollY>
              {
                settlementStatsList.map((value, index) => {
                  return <DataCenterItem item={value} key={index}/>;
                })
              }
            </ScrollView>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default DataCenter;
