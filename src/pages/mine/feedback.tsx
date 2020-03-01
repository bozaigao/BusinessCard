/**
 * @filename feedback.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/19
 * @Description: 用户反馈界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {debounce, styleAssign, toast} from "../../utils/datatool";
import {absB, absR, bgColor, color, commonStyles, default as styles, fSize, h, mt, pa, wRatio} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header";
import {Text, Textarea, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";
import {NetworkState} from "../../api/httpurl";

interface Props {
  suggestionAdd: any;
}

interface State {
  content: string;
}

@connect(state => state.login, {...actions})
class Feedback extends Component<Props, State> {

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
      content: ''
    }
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/1
   * @function: 投诉与建议
   */
  suggestionAdd = () => {
    let {content} = this.state;

    if (content.length === 0) {
      toast('请输入内容');
      return;
    }
    this.viewRef && this.viewRef.showLoading();
    this.props.suggestionAdd({content: this.state.content}).then((res) => {
      console.log('获取用户信息', res);
      this.viewRef && this.viewRef.hideLoading();
      if (res !== NetworkState.FAIL) {
        toast('返回成功');
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
    let {content} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'投诉与建议'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor)])}>
          <View style={styleAssign([wRatio(100), h(160)])}>
            <Textarea
              maxlength={600}
              style={styleAssign([wRatio(80), {marginLeft: '5%'}, h(160), pa(20), bgColor(commonStyles.pageDefaultBackgroundColor),
                mt(20)])}
              value={''} placeholder={'请输入您的意见或建议，提交以后我们的工作人员会及时查看的~'}
              onInput={(e) => {
                this.setState({content: e.detail.value});
              }}/>
            <View style={styleAssign([styles.uac, styles.udr, styles.upa, absR(30), absB(10)])}>
              <Text style={styleAssign([fSize(12), color('#979797')])}>{content.length}</Text>
              <Text style={styleAssign([fSize(12), color('#CECECE')])}>/600</Text>
            </View>
          </View>
        </View>
        {/*提交*/}
        <BottomButon title={'提交'} onClick={() => {
          this.suggestionAdd();
        }}/>
      </CustomSafeAreaView>
    );
  }
}

export default Feedback;
