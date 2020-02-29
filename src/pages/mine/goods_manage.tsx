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
import {debounce, styleAssign, toast} from "../../utils/datatool";
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
  ma,
  ml,
  mr,
  mt,
  op,
  pa,
  pl,
  pr,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/goods';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";
import GoodsManageItem from "../sub_pagecomponent/goods-manage-item/index";
import BottomButon from "../../compoments/bottom-buton/index";
import {Goods, Orientation, User} from "../../const/global";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import NavigationBar from "../../compoments/navigation_bar";
import SanJiao from "../../compoments/sanjiao";
import GoodsShaiXuan from "../sub_pagecomponent/goods-shaixuan";

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
  currentIndex: number;
  hasShop: boolean;
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
      showOperate: false,
      currentIndex: 0,
      hasShop: true
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
      this.refresh();
      if (res !== NetworkState.FAIL) {
        toast('删除成功');
      }
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
      console.log('下架商品', res);
      if (res !== NetworkState.FAIL) {
        this.refresh();
        toast('下架成功');
      }
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
      if (res !== NetworkState.FAIL) {
        this.refresh();
        toast('操作成功');
      }
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
    this.viewRef && this.viewRef.showLoading();
    this.props.getGoodsList({
      userId: this.props.userInfo.id,
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }).then((res) => {
      console.log('获取商品列表', res);
      this.viewRef && this.viewRef.hideLoading();
      if (refresh) {
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
    let {goodsList, totalGoods, showChoose, state, showOperate, currentIndex, hasShop} = this.state;

    let child;

    if (currentIndex === 0) {
      child = <View style={styleAssign([styles.uf1])}>
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
            <SanJiao orientation={showChoose ? Orientation.up : Orientation.down} style={styleAssign([ml(8)])}/>
          </TouchableButton>
        </View>
        {
          goodsList.length === 0 ?
            <View style={styleAssign([styles.uf1])}>
              <View style={styleAssign([styles.uac, mt(48)])}>
                <Image style={styleAssign([w(78), h(69)])} src={require('../../assets/ico_no_goods.png')}/>
                <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂无商品</Text>
              </View>
            </View> :
            <ScrollView
              style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
              scrollY
              onScrollToUpper={() => {
                this.refresh();
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
        }
        {/*新增商品*/}
        <BottomButon title={'新增商品'} onClick={() => {
          Taro.navigateTo({
            url: `/pages/mine/add_goods`
          });
        }}/>
      </View>
    } else {
      child = <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
        {
          !hasShop ?
            <View style={styleAssign([styles.uac, mt(114)])}>
              <Image style={styleAssign([w(80), h(72)])} src={require('../../assets/ico_my_shop.png')}/>
              <Text style={styleAssign([fSize(15), color('#343434'), mt(33)])}>您还未开通自己的商铺</Text>
              <View
                style={styleAssign([w(202), h(44), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc, mt(20)])}
                onClick={() => {

                }}>
                <Text style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>立即开通</Text>
              </View>
            </View> :
            <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
              <View
                style={styleAssign([wRatio(100), pa(16), bgColor(commonStyles.whiteColor), styles.udr, styles.ujb])}>
                <Image style={styleAssign([w(134), h(134), radiusA(4)])}
                       src={`${cloudBaseUrl}ico_shop_pic.png`}
                       mode={'scaleToFill'}/>
                <View style={styleAssign([ml(16), wRatio(60)])}>
                  <Text style={styleAssign([fSize(16), color('#373838')])}>美克美家家居直营店</Text>
                  <View style={styleAssign([styles.udr, mt(12)])}>
                    <Image style={styleAssign([w(12), h(14)])} src={`${cloudBaseUrl}ico_shop_location.png`}/>
                    <Text style={styleAssign([fSize(12), color('#373838'), ml(5)])}>四川省成都市武侯区盛和二路18号富森美家居</Text>
                  </View>
                  <Text style={styleAssign([fSize(12), color('#979797'), mt(14)])}>有效期至：2020-6-30</Text>
                  <View style={styleAssign([wRatio(100), styles.udr, styles.uje, mt(10)])}>
                    <View
                      style={styleAssign([w(64), h(28), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc])}>
                      <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>进店逛逛</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, mt(26)])}>
                <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B'), ml(20)])}/>
                <Text style={styleAssign([fSize(16), color('#373838'), ml(5)])}>商铺简介</Text>
              </View>
              <Text style={styleAssign([fSize(14), color('#373838'), ma(20)])}>美克集团创建于1990年，旗下包括上市公司美克国际家居用品股份有限公司、新疆美克化工有限责任公司、美克置地等多家企业，产业涉及家具制造及出口、家居零售和精细化工等领域。
                多年来，美克集团坚持走世界优质企业道路，持续优化产业结构，提升企业核心竞争能力。美克家具制造业具备生产实木客厅、餐厅、卧房、家庭办公等全套民用家具产品的能力，是国内乃至亚洲知名的家具制造企业之一；零售业“美克美家”逐渐成为中国家居消费行业的典范，高品质生活的代名词，成为广受赞誉与令人尊敬的知名家居品牌；美克化工生产的1,4-丁二醇是纺织、汽车零配件、医药化妆品和家电等产品的一种重要精细化工中间体原料，目前是中国的1,4-丁二醇供应商之一。</Text>
            </View>
        }
        {
          hasShop &&
          <View style={styleAssign([styles.uf1, styles.uje])}>
            {/*续费套餐*/}
            <BottomButon title={'续费套餐'} onClick={() => {
            }}/>
          </View>
        }
      </View>
    }

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <NavigationBar>
          <View
            style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
            <Image style={styleAssign([w(22), h(22), ml(20)])}
                   src={require('../../assets/ico_back.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}
                    onClick={() => {
                      this.setState({currentIndex: 0}, () => {
                        this.refresh();
                      });
                    }}>
                <View style={styleAssign([styles.uac])}>
                  <Text style={styleAssign([fSize(18), color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>商品管理</Text>
                  <View
                    style={styleAssign([w(72), h(2), bgColor(currentIndex === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                </View>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}
                    onClick={() => {
                      this.setState({currentIndex: 1});
                    }}>
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
        {
          child
        }
        {/*选择展示商品*/}
        {
          showChoose &&
          <GoodsShaiXuan cancel={() => {
            this.setState({showChoose: false});
          }
          } totalGoods={totalGoods}
                         onClickMode={(value) => {
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
                             this.setState({showChoose: false, goodsList: tmp});
                           });
                         }
                         }
                         onClickShop={() => {
                           this.setState({showChoose: false, currentIndex: 1});
                         }
                         }
                         mode={state}/>
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
                        url: `/pages/mine/add_goods?edit=true&itemData=${JSON.stringify(this.itemData)}`
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
