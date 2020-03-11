import Taro, {Component, Config} from '@tarojs/taro'
import './index.scss'
import {View} from '@tarojs/components'
import {styleAssign} from "../utils/datatool";
import {bgColor, commonStyles, default as styles} from "../utils/style";
import TopHeader from "../compoments/top-header";
import * as actions from '../actions/login';
import CustomSafeAreaView from "../compoments/safe-area-view";
import BottomButon from "../compoments/bottom-buton";
import {User} from "../const/global";
import {connect} from "@tarojs/redux";

interface Props {
  userInfo: User;
}

interface State {

}

@connect(state => state.login, {...actions})
class Auth extends Component<Props, State> {
  private viewRef;
  config: Config = {
    navigationBarTitleText: 'canvas测试'
  }

  constructor(props) {
    super(props)
    this.state = {
      imageTempPath: ''
    }
  }

  componentWillMount(): void {
    this.drawBall()
  }

  drawBall() {
    const context = Taro.createCanvasContext('canvas', this)
    const _this = this;
    Taro.getImageInfo({
      src: 'https://6275-business-card-8687h-1301418170.tcb.qcloud.la/assets/ico_business_card_bg.png?sign=7953c9294cdf7a68d4dd508bb6d5f72b&t=1583943566',
    }).then((res1) => {
      context.drawImage(res1.path, 10, 10, 313, 194);
      Taro.getImageInfo({
        src: "https://cardapplication.oss-cn-chengdu.aliyuncs.com/picture/f5d2edf9-204a-4eb9-8c75-f643b9ee9d23wx7834b9fe3df7e260.o6zAJs4Isyce0yXyimX4btWbjcko.zUap8D6fA36n97685444eaa98aaf0dbba1eb1b6e29aa.jpeg",
      }).then((res2) => {
        context.drawImage(res2.path, 20, 20, 60, 60);
        const h = _this.fillTextWrap(context, '【润百颜玻尿酸】告别黄脸婆，一百这白丑', 20, 230, 190, 20);
        context.font = 'normal 11px ArialMT sans-serif';
        context.setFontSize(16);
        context.setFillStyle('#FF6066');
        context.fillText('￥66', 40, 290);
        context.font = 'normal 11px  PingFangSC-Regular sans-serif';
        context.setFontSize(12);
        context.setFillStyle('#FA2E9A');
        context.fillText('扫描小程序码查看', 245, 300);
        context.draw(false, () => {
          Taro.canvasToTempFilePath({
            canvasId: 'canvas',
            success: function (res) {
              // 获得图片临时路径
              _this.setState({
                imageTempPath: res.tempFilePath
              })
            }
          })
        });
      });
    });
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/12
   * @function: 保存s存图片
   */
  saveImage() {
    // 查看是否授权
    Taro.getSetting({
      complete() {
        console.log(444)
      }
    }).then(res => {
      if (res.authSetting['scope.writePhotosAlbum']) {
        Taro.saveImageToPhotosAlbum({
          filePath: this.state.imageTempPath
        }).then(res => {
          console.log(res)
        })
      } else {
        Taro.authorize({
          scope: 'scope.writePhotosAlbum',
        }).then(() => {
          Taro.saveImageToPhotosAlbum({
            filePath: this.state.imageTempPath
          }).then(res => {
            console.log(res)
          })
        })
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/3/12
   * @function: 文字换行
   */
  fillTextWrap(ctx, text, x, y, maxWidth, lineHeight) {
    // 设定默认最大宽度
    const systemInfo = Taro.getSystemInfoSync();
    const deciveWidth = systemInfo.screenWidth;

    maxWidth = maxWidth || deciveWidth;
    lineHeight = lineHeight || 20;
    // 校验参数
    if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
      return;
    }
    // 字符串分割为数组
    const arrText = text.split('');
    // 当前字符串及宽度
    let currentText = '';
    let currentWidth;

    ctx.font = 'normal 11px sans-serif';
    ctx.setFontSize(16);
    ctx.setFillStyle('#3A3A3A');
    ctx.setTextAlign('justify');
    for (let letter of arrText) {
      currentText += letter;
      currentWidth = ctx.measureText(currentText).width;
      if (currentWidth > maxWidth) {
        ctx.fillText(currentText, x, y);
        currentText = '';
        y += lineHeight;
      }
    }
    if (currentText) {
      ctx.fillText(currentText, x, y);
    }
  }

  render() {
    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}>
        <TopHeader title={'名片海报'}/>
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <View style={styleAssign([styles.uac])}>
            <canvas style="width: 335px; height: 434px;background:#fff;margin-top:20px;border-radius:4px;"
                    canvas-id="canvas"/>
          </View>
          <View style={styleAssign([styles.uf1, styles.uje])}>
            <BottomButon title={'保存名片海报后分享'} onClick={this.saveImage}/>
          </View>
        </View>
      </CustomSafeAreaView>);
  }
}

export default Auth;
