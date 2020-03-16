/**
 * @filename customer_ziliao.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/11
 * @Description: 手动录入客户
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
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
import {Image, Picker, ScrollView, Text, Textarea, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import ListItem from "../../compoments/list-item";
import BottomButon from "../../compoments/bottom-buton";
import {Enum} from "../../const/global";
import {cloudBaseUrl, FileController, NetworkState} from "../../api/httpurl";

interface Props {
  //手动录入客户
  addPrivateCustomer?: any;
}

interface State {
  top1List: { title: string; subtitle?: string; value?: string; hasEdit: boolean; must?: boolean; }[];
  top2List: { title: string; subtitle?: string; value?: string; hasEdit: boolean; must?: boolean; }[];
  name: string;
  phone: string;
  sex: number;
  company: string;
  industry: string;
  position: string;
  province: string;
  city: string;
  detailAddress: string;
  birthday: string;
  wechat: string;
  email: string;
  desc: string;
  avatar: any;
}

@connect(state => state.login, {...actions})
class AddCustomer extends Component<Props, State> {
  private viewRef;
  private uploading: boolean;
  private uploadCount: number;
  private uploadResultArr;
  private avatarArr;

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
    this.uploading = false;
    this.uploadCount = 0;
    this.uploadResultArr = [];
    this.avatarArr = [];
    this.state = {
      top1List: [{title: '备注名', subtitle: '请输入备注名', hasEdit: true, must: true},
        {title: '手机', subtitle: '请输入手机号', hasEdit: true, must: true},
        {title: '性别', value: '男', hasEdit: false},
        {title: '公司', subtitle: '请输入公司名', hasEdit: true},
        {title: '行业', subtitle: '请选择', hasEdit: false},
        {title: '职位', subtitle: '请输入职位', hasEdit: true}],
      top2List: [{title: '地区', subtitle: '请选择', hasEdit: false},
        {title: '详细地址', subtitle: '请输入详细地址', hasEdit: true},
        {title: '生日', subtitle: '请选择', hasEdit: false},
        {title: '微信号', subtitle: '请输入微信号', hasEdit: true},
        {title: '邮箱', subtitle: '请输入邮箱号', hasEdit: true}],
      avatar: {path: ''},
      name: '',
      phone: '',
      sex: 1,
      company: '',
      industry: '',
      position: '',
      province: '',
      city: '',
      detailAddress: '',
      birthday: '',
      wechat: '',
      email: '',
      desc: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }


  componentDidMount() {
    Taro.eventCenter.on('industry', (industry) => {
      console.log('参数回调', industry);
      this.state.top1List[4].subtitle = industry;

      this.setState({industry, top1List: this.state.top1List});
    })
  }

  componentDidHide() {
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/9
   * @function: 手动录入客户
   */
  addPrivateCustomer = () => {

    let {name, sex, company, phone, position, wechat, birthday, province, city, industry, detailAddress} = this.state;

    if (name.length === 0) {
      toast('备注名不能为空');
      return;
    }
    if (phone.length === 0) {
      toast('手机不能为空');
      return;
    }
    if (phone.length !== 11 || !phone.startsWith('1')) {
      toast('手机号非法');
      return;
    }


    let paramas = {
      name,
      sex,
      company,
      phone,
      industry,
      position,
      province,
      city,
      detailAddress,
      birthday,
      wechat,
      avatar: this.avatarArr[0],
    };

    this.viewRef && this.viewRef.showLoading();
    this.props.addPrivateCustomer(paramas).then((res) => {
      console.log('手动录入客户', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('录入成功');
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

    let {top1List, top2List, sex, desc, birthday, avatar} = this.state;


    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'手动添加'}/>
        <ScrollView
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              top1List.map((value, index) => {
                if (value.title === '性别') {
                  return (
                    <View style={styleAssign([wRatio(100)])}>
                      <View
                        style={styleAssign([wRatio(100), h(51), styles.uac, styles.udr, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                        <Text style={styleAssign([fSize(14), color('#979797'), ml(20)])}>性别</Text>
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
                  )
                }

                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
                                  must={value.must}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    if (title === '行业') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/industry_list`,
                                        success: (e) => {
                                          console.log('参数回传1', e);
                                        }
                                      });
                                    }
                                  }
                                  } onTextChange={(data) => {
                  if (value.title === '备注名') {
                    this.setState({name: data.detail.value});
                  } else if (value.title === '手机') {
                    this.setState({phone: data.detail.value});
                  } else if (value.title === '公司') {
                    this.setState({company: data.detail.value});
                  } else if (value.title === '职位') {
                    this.setState({position: data.detail.value});
                  }
                }
                } textColor={'#727272'}/>);
              })
            }
          </View>
          <View style={styleAssign([wRatio(100), mt(10)])}>
            {
              top2List.map((value, index) => {
                if (value.title === '生日') {
                  return (<Picker mode='date' onChange={(e) => {
                    this.state.top2List[2].subtitle = e.detail.value;
                    this.setState({birthday: e.detail.value, top2List: this.state.top2List});
                  }} value={birthday}>
                    <ListItem title={value.title} subTitle={value.subtitle} key={index}
                              hasEdit={false} textColor={'#727272'}/>
                  </Picker>);
                } else if (value.title === '地区') {
                  return (<Picker mode='region' onChange={(e) => {
                    console.log(e.detail)
                    this.state.top2List[0].subtitle = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                      top2List: this.state.top2List,
                      province: e.detail.value[0],
                      city: e.detail.value[1] + e.detail.value[2]
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
                              } textColor={'#727272'}/>
                  </Picker>);
                }
                return (<ListItem title={value.title} subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {
                                    if (title === '行业') {
                                      Taro.navigateTo({
                                        url: `/pages/mine/industry_list`,
                                        success: (e) => {
                                          console.log('参数回传1', e);
                                        }
                                      });
                                    }

                                  }
                                  } onTextChange={(data) => {
                  if (value.title === '详细地址') {
                    this.setState({detailAddress: data.detail.value});
                  } else if (value.title === '微信号') {
                    this.setState({wechat: data.detail.value});
                  } else if (value.title === '邮箱') {
                    this.setState({email: data.detail.value});
                  }
                }
                } textColor={'#727272'}/>);
              })
            }
          </View>
          {/*备注*/}
          <View style={styleAssign([wRatio(100), h(203), mt(10), bgColor(commonStyles.whiteColor)])}>
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
                customStyle={styleAssign([wRatio(100), h(204), styles.uac, bgColor(commonStyles.whiteColor)])}
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
              <View style={styleAssign([styles.uac, styles.ujc])}>
                <Image style={styleAssign([w(335), h(176)])} src={avatar.path}
                       mode={'aspectFit'}/>
              </View>
          }
        </ScrollView>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {
          this.addPrivateCustomer();
        }}/>
      </CustomSafeAreaView>
    )
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
}


export default AddCustomer
