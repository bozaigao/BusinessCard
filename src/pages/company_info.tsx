/**
 * @filename company_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 企业信息
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../utils/datatool";
import {bgColor, color, commonStyles, default as styles, fSize, h, mb, ml, mr, mt, w, wRatio} from "../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../actions/login';
import TopHeader from "../compoments/top-header/index";
import {Image, Input, ScrollView, Text, View} from "@tarojs/components";
import BottomButon from "../compoments/bottom-buton/index";
import ListItem from "./sub_pagecomponent/list-item/index";
import {cloudBaseUrl} from "../api/httpurl";

interface Props {
}

interface State {
  companyName: string;
  companySite: string;
  companyLogo: string;
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
    let {companyName, companySite, companyLogo} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'企业信息'}/>
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY>
          {/*企业名称*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}>
            <View style={styleAssign([wRatio(100), h(55), styles.udr, styles.uac, styles.ujb])}>
              <View style={styleAssign([ml(20)])}>
                <Text style={styleAssign([fSize(14), color('#242424')])}>企业名称</Text>
              </View>
              <Input type='text' value={companyName}
                     placeholder={'必填'}
                     style={styleAssign([fSize(14), mr(20), {textAlign: 'right'}])}
                     onInput={(e) => {
                       this.setState({companyName: e.detail.value});
                     }}/>
            </View>
            <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>
          {/*企业官网*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}>
            <View style={styleAssign([wRatio(100), h(55), styles.udr, styles.uac, styles.ujb])}>
              <View style={styleAssign([ml(20)])}>
                <Text style={styleAssign([fSize(14), color('#242424')])}>企业官网</Text>
              </View>
              <Input type='text' value={companySite}
                     placeholder={'选填'}
                     style={styleAssign([fSize(14), mr(20), {textAlign: 'right'}])}
                     onInput={(e) => {
                       this.setState({companySite: e.detail.value});
                     }}/>
            </View>
            <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>
          {/*企业Logo*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac])}>
            <View style={styleAssign([wRatio(100), h(55), styles.udr, styles.uac, styles.ujb])}>
              <View style={styleAssign([ml(20)])}>
                <Text style={styleAssign([fSize(14), color('#242424')])}>企业LOGO</Text>
              </View>
            </View>
            <View style={styleAssign([w(335), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          </View>
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
