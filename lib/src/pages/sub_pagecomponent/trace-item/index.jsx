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
const datatool_1 = require("../../../utils/datatool");
const style_1 = require("../../../utils/style");
const global_1 = require("../../../const/global");
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
              <components_1.Image style={datatool_1.styleAssign([style_1.w(13), style_1.h(8), style_1.ml(6)])} src={showDetail ? require('../../../assets/ico_up.png') : require('../../../assets/ico_down.png')}/>
            </components_1.View>
          </components_1.View>
        </components_1.View>
        <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])}>
          {showDetail && item.behaviorTraceList.map((value, index) => {
            return <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100)])} key={index}>
                <components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.default.udr, style_1.default.uac, style_1.default.ujc])}>
                  <components_1.View style={datatool_1.styleAssign([style_1.w(335), style_1.pl(10), style_1.pr(10), style_1.default.udr, style_1.bgColor(style_1.commonStyles.whiteColor)])}>
                    <components_1.View style={datatool_1.styleAssign([style_1.default.uac])}>
                      <components_1.View style={datatool_1.styleAssign([style_1.w(6), style_1.h(6), style_1.radiusA(3), style_1.bgColor('#979797')])}/>
                      <components_1.View style={datatool_1.styleAssign([style_1.w(1), style_1.hRatio(100), style_1.bgColor('#979797')])}/>
                    </components_1.View>
                    <components_1.View style={datatool_1.styleAssign([style_1.ml(13)])}>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                        {datatool_1.transformTime(value.time)}
                      </components_1.Text>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#343434')])}>
                        {name}
                      </components_1.Text>
                      <components_1.Text style={datatool_1.styleAssign([style_1.fSize(14), style_1.color('#E2BB7B')])}>
                        {global_1.operateMap[value.behaviorType]}
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
