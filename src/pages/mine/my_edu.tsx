/**
 * @filename my_edu.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 教育经历
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
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
import TopHeader from "../../compoments/top-header";
import {Picker, Text, Textarea, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import ListItem from "../../compoments/list-item";
import WenHouModal from "../sub_pagecomponent/wenhou-modal";
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
class MyEdu extends Component<Props, State> {

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
  private schoolTimeStart;
  private schoolTimeEnd;
  private placeHolder;

  constructor(props) {
    super(props);
    this.schoolTimeStart = this.$router.params.schoolTimeStart;
    this.schoolTimeEnd = this.$router.params.schoolTimeEnd;
    this.placeHolder = '校友您好，很高兴能遇到你！你可以收藏我的名片哦~';
    this.state = {
      list: [{title: '学校', subtitle: '请输入学校名称', value: this.$router.params.school, hasEdit: true},
        {title: '学历', subtitle: '选择', value: this.$router.params.educationBackground},
        {title: '专业', subtitle: '请输入专业名称', value: this.$router.params.profession, hasEdit: true},
        {title: '在校时间', subtitle: '选择', value: this.schoolTimeStart + '-' + this.schoolTimeEnd}],
      wenHouYU: this.$router.params.schoolfellowGreeting,
      wenHouYUTmp: this.$router.params.schoolfellowGreeting,
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
    let {wenHouYU, list} = this.state;

    if (list[0].value && list[0].value.length === 0) {
      toast('请输入学校名称');
      return;
    }
    if (list[1].value && list[1].value.length === 0) {
      toast('请选择学历');
      return;
    }
    if (list[2].value && list[2].value.length === 0) {
      toast('请输入你的专业');
      return;
    }
    if (this.schoolTimeStart === 0 || this.schoolTimeEnd === 0) {
      toast('请选择在校时间');
      return;
    }
    if (wenHouYU.length === 0) {
      toast('请输入问候语');
      return;
    }

    this.viewRef && this.viewRef.showLoading();
    let params = {
      school: list[0].value && list[0].value,
      educationBackground: list[1].value && list[1].value,
      profession: list[2].value && list[2].value,
      schoolTimeStart: `${this.schoolTimeStart}`,
      schoolTimeEnd: `${this.schoolTimeEnd}`,
      schoolfellowGreeting: wenHouYU
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
    let selectorRange = ['博士', '研究生', '专科', '高中'];
    let multiSelectorRange = [['2015', '2016', '2017', '2018', '2019'], ['到'], ['2020', '2021', '2022', '2023', '2024']];

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'教育经历'}/>
        <View
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uf1, mt(10)])}>
            {
              list.map((value, index) => {
                if (value.title === '学历') {
                  return (<Picker mode='selector' onChange={(e) => {
                    this.state.list[1].value = selectorRange[e.detail.value];
                    this.setState({list: this.state.list});
                  }} range={selectorRange} value={0}>
                    <ListItem textColor={'#727272'}
                              title={value.title}
                              value={value.value}
                              subTitle={value.subtitle}
                              key={index}
                              hasEdit={value.hasEdit}/></Picker>);
                } else if (value.title === '在校时间') {
                  return (<Picker mode='multiSelector' onChange={(e) => {
                    this.schoolTimeStart = multiSelectorRange[0][e.detail.value[0]];
                    this.schoolTimeEnd = multiSelectorRange[2][e.detail.value[2]];
                    this.state.list[3].value = multiSelectorRange[0][e.detail.value[0]] + '-' + multiSelectorRange[2][e.detail.value[2]];
                    this.setState({list: this.state.list});
                  }} range={multiSelectorRange} value={[4, 0, 0]}>
                    <ListItem textColor={'#727272'}
                              title={value.title}
                              value={value.value}
                              subTitle={value.subtitle}
                              key={index}
                              hasEdit={value.hasEdit}/></Picker>);
                }
                return (<ListItem textColor={'#727272'}
                                  value={value.value}
                                  title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onTextChange={(e) => {
                                    if (value.title === '学校') {
                                      this.state.list[0].value = e.detail.value;
                                      this.setState({list: this.state.list});
                                    } else if (value.title === '专业') {
                                      this.state.list[2].value = e.detail.value;
                                      this.setState({list: this.state.list});
                                    }
                                    console.log(e);
                                  }
                                  }/>);
              })
            }
            <View style={styleAssign([wRatio(100), h(161), bgColor(commonStyles.whiteColor), mt(10)])}>
              <View style={styleAssign([wRatio(100), styles.uac, styles.udr, styles.ujb, pl(20), pr(20),])}>
                <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>同校问候语</Text>
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
                        maxlength={50}
                        placeholder={placeHolder}
                        style={styleAssign([w(305), h(91), fSize(16), ml(20),
                          bgColor(commonStyles.pageDefaultBackgroundColor), pa(16), mb(20)])}
                        onInput={(e) => {
                          this.setState({wenHouYU: e.detail.value, wenHouYUTmp: e.detail.value});
                        }}/>
                <View style={styleAssign([styles.uac, styles.udr, styles.upa, absR(30), absB(30)])}>
                  <Text style={styleAssign([fSize(12), color('#979797')])}>{wenHouYU.length}</Text>
                  <Text style={styleAssign([fSize(12), color('#CECECE')])}>/50</Text>
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
          showWenHouYu && <WenHouModal cancle={() => {
            this.setState({showWenHouYu: false, wenHouYU: wenHouYUTmp, placeHolder: this.placeHolder});
          }} wenHouYu={wenHouYUTmp} userInfo={this.props.userInfo}/>
        }
      </CustomSafeAreaView>
    )
  }
}


export default MyEdu
