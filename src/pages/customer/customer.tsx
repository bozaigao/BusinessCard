/**
 * @filename customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 客户
*/
import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {bgColor, h, iphoneX, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/home";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  bannerList: string[];
}

@connect(state => state.home, {...actions})
class Customer extends Component<Props, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    disableScroll: true
  }

  constructor(props) {
    super(props);
    this.state = {
      bannerList: []
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

    return (
      <CustomSafeAreaView>
        {/*以下组件代码没有抽离出单独的组件进行引用，只是简单的演示作用*/}
        {/*政策解读*/}
        <ScrollView style={styleAssign([wRatio(100), h(iphoneX() ? 600 : 500), bgColor('blue')])}
                    scrollY>
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}


export default Customer
