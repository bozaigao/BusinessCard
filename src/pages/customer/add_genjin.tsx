/**
 * @filename add_genjin.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/1/15
 * @Description: 添加跟进
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
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
  pb,
  pl,
  pr,
  pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {parseData, styleAssign, toast} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import TopHeader from "../../compoments/top-header";
import {CustomerModel} from "../../const/global";
import BottomButon from "../../compoments/bottom-buton";
import {Image, Text, Textarea, View} from "@tarojs/components";
import {cloudBaseUrl} from "../../api/httpurl";

interface Props {
  //获取banner信息
  addFollowUp?: any;
}

interface State {
  customer: CustomerModel;
  desc: string;
}

@connect(state => state.login, {...actions})
class AddGenJin extends Component<Props, State> {
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
      desc: '',
      customer: parseData(this.$router.params.itemData),
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidHide() {
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/15
   * @function:添加客户跟进
   */
  addFollowUp = () => {
    if (this.state.desc.length === 0) {
      toast('跟进内容不能为空');
      return;
    }
    this.viewRef && this.viewRef.showLoading();
    this.props.addFollowUp({
      id: this.state.customer.id,
      followUpContent: this.state.desc,
    }).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      toast('添加成功');
      console.log('添加客户跟进', res);
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  render() {
    let {desc, customer} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'添加跟进'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([wRatio(100), h(140), bgColor(commonStyles.whiteColor),
            pl(20), pr(20), pt(16), pb(16)])}>
            <Text style={styleAssign([fSize(16), color('#343434')])}>
              跟进客户
            </Text>
            <View style={styleAssign([styles.udr, styles.uac, mt(16)])}>
              <Image style={styleAssign([w(66), h(66)])}
                     src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${cloudBaseUrl}ico_default.png`}/>
              <View style={styleAssign([ml(16)])}>
                <View style={styleAssign([styles.udr, styles.uac])}>
                  <Text style={styleAssign([fSize(18), color('#343434')])}>
                    {customer.name}
                  </Text>
                  <Text style={styleAssign([fSize(12), color('#A9A9A9'), ml(8)])}>
                    {customer.position}
                  </Text>
                </View>
                <Text style={styleAssign([fSize(12), color('#A9A9A9'), mt(8)])}>
                  {customer.company}
                </Text>
              </View>
            </View>
          </View>
          <View style={styleAssign([wRatio(100), h(10), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View style={styleAssign([wRatio(100), h(201), bgColor(commonStyles.whiteColor)])}>
            <Text style={styleAssign([fSize(16), color('#343434'), ml(20), mt(18)])}>跟进记录</Text>
            <Textarea value={desc}
                      maxlength={200}
                      style={styleAssign([ml(20), w(330), pt(20), pb(20), mr(20), fSize(14), radiusA(4), mt(4), h(81),
                        bgColor(commonStyles.whiteColor)])}
                      onInput={(e) => {
                        this.setState({desc: e.detail.value});
                      }} placeholder={'在此填写您的跟进记录~'}/>
            <View style={styleAssign([styles.uf1, styles.udr, styles.uac, styles.uje])}>
              <View style={styleAssign([styles.udr, styles.uac, mr(30)])}>
                <Text style={styleAssign([fSize(16), color('#979797')])}>{desc.length}</Text>
                <Text style={styleAssign([fSize(16), color('#CECECE')])}>/200</Text>
              </View>
            </View>
          </View>
        </View>
        {/*保存*/}
        <BottomButon title={'保存'} onClick={() => {
          this.addFollowUp();
        }}/>
      </CustomSafeAreaView>
    )
  }
}


export default AddGenJin
