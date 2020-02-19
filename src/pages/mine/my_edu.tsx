/**
 * @filename my_edu.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 教育经历
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {bgColor, commonStyles, default as styles, mt} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header";
import {View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import ListItem from "../../compoments/list-item";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  list: { title: string, subtitle?: string, hasEdit?: boolean; }[];
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

  constructor(props) {
    super(props);
    this.state = {
      list: [{title: '学校', subtitle: '请输入学校名称', hasEdit: true},
        {title: '学历', subtitle: '选择'},
        {title: '专业', subtitle: '请输入专业名称', hasEdit: true},
        {title: '在校时间', subtitle: '选择'}],
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

    let {list} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'教育经历'}/>
        <View
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uf1, mt(10)])}>
            {
              list.map((value, index) => {
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
          </View>
          {/*保存*/}
          <BottomButon title={'保存'} onClick={() => {

          }}/>
        </View>
      </CustomSafeAreaView>
    )
  }
}


export default MyEdu
