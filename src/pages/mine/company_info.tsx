/**
 * @filename company_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 企业信息
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, mb, ml, mt, w, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import ListItem from "./list-item";
import {cloudBaseUrl} from "../../api/httpurl";

interface Props {
}

interface State {

}

@connect(state => state.login, {...actions})
class CompanyInfo extends Component<Props, State> {

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
        <TopHeader title={'企业信息'}/>
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY>
          {
            [{title: '企业名称', subTitle: '必填'},
              {title: '企业官网', subTitle: '选填'},
              {title: '企业LOGO', subTitle: ''}].map((value, index) => {
              return (
                <ListItem title={value.title} subTitle={value.subTitle} key={index}/>);
            })
          }
          <View style={styleAssign([wRatio(100), h(230), bgColor(commonStyles.whiteColor), mb(10)])}>
            <View style={styleAssign([styles.uac, ml(36), w(160), mt(16)])}>
              <Image style={styleAssign([w(160), h(160)])} src={`${cloudBaseUrl}ico_click_upload.png`}
                     onClick={() => {
                       Taro.chooseImage({count: 1}).then(() => {

                       });
                     }}/>
              <Text style={styleAssign([fSize(12), color('#B7B7B7'), mt(14)])}>建议尺寸：350px*350px</Text>
            </View>
          </View>
          {/*企业视频*/}
          <ListItem title={'企业视频'}/>
          <View
            style={styleAssign([wRatio(100), h(193), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor), mb(10)])}>
            <Image style={styleAssign([w(305), h(160)])} src={`${cloudBaseUrl}ico_upload_video.png`}
                   onClick={() => {
                     Taro.chooseVideo({compressed: true}).then(() => {

                     });
                   }}/>
          </View>
        </ScrollView>
        {/*提交*/}
        <BottomButon title={'提交'} onClick={() => {

        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default CompanyInfo;
