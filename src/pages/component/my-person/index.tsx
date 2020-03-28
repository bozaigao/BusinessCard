/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/7
 * @function: 我的人脉
 */
import Taro, {Component} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {styleAssign} from "../../../utils/datatool";
import styles, {
  absL,
  bgColor,
  color,
  commonStyles,
  fSize,
  h, mb,
  ml,
  mr,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import {cloudBaseUrl} from "../../../api/httpurl";
import RenMaiItem from "../renmai-item/index";


interface Props {
  chooseCallback: any;
  indexChangeCallback: any;
  hasSelected: boolean;
  recommendList: any[];
  performCard: any;
  currentIndex: number;
  collectCard: any;
}

interface State {
}

export default class MyPerson extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    let {chooseCallback, hasSelected, recommendList, indexChangeCallback, performCard, currentIndex, collectCard} = this.props;
    let noticeText = '';

    if (currentIndex === 1) {
      noticeText = '完善你的名片信息，发现更多志趣相投的朋友';
    } else if (currentIndex === 2) {
      noticeText = '完善你的名片信息，发现更多同乡，促进交流';
    } else if (currentIndex === 3) {
      noticeText = '完善你的名片信息，发现更多校友，促进交流';
    }

    return (
      <View style={styleAssign([wRatio(100)])}>
        <View style={styleAssign([styles.uac, styles.udr, styles.ujb, ml(20), mr(20), mt(32)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View style={styleAssign([w(3), h(22), bgColor('#E2BB7B')])}/>
            <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme), ml(8)])}>人脉机遇</Text>
          </View>
          {
            hasSelected && <View style={styleAssign([styles.uac, styles.udr])}
                                 onClick={() => {
                                   Taro.navigateTo({
                                     url: `/pages/businesscard/choose_renmai_tag`
                                   });
                                 }
                                 }>
              <Text style={styleAssign([fSize(12), color('#979797')])}>重新选择</Text>
              <Image style={styleAssign([w(7), h(12), ml(12)])} src={require('../../../assets/ico_next.png')}/>
            </View>
          }
        </View>
        {
          !hasSelected &&
          <View style={styleAssign([wRatio(100), styles.uac, mt(20)])}>
            <View style={styleAssign([w(335), h(360), styles.uac, bgColor(commonStyles.whiteColor)])}>
              <Image style={styleAssign([w(335), h(204)])} src={`${cloudBaseUrl}ico_renmai_bg.png`}/>
              <Text style={styleAssign([fSize(14), color('#343434'), mt(27)])}>您可以选择您期望的人脉，我们将为您引荐</Text>
              <Text style={styleAssign([fSize(12), color('#979797'), mt(13)])}>名片完善度越高，获得人脉数据越丰富，精准</Text>
              <View
                style={styleAssign([w(303), h(44), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc, mt(20)])}
                onClick={() => {
                  chooseCallback();
                }}>
                <Text style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>立即选择</Text>
              </View>
            </View>
          </View>
        }
        {
          hasSelected && <View
            style={styleAssign([wRatio(100), h(50), styles.udr, styles.uac, styles.ujb, bgColor(commonStyles.whiteColor),
              pl(20), pr(20), mt(16)])}>
            {
              ['推荐', '兴趣', '同乡', '校友'].map((value, index) => {
                return <View key={index} style={styleAssign([styles.uac, ml(index !== 0 ? 62 : 0)])}
                             onClick={() => {
                               indexChangeCallback(index);
                             }}>
                  <Text
                    style={styleAssign([fSize(15), color(currentIndex === index ? '#E2BB7B' : '#0C0C0C')])}>{value}</Text>
                  <View
                    style={styleAssign([w(30), h(1), bgColor(currentIndex === index ? '#E2BB7B' : commonStyles.transparent), mt(8)])}/>
                </View>;
              })
            }
          </View>
        }
        {
          hasSelected && recommendList.map((value, index) => {
            console.log(value);
            return <RenMaiItem key={index} item={value} collectCard={collectCard}/>;
          })
        }
        {
          hasSelected && currentIndex === 0 &&
          <View style={styleAssign([wRatio(100), h(226), bgColor(commonStyles.whiteColor), styles.uac, styles.ujc])}>
            <View style={styleAssign([styles.uac])}>
              <View style={styleAssign([styles.uac, styles.ujc, styles.udr, w(160)])}>
                <Image style={styleAssign([w(46), h(46)])} src={`${cloudBaseUrl}ico_person_mohu_1.png`}/>
                <Image style={styleAssign([w(46), h(46), ml(40)])} src={`${cloudBaseUrl}ico_person_mohu_3.png`}/>
                <Image style={styleAssign([w(64), h(64), styles.upa, absL(50)])}
                       src={`${cloudBaseUrl}ico_person_mohu_2.png`}/>
              </View>
              <Text style={styleAssign([fSize(14), color('#979797'), mt(13)])}>
                未开通拓展人脉功能\n暂不能解锁更多人脉
              </Text>
              <View
                style={styleAssign([w(202), h(44), radiusA(4), styles.uac, styles.ujc, bgColor(commonStyles.colorTheme),
                  mt(19)])}>
                <Text style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>
                  1元立即试用
                </Text>
              </View>
            </View>
          </View>
        }
        {
          hasSelected && recommendList.length === 0 &&
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, bgColor(commonStyles.whiteColor)])}>
            <View
              style={styleAssign([styles.uf1, styles.uac, styles.ujc])}>
              <View style={styleAssign([styles.uac])}>
                <Image style={styleAssign([w(78), h(69), mt(47)])} src={require('../../../assets/ico_no_data.png')}/>
                <Text style={styleAssign([fSize(14), color('#343434'), mt(31)])}>{noticeText}</Text>
                <View
                  style={styleAssign([w(303), h(44), bgColor(commonStyles.colorTheme), radiusA(4), styles.uac, styles.ujc, mt(24), mb(29)])}
                  onClick={performCard}>
                  <Text style={styleAssign([fSize(16), color(commonStyles.whiteColor)])}>立即完善名片</Text>
                </View>
              </View>
            </View>
          </View>

        }

      </View>
    );
  }
}
