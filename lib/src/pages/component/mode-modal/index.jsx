"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2020/2/9
 * @Description: 选择筛选模式
 */
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const index_1 = require("../../../compoments/touchable-button/index");
const index_2 = require("../../../compoments/safe-area-view/index");
const index_3 = require("../../../compoments/navigation_bar/index");
const global_1 = require("../../../const/global");
const index_4 = require("../../../compoments/sanjiao/index");
class ModeModal extends taro_1.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '2020-01-01',
            endTime: datatool_1.getToday(),
            visitTime: '全部'
        };
    }
    render() {
        let { cancelCallback, confirmCallback, shaiXuanCallback, shaiXuanMode, totalPerson } = this.props;
        return (<index_2.default customStyle={datatool_1.styleAssign([{
                position: 'fixed',
                zIndex: Infinity
            }, style_1.absT(0), style_1.absR(0), style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.transparent)])}>
        <index_1.default customStyle={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.default.upa, style_1.absT(0), style_1.absR(0),])}>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(60), style_1.bgColor(style_1.commonStyles.whiteColor)])}/>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1, style_1.bgColor(style_1.commonStyles.blackColor), style_1.op(0.5)])}/>
        </index_1.default>
        <index_3.default style={datatool_1.styleAssign([style_1.bgColor(style_1.commonStyles.whiteColor)])}>
          <components_1.View style={datatool_1.styleAssign([{ width: '65%' }, { marginLeft: '2.5%' }, style_1.h(31), style_1.op(0.7), style_1.bgColor('#F5F5F5'),
            style_1.radiusA(26), style_1.default.uac, style_1.default.udr])}>
            <components_1.Image style={datatool_1.styleAssign([style_1.w(21), style_1.h(21), style_1.ml(16)])} src={require('../../../assets/ico_search.png')}/>
            <components_1.Input type='text' placeholder='搜索客户姓名' style={datatool_1.styleAssign([style_1.ml(16), style_1.fSize(14)])}/>
          </components_1.View>
        </index_3.default>
        <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])}>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(36), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.default.udr, style_1.default.uac, style_1.default.ujb,
            style_1.pl(20), style_1.pr(20)])}>
            <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])}>{`共${totalPerson}位客户`}</components_1.Text>
            <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#E2BB7B'), style_1.fSize(14)])}>{shaiXuanMode}</components_1.Text>
                <index_4.default orientation={global_1.Orientation.up} style={datatool_1.styleAssign([style_1.ml(3)])}/>
              </components_1.View>
              <components_1.View style={datatool_1.styleAssign([style_1.default.uac, style_1.default.udr, style_1.ml(24)])}>
                <components_1.Text style={datatool_1.styleAssign([style_1.color('#727272'), style_1.fSize(14)])} onClick={shaiXuanCallback}>筛选</components_1.Text>
                <components_1.Image style={datatool_1.styleAssign([style_1.w(14), style_1.h(14), style_1.ml(3)])} src={require('../../../assets/ico_shaixuan.png')}/>
              </components_1.View>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(1), style_1.bgColor(style_1.commonStyles.pageDefaultBackgroundColor)])}/>
          
          <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(88), style_1.bgColor(style_1.commonStyles.whiteColor)])}>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            confirmCallback('最后访问时间');
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20)])}>最后访问时间</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            confirmCallback('最后跟进时间');
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20)])}>最后跟进时间</components_1.Text>
            </components_1.View>
            <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.h(44), style_1.default.ujc, style_1.bgColor(style_1.commonStyles.whiteColor)])} onClick={() => {
            confirmCallback('最后转入时间');
        }}>
              <components_1.Text style={datatool_1.styleAssign([style_1.color('#0C0C0C'), style_1.fSize(14), style_1.ml(20)])}>最后转入时间</components_1.Text>
            </components_1.View>
          </components_1.View>
          <components_1.View style={datatool_1.styleAssign([style_1.default.uf1])} onClick={() => {
            cancelCallback();
            console.log('点击');
        }}/>
        </components_1.View>
      </index_2.default>);
    }
}
exports.default = ModeModal;
//# sourceMappingURL=index.jsx.map