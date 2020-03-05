import '@tarojs/async-await'
import Taro, {Component, Config} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'
import Index from './pages/businesscard'
import configStore from './store'
import './app.scss'
import {Global} from "./const/global";

declare let global: Global;
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {

  constructor(props) {
    super(props);

    //获取胶囊按钮位置信息为后面自定义导航条做准备
    global.menuButton = Taro.getMenuButtonBoundingClientRect();
    global.debug = false;
    Taro.getSystemInfo({
      success: res => {
        global = Object.assign(global, res, {debug: false});
        if (res.model && res.model.includes('iPhone X')) {
          global.iphoneX = true;
        } else if (res.platform === 'ios' && res.screenHeight === 812 && res.screenWidth === 375 ||
          res.screenHeight === 896 && res.screenWidth === 414) {
          global.iphoneX = true;
        } else {
          global.iphoneX = false;
        }
      }

    }).then(res => console.log(res));
    //生产环境屏蔽所有log信息优化性能
    if (!global.debug) {
      console.info = () => {
      };
      console.log = () => {
      };
      console.warn = () => {
      };
      console.debug = () => {
      };
      console.error = () => {
      };
    }
    console.log('设备信息', global);
    console.log('胶囊信息', global.menuButton);
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      // "pages/renmai_taocan_detail",
      //主界面
      "pages/businesscard",
      "pages/radarscan",
      "pages/customer",
      "pages/mine",
    ],
    subPackages: [
      {
        //名片模块子页面
        root: 'pages/businesscard',
        pages: [
          "add_businesscard",
          "qiehuan_businesscard",
          "mingpian_haibao",
          "more_goods",
          "mingpianjia",
          "my_collect",
          "other_businesscard"
        ]
      },
      //雷达模块子界面
      {
        root: 'pages/radarscan',
        pages: [
          "radar_detail"
        ]
      },
      //客户模块子页面
      {
        root: 'pages/customer',
        pages: [
          "customer_detail",
          "customer_ziliao",
          "add_customer",
          "customer_remark",
          "add_genjin",
        ]
      },
      //我的模块子页面
      {
        root: 'pages/mine',
        pages: [
          "personal_info",
          "add_task",
          "tool_box",
          "haibao",
          "goods_detail",
          "goods_manage",
          "add_goods",
          "task_center",
          "contact_way",
          "setting_page",
          "feedback",
          "my_tags",
          "company_info",
          "my_edu",
          "self_intro",
          "audio_recorder",
          "industry_list",
          "perform_info",
          "my_photo",
          "my_video",
          "fenxiao_center",
          "data_center",
          "my_customer",
          "tixian",
          "tixian_recorder",
          "tixian_page",
          "about_us",
          "help",
          "tequan",
          "choose_customer",
          "radar_gongneng",
          "open_message_notice",
          "update_card_style",
          "get_renmai",
          "open_shop",
          "view_card",
          "how_share_card",
          "how_perform_card",
          "introduce",
        ]
      }
    ],
    permission: {
      "scope.userLocation": {
        "desc": "获取你的详细位置信息"
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      pageOrientation: 'portrait',
      navigationStyle: 'custom'
    },
    tabBar: {
      color: "#9b9b9b",
      selectedColor: '#313137',
      backgroundColor: '#FFFFFF',
      borderStyle: 'white',
      list: [{
        pagePath: "pages/businesscard",
        iconPath: "./assets/ico_tabar_businesscard_normal.png",
        selectedIconPath: "./assets/ico_tabar_businesscard_pressed.png",
        text: "名片",
      }, {
        pagePath: "pages/radarscan",
        iconPath: "./assets/ico_tabar_radarscan_normal.png",
        selectedIconPath: "./assets/ico_tabar_radarscan_pressed.png",
        text: "雷达",
      }, {
        pagePath: "pages/customer",
        iconPath: "./assets/ico_tabar_customer_normal.png",
        selectedIconPath: "./assets/ico_tabar_customer_pressed.png",
        text: "客户",
      }, {
        pagePath: "pages/mine",
        iconPath: "./assets/ico_tabar_mine_normal.png",
        selectedIconPath: "./assets/ico_tabar_mine_pressed.png",
        text: "我的",
      }]
    }
  }

  componentWillMount() {

  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro
  .render(
    <App/>,
    document
      .getElementById(
        'app'
      ));
