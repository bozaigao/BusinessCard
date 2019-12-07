import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView} from '@tarojs/components'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {bgColor, h, iphoneX, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/home";
//@ts-ignore

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion
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
  private viewRef;

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
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }}>
        {/*以下组件代码没有抽离出单独的组件进行引用，只是简单的演示作用*/}
        {/*政策解读*/}
        <ScrollView style={styleAssign([wRatio(100), h(iphoneX() ? 600 : 500), bgColor('blue')])}
                    scrollY>
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Customer
