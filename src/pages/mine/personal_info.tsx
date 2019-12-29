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
import {get, parseData, styleAssign} from "../../utils/datatool";
import {
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
import TopHeader from "../../compoments/top-header";
import {Image, Picker, ScrollView, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import ListItem from "../../compoments/list-item";
import TouchableButton from "../../compoments/touchable-button";
import {Enum} from "../../const/global";
import {FileController} from "../../api/httpurl";

interface Props {
  //上传文件
  uploadPicture: any;
  //更新用户信息
  update: any;
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
  titleList1: { title: string, subtitle?: string, hasEdit?: boolean }[];
  titleList2: { title: string, subtitle?: string, hasEdit?: boolean }[];
}

@connect(state => state.login, {...fileActions, ...loginActions})
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
    // let test = this.$router.params.itemId;
    this.state = {
      avatar: '',
      name: '',
      sex: 1,
      phone: '17311239269',
      industry: 'IT行业',
      position: 'IT工程师',
      yangshi: '名片样式',
      wechat: '17311239269',
      email: '1054539528@qq.com',
      birthday: '',
      province: '',
      city: '',
      detailAddress: '',
      titleList1: [{title: '姓名', subtitle: '必填', hasEdit: true},
        {title: '性别'},
        {title: '联系方式', subtitle: '15982468866'},
        {title: '行业', subtitle: '选择'},
        {title: '职位', subtitle: '必填'}],
      titleList2: [{title: '名片样式', subtitle: '编辑'},
        {title: '微信&微信二维码', subtitle: '15982468866'},
        {title: '邮箱', subtitle: '选填', hasEdit: true},
        {title: '生日', subtitle: '选填'},
        {title: '地区', subtitle: '选择'},
        {title: '地址', subtitle: '选填', hasEdit: true}],
    }
  }

  componentDidMount() {
    Taro.eventCenter.on('industry', (industry) => {
      console.log('参数回调', industry);
      this.state.titleList1[3].subtitle = industry;

      this.setState({industry, titleList1: this.state.titleList1});
    })
  }

  componentWillUnmount() {
    Taro.eventCenter.off();
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/28
   * @function: 将文件上传到微信服务
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
    let {avatar, name, sex, phone, industry, position, yangshi, wechat, birthday, province, city} = this.state;

    console.log('呵呵', avatar, avatar.length);
    if (avatar.length === 0) {
      Taro.showToast({
        title: '头像不能为空',
        icon: 'none'
      });
      return;
    }
    if (name.length === 0) {
      Taro.showToast({
        title: '姓名不能为空',
        icon: 'none'
      });
      return;
    }
    if (phone.length === 0) {
      Taro.showToast({
        title: '电话不能为空',
        icon: 'none'
      });
      return;
    }
    if (industry.length === 0) {
      Taro.showToast({
        title: '行业不能为空',
        icon: 'none'
      });
      return;
    }
    if (position.length === 0) {
      Taro.showToast({
        title: '职位不能为空',
        icon: 'none'
      });
      return;
    }

    let paramas = {
      avatar,
      name,
      sex,
      phone,
      industry,
      position,
      yangshi,
      wechat,
      birthday,
      province,
      city
    };

    this.viewRef && this.viewRef.showLoading();
    this.props.update(paramas).then((res) => {
      console.log('更新用户信息', res);
      this.viewRef && this.viewRef.hideLoading();
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {avatar, titleList1, titleList2, sex} = this.state;

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
            <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                   src={avatar.length !== 0 ? avatar : require('../../assets/ico_default.png')}/>
          </TouchableButton>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              titleList1.map((value, index) => {
                if (value.title === '性别') {
                  return (
                    <View style={styleAssign([wRatio(100)])}>
                      <View
                        style={styleAssign([wRatio(100), h(51), styles.uac, styles.udr, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                        <Text style={styleAssign([fSize(14), color('#0C0C0C'), ml(20)])}>性别</Text>
                        <View style={styleAssign([styles.uac, styles.udr])}>
                          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr])}
                                           onClick={() => {
                                             console.log('男')
                                             this.setState({sex: 1})
                                           }}>
                            <Image
                              style={styleAssign([w(18), h(18), radiusA(9)])}
                              src={sex === 1 ? require('../../assets/ico_checked.png') : require('../../assets/ico_nochecked.png')}/>
                            <Text style={styleAssign([fSize(14), color('#979797'), ml(10)])}>男</Text>
                          </TouchableButton>
                          <TouchableButton customStyle={styleAssign([styles.uac, styles.udr, ml(20), mr(20)])}
                                           onClick={() => {
                                             console.log('女')
                                             this.setState({sex: 2})
                                           }}>
                            <Image
                              style={styleAssign([w(18), h(18), radiusA(9)])}
                              src={sex === 2 ? require('../../assets/ico_checked.png') : require('../../assets/ico_nochecked.png')}/>
                            <Text style={styleAssign([fSize(14), color('#979797'), ml(10)])}>女</Text>
                          </TouchableButton>
                        </View>
                      </View>
                      <View
                        style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), {marginLeft: '5%'}])}/>
                    </View>
                  );
                }
                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
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
                  this.setState({name: e.detail.value});
                  console.log(e);
                }
                }/>);
              })
            }
          </View>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              titleList2.map((value: any, index) => {

                if (value.title === '生日') {
                  return (<Picker mode='date' onChange={(e) => {
                    titleList2[3].subtitle = e.detail.value;
                    this.setState({
                      titleList2,
                      birthday: e.detail.value
                    })
                  }} value={''}>
                    <ListItem title={value.title} subTitle={value.subtitle} key={index}
                              hasEdit={value.hasEdit}/>
                  </Picker>);
                } else if (value.title === '地区') {
                  return (<Picker mode='region' onChange={(e) => {
                    console.log(e.detail)
                    titleList2[4].subtitle = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                      titleList2,
                      province: e.detail.value[0],
                      city: e.detail.value[1]
                    })
                  }} value={[]}>
                    <ListItem title={value.title} subTitle={value.subtitle} key={index}
                              hasEdit={value.hasEdit}
                              onTextChange={(e) => {
                                console.log(e);
                                if (value.subtitle === '邮箱') {
                                  this.setState({email: e.detail.value});
                                } else if (value.subtitle === '地址') {
                                  this.setState({detailAddress: e.detail.value});
                                }
                              }
                              }/>
                  </Picker>);
                }
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
          this.update();
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default PersonalInfo;
