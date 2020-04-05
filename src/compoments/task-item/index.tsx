/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/17
 * @Description: 任务item
 */
import Taro, {PureComponent} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {styleAssign, transformNowTime, transformTime} from "../../utils/datatool";
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
  isTodayTask?: boolean;
}

interface State {
}

export default class TaskItem extends PureComponent<Props, State> {

  render() {
    let {itemData, finishCallback, deleteCallback, isTodayTask} = this.props;
    let myyear = new Date().getFullYear();
    let mymonth = new Date().getMonth() + 1;
    let myweekday = new Date().getDate();
    let myhour = new Date().getHours();
    let myminutes = new Date().getMinutes();
    let dateTime = new Date(itemData.date).getTime();

    if (mymonth < 10) {
      //@ts-ignore
      mymonth = '0' + mymonth;
    }
    if (myweekday < 10) {
      //@ts-ignore
      myweekday = '0' + myweekday;
    }

    let currentTime = new Date(`${myyear}-${mymonth}-${myweekday} ${myhour}:${myminutes}`).getTime();

    return (
      <View style={styleAssign([wRatio(100), styles.uac, styles.ujc, mt(10), mb(10)])}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/mine/task_detail?taskId=${itemData.id}&status=${itemData.status}`
              });
            }}>
        <View style={styleAssign([w(335), bgColor(commonStyles.whiteColor), radiusA(4)])}>
          <View style={styleAssign([w(335), styles.uac, styles.udr, styles.ujb,
            pl(16), pr(16), pt(20)])}>
            <Text style={styleAssign([fSize(16), color('#343434'), w(200)])}
                  className={'.textStyle'}>{itemData.theme}</Text>
            <View
              onClick={(e) => {
                e.stopPropagation();
                if (itemData.status !== 1) {
                  finishCallback(itemData.id);
                } else {
                  deleteCallback(itemData.id);
                }
              }}
              style={styleAssign([w(72), h(28), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc])}>
              <Text
                style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{`${itemData.status !== 1 ? '移至完成' : '删除任务'}`}</Text>
            </View>
          </View>
          <View
            style={styleAssign([wRatio(100), h(1), mt(16), bgColor(commonStyles.pageDefaultBackgroundColor)])}/>
          <View style={styleAssign([wRatio(100), h(40), styles.uac, styles.udr])}>
            <Text
              style={styleAssign([fSize(10), color(dateTime < currentTime ? 'red' : '#A6A6A6'), mt(4), ml(20)])}>{isTodayTask ? `今天 ${transformTime(itemData.date).split(' ')[1]}` : transformTime(itemData.date)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
