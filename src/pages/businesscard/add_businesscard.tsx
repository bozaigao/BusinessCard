/**
 * @filename add_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/15
 * @Description: 添加名片
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {SignInPage} from "../../const/global";
import {
  absR,
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
  mt,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, Input, ScrollView, Switch, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
  dispatchLogin?: any;
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  signInPageDetail: SignInPage;
  listData: { title: string; value: string; }[];
}

@connect(state => state.home, {...actions})
class AddBusinesscard extends Component<Props, State> {

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
      signInPageDetail: {dateIntegrals: [], signInCount: 0},
      listData: [{title: '姓名', value: 'JY-W'}, {title: '公司', value: '美克美家家居集团有限公司'}, {title: '行业', value: '家居'},
        {title: '职位', value: '销售经理'}, {title: '地区', value: '成都'}, {title: '微信号', value: '15982468866'}, {
          title: '邮箱',
          value: '98248866@168.com'
        }]
    }
  }


  render() {
    console.log(this.viewRef);

    let {signInPageDetail} = this.state;

    if (typeof signInPageDetail.signInCount === 'undefined') {
      signInPageDetail.signInCount = 0
    }

    let {listData} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor('#2B2A2F')])}
                          notNeedBottomPadding={true}>
        <TopHeader title={'名片信息'} textColor={commonStyles.whiteColor} backgroundColor={'#2B2A2F'}/>
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.colorTheme)])}
                    scrollY>
          <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor), mt(60)])}/>
          <View
            style={styleAssign([wRatio(100), hRatio(100), styles.upa, absT(10), absR(0), styles.uac, bgColor(commonStyles.whiteColor)])}>
            {/*名片信息头部*/}
            <View
              style={styleAssign([w(335), h(197), radiusA(5), bgColor(commonStyles.whiteColor), {boxShadow: '0px 2px 4px 0px rgba(230,230,230,0.5'}])}>
              <View style={styleAssign([styles.uac, styles.udr, ma(20)])}>
                <Image style={styleAssign([w(71), h(71), radiusA(4)])}
                       src={require('../../assets/ico_default.png')}/>
                <View style={styleAssign([ml(13)])}>
                  <Text style={styleAssign([fSize(18), color(commonStyles.colorTheme)])}>JY-W</Text>
                  <Text style={styleAssign([fSize(14), color('#727272'), mt(8)])}>公司</Text>
                  <Text style={styleAssign([fSize(14), color('#727272')])}>职位</Text>
                </View>
              </View>
              <View style={styleAssign([w(295), h(0.5), bgColor('#E5E5E5'), ml(20)])}/>
              {/*电话*/}
              <View style={styleAssign([wRatio(100), styles.uac, styles.udr, ml(20), mt(19)])}>
                <Image style={styleAssign([w(9), h(12)])} src={require('../../assets/ico_phone.png')}
                       mode={'aspectFit'}/>
                <Text style={styleAssign([ml(15), fSize(12), color('#727272')])}>15982468866</Text>
              </View>
              {/*定位*/}
              <View style={styleAssign([wRatio(100), styles.uac, styles.udr, ml(20), mt(10)])}>
                <Image style={styleAssign([w(9), h(12)])} src={require('../../assets/ico_location.png')}
                       mode={'aspectFit'}/>
                <Text style={styleAssign([ml(15), fSize(12), color('#727272')])}>四川成都</Text>
              </View>
            </View>
            {/*内容编辑*/}
            {
              listData.map((item, index) => {
                console.log(item);
                return (<View style={styleAssign([wRatio(100)])} key={index}>
                  <View style={styleAssign([wRatio(100), h(50), styles.uac, styles.udr, pl(21), pr(21)])}>
                    {
                      (index === 0 || index === 1) ? <View style={styleAssign([styles.uac, styles.udr])}>
                          <Text style={styleAssign([fSize(12), color('red')])}>*</Text>
                          <Text style={styleAssign([fSize(12), color('#727272')])}>{item.title}</Text>
                        </View> :
                        <Text style={styleAssign([fSize(12), color('#727272')])}>{item.title}</Text>
                    }
                    <Input type='text' value={item.value}
                           style={styleAssign([wRatio(70), ml(32), fSize(14)])}/>
                  </View>
                  <View style={styleAssign([w(336), h(0.5), bgColor('#E5E5E5'), ml(20), op(0.3)])}/>
                </View>);
              })
            }
            <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            {/*开关*/}
            <View style={styleAssign([wRatio(100)])}>
              <View style={styleAssign([wRatio(100), h(50), pl(20), pr(20), styles.uac, styles.udr, styles.ujb])}>
                <Text style={styleAssign([fSize(14), color('#343434')])}>名片展示邮箱号</Text>
                <Switch color={'#E2BB7B'}/>
              </View>
              <View style={styleAssign([w(336), h(0.5), bgColor('#E5E5E5'), ml(20), op(0.3)])}/>
            </View>
            <View style={styleAssign([wRatio(100)])}>
              <View style={styleAssign([wRatio(100), h(50), pl(20), pr(20), styles.uac, styles.udr, styles.ujb])}>
                <Text style={styleAssign([fSize(14), color('#343434')])}>分享自己的名片给朋友时展示手机号</Text>
                <Switch color={'#E2BB7B'}/>
              </View>
              <View style={styleAssign([w(336), h(0.5), bgColor('#E5E5E5'), ml(20), op(0.3)])}/>
            </View>
            <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            {/*创建名片*/}
            {/*新建任务*/}
            <BottomButon title={'创建名片'} onClick={() => {

            }}/>
          </View>
        </ScrollView>
      </CustomSafeAreaView>);
  }
}

export default AddBusinesscard;
