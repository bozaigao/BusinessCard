/**
 * @filename shop_apply.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/5/2
 * @Description: 开通店铺
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign, toast} from "../../utils/datatool";
import {
  absB,
  absR,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h, hRatio,
  mb, ml,
  mt,
  pa,
  pl,
  pr,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as shopActions from '../../actions/shop';
import * as loginActions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Picker, Text, Textarea, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton/index";
import ListItem from "../../compoments/list-item/index";
import {User} from "../../const/global";
import {NetworkState} from "../../api/httpurl";

interface Props {
  //商铺提交申请
  shopApply: any;
  userInfo: User;
}

interface State {
  name: string;
  phone: string;
  companyName: string;
  province: string;
  city: string;
  titleList: { title: string, subtitle?: string, value?: string, hasEdit?: boolean }[];
  desc: string;
}

@connect(state => state.login, {...shopActions, ...loginActions})
class ShopApply extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {}

  constructor(props) {
    super(props);
    console.log(this.viewRef);

    this.state = {
      name: '',
      phone: '',
      companyName: '',
      province: '',
      city: '',
      titleList: [{title: '姓名', subtitle: '请输入姓名', value: '', hasEdit: true},
        {title: '联系方式', subtitle: '请输入手机号', value: '', hasEdit: true},
        {title: '公司名称', value: '', subtitle: '请输入公司名称', hasEdit: true},
        {title: '公司地址', value: '', subtitle: '请选地区'},],
      desc: ''
    }
  }


  componentDidMount() {

  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/5/2
   * @function: 店铺提交申请
   */
  shopApply = () => {
    let {name, phone, companyName, province, city, desc} = this.state;

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
    if (companyName.length === 0) {
      toast('公司名字不能为空');
      return;
    }
    if (province.length === 0) {
      toast('详细地址不能为空');
      return;
    }
    if (desc.length === 0) {
      toast('主营业务描述不能为空');
      return;
    }

    let paramas = {
      name,
      phone,
      company: companyName,
      province,
      city,
      business: desc,
    };

    console.log('店铺提交申请', paramas);

    this.viewRef && this.viewRef.showLoading();
    this.props.shopApply(paramas).then((res) => {
      console.log('店铺提交申请', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        Taro.redirectTo({
          url: `/pages/mine/apply_success`
        });
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {titleList, desc} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'开通店铺'}/>
        {/*任务列表*/}
        <View style={styleAssign([wRatio(100),hRatio(100), bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), pl(20), pr(20)])}>
            <Text style={styleAssign([color('#0C0C0C'), fSize(18)])}>填写申请</Text>
            <Text
              style={styleAssign([color('#979797'), fSize(14), mt(18), mb(18)])}>请留下真实有效的使用者消息，我们将在12小时内尽快与您联系，若您仍有疑问也可直接咨询客服。</Text>
          </View>
          <View style={styleAssign([styles.uf1, mt(10)])}>
            {
              titleList.map((value, index) => {
                if (value.title === '公司地址') {
                  return (<Picker mode='region' onChange={(e) => {
                    console.log(e.detail)
                    titleList[3].value = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
                    this.setState({
                      titleList,
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
                return (<ListItem textColor={'#727272'}
                                  title={value.title}
                                  value={value.value}
                                  subTitle={value.subtitle} key={index}
                                  hasEdit={value.hasEdit}
                                  onCLick={(title) => {

                                  }
                                  } onTextChange={(e) => {
                  if (value.title === '姓名') {
                    this.setState({name: e.detail.value});
                  } else if (value.title === '联系方式') {
                    this.setState({phone: e.detail.value});
                  } else if (value.title === '公司名称') {
                    this.setState({companyName: e.detail.value});
                  }
                }
                }/>);
              })
            }
            <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), styles.uac, styles.ujc])}>
              <View style={styleAssign([wRatio(100),styles.udr,styles.uac])}>
                <Text style={styleAssign([fSize(14),color('#727272'),mt(10),ml(20)])}>公司主营业务</Text>
              </View>
               <Textarea
                 style={styleAssign([wRatio(80), h(160), pa(20), bgColor(commonStyles.pageDefaultBackgroundColor),
                   mt(10),mb(10), fSize(14)])}
                 value={desc} placeholder={'请描述公司的主营业务'}
                 maxlength={200}
                 onInput={(e) => {
                   this.setState({desc: e.detail.value});
                 }}/>
              <View style={styleAssign([styles.uac, styles.udr, styles.upa, absR(30), absB(10)])}>
                <Text style={styleAssign([fSize(12), color('#979797')])}>{desc.length}</Text>
                <Text style={styleAssign([fSize(12), color('#CECECE')])}>/200</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor)])}/>
        <BottomButon title={'提交申请'} onClick={() => {
          this.shopApply();
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default ShopApply;
