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
const safe_area_view_1 = require("../../compoments/safe-area-view");
//@ts-ignore
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const redux_1 = require("@tarojs/redux");
const actions = require("../../actions/goods");
const components_1 = require("@tarojs/components");
const touchable_button_1 = require("../../compoments/touchable-button");
const goods_manage_item_1 = require("./goods-manage-item");
const bottom_buton_1 = require("../../compoments/bottom-buton");
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
                datatool_1.toast('删除成功');
                this.refresh();
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/4
         * @function: 下架商品
         */
        this.xiajiaGoods = () => {
            this.props.updateGoods({
                id: this.itemData.id,
                status: 0
            }).then((res) => {
                console.log(res);
                datatool_1.toast('操作成功');
                this.refresh();
            }).catch(e => {
                console.log('报错啦', e);
            });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2020/1/4
         * @function: 取消置顶
         */
        this.notTopGoods = () => {
            this.props.updateGoods({
                id: this.itemData.id,
                showHomepage: 0
            }).then((res) => {
                console.log(res);
                datatool_1.toast('操作成功');
                this.refresh();
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
            this.viewRef && this.viewRef.showLoading('加载中');
            this.props.getGoodsList({
                userId: this.props.userInfo.id,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }).then((res) => {
                console.log('获取商品列表', res);
                this.viewRef && this.viewRef.hideLoading();
                if (refresh) {
                    taro_1.default.stopPullDownRefresh();
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
            showOperate: false
        };
        this.pageNo = 1;
        this.pageSize = 10;
        this.goodsListTmp = [];
    }
    componentDidMount() {
        this.refresh();
        taro_1.default.eventCenter.on('goodsListRefresh', () => {
            this.refresh();
        });
    }
    componentWillUnmount() {
        taro_1.default.eventCenter.off('goodsListRefresh');
    }
    render() {
        let { goodsList, totalGoods, showChoose, state, showOperate } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujb, style_1.default.udr, style_1.default.uac, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.Image style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.ml(20)])} src={require('../../assets/ico_back.png')} onClick={() => {
            taro_1.default.navigateBack();
        }}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(19), style_1.color(style_1.commonStyles.colorTheme)])}>商品管理</components_1.Text>
          <components_1.View style={datatool_1.styleAssign([style_1.w(22), style_1.h(22), style_1.bgColor(style_1.commonStyles.transparent), style_1.mr(20)])}/>
        </components_1.View>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.default.uac, style_1.default.udr, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0D0D0D')])}>管理</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>{`(共${totalGoods}件商品)`}</components_1.Text>
          </components_1.View>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])} onClick={() => {
            console.log(showChoose);
            this.setState({ showChoose: !this.state.showChoose });
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0D0D0D')])}>{state}</components_1.Text>
            <components_1.View style={{
            marginLeft: datatool_1.scaleSize(8),
            width: 0,
            height: 0,
            borderTopWidth: datatool_1.scaleSize(6),
            borderTopColor: '#787878',
            borderRightWidth: datatool_1.scaleSize(6),
            borderRightColor: 'transparent',
            borderLeftWidth: datatool_1.scaleSize(6),
            borderLeftColor: 'transparent',
            borderBottomWidth: 0,
            borderBottomColor: 'transparent',
            borderStyle: 'solid',
        }}/>
          </touchable_button_1.default>
        </components_1.View>
        <components_1.ScrollView style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])} scrollY onScrollToUpper={() => {
            taro_1.default.startPullDownRefresh();
            datatool_1.debounce(() => {
                this.refresh();
            }, 400);
        }} onScrollToLower={() => {
            this.loadMore();
        }}>
          {goodsList.map((value, index) => {
            console.log(value);
            return (<goods_manage_item_1.default key={index} itemData={value} moreCallback={(itemData) => {
                this.itemData = itemData;
                this.setState({ showOperate: true });
            }} xiajiaCallback={(itemData) => {
                this.itemData = itemData;
                this.xiajiaGoods();
            }} notTopGoodsCallback={(itemData) => {
                this.itemData = itemData;
                this.notTopGoods();
            }}/>);
        })}
        </components_1.ScrollView>
        
        <bottom_buton_1.default title={'新增商品'} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/add_goods`
            });
        }}/>
        
        {showChoose && <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), { position: 'fixed' }, style_1.absT(0)])} onClick={() => {
            this.setState({ showChoose: false });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.mt(130), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
              {['全部', '已上架', '已下架'].map((value, index) => {
            return (<touchable_button_1.default key={index} customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.udr, style_1.default.uac])} onClick={() => {
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
                    this.setState({ goodsList: tmp });
                });
                console.log(value);
            }}>
                    <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20)])}>{value}</components_1.Text>
                  </touchable_button_1.default>);
        })}
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.op(0.3), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.bgColor(style_1.commonStyles.colorTheme)])}/>
          </components_1.View>}
        {showOperate && <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), { position: 'fixed' }, style_1.absT(0)])} onClick={() => {
            this.setState({ showOperate: false });
        }}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.op(0.3), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.bgColor(style_1.commonStyles.colorTheme)])}/>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(242), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.radiusTL(10), style_1.radiusTR(10),
            style_1.default.upa, style_1.absB(0)])}>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#E2BB7B'), style_1.fSize(18)])}>立即分享</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ showChoose: false });
            taro_1.default.navigateTo({
                url: `/pages/businesscard/add_goods?edit=true&itemData=${JSON.stringify(this.itemData)}`
            });
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>编辑商品</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])} onClick={() => {
            this.setState({ showOperate: false });
            this.deleteGoods();
        }}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>删除</components_1.Text>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(5), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
              <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(61), style_1.default.uac, style_1.default.ujc])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#29292E'), style_1.fSize(18)])}>取消</components_1.Text>
              </components_1.View>
            </components_1.View>
          </components_1.View>}
      </safe_area_view_1.default>);
    }
};
GoodsManage = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], GoodsManage);
exports.default = GoodsManage;
//# sourceMappingURL=goods_manage.jsx.map
