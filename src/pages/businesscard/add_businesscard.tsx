/**
 * @filename add_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/15
 * @Description: 添加名片
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
  ml,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Image, ScrollView, Switch, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import TouchableButton from "../../compoments/touchable-button";
import ListItem from "../../compoments/list-item";
import {cloudBaseUrl} from "../../api/httpurl";

interface Props {
  dispatchLogin?: any;
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  signInPageDetail: any;
  listData: { title: string; subtitle: string; hasEdit?: boolean; must?: boolean; }[];
  avatar: string;
}

@connect(state => state.login, {...actions})
class AddBusinesscard extends Component<Props, State> {

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
    this.state = {
      signInPageDetail: {dateIntegrals: [], signInCount: 0},
      listData: [
        {title: '姓名', subtitle: 'JY-W', hasEdit: true, must: true},
        {
          title: '公司',
          subtitle: '美克美家家居集团有限公司',
          hasEdit: true,
          must: true
        }, {
          title: '行业',
          subtitle: '家居',
          must: true
        },
        {title: '职位', subtitle: '销售经理', hasEdit: true},
        {title: '地区', subtitle: '成都'},
        {
          title: '微信号',
          subtitle: '15982468866',
          hasEdit: true
        }, {
          title: '邮箱',
          subtitle: '98248866@168.com',
          hasEdit: true
        }],
      avatar: ''
    }
  }


  render() {
    console.log(this.viewRef);

    let {signInPageDetail} = this.state;

    if (typeof signInPageDetail.signInCount === 'undefined') {
      signInPageDetail.signInCount = 0
    }

    let {listData, avatar} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} notNeedBottomPadding={true}>
        <TopHeader title={'创建名片'} backgroundColor={commonStyles.whiteColor}/>
        <ScrollView style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}
                    scrollY>
          {/*名片信息头部*/}
          <TouchableButton customStyle={styleAssign([wRatio(100), h(86), styles.uac, styles.udr, styles.ujb,
            bgColor(commonStyles.whiteColor), pl(20), pr(20)])}
                           onClick={() => {
                             Taro.chooseImage({count: 1}).then((res) => {
                               console.log('图片路径', res.tempFiles[0].path)
                               this.setState({avatar: res.tempFiles[0].path})
                               // this.uploadFileTpWx(res.tempFiles[0].path);
                             });
                           }}>
            <Text style={styleAssign([fSize(14), color('#727272')])}>头像</Text>
            <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                   src={avatar && avatar.length !== 0 ? avatar : `${cloudBaseUrl}ico_default.png`}/>
          </TouchableButton>
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*内容编辑*/}
          {
            listData.map((value, index) => {
              return (<ListItem title={value.title}
                                must={value.must}
                                subTitle={value.subtitle}
                                key={index}
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
                // this.setState({name: e.detail.value});
                console.log(e);
              }
              }/>);
            })
          }
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          {/*开关*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor)])}>
            <View style={styleAssign([wRatio(100), h(50), pl(20), pr(20), styles.uac, styles.udr, styles.ujb])}>
              <Text style={styleAssign([fSize(14), color('#343434')])}>分享自己的名片给朋友时展示手机号</Text>
              <Switch color={'#E2BB7B'}/>
            </View>
            <View style={styleAssign([w(336), h(0.5), bgColor('#E5E5E5'), ml(20), op(0.3)])}/>
          </View>
        </ScrollView>
        {/*创建名片*/}
        <BottomButon title={'保存'} onClick={() => {

        }}/>
      </CustomSafeAreaView>);
  }
}

export default AddBusinesscard;
