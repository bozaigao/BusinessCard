/**
 * @filename my_collect.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 我的收藏
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {styleAssign, toast} from "../../utils/datatool";
import {
  absB,
  absT,
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  mb,
  ml,
  mr,
  mt,
  op,
  pl,
  pr,
  radiusA,
  radiusTL,
  radiusTR,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/business_card';
import * as visitorActions from '../../actions/visitor';
import * as customerActions from '../../actions/customer';
import {CollectItemModel, Orientation, User, VisitorRecordModel} from "../../const/global";
import {Image, ScrollView, Text, View} from "@tarojs/components";
import CollectItem from "../../compoments/collect-item";
import BusinessCardRemoveNoticeModal from "../../compoments/businesscard-remove-notice";
import VisitorItem from "../../compoments/visitor-item";
import ShaiXuanModal from "../../compoments/shai-xuan-modal";
import ModeModal from "../../compoments/mode-modal";
import NavigationBar from "../../compoments/navigation_bar";
import SanJiao from "../../compoments/sanjiao";
import {NetworkState} from "../../api/httpurl";

interface Props {
  userInfo: User;
  //获取我收藏的名片列表
  myCollectList: any;
  //更新我收藏的名片
  updateMyCollect: any;
  //查询我的访客列表
  getVisitorList: any;
  addCustomer: any;
}

interface State {
  currentIndex: number;
  collectSubCurrentIndex: number;
  visitorSubCurrentIndex: number;
  showOperate: boolean;
  showDeleteNotice: boolean;
  collectUserList: CollectItemModel[];
  recordList: VisitorRecordModel[];
  total: number;
  shaiXuanMode: string;
  showMode: boolean;
  shaiXuanValue: string;
  showShaiXuan: boolean;
  //筛选开始时间
  startTime: string;
  //筛选结束时间
  endTime: string;
  //筛选次数
  shaiXuanTimes: number;
}

@connect(state => state.login, {...actions, ...visitorActions, ...customerActions})
class MyCollect extends Component<Props, State> {

  private viewRef;
  private collectItemModel: CollectItemModel;
  private pageNo;
  private pageSize;

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
    this.pageNo = 1;
    this.pageSize = 10;
    this.state = {
      currentIndex: parseInt(this.$router.params.currentIndex, 10),
      collectSubCurrentIndex: 0,
      visitorSubCurrentIndex: 0,
      showOperate: false,
      showDeleteNotice: false,
      collectUserList: [],
      recordList: [],
      total: 0,
      shaiXuanMode: '最后访问时间',
      shaiXuanValue: '全部',
      showMode: false,
      showShaiXuan: false,
      startTime: '',
      endTime: '',
      shaiXuanTimes: 0
    }
  }


  componentDidShow() {
    this.myCollectList();
    this.refresh();
  }


  refresh = () => {
    this.pageNo = 1;
    this.getVisitorList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.getVisitorList();
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/9
   * @function: 查询我的访客列表
   */
  getVisitorList = (refresh?: boolean) => {

    let params;
    let {startTime, endTime, shaiXuanTimes} = this.state;

    params = {
      type: this.state.visitorSubCurrentIndex,
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }
    if (startTime.length !== 0 &&
      endTime.length !== 0) {
      Object.assign(params, {startDate: startTime, endDate: endTime});
    }
    if (shaiXuanTimes !== 0) {
      Object.assign(params, {visitCount: shaiXuanTimes});
    }
    this.viewRef && this.viewRef.showLoading();

    this.props.getVisitorList(params).then((res) => {
      console.log('查询我的访客列表', res);
      this.viewRef && this.viewRef.hideLoading();
      if (refresh) {
        this.setState({recordList: res.records, total: res.total});
      } else if (res.records && res.records.length !== 0) {
        this.setState({recordList: this.state.recordList.concat(res.records), total: res.total});
      } else {
        toast('没有记录了');
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/21
   * @function: 置为客户
   */
  addCustomer = (userId) => {
    this.viewRef.showLoading();
    this.props.addCustomer({customerUserId: userId}).then((res) => {
      this.viewRef.hideLoading();
      console.log('置为客户', res);
      if (res !== NetworkState.FAIL) {
        toast('设置成功');
      }
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/9
   * @function: 获取我收藏的名片列表
   */
  myCollectList = () => {
    this.viewRef.showLoading();
    this.props.myCollectList({type: this.state.collectSubCurrentIndex}).then((res) => {
      this.viewRef.hideLoading();
      console.log('获取我收藏的名片列表', res);
      this.setState({collectUserList: res.userList});
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/9
   * @function: 更新我收藏的名片
   */
  updateMyCollect = (type: number, collectedUserId: number) => {
    this.viewRef.showLoading();
    this.props.updateMyCollect({type, collectedUserId}).then((res) => {
      this.viewRef.hideLoading();
      console.log('更新我收藏的名片', res);
      if (res !== NetworkState.FAIL) {
        this.myCollectList();
        toast('删除成功');
      }
    }).catch(e => {
      this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {
      currentIndex, collectSubCurrentIndex, visitorSubCurrentIndex, showOperate, showDeleteNotice, collectUserList, recordList, total,
      shaiXuanMode, showMode, showShaiXuan
    } = this.state;

    console.log('shaiXuanMode', shaiXuanMode);
    let childView;

    if (currentIndex === 1) {
      childView = <View style={styleAssign([styles.uf1])}>
        <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, styles.udr, mt(10), mb(20)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View
              style={styleAssign([styles.uac, styles.ujc, bgColor(collectSubCurrentIndex === 0 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2)])}
              onClick={() => {
                this.setState({collectSubCurrentIndex: 0}, () => {
                  this.myCollectList();
                });
              }}>
              <Text
                style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(collectSubCurrentIndex === 0 ? commonStyles.whiteColor : '#343434')])}>谁收藏了我</Text>
            </View>
            <View
              style={styleAssign([styles.uac, styles.ujc, bgColor(collectSubCurrentIndex === 1 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2), ml(63)])}
              onClick={() => {
                this.setState({collectSubCurrentIndex: 1}, () => {
                  this.myCollectList();
                });
              }}>
              <Text
                style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(collectSubCurrentIndex === 1 ? commonStyles.whiteColor : '#343434')])}>我收藏了谁</Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {
            collectUserList.length === 0 &&
            <View
              style={styleAssign([styles.uac, mt(100)])}>
              <Image style={styleAssign([w(78), h(69)])} src={require('../../assets/ico_no_data.png')}/>
              <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂无数据</Text>
            </View>
          }
          {
            collectUserList.map((value, index) => {
              console.log(value);
              return (<CollectItem key={index} operate={(item) => {
                this.collectItemModel = item;
                this.setState({showOperate: true});
              }} item={value}
                                   setCustomer={(userId) => {
                                     this.addCustomer(userId);
                                   }
                                   }/>);
            })
          }
        </ScrollView>
      </View>;
    } else {
      childView = <View style={styleAssign([styles.uf1])}>
        <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, styles.udr, mt(10)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View
              style={styleAssign([styles.uac, styles.ujc, bgColor(visitorSubCurrentIndex === 0 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2)])}
              onClick={() => {
                this.setState({visitorSubCurrentIndex: 0}, () => {
                  this.refresh();
                });
              }}>
              <Text
                style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(visitorSubCurrentIndex === 0 ? commonStyles.whiteColor : '#343434')])}>谁访问了我</Text>
            </View>
            <View
              style={styleAssign([styles.uac, styles.ujc, bgColor(visitorSubCurrentIndex === 1 ? '#E2BB7B' : commonStyles.pageDefaultBackgroundColor), radiusA(2), ml(63)])}
              onClick={() => {
                this.setState({visitorSubCurrentIndex: 1}, () => {
                  this.refresh();
                });
              }}>
              <Text
                style={styleAssign([mt(2), mb(2), ml(8), mr(8), color(visitorSubCurrentIndex === 1 ? commonStyles.whiteColor : '#343434')])}>我访问了谁</Text>
            </View>
          </View>
        </View>
        {/*条件筛选*/}
        {
          visitorSubCurrentIndex === 0 && <View
            style={styleAssign([wRatio(100), h(36), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
              pl(20), pr(20), mt(10), mb(20)])}>
            <Text style={styleAssign([color('#727272'), fSize(14)])}>{`共${total}位访客`}</Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <View style={styleAssign([styles.uac, styles.udr])}
                    onClick={() => {
                      this.setState({showMode: true});
                    }}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}>{shaiXuanMode}</Text>
                <SanJiao orientation={Orientation.down} style={styleAssign([ml(3)])}/>
              </View>
              <View style={styleAssign([styles.uac, styles.udr, ml(24)])}
                    onClick={() => {
                      this.setState({showShaiXuan: true});
                    }}>
                <Text style={styleAssign([color('#727272'), fSize(14)])}>筛选</Text>
                <Image style={styleAssign([w(14), h(14), ml(3)])} src={require('../../assets/ico_shaixuan.png')}/>
              </View>
            </View>
          </View>
        }
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
            recordList.length === 0 &&
            <View
              style={styleAssign([styles.uac, mt(100)])}>
              <Image style={styleAssign([w(78), h(69)])} src={require('../../assets/ico_no_data.png')}/>
              <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂无数据</Text>
            </View>
          }
          {
            recordList.length !== 0 && recordList.map((value, index) => {
              console.log(value);
              return (<VisitorItem key={index} item={value}/>);
            })
          }
        </ScrollView>
      </View>;
    }

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <NavigationBar style={styleAssign([bgColor(commonStyles.whiteColor)])}>
            <View
              style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
              <Image style={styleAssign([w(22), h(22), ml(20)])}
                     src={require('../../assets/ico_back.png')}
                     onClick={() => {
                       Taro.navigateBack();
                     }}/>
              <View style={styleAssign([styles.uac, styles.udr])}>
                <View style={styleAssign([styles.uac, styles.udr])}
                      onClick={() => {
                        this.setState({currentIndex: 0}, () => {
                          this.refresh();
                        });
                      }}>
                  <View style={styleAssign([styles.uac])}>
                    <Text style={styleAssign([fSize(18), color(currentIndex === 0 ? '#E2BB7B' : '#0C0C0C')])}>访客</Text>
                    <View
                      style={styleAssign([w(36), h(2), bgColor(currentIndex === 0 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                  </View>
                </View>
                <View style={styleAssign([styles.uac, styles.udr, ml(24)])}
                      onClick={() => {
                        this.setState({currentIndex: 1});
                      }}>
                  <View style={styleAssign([styles.uac])}>
                    <Text style={styleAssign([fSize(18), color(currentIndex === 1 ? '#E2BB7B' : '#0C0C0C')])}>收藏</Text>
                    <View
                      style={styleAssign([w(36), h(2), bgColor(currentIndex === 1 ? '#E2BB7B' : commonStyles.whiteColor), mt(10)])}/>
                  </View>
                </View>
              </View>
              <View style={styleAssign([w(22), h(22), mr(20)])}/>
            </View>
          </NavigationBar>
          {
            childView
          }
        </View>
        {
          showOperate && <View style={styleAssign([wRatio(100), hRatio(100), {position: 'fixed'}, absT(0)])}
                               onClick={() => {
                                 this.setState({showOperate: false});
                               }}>
            <View
              style={styleAssign([wRatio(100), hRatio(100), op(0.3), bgColor(commonStyles.whiteColor), bgColor(commonStyles.colorTheme)])}/>
            <View
              style={styleAssign([wRatio(100), h(120), bgColor(commonStyles.whiteColor), radiusTL(10), radiusTR(10),
                styles.upa, absB(0)])}>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}
                    onClick={() => {
                      this.setState({showOperate: false, showDeleteNotice: true});
                    }}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>移除名片</Text>
              </View>
              <View style={styleAssign([wRatio(100), h(5), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View style={styleAssign([wRatio(100), h(61), styles.uac, styles.ujc])}>
                <Text style={styleAssign([color('#29292E'), fSize(18)])}>取消</Text>
              </View>
            </View>
          </View>
        }

        {
          showDeleteNotice && <BusinessCardRemoveNoticeModal cancelCallback={() => {
            this.setState({showDeleteNotice: false});
          }
          } confirmCallback={() => {
            this.setState({showDeleteNotice: false}, () => {
              this.updateMyCollect(0, this.collectItemModel.userId);
            });
          }
          }/>
        }
        {
          showMode && <ModeModal
            totalPerson={total}
            shaiXuanMode={shaiXuanMode}
            shaiXuanCallback={() => {
              this.setState({showMode: false, showShaiXuan: true});
            }
            }
            cancelCallback={() => {
              this.setState({showMode: false});
            }
            } confirmCallback={(data) => {
            this.setState({showMode: false, shaiXuanMode: data,});
          }
          } collectCallback={() => {
            this.setState({showMode: false, currentIndex: 1}, () => {
              this.myCollectList();
            });
          }
          } myVisitorCallback={() => {
            this.setState({showMode: false, visitorSubCurrentIndex: 1}, () => {
              this.getVisitorList();
            });
          }
          }/>
        }
        {
          showShaiXuan && <ShaiXuanModal
            totalPerson={total}
            shaiXuanMode={shaiXuanMode}
            shaiXuanTimesCallback={(times) => {
              console.log('筛选次数', times);
              this.setState({shaiXuanTimes: times, startTime: '', endTime: '', showShaiXuan: false}, () => {
                this.refresh();
              });
            }
            }
            startAndEndTimeCallback={(startTime, endTime) => {
              this.setState({startTime, endTime, shaiXuanTimes: 0, showShaiXuan: false}, () => {
                this.refresh();
              });
            }
            }
            modeCallback={() => {
              this.setState({showShaiXuan: false, showMode: true});
            }
            }
            cancelCallback={() => {
              this.setState({showShaiXuan: false});
            }
            } collectCallback={() => {
            this.setState({showShaiXuan: false, currentIndex: 1}, () => {
              this.myCollectList();
            });
          }
          } myVisitorCallback={() => {
            this.setState({showShaiXuan: false, visitorSubCurrentIndex: 1}, () => {
              this.getVisitorList();
            });
          }
          }/>
        }

      </CustomSafeAreaView>);
  }
}

export default MyCollect;
