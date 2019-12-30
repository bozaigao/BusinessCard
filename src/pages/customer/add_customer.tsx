/**
 * @filename customer_detail.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 添加新客户
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml, mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header";
import {Image, Input, ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  top1List: { title: string; value: string; }[];
  top2List: { title: string; value: string; }[];
}

@connect(state => state.login, {...actions})
class AddCustomer extends Component<Props, State> {

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
      top1List: [{title: '姓名', value: '刘思雨'}, {title: '性别', value: '男'}, {
        title: '手机',
        value: '18980646458'
      }, {title: '公司', value: '保利房地产集团有限公司'}, {title: '职位', value: '项目经理'}],
      top2List: [{title: '地区', value: '广东深圳'}, {title: '详细地址', value: '广东深圳'}, {
        title: '生日',
        value: '1990-09-18'
      }, {title: '微信号', value: '18980646458'}, {title: '邮箱', value: '80646458@qq.com'}],
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidHide() {
  }


  render() {

    let {top1List, top2List} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={''}/>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {/*用户头像*/}
          <View
            style={styleAssign([styles.udr, wRatio(100), h(86), styles.ujb, bgColor(commonStyles.whiteColor), styles.uac,
              pl(20), pr(20)])}>
            <Text style={styleAssign([fSize(14), color('#CECECE')])}>头像</Text>
            <Image style={styleAssign([w(66), h(66), radiusA(33)])}
                   src={require('../../assets/ico_default.png')}/>
          </View>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              top1List.map((value, index) => {
                return (<View style={styleAssign([wRatio(100), styles.uac])} key={index}><View
                  style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                  <Text style={styleAssign([fSize(14), color('#CECECE')])}>{value.title}</Text>
                  <Input type='text' value={value.value}
                         style={styleAssign([ml(16), fSize(14), {textAlign: 'right'}])}/>
                </View>
                  {
                    index !== 4 &&
                    <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  }
                </View>);
              })
            }
          </View>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              top2List.map((value, index) => {
                return (<View style={styleAssign([wRatio(100), styles.uac])} key={index}><View
                  style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                  <Text style={styleAssign([fSize(14), color('#CECECE')])}>{value.title}</Text>
                  <Input type='text' value={value.value}
                         style={styleAssign([ml(16), fSize(14), {textAlign: 'right'}])}/>
                </View>
                  {
                    index !== 4 &&
                    <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  }
                </View>);
              })
            }
          </View>
          {/*备注*/}
          <View style={styleAssign([wRatio(100), h(83), mt(10), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(14), color('#CECECE'), ml(20), mt(28)])}>备注</Text>
            <Input type='text' value={'合作机会比较大，可以重点关注，积极跟进'}
                   style={styleAssign([ml(20), fSize(14), mt(4)])}/>
          </View>
          <TouchableButton
            customStyle={styleAssign([wRatio(100), h(56), mt(63), styles.uac, styles.ujc, bgColor('#0F56C5')])}>
            <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>保存</Text>
          </TouchableButton>
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}


export default AddCustomer
