"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename goods_manage.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 商品管理
 */
const taro_1 = require("@tarojs/taro");
//@ts-ignore
const index_1 = require("../../compoments/safe-area-view/index");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/goods");
const components_1 = require("@tarojs/components");
const index_2 = require("../../compoments/touchable-button/index");
const index_3 = require("../sub_pagecomponent/goods-manage-item/index");
const index_4 = require("../../compoments/bottom-buton/index");
const global_1 = require("../../const/global");
const httpurl_1 = require("../../api/httpurl");
const navigation_bar_1 = require("../../compoments/navigation_bar");
const sanjiao_1 = require("../../compoments/sanjiao");
const goods_shaixuan_1 = require("../sub_pagecomponent/goods-shaixuan");
const share_modal_1 = require("../sub_pagecomponent/share-modal");
const goods_remove_notice_1 = require("../sub_pagecomponent/goods-remove-notice");
let GoodsManage = class GoodsManage extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * 指定config的类型声明为: Taro.Config
         *
         * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
         * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
         * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
         */
        this.config = {
            disableScroll: true
        };
        this.refresh = () => {
            this.pageNo = 1;
            this.getGoodsList(true);
        };
        this.loadMore = () => {
            this.pageNo++;
            this.getGoodsList();
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/4
         * @function: 删除商品
         */
        this.deleteGoods = () => {
            this.props.updateGoods({
                id: this.itemData.id,
                status: -1
            }).then((res) => {
                console.log(res);
                this.refresh();
                if (res !== httpurl_1.NetworkState.FAIL) {
                    datatool_1.toast('删除成功');
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/4
         * @function:更新商品状态
         */
        this.updateGoods = (status) => {
            this.props.updateGoods({
                id: this.itemData.id,
                status
            }).then((res) => {
                console.log('更新商品状态', res);
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.refresh();
                    if (status === 0) {
                        datatool_1.toast('下架成功');
                    }
                    else {
                        datatool_1.toast('上架成功');
                    }
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/4
         * @function: 更新置顶状态
         */
        this.updateTopGoods = (showHomepage) => {
            this.props.updateGoods({
                id: this.itemData.id,
                showHomepage
            }).then((res) => {
                console.log(res);
                if (res !== httpurl_1.NetworkState.FAIL) {
                    this.refresh();
                    datatool_1.toast('操作成功');
                }
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/12/31
         * @function: 获取商品列表
         */
        this.getGoodsList = (refresh) => {
            this.viewRef && this.viewRef.showLoading();
            this.props.getGoodsList({
                userId: this.props.userInfo.id,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }).then((res) => {
                console.log('获取商品列表', res);
                this.viewRef && this.viewRef.hideLoading();
                if (refresh) {
                    this.setState({ goodsList: res.records, totalGoods: res.total }, () => {
                        this.goodsListTmp = this.state.goodsList;
                    });
                }
                else if (res.records && res.records.length !== 0) {
                    this.setState({ goodsList: this.state.goodsList.concat(res.records), totalGoods: res.total }, () => {
                        this.goodsListTmp = this.state.goodsList;
                    });
                }
                else {
                    datatool_1.toast('没有商品了');
                }
            }).catch(e => {
                this.viewRef && this.viewRef.hideLoading();
                console.log('报错啦', e);
            });
        };
        console.log(this.viewRef);
        this.state = {
            goodsList: [],
            totalGoods: 0,
            showChoose: false,
            state: '全部',
            showOperate: false,
            currentIndex: 0,
            hasShop: true,
            showShare: false,
            showDeleteNotice: false
        };
        this.pageNo = 1;
        this.pageSize = 10;
        this.goodsListTmp = [];
    }
    componentDidShow() {
        this.refresh();
        taro_1.default.eventCenter.on('goodsListRefresh', () => {
            this.refresh();
        });
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('goodsListRefresh');
    }
    render() {
        let { goodsList, totalGoods, showChoose, state, showOperate, currentIndex, hasShop, showShare, showDeleteNotice } = this.state;
        let child;
        if (currentIndex === 0) {
            child = <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100)])}>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.default.uac, style_1.default.udr, style_1.default.ujb,
                style_1.pl(20), style_1.pr(20), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0D0D0D')])}>管理</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>{`(共${totalGoods}件商品)`}</components_1.Text>
          </components_1.View>
          <index_2.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
                console.log(showChoose);
                this.setState({ showChoose: !this.state.showChoose });
            }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0D0D0D')])}>{state}</components_1.Text>
            <sanjiao_1.default orientation={showChoose ? global_1.Orientation.up : global_1.Orientation.down} style={datatool_1.styleAssign([style_1.ml(8)])}/>
          </index_2.default>
        </components_1.View>
        {goodsList.length === 0 ?
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(48)])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(78), style_1.h(69)])} src={require('../../assets/ico_no_goods.png')}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(31)])}>当前暂无商品</components_1.Text>
              </components_1.View>
            </components_1.View> :
                <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY onScrollToUpper={() => {
                    this.refresh();
                }} onScrollToLower={() => {
                    this.loadMore();
                }}>
              {goodsList.map((value, index) => {
                    console.log(value);
                    return (<index_3.default key={index} itemData={value} moreCallback={(itemData) => {
                        this.itemData = itemData;
                        this.setState({ showOperate: true });
                    }} xiajiaCallback={(itemData) => {
                        this.itemData = itemData;
                        this.updateGoods(value.status === 0 ? 1 : 0);
                    }} notTopGoodsCallback={(itemData) => {
                        this.itemData = itemData;
                        this.updateTopGoods(itemData.showHomepage ? 0 : 1);
                    }}/>);
                })}
            </components_1.ScrollView>}
        
        <index_4.default title={'新增商品'} onClick={() => {
                taro_1.default.navigateTo({
                    url: `/pages/mine/add_goods`
                });
            }}/>
      </components_1.View>;
        }
        else {
            child = <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}>
        {!hasShop ?
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.mt(114)])}>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(80), style_1.h(72)])} src={require('../../assets/ico_my_shop.png')}/>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(15), style_1.color('#343434'), style_1.mt(33)])}>您还未开通自己的商铺</components_1.Text>
              <components_1.View style={datatool_1.styleAssign([style_1.w(202), style_1.h(44), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.default.uac, style_1.default.ujc, style_1.mt(20)])} onClick={() => {
                    this.setState({ showShare: true });
                }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.whiteColor)])}>立即开通</components_1.Text>
              </components_1.View>
            </components_1.View> :
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.pa(16), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.ujb])}>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(134), style_1.h(134), style_1.radiusA(4)])} src={`${httpurl_1.cloudBaseUrl}ico_shop_pic.png`} mode={'scaleToFill'}/>
                <components_1.View style={datatool_1.styleAssign([style_1.ml(16), style_1.wRatio(60)])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#373838')])}>美克美家家居直营店</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.default.udr, style_1.mt(12)])}>
                    <components_1.Image style={datatool_1.styleAssign([style_1.w(12), style_1.h(12), style_1.mt(3)])} src={`${httpurl_1.cloudBaseUrl}ico_shop_location.png`}/>
                    <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#373838'), style_1.ml(5)])}>四川省成都市武侯区盛和二路18号富森美家居</components_1.Text>
                  </components_1.View>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color('#979797'), style_1.mt(14)])}>有效期至：2020-6-30</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uje, style_1.mt(10)])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.w(64), style_1.h(28), style_1.radiusA(4), style_1.bgColor(style_1.commonStyles.colorTheme), style_1.default.uac, style_1.default.ujc])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.whiteColor)])}>进店逛逛</components_1.Text>
                    </components_1.View>
                  </components_1.View>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.mt(26)])}>
                <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B'), style_1.ml(20)])}/>
                <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color('#373838'), style_1.ml(5)])}>商铺简介</components_1.Text>
              </components_1.View>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#373838'), style_1.ma(20)])}>美克集团创建于1990年，旗下包括上市公司美克国际家居用品股份有限公司、新疆美克化工有限责任公司、美克置地等多家企业，产业涉及家具制造及出口、家居零售和精细化工等领域。
                多年来，美克集团坚持走世界优质企业道路，持续优化产业结构，提升企业核心竞争能力。美克家具制造业具备生产实木客厅、餐厅、卧房、家庭办公等全套民用家具产品的能力，是国内乃至亚洲知名的家具制造企业之一；零售业“美克美家”逐渐成为中国家居消费行业的典范，高品质生活的代名词，成为广受赞誉与令人尊敬的知名家居品牌；美克化工生产的1,4-丁二醇是纺织、汽车零配件、医药化妆品和家电等产品的一种重要精细化工中间体原料，目前是中国的1,4-丁二醇供应商之一。</components_1.Text>
            </components_1.View>}
        {hasShop &&
                <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uje])}>
            
            <index_4.default title={'续费套餐'} onClick={() => {
                }}/>
          </components_1.View>}
      </components_1.View>;
        }
        return (<index_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <navigation_bar_1.default>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_back.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            this.setState({ currentIndex: 0 }, () => {
                this.refresh();
            });
        }}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>商品管理</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(72), style_1.h(2), style_1.bgColor(currentIndex === 0 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}/>
                </components_1.View>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])} onClick={() => {
            this.setState({ currentIndex: 1 });
        }}>
                <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                  <components_1.Text style={datatool_1.styleAssign([style_1.fSize(18), style_1.color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>我的商铺</components_1.Text>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(72), style_1.h(2), style_1.bgColor(currentIndex === 1 ? '#E2BB7B' : style_1.commonStyles.whiteColor), style_1.mt(10)])}/>
                </components_1.View>
              </components_1.View>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.mr(20)])}/>
          </components_1.View>
        </navigation_bar_1.default>
        {child}
        
        {showChoose &&
            <goods_shaixuan_1.default cancel={() => {
                this.setState({ showChoose: false });
            }} totalGoods={totalGoods} onClickMode={(value) => {
                this.setState({ state: value, showChoose: false }, () => {
                    let tmp = [];
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
                    console.log('筛选', tmp);
                    this.setState({ showChoose: false, goodsList: tmp });
                });
            }} onClickShop={() => {
                this.setState({ showChoose: false, currentIndex: 1 });
            }} mode={state}/>}
        {showOperate && <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), { position: 'fixed' }, style_1.absT(0)])} onClick={() => {
            this.setState({ showOperate: false });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.op(0.3), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.bgColor(style_1.commonStyles.colorTheme)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(242), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusTL(10), style_1.radiusTR(10),
            style_1.default.upa, style_1.absB(0)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ showOperate: false, showShare: true });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#E2BB7B'), style_1.fSize(18)])}>立即分享</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/mine/add_goods?edit=true&itemData=${JSON.stringify(this.itemData)}`
            });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>编辑商品</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ showOperate: false, showDeleteNotice: true });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>删除</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(5), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>取消</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>}
        {showShare && <share_modal_1.default cancle={() => {
            this.setState({ showShare: false });
        }} wechatShare={() => {
        }} friendShare={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/mingpian_haibao`
            });
        }} downloadPic={() => {
        }}/>}
        {showDeleteNotice && <goods_remove_notice_1.default cancelCallback={() => {
            this.setState({ showDeleteNotice: false });
        }} confirmCallback={() => {
            this.setState({ showDeleteNotice: false }, () => {
                this.deleteGoods();
            });
        }}/>}
      </index_1.default>);
    }
};
GoodsManage = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], GoodsManage);
exports.default = GoodsManage;
//# sourceMappingURL=goods_manage.jsx.map