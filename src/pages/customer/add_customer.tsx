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
  ml,
  mr,
  mt,
  pa,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import TopHeader from "../../compoments/top-header";
import {Image, Picker, ScrollView, Text, Textarea, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import ListItem from "../../compoments/list-item";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  top1List: { title: string; subtitle: string; hasEdit: boolean; }[];
  top2List: { title: string; subtitle: string; hasEdit: boolean; }[];
  name: string;
  phone: string;
  sex: number;
  company:string;
  industry:string;
  position:string;
  detailAddress:string;
  birthday:string;
  wechat:string;
  email:string;

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
      sex: 1,
      top1List: [{title: '备注名', subtitle: '请输入备注名', hasEdit: true},
        {title: '手机', subtitle: '18980646458', hasEdit: true},
        {title: '性别', subtitle: '男', hasEdit: false},
        {title: '公司', subtitle: '保利房地产集团有限公司', hasEdit: true},
        {title: '行业', subtitle: '', hasEdit: false},
        {title: '职位', subtitle: '项目经理', hasEdit: true}],
      top2List: [{title: '地区', subtitle: '广东深圳', hasEdit: false},
        {title: '详细地址', subtitle: '广东深圳', hasEdit: true},
        {title: '生日', subtitle: '1990-09-18', hasEdit: false},
        {title: '微信号', subtitle: '18980646458', hasEdit: true},
        {title: '邮箱', subtitle: '80646458@qq.com', hasEdit: true}],
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

    let {top1List, top2List, sex} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'手动添加'}/>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              top1List.map((value, index) => {
                if (value.title === '性别') {
                  return (
                    <View style={styleAssign([wRatio(100)])}>
                      <View
                        style={styleAssign([wRatio(100), h(51), styles.uac, styles.udr, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                        <Text style={styleAssign([fSize(14), color('#979797'), ml(20)])}>性别</Text>
                        <View style={styleAssign([styles.uac, styles.udr])}>
                          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                                           onClick={() => {
                                             console.log('男')
                                             this.setState({sex: 1})
                                           }}>
                            <Image
                              style={styleAssign([w(18), h(18), radiusA(9)])}
                              src={sex === 1 ? require('../../assets/ico_checked.png') : require('../../assets/ico_nochecked.png')}/>
                            <Text style={styleAssign([fSize(14), color('#979797'), ml(10)])}>男</Text>
                          </TouchableButton>
                          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, ml(20), mr(20)])}
                                           onClick={() => {
                                             console.log('女')
                                             this.setState({sex: 2})
                                           }}>
                            <Image
                              style={styleAssign([w(18), h(18), radiusA(9)])}
                              src={sex === 2 ? require('../../assets/ico_checked.png') : require('../../assets/ico_nochecked.png')}/>
                            <Text style={styleAssign([fSize(14), color('#979797'), ml(10)])}>女</Text>
                          </TouchableButton>
                        </View>
                      </View>
                      <View
                        style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), {marginLeft: '5%'}])}/>
                    </View>
                  );
                }

                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    Taro.navigateTo({
                                      url: `/pages/mine/industry_list`,
                                      success: (e) => {
                                        console.log('参数回传1', e);
                                      }
                                    });
                                  }
                                  } onTextChange={(e) => {
                  console.log(e);
                }
                } textColor={'#727272'}/>);
              })
            }
          </View>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              top2List.map((value, index) => {
                if (value.title === '生日') {
                  return (<Picker mode='date' onChange={(e) => {

                  }} value={''}>
                    <ListItem title={value.title} subTitle={''} key={index}
                              hasEdit={false} textColor={'#727272'}/>
                  </Picker>);
                }
                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    Taro.navigateTo({
                                      url: `/pages/mine/industry_list`,
                                      success: (e) => {
                                        console.log('参数回传1', e);
                                      }
                                    });
                                  }
                                  } onTextChange={(e) => {
                  console.log(e);
                }
                } textColor={'#727272'}/>);
              })
            }
          </View>
          {/*备注*/}
          <View style={styleAssign([wRatio(100), h(183), mt(10), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(14), color('#CECECE'), ml(20), mt(18)])}>描述</Text>
            <Textarea value={'合作机会比较大，可以重点关注，积极跟进'}
                      style={styleAssign([ml(20), w(300), pa(20), mr(20), fSize(14), radiusA(4), mt(4), h(91),
                        bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>
          <TouchableButton
            customStyle={styleAssign([wRatio(100), h(204), mt(10), styles.uac, bgColor(commonStyles.whiteColor)])}
            onClick={() => {
              Taro.chooseImage({count: 9}).then(() => {

              });
            }}>
            <View
              style={styleAssign([w(335), h(176), mt(16), radiusA(4), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
              <View
                style={styleAssign([w(40), h(40), radiusA(20), bgColor(commonStyles.whiteColor),
                  styles.uac, styles.ujc])}>
                <Image style={styleAssign([w(21), h(19)])} src={require('../../assets/ico_camera.png')}/>
              </View>
              <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>添加与客户相关的图片</Text>
            </View>
          </TouchableButton>
        </ScrollView>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {
        }}/>
      </CustomSafeAreaView>
    )
  }
}


export default AddCustomer
