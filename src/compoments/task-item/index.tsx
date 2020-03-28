/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {styleAssign, transformTime} from "../../utils/datatool";
import styles, {
  bgColor,
  color,
  commonStyles,
  fSize,
  h,
  mb,
  ml,
  mt,
  pl,
  pr,
  pt,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import TouchableButton from "../touchable-button/index";
import {TaskModel} from "../../const/global";
import './index.scss';


interface Props {
  itemData: TaskModel;
  finishCallback?: any;
  deleteCallback?: any;
}

interface State {
}

export default class TaskItem extends PureComponent<Props, State> {

  render() {
    let {itemData, finishCallback, deleteCallback} = this.props;

    return (
      <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(10), mb(10)])}>
        <View style={styleAssign([w(335), bgColor(commonStyles.whiteColor), radiusA(4)])}>
          <View style={styleAssign([w(335), styles.uac, styles.udr, styles.ujb,
            pl(16), pr(16), pt(20)])}>
            <Text style={styleAssign([fSize(16), color('#343434'), w(200)])}
                  className={'.textStyle'}>{itemData.theme}</Text>
            <TouchableButton
              onClick={() => {
                if (itemData.status !== 1) {
                  finishCallback(itemData.id);
                } else {
                  deleteCallback(itemData.id);
                }
              }}
              customStyle={styleAssign([w(72), h(28), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc])}>
              <Text
                style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{`${itemData.status !== 1 ? '移至完成' : '删除任务'}`}</Text>
            </TouchableButton>
          </View>
          <View
            style={styleAssign([wRatio(100), h(1), mt(16), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View style={styleAssign([wRatio(100), h(40), styles.uac, styles.udr])}>
            <Text
              style={styleAssign([fSize(10), color('#A6A6A6'), mt(4), ml(20)])}>{transformTime(itemData.date)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
