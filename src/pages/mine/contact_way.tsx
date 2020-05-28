/**
 * @filename contact_way.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 联系方式
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, mt, pl, pr, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import BottomButon from "../../compoments/bottom-buton";
import {Text, View} from "@tarojs/components";
import SwitchItem from "../../compoments/switch-item";
import ListItem from "../../compoments/list-item";

interface Props {
}

interface State {

}

@connect(state => state.login, {...actions})
class ContactWay extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {

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
        <TopHeader title={'联系方式'}/>
        {/*绑定提示*/}
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), styles.uac])}>
            <View style={styleAssign([wRatio(100), styles.uac, styles.udr, pl(20), pr(20),
              styles.ujb, h(51), bgColor(commonStyles.whiteColor), mt(10)])}>
              <Text style={styleAssign([fSize(14), color('#B7B7B7')])}>微信绑定手机号（默认）</Text>
              <Text style={styleAssign([fSize(14), color('#B7B7B7')])}>15982468866</Text>
            </View>
            <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>
          <SwitchItem title={'在名片上展示手机号'}/>
          <ListItem title={'更改展示手机号'} subTitle={'选填'}
                    hasEdit={true}/>
          <SwitchItem title={'只对已交换名片的客户展示'}/>
        </View>
        {/*保存*/}
        <BottomButon title={'确定'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default ContactWay;
