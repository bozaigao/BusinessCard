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
import {styleAssign, toast} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header";
import {Picker, Text, Textarea, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import ListItem from "../../compoments/list-item";
import WenHouModal from "../sub_pagecomponent/wenhou-modal";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  list: { title: string, subtitle?: string, hasEdit?: boolean; }[];
  wenHouYU: string;
  //这里的tmp主要是解决弹窗把TextArea里面的文字遮不住问题，很奇怪
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
  private placeHolder;

  constructor(props) {
    super(props);
    this.placeHolder = '校友您好，很高兴能遇到你！你可以收藏我的名片哦~';
    this.state = {
      list: [{title: '学校', subtitle: '请输入学校名称', hasEdit: true},
        {title: '学历', subtitle: '选择'},
        {title: '专业', subtitle: '请输入专业名称', hasEdit: true},
        {title: '在校时间', subtitle: '选择'}],
      wenHouYU: '',
      wenHouYUTmp: '',
      placeHolder: this.placeHolder,
      showWenHouYu: false
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

    let {list, wenHouYU, wenHouYUTmp, showWenHouYu} = this.state;
    let selectorRange = ['博士', '研究生', '专科', '高中'];
    let multiSelectorRange = [['2015', '2016', '2017', '2018', '2019'], ['到'], ['2020', '2021', '2022', '2023', '2024']];

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'教育经历'}/>
        <View
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uf1, mt(10)])}>
            {
              list.map((value, index) => {
                if (value.title === '学历') {
                  return (<Picker mode='selector' onChange={(e) => {
                    this.state.list[1].subtitle = selectorRange[e.detail.value];
                    this.setState({list: this.state.list});
                  }} range={selectorRange} value={0}>
                    <ListItem textColor={'#727272'}
                              title={value.title}
                              subTitle={value.subtitle}
                              key={index}
                              hasEdit={value.hasEdit}
                              onCLick={(title) => {
                                if (title === '联系方式') {
                                  Taro.navigateTo({
                                    url: `/pages/mine/contact_way`
                                  });
                                } else if (title === '行业') {
                                  Taro.navigateTo({
                                    url: `/pages/mine/industry_list`,
                                    success: (e) => {
                                      console.log('参数回传1', e);
                                    }
                                  });
                                }
                              }
                              } onTextChange={(e) => {
                      // this.setState({name: e.detail.value});
                      console.log(e);
                    }
                    }/></Picker>);
                } else if (value.title === '在校时间') {
                  return (<Picker mode='multiSelector' onChange={(e) => {
                    this.state.list[3].subtitle = multiSelectorRange[0][e.detail.value[0]] + '-' + multiSelectorRange[2][e.detail.value[2]];
                    this.setState({list: this.state.list});
                  }} range={multiSelectorRange} value={[4, 0, 0]}>
                    <ListItem textColor={'#727272'}
                              title={value.title}
                              subTitle={value.subtitle}
                              key={index}
                              hasEdit={value.hasEdit}
                              onCLick={(title) => {
                                if (title === '联系方式') {
                                  Taro.navigateTo({
                                    url: `/pages/mine/contact_way`
                                  });
                                } else if (title === '行业') {
                                  Taro.navigateTo({
                                    url: `/pages/mine/industry_list`,
                                    success: (e) => {
                                      console.log('参数回传1', e);
                                    }
                                  });
                                }
                              }
                              } onTextChange={(e) => {
                      // this.setState({name: e.detail.value});
                      console.log(e);
                    }
                    }/></Picker>);
                }
                return (<ListItem textColor={'#727272'}
                                  title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    if (title === '联系方式') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/contact_way`
                                      });
                                    } else if (title === '行业') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/industry_list`,
                                        success: (e) => {
                                          console.log('参数回传1', e);
                                        }
                                      });
                                    }
                                  }
                                  } onTextChange={(e) => {
                  // this.setState({name: e.detail.value});
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
              <View style={styleAssign([wRatio(100), h(101)])}>
              <Textarea value={wenHouYU}
                        maxlength={28}
                        placeholder={this.placeHolder}
                        style={styleAssign([w(305), h(91), fSize(16), ml(20),
                          bgColor(commonStyles.pageDefaultBackgroundColor), pa(16), mb(20)])}
                        onInput={(e) => {
                          this.setState({wenHouYU: e.detail.value, wenHouYUTmp: e.detail.value});
                        }}/>
                <View style={styleAssign([styles.uac, styles.udr, styles.upa, absR(30), absB(30)])}>
                  <Text style={styleAssign([fSize(12), color('#979797')])}>{wenHouYU.length}</Text>
                  <Text style={styleAssign([fSize(12), color('#CECECE')])}>/28</Text>
                </View>
              </View>
            </View>
          </View>

          {/*保存*/}
          <BottomButon title={'保存'} onClick={() => {

          }}/>
        </View>
        {
          showWenHouYu && <WenHouModal cancle={() => {
            this.setState({showWenHouYu: false, wenHouYU: wenHouYUTmp, placeHolder: this.placeHolder});
          }} wenHouYu={wenHouYUTmp}/>
        }
      </CustomSafeAreaView>
    )
  }
}


export default MyEdu
