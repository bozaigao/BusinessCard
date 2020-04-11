/**
 * @filename my_photo.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/4
 * @Description: 我的照片
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {debounce, get, parseData, styleAssign, toast} from "../../utils/datatool";
import {
  absR,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  mb,
  ml,
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
import {Image, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import {cloudBaseUrl, FileController, NetworkState} from "../../api/httpurl";
import {Enum} from "../../const/global";

let maxLength = 9;

interface Props {
  //更新用户信息
  update: any;
}

interface State {
  //轮播图
  myPhotoUrlsLocal: any[];
  myPhotoUrl: string[];
}

@connect(state => state.Goods, {...actions})
class MyPhoto extends Component<Props, State> {

  private viewRef;
  private uploading: boolean;
  private uploadCount: number;
  private uploadResultArr;
  private myPhotoUrl: any;


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
    this.myPhotoUrl = parseData(this.$router.params.myPhotoUrl);
    let myPhotoUrlTmp: any = [];

    if (this.myPhotoUrl) {
      parseData(this.myPhotoUrl).forEach((item) => {
        myPhotoUrlTmp.push({path: item});
      });
    }

    this.state = {
      myPhotoUrlsLocal: myPhotoUrlTmp,
      myPhotoUrl: parseData(this.myPhotoUrl) ? parseData(this.myPhotoUrl) : []
    }
    this.uploading = false;
    this.uploadCount = 0;
    this.uploadResultArr = [];
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 文件列表上传
   */
  uploadFileList = (paths, callback) => {
    if (!this.uploading) {
      this.uploadResultArr = [];
      this.uploadCount = 0;
      this.uploading = true;
      for (let i = 0; i < paths.length; i++) {
        this.uploadFileTpWx(paths[i].path, callback, paths.length);
      }
    }
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 将文件通过微信Api上传到服务端
   */
  uploadFileTpWx = (path, callback, length) => {
    let that = this;
    let token = get(Enum.TOKEN);

    Taro.uploadFile({
      url: FileController.uploadPicture,
      filePath: path,
      name: 'file',
      header: {
        'token': token
      },
      success(res) {
        that.uploadCount++;
        that.uploadResultArr.push(parseData(res.data).data);
        if (that.uploadCount === length) {
          that.uploading = false;
          callback();
        }
        console.log('上传文件', parseData(res.data).data);
      }
    });
  }


  render() {

    let {myPhotoUrlsLocal, myPhotoUrl} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'我的照片'} customCallback={() => {
          Taro.navigateBack();
        }}/>
        <View style={styleAssign([styles.uf1])}>
          <View
            style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(18), color('#0C0C0C')])}>上传照片</Text>
            <Text style={styleAssign([fSize(18), color('#787878')])}>{`${myPhotoUrl.length}/9`}</Text>
          </View>
          <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View
            style={styleAssign([wRatio(100), mt(10), mb(10), pl(10), pr(10), styles.udr, styles.uWrap])}>
            {
              myPhotoUrlsLocal.map((value, index) => {
                return (
                  <View style={styleAssign([w(105), h(105), ml(10), mb(10),])}>
                    <Image key={index} style={styleAssign([w(105), h(105), radiusA(2)])}
                           src={value.path}/>
                    <Image key={index} style={styleAssign([w(20), h(20), styles.upa, absR(-5), absT(-5)])}
                           src={`${cloudBaseUrl}ico_close.png`}
                           onClick={() => {
                             this.state.myPhotoUrl.splice(index, 1);
                             myPhotoUrlsLocal.splice(index, 1);

                             console.log('删除后的列表', myPhotoUrlsLocal, myPhotoUrl);
                             this.setState({myPhotoUrlsLocal}, () => {
                               console.log('剩余图片', this.state.myPhotoUrlsLocal);
                             });
                           }}/>
                  </View>);
              })
            }
            {
              myPhotoUrlsLocal.length < maxLength && <TouchableButton
                onClick={() => {
                  Taro.chooseImage({count: maxLength - myPhotoUrlsLocal.length}).then((res) => {
                    console.log('本地上传图片', res.tempFiles);
                    this.setState({myPhotoUrlsLocal: this.state.myPhotoUrlsLocal.concat(res.tempFiles)});
                    this.uploadFileList(res.tempFiles, () => {
                      this.state.myPhotoUrl.push(...this.uploadResultArr);
                      this.setState({myPhotoUrl: this.state.myPhotoUrl});
                      console.log('上传成功后的图片列表', myPhotoUrl);
                    });
                  });
                }}
                customStyle={styleAssign([ml(10), mb(20), w(105), h(105), bgColor(commonStyles.pageDefaultBackgroundColor), radiusA(4), styles.uac, styles.ujc])}>
                <Image style={styleAssign([w(40), h(40)])} src={`${cloudBaseUrl}ico_goods_add.png`}/>
              </TouchableButton>
            }
          </View>
        </View>
        {/*保存*/}
        <View style={styleAssign([wRatio(100), h(64), styles.uac, styles.ujc])}>
          <TouchableButton customStyle={styleAssign([w(335), h(48), radiusA(2), bgColor(commonStyles.colorTheme),
            styles.uac, styles.ujc])}
                           onClick={() => {
                             this.update();
                           }}>
            <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>保存</Text>
          </TouchableButton>
        </View>
      </CustomSafeAreaView>
    );
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 更新用户信息
   */
  update = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.update({
      photoUrl: JSON.stringify(this.state.myPhotoUrl),
    }).then((res) => {
      console.log('更新我的照片', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('信息更新成功');
      }
      debounce(1000, () => {
        Taro.navigateBack();
      });

    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }
}

export default MyPhoto;
