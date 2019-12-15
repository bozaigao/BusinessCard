import Taro from '@tarojs/taro'
import {SafeAreaView} from 'react-native';
import {Component} from "react";
import {styleAssign} from "../../utils/datatool";
import {bgColor, commonStyles, hRatio, wRatio} from "../../utils/style";
import Loading from "../loading";

interface Props {
  style?: any;
  onClick?: any;
  children?: any;
  notNeedTopPadding?: boolean;
  notNeedBottomPadding?: boolean;
}

interface State {
  //是否显示进度条
  showLoading: boolean;
}

export default class CustomSafeAreaView extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false,
    }
  }

  render() {
    let {style, children} = this.props;
    let {showLoading} = this.state;

    return (
      <SafeAreaView
        style={styleAssign([wRatio(100), hRatio(100), bgColor(commonStyles.whiteColor), style])}
      >
        {children}
        {
          showLoading && <Loading/>
        }
      </SafeAreaView>
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
