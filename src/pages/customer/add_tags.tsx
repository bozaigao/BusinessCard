/**
 * @filename add_tags.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/4/6
 * @Description: 添加标签
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {debounce, parseData, styleAssign, toast} from "../../utils/datatool";
import {
  absR,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  mb,
  ml,
  mt,
  padding,
  pb,
  pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import * as dictActions from '../../actions/dict';
import * as customerActions from '../../actions/customer';
import TopHeader from "../../compoments/top-header/index";
import {Image, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton/index";
import TouchableButton from "../../compoments/touchable-button/index";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";
import CustomTag from "../../compoments/custom-tag";
import {CustomerModel} from "../../const/global";

interface Props {
  //更新用户信息
  update: any;
  getUserInfo: any;
  updateUserInfo: any;
  getDictItemList: any;
  //更新手动录入客户和系统客户的资料
  updatePrivateCustomer: any;
}

interface State {
  chooseTags: any;
  dengJiTag: string;
  showTagEdit: boolean;
  customer: CustomerModel;
}

@connect(state => state.login, Object.assign(actions, dictActions, customerActions))
class MyTags extends Component<Props, State> {

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
      customer: parseData(this.$router.params.itemData),
      chooseTags: this.$router.params.label ? parseData(this.$router.params.label) : [],
      showTagEdit: false,
      dengJiTag: this.$router.params.intentionGrade
    }
    console.log(this.viewRef);
  }

  componentDidShow() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/4/6
   * @function: 更新手动录入客户和系统客户的资料
   */
  updatePrivateCustomer = () => {
    let {chooseTags, dengJiTag, customer} = this.state;

    if (chooseTags.length === 0) {
      toast('请输入标签');
      return;
    }

    let params = {
      id: customer.id,
      label: JSON.stringify(chooseTags)
    };

    if (dengJiTag.length !== 0) {
      Object.assign(params, {intentionGrade: dengJiTag});
    }


    this.viewRef && this.viewRef.showLoading();
    this.props.updatePrivateCustomer(params).then((res) => {
      console.log('更新手动录入客户和系统客户的资料', res);
      this.getUserInfo();
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('信息更新成功');
        debounce(1000, () => {
          Taro.navigateBack();
        })
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfo = () => {
    this.props.getUserInfo().then((res) => {
      this.props.updateUserInfo(res);
      console.log('获取用户信息', res);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  render() {
    let {chooseTags, showTagEdit, dengJiTag, customer} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'添加标签'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View
            style={styleAssign([styles.uac, styles.udr, wRatio(100), bgColor(commonStyles.whiteColor), pt(20), pb(20)])}>
            <Image style={styleAssign([w(66), h(66), radiusA(33), ml(20)])} src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${cloudBaseUrl}ico_default.png`}/>
            <View style={styleAssign([ml(16)])}>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text style={styleAssign([fSize(18), color('#343434')])}>{customer.name}</Text>
                <Text style={styleAssign([fSize(12), color('#A9A9A9'), ml(8)])}>{customer.position}</Text>
              </View>
              <Text style={styleAssign([fSize(12), color('#A9A9A9'), mt(12)])}>{customer.company}</Text>
            </View>
          </View>
          {/*我的标签*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(16)])}>
              <Text style={styleAssign([fSize(16), color('#343434')])}>手动标签</Text>
              <Text style={styleAssign([fSize(12), color('#979797'), ml(20)])}>(最多添加10个标签)</Text>
            </View>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(8), styles.uWrap])}>
              {
                chooseTags.map((value, index) => {
                  return (<View
                    key={index}
                    style={styleAssign([styles.uac, styles.ujc, padding([6, 15, 6, 15]), radiusA(14)])}>
                    <TouchableButton customStyle={styleAssign([styles.uac, styles.ujc, radiusA(14),
                      padding([6, 15, 6, 15]), bgColor('#E7E7E7')])}>
                      <Text style={styleAssign([fSize(12), color('#343434')])}>{value}</Text>
                      <Image style={styleAssign([w(15), h(15), styles.upa, absT(-5), absR(-5)])}
                             src={`${cloudBaseUrl}ico_close.png`}
                             onClick={() => {
                               this.state.chooseTags.splice(this.state.chooseTags.indexOf(value), 1);
                               this.setState({chooseTags: this.state.chooseTags});
                             }}/>
                    </TouchableButton>
                  </View>);
                })
              }
            </View>
            <View style={styleAssign([styles.udr, mt(16), styles.uae, mb(20)])}>
              <TouchableButton
                customStyle={styleAssign([styles.uac, styles.udr, ml(20), bgColor(commonStyles.colorTheme),
                  w(95), h(28), radiusA(14), styles.uac, styles.ujc])}
                onClick={() => {
                  this.setState({showTagEdit: true});
                }}>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <Image style={styleAssign([w(12), h(12)])} src={`${cloudBaseUrl}ico_black_add.png`}/>
                  <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>自定义标签</Text>
                </View>
              </TouchableButton>
            </View>
          </View>
          {/*等级标签*/}
          <View style={styleAssign([wRatio(100), mt(8), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(20), mt(16)])}>等级标签</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(8),
              styles.uWrap, mb(20)])}>
              {
                ['潜在客户', '一般客户', '重要客户'].map((value, index) => {
                  return (<TouchableButton key={index}
                                           customStyle={styleAssign([ml(24), mt(12), radiusA(14), padding([6, 16, 6, 16]), bo(1), bdColor(dengJiTag === value ? '#979797' : commonStyles.colorTheme), {
                                             borderStyle: 'solid'
                                           }])} onClick={() => {
                    this.setState({dengJiTag: value});
                  }}>
                    <Text
                      style={styleAssign([fSize(12), color(dengJiTag === value ? '#979797' : commonStyles.colorTheme)])}>{value}</Text>
                  </TouchableButton>);
                })
              }
            </View>
          </View>
        </View>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {
          this.updatePrivateCustomer();
        }}/>
        {
          showTagEdit && <CustomTag cancelCallback={() => {
            this.setState({showTagEdit: false});
          }
          } confirmCallback={(content) => {
            this.setState({showTagEdit: false}, () => {
              if (!this.state.chooseTags.includes(content)) {
                if (chooseTags.length < 10) {
                  this.state.chooseTags.push(content);
                  this.setState({chooseTags: this.state.chooseTags});
                } else {
                  toast('最多添加10个标签');
                }
              } else {
                toast('已经有该标签');
              }
            });
          }
          }
          />
        }
      </CustomSafeAreaView>
    );
  }
}

export default MyTags;
