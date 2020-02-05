/**
 * @filename add_goods.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/18
 * @Description: 添加商品
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view";
//@ts-ignore
import {get, parseData, styleAssign, toast} from "../../utils/datatool";
import {
  absR,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  hRatio,
  mb,
  ml,
  mt,
  pa,
  pb,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/goods';
import TopHeader from "../../compoments/top-header";
import {Image, Input, ScrollView, Text, Textarea, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button";
import {FileController} from "../../api/httpurl";
import {Enum, Goods} from "../../const/global";
let maxLength = 5;

interface Props {
  //添加商品
  addGoods: any;
  //更新商品
  updateGoods: any;
}

interface State {
  //轮播图
  carouselUrlsLocal: any[];
  //详情图
  detailUrlsLocal: any[];
  name: string;
  price: string;
  introduction: string;
  edit: boolean;
}

@connect(state => state.Goods, {...actions})
class AddGoods extends Component<Props, State> {

  private viewRef;
  private uploading: boolean;
  private uploadCount: number;
  private uploadResultArr;
  private carouselUrls: string[];
  private detailUrls: string[];
  private itemData: Goods;


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
    let carouselUrlsLocalTmp: { path: string }[] = [], detailUrlsLocalTmp: { path: string }[] = [];

    this.itemData = parseData(this.$router.params.itemData);
    if (this.itemData) {
      parseData(this.itemData.carouselUrl).forEach((item) => {
        carouselUrlsLocalTmp.push({path: item});
      });
      parseData(this.itemData.detailUrl).forEach((item) => {
        detailUrlsLocalTmp.push({path: item});
      });
    }
    console.log('传递参数', this.itemData);

    this.state = {
      name: this.itemData ? this.itemData.name : '',
      price: this.itemData ? '' + this.itemData.price : '0',
      introduction: this.itemData ? this.itemData.introduction : '',
      carouselUrlsLocal: carouselUrlsLocalTmp,
      detailUrlsLocal: detailUrlsLocalTmp,
      edit: parseData(this.$router.params.edit)
    }
    this.carouselUrls = this.itemData ? parseData(this.itemData.carouselUrl) : [];
    this.detailUrls = this.itemData ? parseData(this.itemData.detailUrl) : [];
    this.uploading = false;
    this.uploadCount = 0;
    this.uploadResultArr = [];
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/1/4
   * @function: 更新商品
   */
  updateGoods = () => {
    let {name, price, introduction} = this.state;

    if (name.length === 0) {
      toast('名字不能为空');
      return;
    }
    if (introduction.length === 0) {
      toast('简介不能为空');
      return;
    }
    if (this.carouselUrls.length === 0) {
      toast('请选择轮播图');
      return;
    }
    if (this.detailUrls.length === 0) {
      toast('请选择详情图');
      return;
    }
    this.viewRef && this.viewRef.showLoading('更新中');
    this.props.updateGoods({
      id: this.itemData.id,
      name,
      price,
      carouselUrl: JSON.stringify(this.carouselUrls),
      detailUrl: JSON.stringify(this.detailUrls),
      introduction
    }).then((res) => {
      toast('商品更新成功');
      Taro.eventCenter.trigger('goodsListRefresh');
      console.log('更新商品信息', res);
      this.viewRef && this.viewRef.hideLoading();
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2019/12/29
   * @function: 添加任务
   */
  addGoods = () => {
    let {name, price, introduction} = this.state;

    if (name.length === 0) {
      toast('名字不能为空');
      return;
    }
    if (introduction.length === 0) {
      toast('简介不能为空');
      return;
    }
    if (this.carouselUrls.length === 0) {
      toast('请选择轮播图');
      return;
    }
    if (this.detailUrls.length === 0) {
      toast('请选择详情图');
      return;
    }
    this.viewRef && this.viewRef.showLoading('上传中');
    this.props.addGoods({
      name,
      price,
      carouselUrl: JSON.stringify(this.carouselUrls),
      detailUrl: JSON.stringify(this.detailUrls),
      introduction
    }).then((res) => {
      toast('商品添加成功');
      Taro.eventCenter.trigger('goodsListRefresh');
      console.log('添加商品信息', res);
      this.viewRef && this.viewRef.hideLoading();
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
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


  render() {

    let {carouselUrlsLocal, detailUrlsLocal, edit, introduction, name, price} = this.state;

    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={edit ? '编辑商品' : '添加商品'}/>
        <ScrollView
          style={styleAssign([wRatio(100), hRatio(100), pb(5), bgColor(commonStyles.pageDefaultBackgroundColor)])}
          scrollY>
          {/*商品基本信息*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View style={styleAssign([wRatio(100), styles.uac])}>
              {
                [{title: '商品名称', placeHolder: '15个字以内'}, {title: '参考价格', placeHolder: '选填'}].map((value, index) => {
                  return (<View style={styleAssign([wRatio(100)])} key={index}>
                    <View
                      style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor)])}>
                      <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>{value.title}</Text>
                      <Input
                        type={value.title === '商品名称' ? 'text' : 'number'}
                        value={value.title === '商品名称' ? name : price}
                        style={styleAssign([ml(16), fSize(14), {textAlign: 'right'}])}
                        placeholder={value.placeHolder}
                        onInput={(e) => {
                          if (value.title === '商品名称') {
                            this.setState({name: e.detail.value});
                          } else {
                            this.setState({price: e.detail.value});
                          }
                        }}/>
                    </View>
                    <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
                  </View>);
                })
              }
              <View
                style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
                <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>轮播图(最多5张)</Text>
              </View>
              <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
              <View
                style={styleAssign([wRatio(100), mt(10), mb(10), pl(10), pr(10), styles.udr, styles.uWrap])}>
                {
                  carouselUrlsLocal.map((value, index) => {
                    return (
                      <View style={styleAssign([w(105), h(105), ml(10), mb(10),])}>
                        <Image key={index} style={styleAssign([w(105), h(105), radiusA(2)])}
                               src={value.path}/>
                        <Image key={index} style={styleAssign([w(20), h(20), styles.upa, absR(-5), absT(-5)])}
                               src={require('../../assets/ico_close.png')}
                               onClick={() => {
                                 this.carouselUrls.splice(index, 1);
                                 carouselUrlsLocal.splice(index, 1);

                                 console.log('删除后的列表', carouselUrlsLocal, this.carouselUrls);
                                 this.setState({carouselUrlsLocal}, () => {
                                   console.log('剩余图片', this.state.carouselUrlsLocal);
                                 });
                               }}/>
                      </View>);
                  })
                }
                {
                  carouselUrlsLocal.length < maxLength && <TouchableButton
                    onClick={() => {
                      Taro.chooseImage({count: maxLength - carouselUrlsLocal.length}).then((res) => {
                        console.log('本地上传图片', res.tempFiles);
                        this.setState({carouselUrlsLocal: this.state.carouselUrlsLocal.concat(res.tempFiles)});
                        this.uploadFileList(res.tempFiles, () => {
                          this.carouselUrls.push(...this.uploadResultArr);
                          console.log('上传成功后的图片列表', this.carouselUrls);
                        });
                      });
                    }}
                    customStyle={styleAssign([ml(10), mb(20), w(105), h(105), bgColor(commonStyles.pageDefaultBackgroundColor), radiusA(4), styles.uac, styles.ujc])}>
                    <Image style={styleAssign([w(40), h(40)])} src={require('../../assets/ico_goods_add.png')}/>
                  </TouchableButton>
                }
              </View>
            </View>
          </View>
          {/*商品简介*/}
          <View style={styleAssign([wRatio(100), h(259), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View
              style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
              <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>商品简介</Text>
            </View>
            <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <Textarea value={introduction}
                      placeholder={'请输入公司简介'}
                      style={styleAssign([w(300), h(140), fSize(16), mt(10), ml(20),
                        bgColor(commonStyles.pageDefaultBackgroundColor), pa(16)])}
                      onInput={(e) => {
                        this.setState({introduction: e.detail.value});
                      }}/>
          </View>
          {/*详情图*/}
          <View style={styleAssign([wRatio(100), bgColor(commonStyles.whiteColor), mt(10)])}>
            <View
              style={styleAssign([wRatio(100), h(55), pl(20), pr(20), styles.udr, styles.uac, bgColor(commonStyles.whiteColor)])}>
              <Text style={styleAssign([fSize(14), color('#0C0C0C')])}>详情图</Text>
            </View>
            <View style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
            <View style={styleAssign([wRatio(100), mt(10), mb(10), pl(10), pr(10), styles.udr, styles.uWrap])}>
              {
                detailUrlsLocal.map((value, index) => {
                  return (
                    <View style={styleAssign([w(105), h(105), mb(10), ml(10)])}>
                      <Image key={index} style={styleAssign([w(105), h(105), radiusA(2)])}
                             src={value.path}/>
                      <Image style={styleAssign([w(20), h(20), styles.upa, absR(-5), absT(-5)])}
                             src={require('../../assets/ico_close.png')}
                             onClick={() => {
                               this.detailUrls.splice(index, 1);
                               detailUrlsLocal.splice(index, 1);

                               this.setState({detailUrlsLocal});
                             }}/>
                    </View>
                  );
                })
              }
              {
                detailUrlsLocal.length < 9 && <TouchableButton
                  onClick={() => {
                    Taro.chooseImage({count: 9 - detailUrlsLocal.length}).then((res) => {
                      this.setState({detailUrlsLocal: this.state.detailUrlsLocal.concat(res.tempFiles)});
                      this.uploadFileList(res.tempFiles, () => {
                        this.detailUrls.push(...this.uploadResultArr);
                        console.log('上传成功后的图片列表', this.detailUrls);
                      });
                    });
                  }}
                  customStyle={styleAssign([ml(10), mb(20), w(105), h(105), bgColor(commonStyles.pageDefaultBackgroundColor), radiusA(4), styles.uac, styles.ujc])}>
                  <Image style={styleAssign([w(40), h(40)])} src={require('../../assets/ico_goods_add.png')}/>
                </TouchableButton>
              }
            </View>
          </View>
        </ScrollView>
        {/*保存和上架*/}
        <View style={styleAssign([wRatio(100), h(63), bgColor(commonStyles.whiteColor),
          styles.uac, styles.ujc])}>
          {
            edit ? <View style={styleAssign([styles.uac, styles.udr])}>
                <TouchableButton customStyle={styleAssign([ml(10), w(335), h(47), bgColor(commonStyles.colorTheme),
                  radiusA(2), styles.uac, styles.ujc])}
                                 onClick={() => {
                                   this.updateGoods();
                                 }
                                 }>
                  <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>保存</Text>
                </TouchableButton>
              </View> :
              <View style={styleAssign([styles.uac, styles.udr])}>
                <TouchableButton customStyle={styleAssign([w(162), h(47), bo(1), bdColor(commonStyles.colorTheme),
                  {borderStyle: 'solid'}, radiusA(2), styles.uac, styles.ujc])}
                                 onClick={() => {
                                   this.addGoods();
                                 }}>
                  <Text style={styleAssign([fSize(20), color('#343434')])}>保存商品</Text>
                </TouchableButton>
                <TouchableButton customStyle={styleAssign([ml(10), w(162), h(47), bgColor(commonStyles.colorTheme),
                  radiusA(2), styles.uac, styles.ujc])}>
                  <Text style={styleAssign([fSize(20), color(commonStyles.whiteColor)])}>立即上架</Text>
                </TouchableButton>
              </View>
          }
        </View>
      </CustomSafeAreaView>
    );
  }
}

export default AddGoods;
