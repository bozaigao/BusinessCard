"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @function: 我的企业
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
class MyBusiness extends taro_1.PureComponent {
    render() {
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(20), style_1.mt(32)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.w(3), style_1.h(22), style_1.bgColor('#E2BB7B')])}/>
          <components_1.Text style={datatool_1.styleAssign([style_1.fSize(16), style_1.color(style_1.commonStyles.colorTheme), style_1.ml(8)])}>我的企业</components_1.Text>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([{ width: '95%' }, { marginLeft: '2.5%' }, style_1.mt(16), style_1.h(270), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(76), style_1.default.udr, style_1.default.uac, style_1.default.ujb, style_1.pl(16), style_1.pr(16)])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(40), style_1.h(40), style_1.radiusA(4)])} src={require('../../../assets/ico_default.png')}/>
            <components_1.View style={datatool_1.styleAssign([style_1.w(72), style_1.h(28), style_1.radiusA(4), style_1.default.uac, style_1.default.ujc,
            style_1.bo(1), style_1.bdColor(style_1.commonStyles.colorTheme), { borderStyle: 'solid' }])}>
              <components_1.Text style={datatool_1.styleAssign([style_1.fSize(12), style_1.color(style_1.commonStyles.colorTheme)])}>进入官网</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.default.uac, style_1.default.ujc])}>
            <components_1.Video style={datatool_1.styleAssign([style_1.wRatio(90), style_1.hRatio(90), style_1.bgColor(style_1.commonStyles.whiteColor)])} src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400' controls={true} autoplay={false} poster='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3466612495,3967902081&fm=26&gp=0.jpg' initialTime={0} id='video' loop={false} muted={false}/>
          </components_1.View>
        </components_1.View>
      </components_1.View>);
    }
}
exports.default = MyBusiness;
//# sourceMappingURL=index.jsx.map