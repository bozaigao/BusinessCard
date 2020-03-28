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
    global.debug = true;
    Taro.getSystemInfo({
      success: res => {
        global = Object.assign(global, res, {debug: true});
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
      //主界面
      "pages/businesscard",
      "pages/radar",
      "pages/customer",
      "pages/mine",
    ],
    subPackages: [
      {
        //名片模块子页面
        root: 'businesscard',
        pages: [
          "pages/add_businesscard",
          "pages/qiehuan_businesscard",
          "pages/more_goods",
          "pages/mingpianjia",
          "pages/my_collect",
          "pages/other_businesscard",
          "pages/ming_pian_ma",
          "pages/choose_renmai_tag",
          "pages/choose_industry_tag",
          "pages/mingpian_haibao"
        ]
      },
      //雷达模块子界面
      {
        root: 'radar',
        pages: [
          "pages/radar_detail"
        ]
      },
      //客户模块子页面
      {
        root: 'customer',
        pages: [
          "pages/customer_detail",
          "pages/customer_ziliao",
          "pages/add_customer",
          "pages/customer_remark",
          "pages/add_genjin",
        ]
      },
      //我的模块子页面pages/
      {
        root: 'mine',
        pages: [
          "pages/tool_box",
          "pages/haibao",
          "pages/goods_detail",
          "pages/goods_manage",
          "pages/add_goods",
          "pages/contact_way",
          "pages/setting_page",
          "pages/feedback",
          "pages/my_tags",
          "pages/company_info",
          "pages/my_edu",
          "pages/self_intro",
          "pages/audio_recorder",
          "pages/industry_list",
          "pages/my_photo",
          "pages/my_video",
          "pages/fenxiao_center",
          "pages/data_center",
          "pages/my_customer",
          "pages/tixian",
          "pages/tixian_recorder",
          "pages/tixian_page",
          "pages/about_us",
          "pages/help",
          "pages/tequan",
          "pages/choose_customer",
          "pages/radar_gongneng",
          "pages/open_message_notice",
          "pages/update_card_style",
          "pages/get_renmai",
          "pages/open_shop",
          "pages/view_card",
          "pages/how_share_card",
          "pages/how_perform_card",
          "pages/introduce",
          "pages/renmai_taocan_detail",
          "pages/my_home",
          "pages/share_goods",
          "pages/personal_info",
          "pages/mingpian_style",
          "pages/perform_info",
          "pages/add_task",
          "pages/task_center",
        ]
      }
    ],
    permission: {
      "scope.userLocation": {
        "desc": "获取你的详细位置信息"
      },
      "scope.record": {
        "desc": "获取你的个人录音"
      },
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
        pagePath: "pages/radar",
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
