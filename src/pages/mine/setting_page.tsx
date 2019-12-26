/**
 * @filename setting_page.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 设置界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, mt, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Text, View} from "@tarojs/components";
import ListItem from "../../compoments/list-item";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class SettingPage extends Component<Props, State> {

  private viewRef;


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
    console.log(this.viewRef);
  }


  render() {

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'设置'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              [{title: '使用小技巧'},
                {title: '投诉与建议'},
                {title: '关于极致名片'}].map((value, index) => {
                return (<ListItem title={value.title} key={index}
                                  onCLick={(title) => {
                                    if (title === '投诉与建议') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/feedback`
                                      });
                                    } else if (title === '关于极致名片') {
                                    }
                                  }
                                  }/>);
              })
            }
          </View>
          {/*slogan*/}
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(283)])}>
            <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>极致名片 给您极致服务</Text>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default SettingPage;
