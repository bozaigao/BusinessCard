/**
 * @filename customer_remark.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/14
 * @Description: 客户添加备注
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {
  absB,
  absR, absT,
  bgColor,
  color,
  commonStyles,
  default as styles, fSize,
  h,
  ml,
  mr,
  mt,
  pa,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {debounce, get, parseData, styleAssign, toast} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Text, Textarea, View} from "@tarojs/components";
import ListItem from "../../compoments/list-item";
import TouchableButton from "../../compoments/touchable-button";
import {Enum} from "../../const/global";
import {cloudBaseUrl, FileController, NetworkState} from "../../api/httpurl";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
  updatePrivateCustomer?: any;
}

interface State {
  name: string;
  phone: string;
  desc: string;
  avatar: any;
}

@connect(state => state.login, {...actions})
class CustomerRemark extends Component<Props, State> {
  private id: string;
  private viewRef;
  private avatarArr;
  private uploading: boolean;
  private uploadCount: number;
  private uploadResultArr;

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
    this.id = this.$router.params.id;
    this.avatarArr = [];
    this.uploading = false;
    this.uploadCount = 0;
    this.uploadResultArr = [];
    this.state = {
      name: this.$router.params.name,
      phone: this.$router.params.phone,
      desc: this.$router.params.remark,
      avatar: {path: this.$router.params.aboutUrl},
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }


  componentDidHide() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/14
   * @function: 修改客户备注等信息
   */
  updatePrivateCustomer = () => {
    let {name, phone} = this.state;

    if (name.length === 0) {
      toast('请输入备注名');
      return;
    }
    if (phone.length === 0) {
      toast('请输入手机号');
      return;
    }
    if (phone.length !== 11 || !phone.startsWith('1')) {
      toast('请输入合法手机号');
      return;
    }
    this.viewRef && this.viewRef.showLoading();
    this.props.updatePrivateCustomer({
      id: this.id,
      name: this.state.name,
      phone: this.state.phone,
      remark: this.state.desc,
      aboutUrl: this.avatarArr[0]
    }).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('修改成功');
        debounce(1000, () => {
          Taro.navigateBack();
        })
      }
      console.log('获取客户详细资料', res);
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
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
    let {desc, avatar, phone, name} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'备注'}/>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor)])}
          scrollY>
          <ListItem title={'备注名'} subTitle={'请输入备注名'}
                    value={name}
                    hasEdit={true}
                    onTextChange={(data) => {
                      this.setState({name: data.detail.value});
                    }
                    } textColor={'#727272'}/>
          <ListItem title={'手机'} subTitle={'请输入手机号'}
                    value={phone}
                    hasEdit={true}
                    onTextChange={(data) => {
                      this.setState({phone: data.detail.value});
                    }
                    } textColor={'#727272'}/>
          {/*描述*/}
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View style={styleAssign([wRatio(100), h(183), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(14), color('#CECECE'), ml(20), mt(18)])}>描述</Text>
            <View style={styleAssign([wRatio(100), h(160)])}>
            <Textarea value={desc}
                      style={styleAssign([ml(20), w(300), pa(20), mr(20), fSize(14), radiusA(4), mt(4), h(160),
                        bgColor(commonStyles.pageDefaultBackgroundColor)])}
                      onInput={(e) => {
                        this.setState({desc: e.detail.value});
                      }} placeholder={'请输入您对客户的备注描述，帮助您更好地追踪客户~'}
                      maxlength={600}/>
              <View style={styleAssign([styles.uac, styles.udr, styles.upa, absR(30), absB(10)])}>
                <Text style={styleAssign([fSize(12), color('#979797')])}>{desc.length}</Text>
                <Text style={styleAssign([fSize(12), color('#CECECE')])}>/600</Text>
              </View>
            </View>
          </View>
          {
            avatar.path.length === 0 ? <TouchableButton
                customStyle={styleAssign([wRatio(100), h(204), mt(10), styles.uac, bgColor(commonStyles.whiteColor)])}
                onClick={() => {
                  Taro.chooseImage({count: 1}).then((res) => {
                    console.log('路径', res);
                    this.setState({avatar: res.tempFiles[0]});
                    this.uploadFileList(res.tempFiles, () => {
                      this.avatarArr.push(...this.uploadResultArr);
                      console.log('上传成功后的图片列表', this.avatarArr);
                    });
                  });
                }}>
                <View
                  style={styleAssign([w(335), h(176), mt(16), radiusA(4), styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
                  <View
                    style={styleAssign([w(40), h(40), radiusA(20), bgColor(commonStyles.whiteColor),
                      styles.uac, styles.ujc])}>
                    <Image style={styleAssign([w(21), h(19)])} src={`${cloudBaseUrl}ico_camera.png`}/>
                  </View>
                  <Text style={styleAssign([fSize(12), color('#ACADAD'), mt(10)])}>添加与客户相关的图片</Text>
                </View>
              </TouchableButton> :
              <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(30)])}>
                <View style={styleAssign([w(335), h(176)])}>
                  <Image style={styleAssign([w(335), h(176)])} src={avatar.path}
                         mode={'aspectFit'}/>
                  <Image style={styleAssign([w(20), h(20), styles.upa, absR(-5), absT(-5)])}
                         src={`${cloudBaseUrl}ico_close.png`}
                         onClick={() => {
                           this.avatarArr = [];
                           this.setState({avatar: {path: ''}});
                         }}/>
                </View>
              </View>
          }
        </ScrollView>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {
          this.updatePrivateCustomer();
        }}/>
      </CustomSafeAreaView>
    )
  }
}


export default CustomerRemark
