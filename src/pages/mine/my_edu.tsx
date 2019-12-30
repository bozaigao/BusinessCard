/**
 * @filename my_edu.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/22
 * @Description: 教育经历
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view";
import {bgColor, color, commonStyles, default as styles, fSize, h, ml, mt, pl, pr, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/login";
import TopHeader from "../../compoments/top-header";
import {Input, Text, View} from "@tarojs/components";
import BottomButon from "../../compoments/bottom-buton";

interface Props {
  //获取banner信息
  dispatchBannerInfo?: any;
}

interface State {
  list: { title: string; value: string; }[];
}

@connect(state => state.login, {...actions})
class MyEdu extends Component<Props, State> {

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
      list: [{title: '学校', value: '四川美术学院'},
        {title: '学历', value: '本科'},
        {title: '专业', value: '产品设计'},
        {title: '在校时间', value: '2015-2019'}],
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


  render() {

    let {list} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'教育经历'}/>
        <View
          style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uf1, mt(10)])}>
            {
              list.map((value, index) => {
                return (<View style={styleAssign([wRatio(100), styles.uac])} key={index}><View
                  style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                  <Text style={styleAssign([fSize(14), color('#787878')])}>{value.title}</Text>
                  <Input type='text' value={value.value}
                         style={styleAssign([ml(16), fSize(14), {textAlign: 'right'}])}/>
                </View>
                  {
                    index !== 3 &&
                    <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  }
                </View>);
              })
            }
          </View>
          {/*保存*/}
          <BottomButon title={'保存'} onClick={() => {

          }}/>
        </View>
      </CustomSafeAreaView>
    )
  }
}


export default MyEdu
