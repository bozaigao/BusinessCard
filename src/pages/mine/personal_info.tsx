/**
 * @filename task_center.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务中心
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {debounce, get, isLegalEmail, parseData, styleAssign, toast, transformTime} from "../../utils/datatool";
import {
  absB,
  absR,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mr,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as fileActions from '../../actions/file';
import * as loginActions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Image, Picker, ScrollView, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton/index";
import ListItem from "../../compoments/list-item/index";
import TouchableButton from "../../compoments/touchable-button/index";
import {Enum, User} from "../../const/global";
import {cloudBaseUrl, FileController, NetworkState} from "../../api/httpurl";

interface Props {
  //上传文件
  uploadPicture: any;
  updateUserInfo: any;
  //更新用户信息
  update: any;
  getUserInfo: any;
  userInfo: User;
  userSettingGet: any;
  userSettingUpdate: any;
}

interface State {
  avatar: string;
  name: string;
  sex: number;
  phone: string;
  industry: string;
  position: string;
  yangshi: string;
  wechat: string;
  email: string;
  birthday: string;
  province: string;
  city: string;
  detailAddress: string;
  titleList1: { title: string, subtitle?: string, value?: string, hasEdit?: boolean }[];
  titleList2: { title: string, subtitle?: string, value?: string, hasEdit?: boolean }[];
  hidePhone: number;
  hideWechat: number;
  hideEmail: number;
  hideAddress: number;
  cardStyle: string;
}

@connect(state => state.login, {...fileActions, ...loginActions})
class PersonalInfo extends Component<Props, State> {

  private viewRef;
  private latitude;
  private longitude;


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
    let {avatar, name, sex, phone, industry, position, yangshi, wechat, email, birthday, province, city, detailAddress, longitude, latitude} = props.userInfo;

    this.longitude = longitude ? longitude : 0;
    this.latitude = latitude ? latitude : 0;
    this.state = {
      avatar,
      name,
      sex,
      phone,
      industry,
      position,
      yangshi,
      wechat,
      email,
      birthday,
      province,
      city,
      detailAddress,
      titleList1: [{title: '姓名', subtitle: '请输入姓名', value: name ? name : '', hasEdit: true},
        {title: '性别'},
        {title: '手机', subtitle: '请输入手机号', value: phone ? phone : '', hasEdit: true},
        {title: '行业', value: industry ? industry : '', subtitle: '请选择行业'},
        {title: '职位', value: position ? position : '必填', subtitle: '请选择职位', hasEdit: true}],
      titleList2: [
        {title: '微信', value: wechat ? wechat : '', subtitle: '请输入微信号', hasEdit: true},
        {title: '邮箱', value: email ? email : '', subtitle: '请输入邮箱', hasEdit: true},
        {title: '生日', value: birthday ? transformTime(birthday) : '', subtitle: '请选择生日'},
        {title: '地区', value: province ? province + city : '', subtitle: '请选择详地区'},
        {title: '详细地址', value: detailAddress ? detailAddress : '', subtitle: '请选择详细地址'}],
      hidePhone: 0,
      hideWechat: 0,
      hideEmail: 0,
      hideAddress: 0,
      cardStyle: '0',
    }
  }


  componentDidMount() {
    console.log('用户信息', this.props.userInfo);
    Taro.eventCenter.on('industry', (industry) => {
      console.log('参数回调', industry);
      this.state.titleList1[3].value = industry;

      this.setState({industry, titleList1: this.state.titleList1});
    });
    Taro.eventCenter.on('updateCardStyle', (data: {
      cardStyle: string;
      hidePhone: number;
      hideWechat: number;
      hideEmail: number;
      hideAddress: number;
    }) => {
      console.log('参数回调', data);
      this.setState({
        hidePhone: data.hidePhone,
        hideWechat: data.hideWechat,
        hideAddress: data.hideAddress,
        hideEmail: data.hideEmail,
        cardStyle: data.cardStyle,
      });
    });
    this.userSettingGet();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 将文件通过微信Api上传到服务端
   */
  uploadFileTpWx = (path) => {
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
        that.setState({avatar: parseData(res.data).data});
        console.log('上传文件', parseData(res.data).data);
      }
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 更新用户信息
   */
  update = () => {
    console.log('函数', this.props)
    let {avatar, name, sex, phone, industry, position, yangshi, wechat, birthday, province, city, email} = this.state;

    if (avatar.length === 0) {
      toast('头像不能为空');
      return;
    }
    if (name.length === 0) {
      toast('姓名不能为空');
      return;
    }
    if (phone.length === 0) {
      toast('手机号不能为空');
      return;
    }
    if (!phone.startsWith('1') || phone.length !== 11) {
      toast('手机号非法');
      return;
    }
    if (industry.length === 0) {
      toast('行业不能为空');
      return;
    }
    if (position.length === 0) {
      toast('职位不能为空');
      return;
    }

    if (!isLegalEmail(email)) {
      toast('请输入有效的邮箱');
      return;
    }

    let paramas = {
      avatar,
      name,
      sex,
      email,
      phone,
      industry,
      position,
      yangshi,
      wechat,
      birthday,
      province,
      city,
      latitude: this.latitude,
      longitude: this.longitude,
      detailAddress: this.state.titleList2[4].value
    };

    console.log('更新用户信息', paramas);

    this.viewRef && this.viewRef.showLoading();
    this.props.update(paramas).then((res) => {
      console.log('更新用户信息', res);
      this.getUserInfo();
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        this.userSettingUpdate();
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/25
   * @function: 更新用户的名片设置信息
   */
  userSettingUpdate = () => {
    this.viewRef && this.viewRef.showLoading();
    let {hidePhone, hideEmail, hideWechat, hideAddress, cardStyle} = this.state;

    this.props.userSettingUpdate({
      phone: hidePhone,
      wechat: hideWechat,
      email: hideEmail,
      address: hideAddress,
      cardStyle: cardStyle,
    }).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('信息更新成功');
        debounce(1000, () => {
          Taro.navigateBack();
        })
      }
      console.log('更新用户的名片设置信息', res)
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 获取用户信息
   */
  getUserInfo = () => {
    this.props.getUserInfo().then((res) => {
      this.props.updateUserInfo(res);
      console.log('获取用户信息', res);
      console.log('属性', this.props.userInfo);
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/25
   * @function: 获取用户的设置信息
   */
  userSettingGet = () => {
    this.props.userSettingGet({userId:this.props.userInfo.id}).then((res) => {
      if (res !== NetworkState.FAIL) {
        this.setState({
          hidePhone: res.phone,
          hideWechat: res.wechat,
          hideEmail: res.email,
          hideAddress: res.address,
          cardStyle: res.cardStyle
        });
      }
      console.log('获取用户的设置信息', res)
    }).catch(e => {
      console.log('报错啦', e);
    });
  }


  render() {
    let {avatar, titleList1, titleList2, sex, cardStyle, hideAddress, hideEmail, hideWechat, hidePhone} = this.state;

    let styleString, styleIcon;

    if (cardStyle === '0') {
      styleString = '商务版';
      styleIcon = require('../../assets/ico_mingpian_style_1.png');

    } else if (cardStyle === '1') {
      styleString = '黑金版';
      styleIcon = require('../../assets/ico_mingpian_style_2.png');
    } else if (cardStyle === '2') {
      styleString = '简约版';
      styleIcon = require('../../assets/ico_mingpian_style_3.png');
    } else if (cardStyle === '3') {
      styleString = '极简版';
      styleIcon = require('../../assets/ico_mingpian_style_4.png');
    } else if (cardStyle === '4') {
      styleString = '实景版';
      styleIcon = require('../../assets/ico_mingpian_style_5.png');
    }
    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'个人信息'}/>
        {/*任务列表*/}
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY>
          <TouchableButton customStyle={styleAssign([wRatio(100), h(86), styles.uac, styles.udr, styles.ujb,
            bgColor(commonStyles.whiteColor), pl(20), pr(20)])}
                           onClick={() => {
                             Taro.chooseImage({count: 1}).then((res) => {
                               console.log('图片路径', res.tempFiles[0].path)
                               this.setState({avatar: res.tempFiles[0].path})
                               this.uploadFileTpWx(res.tempFiles[0].path);
                             });
                           }}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>头像</Text>
            <View style={styleAssign([w(60), h(60)])}>
              <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                     src={avatar && avatar.length !== 0 ? avatar : `${cloudBaseUrl}ico_default.png`}/>
              <Image style={styleAssign([w(20), h(20), styles.upa, absB(0), absR(0)])}
                     src={require('../../assets/ico_small_camera.png')}/>
            </View>
          </TouchableButton>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              titleList1.map((value, index) => {
                if (value.title === '性别') {
                  return (
                    <View style={styleAssign([wRatio(100)])}>
                      <View
                        style={styleAssign([wRatio(100), h(51), styles.uac, styles.udr, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                        <Text style={styleAssign([fSize(14), color('#727272'), ml(20)])}>性别</Text>
                        <View style={styleAssign([styles.uac, styles.udr])}>
                          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                                           onClick={() => {
                                             console.log('男')
                                             this.setState({sex: 1})
                                           }}>
                            <Image
                              style={styleAssign([w(18), h(18), radiusA(9)])}
                              src={sex === 1 ? `${cloudBaseUrl}ico_checked.png` : `${cloudBaseUrl}ico_nochecked.png`}/>
                            <Text style={styleAssign([fSize(14), color('#979797'), ml(10)])}>男</Text>
                          </TouchableButton>
                          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, ml(20), mr(20)])}
                                           onClick={() => {
                                             console.log('女')
                                             this.setState({sex: 2})
                                           }}>
                            <Image
                              style={styleAssign([w(18), h(18), radiusA(9)])}
                              src={sex === 2 ? `${cloudBaseUrl}ico_checked.png` : `${cloudBaseUrl}ico_nochecked.png`}/>
                            <Text style={styleAssign([fSize(14), color('#979797'), ml(10)])}>女</Text>
                          </TouchableButton>
                        </View>
                      </View>
                      <View
                        style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), {marginLeft: '5%'}])}/>
                    </View>
                  );
                }
                return (<ListItem textColor={'#727272'}
                                  title={value.title}
                                  value={value.value}
                                  subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    if (title === '联系方式') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/contact_way`
                                      });
                                    } else if (title === '行业') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/industry_list`,
                                        success: (e) => {
                                          console.log('参数回传1', e);
                                        }
                                      });
                                    }
                                  }
                                  } onTextChange={(e) => {
                  if (value.title === '姓名') {
                    this.setState({name: e.detail.value});
                  } else if (value.title === '手机') {
                    this.setState({phone: e.detail.value});
                  } else if (value.title === '职位') {
                    console.log('职位', e.detail.value);
                    this.setState({position: e.detail.value});
                  }
                }
                }/>);
              })
            }
          </View>
          {/*名片样式*/}
          <View style={styleAssign([wRatio(100), mt(10)])}>
            <View style={styleAssign([wRatio(100), h(76), styles.udr, styles.ujb, styles.uac,
              pl(20), pr(20), bgColor(commonStyles.whiteColor)])}
                  onClick={() => {
                    Taro.navigateTo({
                      url: `/pages/mine/mingpian_style?hidePhone=${hidePhone}&hideWechat=${hideWechat}&hideEmail=${hideEmail}&hideAddress=${hideAddress}&style=${cardStyle}`
                    });
                  }}>
              <View>
                <Text style={styleAssign([fSize(14), color('#727272')])}>名片样式</Text>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <Text style={styleAssign([fSize(12), color('#343434')])}>{styleString}</Text>
                </View>
              </View>
              <View style={styleAssign([styles.udr, styles.uac])}>
                <Image style={styleAssign([w(72), h(49)])} src={styleIcon}/>
                <Image style={styleAssign([w(8), h(14), ml(9)])} src={require('../../assets/ico_next.png')}/>
              </View>
            </View>
            <View
              style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), {marginLeft: '5%'}])}/>
            {
              titleList2.map((value: any, index) => {

                if (value.title === '生日') {
                  return (<Picker mode='date' onChange={(e) => {
                    titleList2[2].value = e.detail.value;
                    this.setState({
                      titleList2,
                      birthday: e.detail.value
                    })
                  }} value={value.value}>
                    <ListItem title={value.title}
                              value={value.value}
                              textColor={'#727272'}
                              subTitle={value.subtitle} key={index}
                              hasEdit={value.hasEdit}/>
                  </Picker>);
                } else if (value.title === '地区') {
                  return (<Picker mode='region' onChange={(e) => {
                    console.log(e.detail)
                    titleList2[3].value = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                      titleList2,
                      province: e.detail.value[0],
                      city: e.detail.value[1] + e.detail.value[2]
                    })
                  }} value={[]}>
                    <ListItem
                      textColor={'#727272'}
                      title={value.title} subTitle={value.subtitle}
                      value={value.value}
                      key={index}
                      hasEdit={value.hasEdit}/>
                  </Picker>);
                }
                return (<ListItem
                  textColor={'#727272'}
                  value={value.value}
                  title={value.title} subTitle={value.subtitle} key={index}
                  hasEdit={value.hasEdit}
                  onTextChange={(e) => {
                    console.log(e);
                    if (value.title === '邮箱') {
                      console.log('邮箱', e.detail.value);
                      this.setState({email: e.detail.value});
                    } else if (value.title === '微信') {
                      console.log('微信', e.detail.value);
                      this.setState({wechat: e.detail.value});
                    }
                  }
                  }
                  onCLick={(title) => {
                    if (title === '我的标签') {
                      Taro.navigateTo({
                        url: `/pages/mine/my_tags`
                      });
                    } else if (title === '详细地址') {
                      let that = this;

                      Taro.getLocation({
                        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                        success(res) {
                          const latitude = res.latitude;
                          const longitude = res.longitude;

                          Taro.chooseLocation({
                            latitude,
                            longitude,
                            scale: 18,
                            success(res) {
                              console.log(res);
                              that.latitude = res.latitude;
                              that.longitude = res.longitude;
                              that.state.titleList2[4].value = res.address;
                              that.setState({titleList2: that.state.titleList2});
                            }
                          })
                        }
                      })
                    }
                  }
                  }/>);
              })
            }
          </View>
          {/*保存*/}
          <BottomButon title={'保存'} onClick={() => {
            this.update();
          }}/>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default PersonalInfo;
