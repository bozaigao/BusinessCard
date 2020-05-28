import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {styleAssign} from "../../utils/datatool";
import {bgColor, commonStyles, hRatio, wRatio} from "../../utils/style";
import {Global} from "../../const/global";

declare let global: Global;

interface Props {
  customStyle?: any;
  children?: any;
  notNeedBottomPadding?: boolean;
}

interface State {

}

export default class CustomSafeAreaView extends Component<Props, State> {

  constructor(props) {
    super(props);
  }


  render() {
    let {customStyle, children, notNeedBottomPadding} = this.props;

    return (
      <View
        style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor), {marginBottom: notNeedBottomPadding ? '0px' : `${global.screenHeight - global.safeArea.bottom}px`}, customStyle])}>
        {
          children
        }
      </View>
    )
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
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
   * @function: 隐藏进度条
   */
  hideLoading = () => {
    Taro.hideLoading();
  }

}
