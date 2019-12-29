/**
 * @filename industry_list.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/29
 * @Description: 行业列表
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {bgColor, color, commonStyles, default as styles, fSize, h, ml, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/dict";
import TopHeader from "../../compoments/top-header";
import {ScrollView, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";

interface Props {
  //获取行业列表
  getDictItemList: any;
}

interface State {
  industryList: [];
}

@connect(state => state.Dict, {...actions})
class IndustryList extends Component<Props, State> {
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
      industryList: []
    }
    console.log('收到参数了',this.$router.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    this.getDictItemList();
  }

  getDictItemList = () => {
    this.viewRef && this.viewRef.showLoading();
    this.props.getDictItemList({dictCode: 'industry'}).then((res) => {
      console.log('获取行业信息', res);
      this.viewRef && this.viewRef.hideLoading();
      this.setState({industryList: res});
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  componentDidHide() {
  }


  render() {
    let {industryList} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'选择行业'}/>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {
            industryList.map((value: any, index) => {
              return (
                <TouchableButton key={index}
                                 customStyle={styleAssign([wRatio(100), styles.uac, bgColor(commonStyles.whiteColor)])}
                                 onClick={() => {
                                   Taro.eventCenter.trigger('industry', value.itemText);
                                   Taro.navigateBack();
                                 }}>
                  <View style={styleAssign([wRatio(100), h(50), bgColor(commonStyles.whiteColor), styles.ujc])}>
                    <Text style={styleAssign([fSize(14), color('#343434'), ml(20)])}>{value.itemText}</Text>
                  </View>
                  <View style={styleAssign([wRatio(90), h(1), bgColor('#EAEAEA')])}/>
                </TouchableButton>);
            })
          }
        </ScrollView>
      </CustomSafeAreaView>
    )
  }
}


export default IndustryList
