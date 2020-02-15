/**
 * @filename goods_manage.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 商品管理
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {debounce, scaleSize, styleAssign, toast} from "../../utils/datatool";
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
  ml,
  mr,
  mt,
  op,
  pl,
  pr,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/goods';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";
import GoodsManageItem from "../businesscard/goods-manage-item/index";
import BottomButon from "../../compoments/bottom-buton/index";
import {Goods, User} from "../../const/global";

interface Props {
  //获取商品列表
  getGoodsList: any;
  //删除商品
  updateGoods: any;
  userInfo: User;
}

interface State {
  goodsList: Goods[];
  totalGoods: number;
  showChoose: boolean;
  state: string;
  showOperate: boolean;
}

@connect(state => state.login, {...actions})
class GoodsManage extends Component<Props, State> {

  private viewRef;
  private pageNo;
  private pageSize;
  private goodsListTmp: Goods[];
  private itemData;


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
    console.log(this.viewRef);
    this.state = {
      goodsList: [],
      totalGoods: 0,
      showChoose: false,
      state: '全部',
      showOperate: false
    };
    this.pageNo = 1;
    this.pageSize = 10;
    this.goodsListTmp = [];
  }


  componentDidMount() {
    this.refresh();
    Taro.eventCenter.on('goodsListRefresh', () => {
      this.refresh();
    });
  }

  componentWillUnmount() {
    Taro.eventCenter.off('goodsListRefresh');
  }

  refresh = () => {
    this.pageNo = 1;
    this.getGoodsList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.getGoodsList();
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
   * @function: 删除商品
   */
  deleteGoods = () => {
    this.props.updateGoods({
      id: this.itemData.id,
      status: -1
    }).then((res) => {
      console.log(res);
      toast('删除成功');
      this.refresh();
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
   * @function: 下架商品
   */
  xiajiaGoods = () => {
    this.props.updateGoods({
      id: this.itemData.id,
      status: 0
    }).then((res) => {
      console.log(res);
      toast('操作成功');
      this.refresh();
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
   * @function: 取消置顶
   */
  notTopGoods = () => {
    this.props.updateGoods({
      id: this.itemData.id,
      showHomepage: 0
    }).then((res) => {
      console.log(res);
      toast('操作成功');
      this.refresh();
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/31
   * @function: 获取商品列表
   */
  getGoodsList = (refresh?: boolean) => {
    this.viewRef && this.viewRef.showLoading('加载中');
    this.props.getGoodsList({
      userId: this.props.userInfo.id,
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }).then((res) => {
      console.log('获取商品列表', res);
      this.viewRef && this.viewRef.hideLoading();
      if (refresh) {
        Taro.stopPullDownRefresh();
        this.setState({goodsList: res.records, totalGoods: res.total}, () => {
          this.goodsListTmp = this.state.goodsList;
        });
      } else if (res.records && res.records.length !== 0) {
        this.setState({goodsList: this.state.goodsList.concat(res.records), totalGoods: res.total}, () => {
          this.goodsListTmp = this.state.goodsList;
        });
      } else {
        toast('没有商品了');
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {goodsList, totalGoods, showChoose, state, showOperate} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <View
          style={styleAssign([wRatio(100), h(44), styles.ujb, styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
          <Image style={styleAssign([w(22), h(22), ml(20)])}
                 src={require('../../assets/ico_back.png')}
                 onClick={() => {
                   Taro.navigateBack();
                 }}/>
          <Text style={styleAssign([fSize(19), color(commonStyles.colorTheme)])}>商品管理</Text>
          <View style={styleAssign([w(22), h(22), bgColor(commonStyles.transparent), mr(20)])}/>
        </View>
        {/*筛选*/}
        <View style={styleAssign([wRatio(100), h(36), styles.uac, styles.udr, styles.ujb,
          pl(20), pr(20)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <Text style={styleAssign([fSize(14), color('#0D0D0D')])}>管理</Text>
            <Text style={styleAssign([fSize(14), color('#787878')])}>{`(共${totalGoods}件商品)`}</Text>
          </View>
          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                           onClick={() => {
                             console.log(showChoose)
                             this.setState({showChoose: !this.state.showChoose});
                           }}>
            <Text style={styleAssign([fSize(14), color('#0D0D0D')])}>{state}</Text>
            <View style={{
              marginLeft: scaleSize(8),
              width: 0,
              height: 0,
              borderTopWidth: scaleSize(6),
              borderTopColor: '#787878',
              borderRightWidth: scaleSize(6),
              borderRightColor: 'transparent',
              borderLeftWidth: scaleSize(6),
              borderLeftColor: 'transparent',
              borderBottomWidth: 0,
              borderBottomColor: 'transparent',
              borderStyle: 'solid',
            }}/>
          </TouchableButton>
        </View>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY
          onScrollToUpper={() => {
            Taro.startPullDownRefresh();
            debounce(() => {
              this.refresh();
            }, 400);
          }}
          onScrollToLower={() => {
            this.loadMore();
          }}>
          {
            goodsList.map((value, index) => {
              console.log(value);
              return (<GoodsManageItem key={index} itemData={value}
                                       moreCallback={(itemData) => {
                                         this.itemData = itemData;
                                         this.setState({showOperate: true});
                                       }
                                       }
                                       xiajiaCallback={(itemData) => {
                                         this.itemData = itemData;
                                         this.xiajiaGoods();
                                       }
                                       }
                                       notTopGoodsCallback={(itemData) => {
                                         this.itemData = itemData;
                                         this.notTopGoods();
                                       }
                                       }/>);
            })
          }
        </ScrollView>
        {/*新增商品*/}
        <BottomButon title={'新增商品'} onClick={() => {
          Taro.navigateTo({
            url: `/pages/businesscard/add_goods`
          });
        }}/>
        {/*选择展示商品*/}
        {
          showChoose && <View style={styleAssign([wRatio(100), hRatio(100), {position: 'fixed'}, absT(0)])}
                              onClick={() => {
                                this.setState({showChoose: false});
                              }}>
            <View style={styleAssign([wRatio(100), mt(130), bgColor(commonStyles.whiteColor)])}>
              {
                ['全部', '已上架', '已下架'].map((value, index) => {
                  return (<TouchableButton key={index}
                                           customStyle={styleAssign([wRatio(100), h(44), styles.udr, styles.uac])}
                                           onClick={() => {
                                             this.setState({state: value, showChoose: false}, () => {
                                               let tmp: Goods[] = [];

                                               for (let i = 0; i < this.goodsListTmp.length; i++) {
                                                 if (value === '已上架' && this.goodsListTmp[i].status === 1) {
                                                   tmp.push(this.goodsListTmp[i]);
                                                 }
                                                 if (value === '已下架' && this.goodsListTmp[i].status === 0) {
                                                   tmp.push(this.goodsListTmp[i]);
                                                 }
                                                 if (value === '全部') {
                                                   tmp.push(this.goodsListTmp[i]);
                                                 }
                                               }
                                               console.log('筛选', tmp)
                                               this.setState({goodsList: tmp});
                                             });
                                             console.log(value)
                                           }}>
                    <Text style={styleAssign([color('#0C0C0C'), fSize(14), ml(20)])}>{value}</Text>
                  </TouchableButton>);
                })
              }
            </View>
            <View
              style={styleAssign([wRatio(100), hRatio(100), op(0.3), bgColor(commonStyles.whiteColor), bgColor(commonStyles.colorTheme)])}/>
          </View>
        }
        {
          showOperate && <View style={styleAssign([wRatio(100), hRatio(100), {position: 'fixed'}, absT(0)])}
                               onClick={() => {
                                 this.setState({showOperate: false});
                               }}>
            <View
              style={styleAssign([wRatio(100), hRatio(100), op(0.3), bgColor(commonStyles.whiteColor), bgColor(commonStyles.colorTheme)])}/>
            <View
              style={styleAssign([wRatio(100), h(242), bgColor(commonStyles.whiteColor), radiusTL(10), radiusTR(10),
                styles.upa, absB(0)])}>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(18)])}>立即分享</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                      this.setState({showChoose: false});
                      Taro.navigateTo({
                        url: `/pages/businesscard/add_goods?edit=true&itemData=${JSON.stringify(this.itemData)}`
                      });
                    }}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>编辑商品</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                      this.setState({showOperate: false});
                      this.deleteGoods();
                    }}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>删除</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(5), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>取消</Text>
              </View>
            </View>
          </View>
        }
      </CustomSafeAreaView>
    );
  }
}

export default GoodsManage;
