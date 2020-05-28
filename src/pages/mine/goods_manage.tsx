/**
 * @filename goods_manage.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 商品管理
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {parseData, styleAssign, toast, transformTime} from "../../utils/datatool";
import {
  absB,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio, iphoneX,
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
  radiusTR, screenHeight,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/goods';
import * as shopActions from '../../actions/shop';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";
import GoodsManageItem from "../../compoments/goods-manage-item/index";
import BottomButon from "../../compoments/bottom-buton/index";
import {Goods, Orientation, ShopModel, ShopStatus, User} from "../../const/global";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import NavigationBar from "../../compoments/navigation_bar";
import SanJiao from "../../compoments/sanjiao";
import GoodsShaiXuan from "../../compoments/goods-shaixuan";
import GoodsRemoveNoticeModal from "../../compoments/goods-remove-notice";
import CompanyCard from "../../compoments/company_card";

interface Props {
  //获取商品列表
  getGoodsList: any;
  //删除商品
  updateGoods: any;
  //商品批量更新
  updateBatch: any;
  getShop: any;
  userInfo: User;
}

interface State {
  goodsList: Goods[];
  totalGoods: number;
  showChoose: boolean;
  state: string;
  showOperate: boolean;
  showAllOperate: boolean;
  currentIndex: number;
  shopStatus: ShopStatus;
  showDeleteNotice: boolean;
  goodsChooseValue: number[];
  chooseAll: boolean;
  shop: ShopModel;
}

@connect(state => state.login, {...actions, ...shopActions})
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
  config: Config = {}

  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      totalGoods: 0,
      showChoose: false,
      state: '全部',
      showOperate: false,
      currentIndex: 0,
      shopStatus: ShopStatus.NO_APPLY,
      showDeleteNotice: false,
      showAllOperate: false,
      goodsChooseValue: [],
      chooseAll: false,
      //@ts-ignore
      shop: null,
    };
    this.pageNo = 1;
    this.pageSize = 1000;
    this.goodsListTmp = [];
  }


  componentDidShow() {
    this.refresh();
    this.getShop();
    Taro.eventCenter.on('goodsListRefresh', () => {
      this.refresh();
    });
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 获取店铺信息
   */
  getShop = () => {
    console.log('开始获取店铺信息')
    this.props.getShop().then((res) => {
      console.log('获取店铺', res);
      if (res !== NetworkState.FAIL) {
        this.setState({shopStatus: res.status, shop: res});
      }
    }).catch(e => {
      console.log('报错啦', e);
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
   * @function: 商品批量更新
   */
  updateBatch = (status) => {
    this.viewRef && this.viewRef.showLoading();
    let {goodsChooseValue} = this.state, chooseGoodsArray: any = [];

    for (let i = 0; i < goodsChooseValue.length; i++) {
      chooseGoodsArray.push({id: goodsChooseValue[i], status});
    }
    this.props.updateBatch({
      goodsList: JSON.stringify(chooseGoodsArray),
    }).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      console.log(res);
      if (res !== NetworkState.FAIL) {
        this.setState({goodsChooseValue: [], state: '全部', showAllOperate: false});
        this.refresh();
        toast('批量操作成功');
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function:更新商品状态
   */
  updateGoods = (status) => {
    this.props.updateGoods({
      id: this.itemData.id,
      status
    }).then((res) => {
      console.log('更新商品状态', res);
      if (res !== NetworkState.FAIL) {
        this.refresh();
        if (status === 0) {
          toast('下架成功');
        } else {
          toast('上架成功');
        }
      }
    }).catch(e => {
      console.log('报错啦', e);
    });
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 更新置顶状态
   */
  updateTopGoods = (showHomepage) => {
    this.props.updateGoods({
      id: this.itemData.id,
      showHomepage
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
    let {goodsList, totalGoods, showChoose, state, showOperate, currentIndex, shopStatus, showDeleteNotice, showAllOperate, goodsChooseValue, chooseAll, shop} = this.state;

    let child;

    let nowTime = new Date().getTime();
    let timeT = Number(shop.shopEnd) - nowTime;
    //是否将在一天内到期
    let isDue = timeT<86400000?true:false;

    if (currentIndex === 0) {
      child = <View style={styleAssign([wRatio(100), hRatio(100)])}>
        {/*筛选*/}
        <View style={styleAssign([wRatio(100), h(36), styles.uac, styles.udr, styles.ujb,
          pl(20), pr(20), bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([styles.uac, styles.udr])}
                onClick={() => {
                  this.setState({showAllOperate: !this.state.showAllOperate, goodsChooseValue: []});
                }
                }>
            <Text style={styleAssign([fSize(14), color('#0D0D0D')])}>管理</Text>
            <Text style={styleAssign([fSize(14), color('#787878')])}>{`(共${goodsList.length}件商品)`}</Text>
          </View>
          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                           onClick={() => {
                             this.setState({
                               showChoose: !this.state.showChoose,
                               goodsChooseValue: [],
                               chooseAll: false,
                             });
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
              style={styleAssign([wRatio(100), h(iphoneX() ? screenHeight() - 200 : screenHeight() - 180), styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
              scrollY>
              {
                goodsList.map((value, index) => {
                  return (<GoodsManageItem
                    checked={this.state.goodsChooseValue.includes(value.id)}
                    onChooseCallback={(id) => {
                      if (!this.state.goodsChooseValue.includes(id)) {
                        this.state.goodsChooseValue.push(id);
                      } else {
                        this.state.goodsChooseValue.splice(this.state.goodsChooseValue.indexOf(id), 1);
                      }
                      this.setState({
                        goodsChooseValue: this.state.goodsChooseValue,
                        chooseAll: this.state.goodsChooseValue.length === goodsList.length
                      }, () => {
                        console.log(this.state.goodsChooseValue);
                      });
                    }
                    }
                    showAllOperate={showAllOperate}
                    key={index} itemData={value}
                    moreCallback={(itemData) => {
                      this.itemData = itemData;
                      this.setState({showOperate: true});
                    }
                    }
                    xiajiaCallback={(itemData) => {
                      this.itemData = itemData;
                      this.updateGoods(value.status === 0 ? 1 : 0);
                    }
                    }
                    notTopGoodsCallback={(itemData) => {
                      this.itemData = itemData;
                      this.updateTopGoods(itemData.showHomepage ? 0 : 1);
                    }
                    }/>);
                })
              }
            </ScrollView>
        }
        {
          showAllOperate && goodsList.length !== 0 && <View
            style={styleAssign([wRatio(100), h(53), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor),
              pl(20), pr(20)])}>
            <View style={styleAssign([styles.uac, styles.udr])}
                  onClick={() => {
                    this.setState({chooseAll: !chooseAll}, () => {
                      let array: any = [];

                      if (this.state.chooseAll) {
                        for (let i = 0; i < goodsList.length; i++) {
                          array.push(goodsList[i].id);
                        }
                      } else {
                      }
                      this.setState({goodsChooseValue: array}, () => {
                        console.log(this.state.goodsChooseValue);
                      });
                    })
                  }
                  }>
              <Image style={styleAssign([w(17), h(17)])}
                     src={chooseAll ? require('../../assets/ico_choosed.png') : require('../../assets/ico_choose_normal.png')}/>
              <Text style={styleAssign([fSize(12), color('#0D0D0D'), ml(8)])}>全选</Text>
            </View>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Text style={styleAssign([fSize(12), color('#0D0D0D'), ml(8)])}>{`已选:${goodsChooseValue.length}个`}</Text>
              <View
                onClick={() => {
                  this.updateBatch(-1);
                }
                }
                style={styleAssign([styles.uac, styles.ujc, w(74), h(28), bo(1), radiusA(14), {borderStyle: 'solid'}, bdColor('#C0C4CB'), ml(16)])}>
                <Text style={styleAssign([fSize(12), color('#0D0D0D')])}>删除</Text>
              </View>
              {
                state !== '全部' && <View
                  onClick={() => {
                    this.updateBatch(state === '已下架' ? 1 : 0);
                  }
                  }
                  style={styleAssign([styles.uac, styles.ujc, w(74), h(28), bo(1), radiusA(14), {borderStyle: 'solid'}, bdColor('#FA541C'), ml(10)])}>
                  <Text style={styleAssign([fSize(12), color('#FA541C')])}>{`${state === '已下架' ? '上架' : '下架'}`}</Text>
                </View>
              }
            </View>
          </View>
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
          shopStatus === ShopStatus.NO_APPLY ?
            <View style={styleAssign([styles.uac, mt(114)])}>
              <Image style={styleAssign([w(80), h(72)])} src={require('../../assets/ico_my_shop.png')}/>
              <Text style={styleAssign([fSize(15), color('#343434'), mt(33)])}>您还未开通自己的商铺</Text>
              <View
                style={styleAssign([w(202), h(44), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc, mt(20)])}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/mine/shop_apply`
                  });
                }}>
                <Text style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>立即开通</Text>
              </View>
            </View> :
            (shopStatus === ShopStatus.UPLOAD_AND_WAIT ?
              <View style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.whiteColor)])}>
                <Image style={styleAssign([w(119), h(86)])} src={require('../../assets/upload_and_wait.png')}/>
                <Text style={styleAssign([w(186), styles.utxc, color(commonStyles.colorTheme), fSize(17), mt(15)])}>您的店铺申请正在审核中
                  请耐心等待……</Text>
                <View style={styleAssign([wRatio(100), mt(18), pl(20)])}>
                  <Text style={styleAssign([color('#E2BB7B'), fSize(14)])}>• 若您提交的信息有误，请及时联系客服进行修改</Text>
                </View>
                <View
                  style={styleAssign([wRatio(100), h(10), mt(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                <View
                  style={styleAssign([wRatio(100), h(49), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                  <Text style={styleAssign([color('#727272'), fSize(16), ml(20)])}>申请信息</Text>
                </View>
                <View style={styleAssign([{width: '90%'}, h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                <View
                  style={styleAssign([wRatio(100), h(49), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor), pl(20), pr(20)])}>
                  <Text style={styleAssign([color('#727272'), fSize(16)])}>申请人</Text>
                  <Text style={styleAssign([color('#727272'), fSize(16)])}>{shop.name}</Text>
                </View>
                <View
                  style={styleAssign([wRatio(100), h(49), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor), pl(20), pr(20)])}>
                  <Text style={styleAssign([color('#727272'), fSize(16)])}>联系方式</Text>
                  <Text style={styleAssign([color('#727272'), fSize(16)])}>{shop.phone}</Text>
                </View>
                <View
                  style={styleAssign([wRatio(100), h(49), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor), pl(20), pr(20)])}>
                  <Text style={styleAssign([color('#727272'), fSize(16)])}>公司名称</Text>
                  <Text style={styleAssign([color('#727272'), fSize(16)])}>{shop.company}</Text>
                </View>
                <View style={styleAssign([wRatio(100), {paddingLeft: '5%'}])}>
                  <CompanyCard companyCard={
                    {
                      avatar: "https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/94b9252c-b388-415e-8102-e0bcd16d2a99tmp_39b3c7c0c76c134363eeaf4cba225411.jpg",
                      company: "四川极致信息技术有限公司",
                      industry: "IT服务/互联网和相关服务",
                      name: "尹龙海",
                      phone: "18428088044",
                      position: "总经理",
                      type: 1,
                      userId: 22,
                      wechat: "18428088011"
                    }} isCopy={true} addRadarTrace={()=>{}}/>
                </View>
              </View> :
              (shopStatus === ShopStatus.HAS_OPEN ?
                <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
                  <View
                    style={styleAssign([wRatio(100), pa(16), bgColor(commonStyles.whiteColor), styles.udr, styles.ujb])}>
                    <Image style={styleAssign([w(134), h(134), radiusA(4)])}
                           src={shop.shopCoverUrl}
                           mode={'scaleToFill'}/>
                    <View style={styleAssign([ml(16), wRatio(60)])}>
                      <Text style={styleAssign([fSize(16), color('#373838')])}>{shop.shopName}</Text>
                      <View style={styleAssign([styles.udr, mt(12)])}>
                        <Image style={styleAssign([w(12), h(12), mt(3)])} src={`${cloudBaseUrl}ico_shop_location.png`}/>
                        <Text
                          style={styleAssign([fSize(12), color('#373838'), ml(5)])}>{shop.province + shop.city}</Text>
                      </View>
                      <Text
                        style={styleAssign([fSize(12), color('#979797'), mt(14)])}>{`有效期至：${transformTime(shop.shopEnd)}`}</Text>
                      <View style={styleAssign([wRatio(100), styles.udr, styles.uje, mt(10)])}>
                        <View
                          style={styleAssign([w(64), h(28), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc])}
                          onClick={(e) => {
                            e.stopPropagation();
                            Taro.navigateToMiniProgram({appId: shop.shopAddress, path: shop.shopUrl});
                          }}>
                          <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>进店逛逛</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styleAssign([styles.uac, styles.udr, mt(26)])}>
                    <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B'), ml(20)])}/>
                    <Text style={styleAssign([fSize(16), color('#373838'), ml(5)])}>商铺简介</Text>
                  </View>
                  <Text style={styleAssign([fSize(14), color('#373838'), ma(20)])}>{shop.shopDesc}</Text>
                </View> : (shopStatus === ShopStatus.SHOP_OUT_OF_TIME ?
                  <View style={styleAssign([styles.uac, wRatio(100), mt(84)])}>
                    <Image style={styleAssign([w(80), h(72)])} src={require('../../assets/ico_my_shop.png')}/>
                    <Text style={styleAssign([fSize(15), color('#343434'), mt(33)])}>
                      您的店铺已到期，再次开通需联系客服
                    </Text>
                    <View style={styleAssign([wRatio(100), {paddingLeft: '5%'}, mt(20)])}>
                      <CompanyCard companyCard={
                        {
                          avatar: "https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/94b9252c-b388-415e-8102-e0bcd16d2a99tmp_39b3c7c0c76c134363eeaf4cba225411.jpg",
                          company: "四川极致信息技术有限公司",
                          industry: "IT服务/互联网和相关服务",
                          name: "尹龙海",
                          phone: "18428088044",
                          position: "总经理",
                          type: 1,
                          userId: 22,
                          wechat: "18428088011"
                        }} isCopy={true} addRadarTrace={()=>{}}/>
                    </View>
                  </View> : null)))
        }
        {
          shopStatus === ShopStatus.HAS_OPEN &&
          isDue &&
          <View style={styleAssign([styles.uf1, styles.uje])}>
            {/*继续开通*/}
            <BottomButon title={'继续开通'} onClick={() => {
              Taro.navigateTo({
                url: `/pages/mine/jixu_open`
              });
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
                  <Text style={styleAssign([fSize(18), color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>我的店铺</Text>
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
          showOperate &&
          <View style={styleAssign([wRatio(100), hRatio(100), {position: 'fixed'}, absT(0)])}
                onClick={() => {
                  this.setState({showOperate: false});
                }}>
            <View
              style={styleAssign([wRatio(100), hRatio(100), op(0.3), bgColor(commonStyles.whiteColor), bgColor(commonStyles.colorTheme)])}/>
            <View
              style={styleAssign([wRatio(100), h(242), bgColor(commonStyles.whiteColor), radiusTL(10), radiusTR(10),
                styles.upa, absB(0)])}>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                      this.setState({showOperate: false}, () => {
                        Taro.navigateTo({
                          url: `/pages/mine/share_goods?name=${this.itemData.name}&price=${this.itemData.price}&photo=${parseData(this.itemData.carouselUrl)[0]}`
                        });
                      });
                    }}>
                <Text style={styleAssign([color('#E2BB7B'), fSize(18)])}>立即分享</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                      Taro.navigateTo({
                        url: `/pages/mine/add_goods?edit=true&itemData=${JSON.stringify(this.itemData)}`
                      });
                    }}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>编辑商品</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                      this.setState({showOperate: false, showDeleteNotice: true});
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
        {
          showDeleteNotice && <GoodsRemoveNoticeModal cancelCallback={() => {
            this.setState({showDeleteNotice: false});
          }
          } confirmCallback={() => {
            this.setState({showDeleteNotice: false}, () => {
              this.deleteGoods();
            });
          }
          }/>
        }
      </CustomSafeAreaView>
    );
  }
}

export default GoodsManage;
