/**
 * @filename my_home.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/3/8
 * @Description: 我的家乡
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {
  absB,
  absR,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  mb,
  ml,
  mt,
  pa,
  pl,
  pr,
  w,
  wRatio
} from "../../utils/style";
import {debounce, styleAssign, toast} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header/index";
import {Picker, Text, Textarea, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton/index";
import ListItem from "../../compoments/list-item/index";
import WenHouModal, {WenHouType} from "../sub_pagecomponent/wenhou-modal/index";
import {NetworkState} from "../../api/httpurl";
import {User} from "../../const/global";

interface Props {
  //更新用户信息
  update?: any;
  userInfo: User;
}

interface State {
  list: { title: string, subtitle?: string, value?: string; hasEdit?: boolean; }[];
  wenHouYU: string;
  wenHouYUTmp: string;
  placeHolder: string;
  showWenHouYu: boolean;
}

@connect(state => state.login, {...actions})
class MyHome extends Component<Props, State> {

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
  private viewRef;
  private province;
  private city;
  private placeHolder;

  constructor(props) {
    super(props);
    this.province = this.$router.params.province;
    this.city = this.$router.params.city;
    this.placeHolder = '同乡您好，很高兴能遇到你！你可以收藏我的名片哦~';
    this.state = {
      list: [{title: '家乡', subtitle: '选择地址', value: this.province + this.city}],
      wenHouYU: this.$router.params.villagerGreeting,
      wenHouYUTmp: this.$router.params.villagerGreeting,
      placeHolder: this.placeHolder,
      showWenHouYu: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }


  componentDidHide() {
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 更新用户信息
   */
  update = () => {
    let {wenHouYU} = this.state;

    if (!this.province || this.province.length === 0 || !this.city || this.city.length === 0) {
      toast('请选择地区');
      return;
    }
    if (!wenHouYU || wenHouYU.length === 0) {
      toast('请输入问候语');
      return;
    }

    this.viewRef && this.viewRef.showLoading();
    let params = {
      hometownProvince: this.province,
      hometownCity: this.city,
      villagerGreeting: wenHouYU
    };

    console.log('参数错误', params);
    this.props.update(params).then((res) => {
      console.log('更新用户信息', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('保存成功');
        debounce(1000, () => {
          Taro.navigateBack();
        })
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {

    let {list, wenHouYU, showWenHouYu, placeHolder, wenHouYUTmp} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'我的家乡'}/>
        <View
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uf1, mt(10)])}>
            {
              list.map((value, index) => {
                return (<Picker mode='region' onChange={(e) => {
                  this.province = e.detail.value[0];
                  this.city = e.detail.value[1] + e.detail.value[2];
                  this.state.list[0].value = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                  this.setState({list: this.state.list});
                }} value={[]}>
                  <ListItem textColor={'#727272'}
                            title={value.title}
                            value={value.value}
                            subTitle={value.subtitle}
                            key={index}
                            hasEdit={value.hasEdit}/></Picker>);

              })
            }
            <View style={styleAssign([wRatio(100), h(161), bgColor(commonStyles.whiteColor), mt(10)])}>
              <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujb, pl(20), pr(20),])}>
                <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>同乡问候语</Text>
                <View style={styleAssign([w(50), h(50), styles.uae, styles.ujc])}
                      onClick={() => {
                        if (wenHouYU.length === 0) {
                          toast('问候语不能为空');
                        } else {
                          this.setState({showWenHouYu: true, wenHouYU: '', placeHolder: ''});
                        }
                      }}>
                  <Text style={styleAssign([fSize(14), color('#E2BB7B')])}>预览</Text>
                </View>
              </View>
              <View style={styleAssign([wRatio(100), h(131), bgColor(commonStyles.whiteColor)])}>
              <Textarea value={wenHouYU}
                        maxlength={25}
                        placeholder={placeHolder}
                        style={styleAssign([w(305), h(91), fSize(16), ml(20),
                          bgColor(commonStyles.pageDefaultBackgroundColor), pa(16), mb(20)])}
                        onInput={(e) => {
                          this.setState({wenHouYU: e.detail.value, wenHouYUTmp: e.detail.value});
                        }}/>
                <View style={styleAssign([styles.uac, styles.udr, styles.upa, absR(30), absB(30)])}>
                  <Text style={styleAssign([fSize(12), color('#979797')])}>{wenHouYU.length}</Text>
                  <Text style={styleAssign([fSize(12), color('#CECECE')])}>/25</Text>
                </View>
                <View
                  style={styleAssign([wRatio(100), h(20), bgColor(commonStyles.whiteColor), styles.upa, absR(0), absB(0)])}/>
              </View>
            </View>
          </View>

          {/*保存*/}
          <BottomButon title={'保存'} onClick={() => {
            this.update();
          }}/>
        </View>
        {
          showWenHouYu && <WenHouModal type={WenHouType.HOME} cancle={() => {
            this.setState({showWenHouYu: false, wenHouYU: wenHouYUTmp, placeHolder: this.placeHolder});
          }} wenHouYu={wenHouYUTmp} userInfo={this.props.userInfo}/>
        }
      </CustomSafeAreaView>
    )
  }
}


export default MyHome
