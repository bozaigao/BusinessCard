import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import {bgColor, commonStyles, hRatio, iphoneX, pb, pt, wRatio} from "../../utils/style";
import Loading from "../loading";

interface Props {
  customStyle?: any;
  children?: any;
  notNeedTopPadding?: boolean;
  notNeedBottomPadding?: boolean;
}

interface State {
  paddingTop: any;
  //是否显示进度条
  showLoading: boolean;
  paddingBottom: number;
}

export default class CustomSafeAreaView extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      paddingTop: 0,
      paddingBottom: 0,
      showLoading: false,
    }
  }

  componentWillMount() {
    //这里只要是针对微信小程序设置自定义tabBar后的iphoneX高度适配
    if (iphoneX()) {
      this.setState({paddingTop: 78, paddingBottom: 44});
    } else {
      this.setState({paddingTop: 55});
    }
  }

  render() {
    let {customStyle, children, notNeedTopPadding, notNeedBottomPadding} = this.props;
    let {paddingTop, showLoading, paddingBottom} = this.state;

    console.log('距离顶部', paddingTop)

    return (
      <View
        style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor), pt(notNeedTopPadding ? 0 : paddingTop), pb(notNeedBottomPadding ? 0 : paddingBottom), customStyle])}>
        {
          children
        }
        {
          showLoading && <Loading/>
        }
      </View>
    )
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/9/25
   * @function: 显示进度条
   */
  showLoading = () => {
    this.setState({showLoading: true});
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/9/25
   * @function: 隐藏进度条
   */
  hideLoading = () => {
    this.setState({showLoading: false});
  }

}
