"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/16
 * @Description: 访问轨迹item
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const global_1 = require("../../const/global");
class TraceItem extends taro_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false
        };
    }
    render() {
        let { item, name } = this.props;
        let { showDetail } = this.state;
        return (<components_1.View style={style_1.wRatio(100)}>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(40), style_1.default.uac, style_1.default.ujc, style_1.mt(8)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.h(40), style_1.default.uac, style_1.default.ujb, style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor),
            style_1.pl(10), style_1.pr(10), style_1.radiusA(4)])} onClick={() => {
            this.setState({ showDetail: !this.state.showDetail });
        }}>
            <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
              {`${item.day} 访问轨迹`}
            </components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#979797')])}>
                展开
              </components_1.Text>
              <components_1.Image style={datatool_1.styleAssign([style_1.w(13), style_1.h(8), style_1.ml(6)])} src={showDetail ? require('../../assets/ico_up.png') : require('../../assets/ico_down.png')}/>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
          {showDetail && item.behaviorTraceList.map((value, index) => {
            global_1.operateMap['view_card'] = '查看名片';
            global_1.operateMap['share_card'] = '分享名片';
            global_1.operateMap['collect_card'] = '收藏名片';
            global_1.operateMap['put_in_address_book'] = '存入通讯录';
            global_1.operateMap['call_up'] = '打电话';
            global_1.operateMap['copy_wechat'] = '复制微信号';
            global_1.operateMap['copy_email'] = '复制邮箱号';
            global_1.operateMap['navigation_company'] = '导航到公司地址';
            global_1.operateMap['play_your_voice'] = '播放你的语音';
            global_1.operateMap['villager'] = '同乡';
            global_1.operateMap['schoolfellow'] = '校友';
            global_1.operateMap['play_company_video'] = '播放企业宣传视频';
            global_1.operateMap['view_your_photos'] = '浏览你的照片';
            global_1.operateMap['play_your_video'] = '播放你的视频';
            global_1.operateMap['view_goods'] = '浏览商品';
            global_1.operateMap['view_enterprise_website'] = '浏览企业官网';
            let desc = '';
            switch (value.behaviorType) {
                case 'view_card':
                    desc = `${name}在您的名片停留了${datatool_1.formartSecond(value.duration)},这是他第${value.time}次查看您的名片，看来TA对您挺感兴趣的，可以尝试联系沟通一下。`;
                    break;
                case 'share_card':
                    desc = `${name}分享您的名片${value.time}次，注意留意访客记录，建议主动联系。`;
                    break;
                case 'collect_card':
                    desc = `${name}收藏您的名⽚，您已经成为TA关注的⼈，建议主动联系，可以电话沟通⼀下。`;
                    break;
                case 'put_in_address_book':
                    desc = `${name}将您存⼊了⼿机通讯录，对您建⽴信任，保持联系持续跟进。`;
                    break;
                case 'call_up':
                    desc = `${name}想要打电话给您，建议主动联系，可以电话沟通⼀下。`;
                    break;
                case 'copy_wechat':
                    desc = `${name}复制您的微信号，记得留意微信好友添加请求。`;
                    break;
                case 'copy_email':
                    desc = `${name}复制您的邮箱号，记得留意邮件信息。`;
                    break;
                case 'navigation_company':
                    desc = `${name}导航您的公司地址，建议主动联系，主动约⻅⾯聊聊。`;
                    break;
                case 'play_your_voice':
                    desc = `${name}播放您的语⾳，看来对您挺感兴趣的。`;
                    break;
                case 'villager':
                    desc = `${name}认出和您是同乡，建议主动联系。`;
                    break;
                case 'schoolfellow':
                    desc = `${name}认出和您是校友，建议主动联系。`;
                    break;
                case 'play_company_video':
                    desc = `${name}认播放您的企业宣传视频，对您的企业感兴趣。`;
                    break;
                case 'view_your_photos':
                    desc = `${name}查看您的照⽚，对您挺感兴趣，建议主动联系。`;
                    break;
                case 'play_your_video':
                    desc = `${name}播放您的视频，对您挺感兴趣，建议主动联系。`;
                    break;
                case 'view_goods':
                    desc = `${name}在您的商品停留了${datatool_1.formartSecond(value.duration)}，第${value.time}次查看这个商品，对您的商品感兴趣。`;
                    break;
                case 'view_enterprise_website':
                    desc = '';
                    break;
                default:
                    break;
            }
            return <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])} key={index}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujc])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.pl(10), style_1.pr(10), style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                      <components_1.View style={datatool_1.styleAssign([style_1.w(6), style_1.h(6), style_1.radiusA(3), style_1.bgColor('#979797')])}/>
                      <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.hRatio(100), style_1.bgColor('#979797')])}/>
                    </components_1.View>
                    <components_1.View style={datatool_1.styleAssign([style_1.ml(13)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                        {datatool_1.transformTime(value.createTime)}
                      </components_1.Text>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                        {desc}
                      </components_1.Text>
                    </components_1.View>
                  </components_1.View>
                </components_1.View>
              </components_1.View>;
        })}
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = TraceItem;
//# sourceMappingURL=index.jsx.map