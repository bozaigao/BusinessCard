/**
 * @filename task_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务中心
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import ListItem from "../../compoments/list-item";

interface Props {
}

interface State {

}

@connect(state => state.home, {...actions})
class PersonalInfo extends Component<Props, State> {

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
        <TopHeader title={'个人信息'}/>
        {/*任务列表*/}
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY>
          <View style={styleAssign([wRatio(100), h(86), styles.uac, styles.udr, styles.ujb,
            bgColor(commonStyles.whiteColor), pl(20), pr(20)])}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>头像</Text>
            <Image style={styleAssign([w(60), h(60), radiusA(30)])} src={require('../../assets/ico_default.jpeg')}/>
          </View>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              [{title: '姓名', subtitle: '必填', hasEdit: true},
                {title: '联系方式', subtitle: '15982468866'},
                {title: '行业', subtitle: '选择'},
                {title: '职位', subtitle: '必填'}].map((value, index) => {
                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    if (title === '联系方式') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/contact_way`
                                      });
                                    }
                                  }
                                  }/>);
              })
            }
          </View>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              [{title: '我的标签', subtitle: '添加'},
                {title: '微信&微信二维码', subtitle: '15982468866'},
                {title: '邮箱', subtitle: '选填', haEdit: true},
                {title: '生日', subtitle: '必填'},
                {title: '地区', subtitle: '选择'},
                {title: '地址', subtitle: '选填'}].map((value: any, index) => {
                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    if (title === '我的标签') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/my_tags`
                                      });
                                    }
                                  }
                                  }/>);
              })
            }
          </View>
        </ScrollView>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default PersonalInfo;
