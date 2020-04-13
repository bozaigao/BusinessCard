/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 客户item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {parseData, styleAssign, transformTime} from "../../../utils/datatool";
import styles, {
  absB,
  absR,
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  hRatio,
  ml,
  mr,
  mt, padding,
  radiusA,
  w,
  wRatio
} from "../../../utils/style";
import TouchableButton from "../../../compoments/touchable-button/index";
import {cloudBaseUrl} from "../../../api/httpurl";
import SingleLineText from "../../../compoments/singleline-text";


interface Props {
  onClick: any;
  genJinCallback: any;
  viewCardCallback: any;
  customer: any;
  mode: string;
}

interface State {
}

export default class CustomItem extends PureComponent<Props, State> {

  render() {
    let {onClick, customer, genJinCallback, mode, viewCardCallback} = this.props;
    let time;

    if (mode === '最后访问') {
      time = transformTime(customer.recentDate);
    } else if (mode === '最后跟进') {
      time = transformTime(customer.followUpDate);
    } else if (mode === '最后转入') {
      time = transformTime(customer.createTime);
    }

    return (
      <TouchableButton
        onClick={onClick}
        customStyle={styleAssign([radiusA(4), {width: '95%'}, {marginLeft: '2.5%'}, bgColor(commonStyles.whiteColor), mt(14)])}>
        <View style={styleAssign([styles.uac, styles.udr, styles.ujb])}>
          <View style={styleAssign([styles.uac, styles.udr, mt(20)])}>
            <View style={styleAssign([w(60), h(60), ml(16)])}>
              <Image style={styleAssign([w(60), h(60), radiusA(30)])}
                     src={customer.avatar && customer.avatar !== "undefined" ? customer.avatar : `${cloudBaseUrl}ico_default.png`}/>
              <Image style={styleAssign([w(16), h(16), styles.upa, absB(0), absR(0)])}
                     src={customer.sex === 1 ? `${cloudBaseUrl}ico_nan.png` : `${cloudBaseUrl}ico_nv.png`}/>
            </View>
            <View style={styleAssign([ml(16)])}>
              <SingleLineText text={customer.name} style={styleAssign([fSize(16), color('#343434')])}/>
              <Text style={styleAssign([fSize(12), color('#979797'), mt(4)])}>{customer.position}</Text>
              <Text style={styleAssign([fSize(12), color('#979797'), mt(3)])}>{`来自${customer.source}`}</Text>
            </View>
          </View>
          <View style={styleAssign([bgColor(commonStyles.colorTheme), radiusA(4), styles.uac, styles.ujc,
            w(72), h(28), radiusA(4), mr(16)])}
                onClick={(e) => {
                  e.stopPropagation();
                  genJinCallback(customer);
                  console.log('添加跟进');
                }}>
            <Text style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>添加跟进</Text>
          </View>
        </View>
        <View style={styleAssign([wRatio(100), styles.udr, mt(8), styles.uWrap])}>
          {
            parseData(customer.label).map((value, index) => {
              return (<View
                key={index}
                style={styleAssign([styles.uac, styles.ujc, padding([6, 6, 6, 6]), radiusA(14)])}>
                <View style={styleAssign([styles.uac, styles.ujc, radiusA(14),
                  padding([6, 6, 6, 6]), bgColor('#E7E7E7')])}>
                  <Text style={styleAssign([fSize(12), color('#343434')])}>{value}</Text>
                </View>
              </View>);
            })
          }
        </View>
        <View style={styleAssign([wRatio(100), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), mt(15)])}/>
        <View style={styleAssign([styles.uf1, styles.ujb, styles.udr, h(40)])}>
          <View style={styleAssign([hRatio(100), styles.uac, styles.ujc])}>
            <Text
              style={styleAssign([color('#979797'), fSize(12), ml(16)])}>{`${mode} ${time}`}</Text>
          </View>
          <View style={styleAssign([styles.uac, styles.udr])}>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc, styles.utxdu])}
                  onClick={(e) => {
                    e.stopPropagation();
                    viewCardCallback();
                  }}>
              <Text style={styleAssign([color(commonStyles.colorTheme), fSize(14)])}>查看名片</Text>
            </View>
            <View style={styleAssign([w(80), hRatio(100), styles.uac, styles.ujc])}
                  onClick={(e) => {
                    e.stopPropagation();
                    Taro.makePhoneCall({
                      phoneNumber: customer.phone
                    })
                  }}>
              <Text style={styleAssign([color(commonStyles.colorTheme), fSize(14), styles.utxdu])}>拨打电话</Text>
            </View>
          </View>
        </View>
      </TouchableButton>
    );
  }
}
