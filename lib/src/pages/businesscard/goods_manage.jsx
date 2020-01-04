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
const top_header_1 = require("../../compoments/top-header");
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
                    this.setState({ goodsList: res.records, totalGoods: res.total });
                }
                else if (res.records && res.records.length !== 0) {
                    this.setState({ goodsList: this.state.goodsList.concat(res.records), totalGoods: res.total });
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
            totalGoods: 0
        };
        this.pageNo = 1;
        this.pageSize = 10;
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
        let { goodsList, totalGoods } = this.state;
        return (<safe_area_view_1.default ref={(ref) => {
            this.viewRef = ref;
        }} customStyle={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
        <top_header_1.default title={'商品管理'}/>
        
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.default.uac, style_1.default.udr, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0D0D0D')])}>管理</components_1.Text>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#787878')])}>{`(共${totalGoods}件商品)`}</components_1.Text>
          </components_1.View>
          <touchable_button_1.default customStyle={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#0D0D0D')])}>全部</components_1.Text>
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
            this.refresh();
        }} onScrollToLower={() => {
            this.loadMore();
        }}>
          {goodsList.map((value, index) => {
            console.log(value);
            return (<goods_manage_item_1.default key={index} itemData={value}/>);
        })}
        </components_1.ScrollView>
        
        <bottom_buton_1.default title={'新增商品'} onClick={() => {
            taro_1.default.navigateTo({
                url: `/pages/businesscard/add_goods`
            });
        }}/>
      </safe_area_view_1.default>);
    }
};
GoodsManage = __decorate([
    redux_1.connect(state => state.login, Object.assign({}, actions))
], GoodsManage);
exports.default = GoodsManage;
//# sourceMappingURL=goods_manage.jsx.map