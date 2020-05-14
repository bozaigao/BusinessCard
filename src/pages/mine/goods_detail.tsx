/**
 * @filename goods_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 商品详情
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {parseData, styleAssign} from "../../utils/datatool";
import {
  absB,
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
  pa,
  pl,
  pr,
  pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import * as goodsActions from '../../actions/goods';
import TopHeader from "../../compoments/top-header/index";
import {Button, Image, ScrollView, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import {Goods, User} from "../../const/global";
import {NetworkState} from "../../api/httpurl";

interface Props {
  userInfo: User;
  getGoods: any;
}

interface State {
  itemData: Goods;
  currentIndex: number;
}

@connect(state => state.login, Object.assign(actions, goodsActions))
class GoodsDetail extends Component<Props, State> {


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {

  }

  constructor(props) {
    super(props);
    this.state = {
      //@ts-ignore
      itemData: null,
      currentIndex: 0
    }
  }

  //@ts-ignore
  onShareAppMessage(res) {
    let {itemData} = this.state;

    return {
      title: `${this.props.userInfo.name}向你分享了商品`,
      path: `/pages/mine/goods_detail?id=${itemData.id}`,
      imageUrl: parseData(itemData.carouselUrl)[0]
    }
  }


  componentDidMount() {
    this.getGoods();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/29
   * @function: 获取商品详情
   */
  getGoods = () => {
    this.props.getGoods({id: this.$router.params.id}).then((res) => {
      if (res !== NetworkState.FAIL) {
        this.setState({itemData: res});
      }
      console.log('获取商品详情', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  render() {
    let {itemData, currentIndex} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'商品详情'}/>
        <View style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.pageDefaultBackgroundColor),
          pt(5)])}>
          <ScrollView scrollY style={styleAssign([styles.uf1])}>
            {/*商品大图轮播*/}
            <View style={styleAssign([wRatio(100), h(366)])}>
              <View style={styleAssign([wRatio(100), h(313)])}>
                <Swiper
                  style={styleAssign([wRatio(100), hRatio(100)])}
                  circular
                  autoplay
                  onChange={(e) => {
                    this.setState({currentIndex: e.detail.current});
                  }}>
                  {
                    itemData && parseData(itemData.carouselUrl).map((value, index) => {
                      return (<SwiperItem key={index}>
                        <Image style={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(0)])}
                               src={value}
                               onClick={() => {
                                 Taro.previewImage({
                                   current: value,
                                   urls: parseData(itemData.carouselUrl)
                                 })
                               }}/>
                      </SwiperItem>);
                    })
                  }
                </Swiper>
                <View style={styleAssign([bgColor('rgba(84,84,84,0.6)'), w(48), h(22), radiusA(10),
                  styles.uac, styles.ujc, styles.upa, absR(19), absB(8)])}>
                  <Text
                    style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{`${currentIndex + 1}/${parseData(itemData.carouselUrl).length}`}</Text>
                </View>
              </View>
              {/*价格描述*/}
              <View style={styleAssign([wRatio(100), h(54), styles.udr, styles.uac, styles.ujb, pl(20), pr(20),
                bgColor(commonStyles.whiteColor)])}>
                <Text style={styleAssign([fSize(21), color('#FA541C')])}>{itemData.price&&itemData.price>0?`¥${itemData.price}`:''}</Text>
                <Text style={styleAssign([fSize(14), color('#242424')])}>{itemData.name}</Text>
              </View>
            </View>
            {/*商品详情*/}
            <View style={styleAssign([wRatio(100), mt(10), bgColor(commonStyles.whiteColor), styles.uac])}>
              <View style={styleAssign([wRatio(100)])}>
                <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20), mt(20)])}>商品详情</Text>
              </View>
              <View style={styleAssign([wRatio(100), pa(30)])}>
                <Text
                  style={styleAssign([fSize(14), color('#787878')])}>{itemData.introduction}</Text>
              </View>
              {/*图片列表*/}
              {
                itemData && parseData(itemData.detailUrl).map((value, index) => {
                  console.log(value)
                  return (<Image
                    onClick={() => {
                      Taro.previewImage({
                        current: value,
                        urls: parseData(itemData.detailUrl)
                      })
                    }
                    }
                    key={index}
                    style={styleAssign([w(336), mt(8)])}
                    src={value}
                    mode={'widthFix'}/>);
                })
              }
            </View>
          </ScrollView>
          {/*分享按钮*/}
          <View style={styleAssign([wRatio(100), h(64), bgColor(commonStyles.whiteColor), styles.uac, styles.ujc])}>
            <Button
              openType={'share'}
              style={styleAssign([w(335), h(48), styles.uac, styles.ujc, bgColor(commonStyles.colorTheme), radiusA(2)])}>
              <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>立即分享</Text>
            </Button>
          </View>
        </View>
      </CustomSafeAreaView>);
  }
}

export default GoodsDetail;
