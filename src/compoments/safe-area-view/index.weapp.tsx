import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import {bgColor, commonStyles, hRatio, mb, wRatio} from "../../utils/style";
import Loading from "../loading";
import {Global} from "../../const/global";

declare let global: Global;

interface Props {
  customStyle?: any;
  children?: any;
  notNeedBottomPadding?: boolean;
}

interface State {
  paddingTop: any;
  //是否显示进度条
  showLoading: boolean;
  paddingBottom: number;
  title: string;
}

export default class CustomSafeAreaView extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      paddingTop:global.menuButton.top,
      paddingBottom: 0,
      showLoading: false,
      title: ''
    }
  }


  render() {
    let {customStyle, children, notNeedBottomPadding} = this.props;
    let {paddingTop, showLoading, paddingBottom, title} = this.state;

    console.log('距离顶部', paddingTop)

    return (
      <View
        style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor),  mb(notNeedBottomPadding ? 0 : paddingBottom), customStyle])}>
        {
          children
        }
        {
          showLoading && <Loading title={title}/>
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
  showLoading = (title?: string) => {
    this.setState({showLoading: true, title: title ? title : ''});
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
