/**
 * @filename tequan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 特权详情
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
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
  mr,
  mt,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/tequan';
import {Image, ScrollView, Text, View} from "@tarojs/components";
import LinearGradientView from "../../compoments/linear-gradient-view2/index";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import NavigationBar from "../../compoments/navigation_bar/index";

interface Props {
  //购买套餐
  purchasePackage: any;
}

interface State {
  scrollTop: number;
}

@connect(state => state.login, {...actions})
class RenmaiTaoCanDetail extends Component<Props, State> {

  private viewRef;
  private type;
  private packageId;
  private openState;


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
    console.log(this.viewRef);
    this.type = this.$router.params.type;
    this.packageId = this.$router.params.packageId;
    this.openState = this.$router.params.openState;
    this.state = {
      scrollTop: 0
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/1
   * @function: 购买套餐
   */
  purchasePackage = (packageId) => {
    this.viewRef && this.viewRef.showLoading();
    this.props.purchasePackage({packageId}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        console.log('购买套餐', res);
        Taro.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success(res) {
            console.log('支付成功', res);
          },
          fail(res) {
            console.log('支付失败', res);
          }
        });
      }
      console.log('获取特权套餐', res);
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  render() {
    let {scrollTop} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>

        <ScrollView
          style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor)])}
          scrollY
          onScroll={(e: any) => {
            this.setState({scrollTop: e.detail.scrollTop});
            console.log(e.detail);
          }}>
          <View style={styleAssign([wRatio(100), h(iphoneX() ? 222 : 182), mt(0)])}>
            <LinearGradientView style={styleAssign([wRatio(100), h(iphoneX() ? 222 : 182)])}/>
            <View
              style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, styles.upa, absB(20), pl(37), pr(37)])}>
              <View style={styleAssign([styles.uac])}>
                <Image style={styleAssign([w(42), h(42)])}
                       src={this.type === 'renmai' ? `${cloudBaseUrl}ico_renmai_2.png` : `${cloudBaseUrl}ico_renmai_1.png`}/>
                <Text
                  style={styleAssign([fSize(12), color(this.type === 'renmai' ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}>
                  更多人脉
                </Text>
              </View>
              <View style={styleAssign([styles.uac])}>
                <Image style={styleAssign([w(42), h(42)])}
                       src={this.type === 'fangke' ? `${cloudBaseUrl}ico_fangke_2.png` : `${cloudBaseUrl}ico_fangke_1.png`}/>
                <Text
                  style={styleAssign([fSize(12), color(this.type === 'fangke' ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}>
                  查看访客
                </Text>
              </View>
              <View style={styleAssign([styles.uac])}>
                <Image style={styleAssign([w(42), h(42)])}
                       src={this.type === 'shop' ? `${cloudBaseUrl}ico_shop_2.png` : `${cloudBaseUrl}ico_shop_1.png`}/>
                <Text
                  style={styleAssign([fSize(12), color(this.type === 'shop' ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}>
                  开通店铺
                </Text>
              </View>
            </View>
          </View>
          {
            this.type === 'renmai' ?
              <Text style={styleAssign([fSize(18), color('#825D22'), ml(20), mt(13)])}>
                每月增30个精准人脉推荐
              </Text> : (this.type === 'shop' ?
              <Text style={styleAssign([fSize(18), color('#825D22'), ml(20), mt(13)])}>
                提升你的产品线上推广效果
              </Text> :
              <Text style={styleAssign([fSize(18), color('#825D22'), ml(20), mt(13)])}>
                随时了解谁对你感兴趣
              </Text>)
          }
          <View style={styleAssign([w(34), h(2), radiusA(1), bgColor('#825D22'), ml(21), mt(7)])}/>
          {
            this.type === 'renmai' ?
              <Text style={styleAssign([fSize(12), color('#979797'), ml(12), mt(20)])}>
                开通人脉特权，突破人脉获取限制，精准获客
              </Text> : (this.type === 'shop' ?
              <Text style={styleAssign([fSize(12), color('#979797'), ml(12), mt(20)])}>
                开通店铺，展示更多产品，直接进行线上交易
              </Text> :
              <Text style={styleAssign([fSize(12), color('#979797'), ml(12), mt(20)])}>
                开通查看访客特权，突破查看访客7天限制
              </Text>)
          }
          <View style={styleAssign([wRatio(100), h(126), styles.uac, styles.ujc, mt(7)])}>
            <Image style={styleAssign([w(346), h(126)])}
                   src={this.type === 'renmai' ? `${cloudBaseUrl}ico_renmai.png` : (this.type === 'shop' ? `${cloudBaseUrl}ico_shop.png` : `${cloudBaseUrl}ico_fangke.png`)}/>
            <View style={styleAssign([styles.udr, w(346), h(126), styles.upa, absT(0)])}>
              <View style={styleAssign([styles.uf1])}>
                {
                  this.type === 'renmai' ?
                    <View style={styleAssign([mt(40), ml(10)])}>
                      <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                        普通用户人脉推荐
                      </Text>
                      <View style={styleAssign([styles.uac, styles.udr])}>
                        <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                          每月为
                        </Text>
                        <Text style={styleAssign([fSize(14), color('#E2BB7B')])}>
                          固定值
                        </Text>
                      </View>
                    </View> :
                    (this.type === 'shop' ?
                      <View style={styleAssign([mt(40), ml(10)])}>
                        <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                          普通用户名片首页展示
                        </Text>
                        <View style={styleAssign([styles.uac, styles.udr])}>
                          <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                            展示
                          </Text>
                          <Text style={styleAssign([fSize(14), color('#E2BB7B')])}>
                            部分产品
                          </Text>
                        </View>
                      </View> :
                      <View style={styleAssign([mt(40), ml(10)])}>
                        <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                          普通用户可查看
                        </Text>
                        <View style={styleAssign([styles.uac, styles.udr])}>
                          <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                            近
                          </Text>
                          <Text style={styleAssign([fSize(14), color('#E2BB7B')])}>
                            7天内访客
                          </Text>
                          <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                            信息
                          </Text>
                        </View>
                      </View>)
                }
              </View>
              <View style={styleAssign([styles.uf1])}>
                {
                  this.type === 'renmai' ?
                    <View style={styleAssign([mt(40), ml(30)])}>
                      <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                        普通用户人脉推荐
                      </Text>
                      <View style={styleAssign([styles.uac, styles.udr])}>
                        <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                          推荐每月增
                        </Text>
                        <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>
                          30个
                        </Text>
                      </View>
                    </View> :
                    (this.type === 'shop' ?
                      <View style={styleAssign([mt(40), ml(30)])}>
                        <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                          特权用户拥有 个人
                        </Text>
                        <View style={styleAssign([styles.uac, styles.udr])}>
                          <Text style={styleAssign([fSize(14), color(commonStyles.whiteColor)])}>
                            个人
                          </Text>
                          <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme)])}>
                            专属店铺
                          </Text>
                        </View>
                      </View> :
                      <View style={styleAssign([mt(40), ml(30)])}>
                        <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                          特权用户可查看
                        </Text>
                        <View style={styleAssign([styles.uac, styles.udr])}>
                          <Text style={styleAssign([fSize(14), color(commonStyles.colorTheme)])}>
                            全部访客
                          </Text>
                          <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>
                            信息
                          </Text>
                        </View>
                      </View>)
                }
              </View>
            </View>
          </View>
          <View style={styleAssign([styles.udr, styles.uac, ml(20), mt(20)])}>
            <View style={styleAssign([w(3), h(14), bgColor('#E2BB7B')])}/>
            <Text style={styleAssign([fSize(14), color('#343434'), ml(7)])}>
              服务用户
            </Text>
          </View>
          {
            this.type === 'renmai' ?
              <Text style={styleAssign([fSize(12), color('#979797'), ml(20), mt(13)])}>
                开通人脉特权以及开通试用的所有用户
              </Text> :
              (this.type === 'shop' ?
                <Text style={styleAssign([fSize(12), color('#979797'), ml(20), mt(13)])}>
                  开通店铺特权的所有用户
                </Text> :
                <Text style={styleAssign([fSize(12), color('#979797'), ml(20), mt(13)])}>
                  开通查看全部访客特权的所有用户
                </Text>)

          }
          <View style={styleAssign([styles.udr, styles.uac, ml(20), mt(20)])}>
            <View style={styleAssign([w(3), h(14), bgColor('#E2BB7B')])}/>
            <Text style={styleAssign([fSize(14), color('#343434'), ml(7)])}>
              特权介绍
            </Text>
          </View>
          {
            this.type === 'renmai' ?
              <Text style={styleAssign([fSize(12), color('#979797'), ml(20), mr(20), mt(13)])}>
                开通人脉特权以及开通试用的用户，可在选择开通时间期限内使用名片程序中获取更多人脉资源的特权功能，一旦开通此项特权，我们将每日为用户提供更丰富且精准的人脉资源，累计每月将比普通用户多推荐30个优质人脉，并且所获取的人脉转化为客户的概率将提升80%。\n
                若您已开通此特权，请在特权到期前24小时内进行续费开通，以免到期后服务中断给您带来不便。
              </Text> :
              (this.type === 'shop' ?
                <Text style={styleAssign([fSize(12), color('#979797'), ml(20), mr(20), mt(13)])}>
                  开通店铺的用户，可在选择开通时间期限内使用个人商铺程序，包括程序中的所有功能，一旦开通此项特权，我们将免费为用户装修个人店铺，并上架用户专属商品。店铺可展示商品更全面的信息，并进行线上交易。\n
                  由于开通店铺特权需要专门为用户开通店铺程序，操作比较复杂，所以暂不提供试用，并且开通店铺后可以进行线上交易，因此需要用户填写申请表以提供必要信息，后续则需要用户提供商品的相关资料信息，望用户能积极配合我们的工作人员，若给您带来不便，望谅解。\n
                  若您已开通此特权，可在特权到期前提前联系客服申请继续开通，以免到期后服务中断给您带来不便，若服务中断后需要再次开通的用户也可联系客服帮助恢复。
                </Text> :
                <Text style={styleAssign([fSize(12), color('#979797'), ml(20), mr(20), mt(13)])}>
                  开通查看全部访客特权以及开通试用的用户，可在此时间期限内使用名片程序中查看全部访客的特权功能，而普通用户则只能查看近7天内访客信息。一旦开通此项特权，我们不仅将为用户提供全部访客信息，保证用户不错过任何一位潜在客户，并且还将为用户提供访客更全面、精准的分析数据。让用户更全面了解访客对自己名片的兴趣点，以便用户更有针对性地跟进访客，最终提升将访客转化为客户的概率，获客率将比普通用户高80%。
                  若您已开通此特权，请在特权到期前24小时内进行续费开通，以免到期后服务中断给您带来不便。
                </Text>)

          }
        </ScrollView>
        <NavigationBar style={styleAssign([styles.upa, absT(0), op((300 - scrollTop) / 300)])}>
          <View
            style={styleAssign([styles.upa, wRatio(100), h(44), styles.ujb, styles.udr, styles.uac])}>
            <Image style={styleAssign([w(22), h(22), ml(20)])} src={require('../../assets/ico_back_white.png')}
                   onClick={() => {
                     Taro.navigateBack();
                   }}/>
          </View>
        </NavigationBar>
        <View style={styleAssign([wRatio(100), h(44), styles.uac, styles.ujc, mt(21), mb(16)])}>
          <View style={styleAssign([w(335), h(44), styles.uac, styles.ujc, radiusA(2), bgColor('#E2BB7B')])}
                onClick={() => {
                  this.purchasePackage(this.packageId);
                }}>
            <Text
              style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>{`${this.type === 'shop' ? '已申请' : (this.openState === '0' ? '立即开通' : '继续开通')}`}</Text>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default RenmaiTaoCanDetail;
