/**
 * @filename tixian_recorder.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 提现记录
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign, toast} from "../../utils/datatool";
import {bgColor, commonStyles, default as styles} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/distribution';
import TopHeader from "../../compoments/top-header";
import {ScrollView} from "@tarojs/components";
import TiXianRecorderItem from "./tixian-recorder-item";
import {TiXianRecord} from "../../const/global";

interface Props {
  //体现记录
  withdrawList: any;
}

interface State {
  records: TiXianRecord[]
}

@connect(state => state.login, {...actions})
class TixianRecorder extends Component<Props, State> {

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
  private pageNo;
  private pageSize;


  constructor(props) {
    super(props);
    console.log(this.viewRef);
    this.state = {
      records: []
    }
    this.pageNo = 1;
    this.pageSize = 10;
  }

  refresh = () => {
    this.pageNo = 1;
    this.withdrawList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.withdrawList();
  }

  componentDidMount() {
    this.refresh();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/16
   * @function: 提现记录
   */
  withdrawList = (refresh?: boolean) => {
    this.viewRef && this.viewRef.showLoading();
    this.props.withdrawList({pageNo: this.pageNo, pageSize: this.pageSize}).then((res) => {
      console.log('提现记录', res);
      if (res) {
        this.viewRef && this.viewRef.hideLoading();
        this.setState({
          records: res.records
        });

        if (refresh) {
          this.setState({
            records: res.records
          });
        } else if (res.records && res.records.length !== 0) {
          this.setState({records: this.state.records.concat(res.records)});
        } else {
          toast('没有更多了');
        }
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {records} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'提现记录'}/>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY
          onScrollToUpper={() => {
            this.refresh();
          }}
          onScrollToLower={() => {
            this.loadMore();
          }}>
          {
            records.map((value, index) => {
              return <TiXianRecorderItem item={value} key={index}/>;
            })
          }
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

export default TixianRecorder;
