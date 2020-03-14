/**
 * @filename my_tags.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 我的标签
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {debounce, styleAssign, toast} from "../../utils/datatool";
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
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import * as dictActions from '../../actions/dict';
import TopHeader from "../../compoments/top-header/index";
import {Image, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton/index";
import TouchableButton from "../../compoments/touchable-button/index";
import {cloudBaseUrl, NetworkState} from "../../api/httpurl";

interface Props {
  //更新用户信息
  update: any;
  getUserInfo: any;
  updateUserInfo: any;
  getDictItemList: any;
}

interface State {
  chooseTags: any;
  tags: any[];
}

@connect(state => state.login, Object.assign(actions, dictActions))
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
      chooseTags: props.userInfo.labelArray,
      tags: []
    }
    console.log(this.viewRef);
  }

  componentDidShow() {
    this.getDictItemList();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/8
   * @function: 获取后台配置标签
   */
  getDictItemList = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.getDictItemList({dictCode: 'user_label '}).then((res) => {
      console.log('获取后台配置标签', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        this.setState({tags: res});
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 更新用户信息
   */
  update = () => {
    console.log('函数', this.props)
    let {chooseTags} = this.state;

    if (chooseTags.length === 0) {
      toast('请选择标签');
      return;
    }

    let paramas = {
      label: JSON.stringify(chooseTags)
    };

    console.log('参数错误', paramas);

    this.viewRef && this.viewRef.showLoading();
    this.props.update(paramas).then((res) => {
      console.log('更新用户信息', res);
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
    let {chooseTags, tags} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'我的标签'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          {/*我的标签*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(16)])}>
              <Text style={styleAssign([fSize(16), color('#343434')])}>我的标签</Text>
              <Text style={styleAssign([fSize(12), color('#979797'), ml(20)])}>长按拖动可以排序(最多添加4个标签)</Text>
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
                  w(95), h(28), radiusA(14), styles.uac, styles.ujc])}>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <Image style={styleAssign([w(12), h(12)])} src={`${cloudBaseUrl}ico_black_add.png`}/>
                  <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>自定义标签</Text>
                </View>
              </TouchableButton>
              <Text style={styleAssign([fSize(12), color(commonStyles.colorTheme), ml(14)])}>（仅限于兴趣爱好）</Text>
            </View>
          </View>
          {/*常用标签*/}
          <View style={styleAssign([wRatio(100), h(154), mt(8), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(20), mt(16)])}>常用标签</Text>
            <View style={styleAssign([wRatio(100), styles.udr, styles.uac, mt(8),
              styles.uWrap])}>
              {
                tags.map((value, index) => {
                  return (<TouchableButton key={index}
                                           customStyle={styleAssign([ml(24), mt(12), radiusA(14), padding([6, 16, 6, 16]), bo(1), bdColor(chooseTags.includes(value.itemText) ? '#979797' : commonStyles.colorTheme), {
                                             borderStyle: 'solid'
                                           }])} onClick={() => {
                    if (!this.state.chooseTags.includes(value.itemText)) {
                      if (chooseTags.length < 4) {
                        this.state.chooseTags.push(value.itemText);
                        this.setState({chooseTags: this.state.chooseTags});
                      } else {
                        toast('最多添加4个标签');
                      }
                    }
                  }}>
                    <Text
                      style={styleAssign([fSize(12), color(chooseTags.includes(value.itemText) ? '#979797' : commonStyles.colorTheme)])}>{value.itemText}</Text>
                  </TouchableButton>);
                })
              }
            </View>
          </View>
        </View>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {
          this.update();
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default MyTags;
