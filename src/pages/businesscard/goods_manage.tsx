/**
 * @filename goods_manage.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 商品管理
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {scaleSize, styleAssign, toast} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, pl, pr, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/goods';
import TopHeader from "../../compoments/top-header";
import {ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import GoodsManageItem from "./goods-manage-item";
import BottomButon from "../../compoments/bottom-buton";
import {User} from "../../const/global";

interface Props {
  //获取商品列表
  getGoodsList: any;
  userInfo: User;
}

interface State {

}

@connect(state => state.login, {...actions})
class GoodsManage extends Component<Props, State> {

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
    console.log(this.viewRef);
    this.state = {}
  }


  componentDidMount() {
    this.getGoodsList();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/31
   * @function: 获取商品列表
   */
  getGoodsList = () => {
    this.viewRef && this.viewRef.showLoading('加载中');
    this.props.getGoodsList({
      userId: this.props.userInfo.id,
      pageNo: 1,
      pageSize: 20
    }).then((res) => {
      console.log('获取商品列表', res);
      this.viewRef && this.viewRef.hideLoading();
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'商品管理'}/>
        {/*筛选*/}
        <View style={styleAssign([wRatio(100), h(36), styles.uac, styles.udr, styles.ujb,
          pl(20), pr(20)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <Text style={styleAssign([fSize(14), color('#0D0D0D')])}>管理</Text>
            <Text style={styleAssign([fSize(14), color('#787878')])}>(共4件商品)</Text>
          </View>
          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}>
            <Text style={styleAssign([fSize(14), color('#0D0D0D')])}>全部</Text>
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
          scrollY>
          {
            [1, 2, 3, 4, 5].map((value, index) => {
              console.log(value);
              return (<GoodsManageItem key-={index}/>);
            })
          }
        </ScrollView>
        {/*新增商品*/}
        <BottomButon title={'新增商品'} onClick={() => {
          Taro.navigateTo({
            url: `/pages/businesscard/add_goods`
          });
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default GoodsManage;
