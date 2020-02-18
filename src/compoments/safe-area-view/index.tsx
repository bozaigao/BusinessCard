import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import {bgColor, commonStyles, hRatio, wRatio} from "../../utils/style";
import Loading from "../loading";
import {Global} from "../../const/global";

declare let global: Global;

interface Props {
  customStyle?: any;
  children?: any;
  notNeedBottomPadding?: boolean;
}

interface State {
  //是否显示进度条
  showLoading: boolean;
  title: string;
}

export default class CustomSafeAreaView extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      title: ''
    }
  }


  render() {
    let {customStyle, children, notNeedBottomPadding} = this.props;
    let {showLoading, title} = this.state;

    return (
      <View
        style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor), {marginBottom: notNeedBottomPadding ? '0px' : `${global.screenHeight - global.safeArea.bottom}px`}, customStyle])}>
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
    Taro.showLoading({
      title: title ? title : '加载中',
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/9/25
   * @function: 隐藏进度条
   */
  hideLoading = () => {
    Taro.hideLoading();
  }

}
