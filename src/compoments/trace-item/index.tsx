/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 访问轨迹item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {formartSecond, styleAssign, transformTime} from "../../utils/datatool";
import styles, {
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {BehaviorTrace, operateMap} from "../../const/global";


interface Props {
  item: { day: string; behaviorTraceList: BehaviorTrace[] };
  name: string;
}

interface State {
  showDetail: boolean;
}

export default class TraceItem extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      showDetail: false
    }
  }

  render() {
    let {item, name} = this.props;
    let {showDetail} = this.state;

    return (
      <View style={wRatio(100)}>
        <View style={styleAssign([wRatio(100), h(40), styles.uac, styles.ujc, mt(8)])}>
          <View
            style={styleAssign([w(335), h(40), styles.uac, styles.ujb, styles.udr, bgColor(commonStyles.whiteColor),
              pl(10), pr(10), radiusA(4)])}
            onClick={() => {
              this.setState({showDetail: !this.state.showDetail});
            }}>
            <Text style={styleAssign([fSize(14), color('#343434')])}>
              {`${item.day} 访问轨迹`}
            </Text>
            <View style={styleAssign([styles.uac, styles.udr])}>
              <Text style={styleAssign([fSize(14), color('#979797')])}>
                展开
              </Text>
              <Image style={styleAssign([w(13), h(8), ml(6)])}
                     src={showDetail ? require('../../assets/ico_up.png') : require('../../assets/ico_down.png')}/>
            </View>
          </View>
        </View>
        <View style={styleAssign([wRatio(100)])}>
          {
            showDetail && item.behaviorTraceList.map((value: BehaviorTrace, index) => {
              operateMap['view_card'] = '查看名片';
              operateMap['share_card'] = '分享名片';
              operateMap['collect_card'] = '收藏名片';
              operateMap['put_in_address_book'] = '存入通讯录';
              operateMap['call_up'] = '打电话';
              operateMap['copy_wechat'] = '复制微信号';
              operateMap['copy_email'] = '复制邮箱号';
              operateMap['navigation_company'] = '导航到公司地址';
              operateMap['play_your_voice'] = '播放你的语音';
              operateMap['villager'] = '同乡';
              operateMap['schoolfellow'] = '校友';
              operateMap['play_company_video'] = '播放企业宣传视频';
              operateMap['view_your_photos'] = '浏览你的照片';
              operateMap['play_your_video'] = '播放你的视频';
              operateMap['view_goods'] = '浏览商品';
              operateMap['view_enterprise_website'] = '浏览企业官网';
              let desc = '';

              switch (value.behaviorType) {
                case 'view_card':
                  desc = `${name}在您的名片停留了${formartSecond(value.duration)},这是他第${value.time}次查看您的名片，看来TA对您挺感兴趣的，可以尝试练习沟通一下。`;
                  break;
                case 'share_card':
                  desc = `${name}分享您的名片${value.time}次，注意留意访客记录，建议主动联系。`;
                  break;
                case 'collect_card':
                  desc = `${name}收藏你的名⽚，你已经成为T;关注的⼈，建议主动联系，可以电话沟通⼀下。`;
                  break;
                case 'put_in_address_book':
                  desc = `${name}将你存⼊了⼿机通讯录，对你建⽴信任，保持联系持续跟进。`;
                  break;
                case 'call_up':
                  desc = `${name}想要打电话给你，建议主动联系，可以电话沟通⼀下。`;
                  break;
                case 'copy_wechat':
                  desc = `${name}复制你的微信号，记得留意微信好友添加请求。`;
                  break;
                case 'copy_email':
                  desc = `${name}复制你的邮箱号，记得留意邮件信息。`;
                  break;
                case 'navigation_company':
                  desc = `${name}导航你的公司地址，建议主动联系，主动约⻅⾯聊聊。`;
                  break;
                case 'play_your_voice':
                  desc = `${name}播放你的语⾳，看来对你挺感兴趣的。`;
                  break;
                case 'villager':
                  desc = `${name}认出和你是同乡，建议主动联系。`;
                  break;
                case 'schoolfellow':
                  desc = `${name}认出和你是校友，建议主动联系。`;
                  break;
                case 'play_company_video':
                  desc = `${name}认播放你的企业宣传视频，对你的企业感兴趣。`;
                  break;
                case 'view_your_photos':
                  desc = `${name}查看你的照⽚，对你挺感兴趣，建议主动联系。`;
                  break;
                case 'play_your_video':
                  desc = `${name}播放你的视频，对你挺感兴趣，建议主动联系。`;
                  break;
                case 'view_goods':
                  desc = `${name}在你的商品停留了${formartSecond(value.duration)}，第${value.time}次查看这个商品，对你的商品感兴趣。`;
                  break;
                case 'view_enterprise_website':
                  desc = '';
                  break;
                default:
                  break;
              }

              return <View style={styleAssign([wRatio(100)])} key={index}>
                <View style={styleAssign([wRatio(100), styles.udr, styles.uac, styles.ujc])}>
                  <View style={styleAssign([w(335), pl(10), pr(10), styles.udr, bgColor(commonStyles.whiteColor)])}>
                    <View style={styleAssign([styles.uac])}>
                      <View style={styleAssign([w(6), h(6), radiusA(3), bgColor('#979797')])}/>
                      <View style={styleAssign([w(1), hRatio(100), bgColor('#979797')])}/>
                    </View>
                    <View style={styleAssign([ml(13)])}>
                      <Text style={styleAssign([fSize(14), color('#343434')])}>
                        {transformTime(value.time)}
                      </Text>
                      <Text style={styleAssign([fSize(14), color('#343434')])}>
                        {desc}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>;
            })
          }
        </View>
      </View>
    );
  }
}
