/**
 * @filename company_info.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 企业信息
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {debounce, get, parseData, styleAssign, toast} from "../../utils/datatool";
import {
  absR, absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  mb,
  ml,
  mr,
  mt,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Image, Input, ScrollView, Text, Video, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton/index";
import ListItem from "../../compoments/list-item2/index";
import {cloudBaseUrl, FileController, NetworkState} from "../../api/httpurl";
import {Enum, User} from "../../const/global";

interface Props {
  //更新用户信息
  update: any;
  userInfo: User;
}

interface State {
  enterpriseName: string;
  enterpriseWebsite: string;
  enterpriseLogo: string;
  enterpriseLogoLocal: string;
  enterpriseVideo: string;
  enterpriseVideoLocal: string;
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
    this.state = {
      enterpriseName: props.userInfo.enterpriseName,
      enterpriseWebsite: props.userInfo.enterpriseWebsite,
      enterpriseLogo: props.userInfo.enterpriseLogo,
      enterpriseLogoLocal: props.userInfo.enterpriseLogo,
      enterpriseVideo: props.userInfo.enterpriseVideo,
      enterpriseVideoLocal: props.userInfo.enterpriseVideo,
    }
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/14
   * @function: 更新企业信息
   */
  update = () => {
    let {enterpriseName, enterpriseWebsite, enterpriseLogo, enterpriseVideo} = this.state;

    this.viewRef && this.viewRef.showLoading();
    let that = this;

    this.props.update({
      enterpriseName,
      enterpriseWebsite,
      enterpriseLogo,
      enterpriseVideo
    }).then((res) => {
      console.log('更新企业信息', res);
      that.viewRef && that.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('信息更新成功');
        debounce(1000, () => {
          Taro.navigateBack();
        });
      }


    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {enterpriseName, enterpriseWebsite, enterpriseLogoLocal, enterpriseVideoLocal, enterpriseLogo} = this.state;

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
              <Input type='text' value={enterpriseName}
                     placeholder={'必填'}
                     maxLength={16}
                     style={styleAssign([fSize(14), mr(20), {textAlign: 'right'}])}
                     onInput={(e) => {
                       this.setState({enterpriseName: e.detail.value});
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
              <Input type='text' value={enterpriseWebsite}
                     placeholder={'选填'}
                     style={styleAssign([fSize(14), mr(20), {textAlign: 'right'}])}
                     onInput={(e) => {
                       this.setState({enterpriseWebsite: e.detail.value});
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
              {
                enterpriseLogoLocal.length === 0 ?
                  <View style={styleAssign([wRatio(100)])}>
                    <Image style={styleAssign([w(160), h(160)])} src={`${cloudBaseUrl}ico_click_upload.png`}
                           onClick={() => {
                             Taro.chooseImage({count: 1}).then((res) => {
                               console.log(res)
                               this.setState({enterpriseLogoLocal: res.tempFilePaths[0]});
                               this.uploadFileTpWx(res.tempFilePaths[0], 'image');
                             });
                           }}/>
                    <Text style={styleAssign([fSize(12), color('#B7B7B7'), mt(14)])}>建议尺寸：350px*350px</Text>
                  </View> :
                  <View style={styleAssign([w(160), h(160)])}>
                    <Image style={styleAssign([w(160), h(160)])} src={enterpriseLogoLocal}/>
                    <Image style={styleAssign([w(20), h(20), styles.upa, absR(-5), absT(-5)])}
                           src={`${cloudBaseUrl}ico_close.png`}
                           onClick={() => {
                             this.setState({enterpriseLogoLocal: '', enterpriseLogo: ''});
                           }}/>
                  </View>

              }
            </View>
          </View>
          {/*企业视频*/}
          <ListItem title={'企业视频'}/>
          <View
            style={styleAssign([wRatio(100), h(193), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor), mb(10)])}>
            {
              enterpriseVideoLocal.length === 0 ?
                <Image style={styleAssign([w(305), h(160)])} src={`${cloudBaseUrl}ico_upload_video.png`}
                       onClick={() => {
                         Taro.chooseVideo({compressed: true}).then((res) => {
                           this.setState({enterpriseVideoLocal: res.tempFilePath});
                         });
                       }}/> :
                <View style={styleAssign([wRatio(100), styles.udr, styles.ujc])}>
                  <Video
                    style={styleAssign([w(305), h(160), bgColor(commonStyles.whiteColor)])}
                    src={enterpriseVideoLocal}
                    controls={true}
                    autoplay={false}
                    objectFit={'fill'}
                    initialTime={1}
                    id='video'
                    loop={false}
                    muted={false}/>
                  <Image style={styleAssign([w(20), h(20), styles.upa, absR(25), absT(-5)])}
                         src={`${cloudBaseUrl}ico_close.png`}
                         onClick={() => {
                           this.setState({enterpriseVideoLocal: '', enterpriseVideo: ''});
                         }}/>
                </View>
            }
          </View>
        </ScrollView>
        {/*提交*/}
        <BottomButon title={'提交'} onClick={() => {
          if (enterpriseName.length === 0) {
            toast('请选输入企业名称');
            return;
          }
          if (enterpriseLogo.length === 0) {
            toast('请选择logo');
            return;
          }
          this.uploadFileTpWx(enterpriseVideoLocal, 'video', () => {
            this.update();
          });
        }}/>
      </CustomSafeAreaView>
    );
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 将文件通过微信Api上传到服务端
   */
  uploadFileTpWx = (path, type, callback?: any) => {
    let {enterpriseVideo} = this.state;

    if (callback && enterpriseVideo.length !== 0 || path.length === 0) {
      callback();
      return;
    }
    let that = this;
    let token = get(Enum.TOKEN);

    this.viewRef && this.viewRef.showLoading();
    Taro.uploadFile({
      url: type === 'image' ? FileController.uploadPicture : FileController.uploadVideo,
      filePath: path,
      name: 'file',
      header: {
        'token': token
      },
      success(res) {
        that.viewRef && that.viewRef.hideLoading();
        if (type === 'image') {
          that.setState({enterpriseLogo: parseData(res.data).data});
        } else {
          that.setState({enterpriseVideo: parseData(res.data).data}, () => {
            callback();
          });
        }
        console.log('上传文件', parseData(res.data).data);
      }
    });
  }

}

export default CompanyInfo;
