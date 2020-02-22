/**
 * @filename help.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/22
 * @Description: 使用帮助
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Text, View} from "@tarojs/components";
import HelpListItem from "./help-list-item";

interface Props {
}

interface State {
}

@connect(state => state.login, {...actions})
class Help extends Component<Props, State> {

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
        <TopHeader title={'使用帮助'}/>
        <View style={styleAssign([styles.uf1,bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          {
            ['极致推有什么用？', '如何完善名片信息？如何完善名片信息？',
              '如何分享自己的名片？', '客户可以通过哪些途径查看名片？',
              '如何获取自己的人脉？', '如何开通自己的商铺？',
              '雷达功能有什么作用？', '如何开启消息提醒？',
              '如何修改名片样式？'].map((value, index) => {
              return <HelpListItem key={index} title={value} onClick={() => {

              }}/>;
            })
          }
          {/*slogan*/}
          <View
            style={styleAssign([wRatio(100), h(86), styles.ujc, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
            <Text style={styleAssign([fSize(18), color('#D2D2D2')])}>极易推 给您极致服务</Text>
          </View>
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default Help;
