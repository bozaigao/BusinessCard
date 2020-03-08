// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt';
    [key: string]: any;
  }
}

//global全局数据声明
export interface Global {
  //是否为开发环境
  debug: boolean;
  console: any;
  /*****设备相关信息*******/
  iphoneX: boolean;
  SDKVersion: any;
  brand: any;
  fontSizeSetting: number;
  language: any;
  model: any;
  pixelRatio: number;
  platform: string;
  screenHeight: number;
  screenWidth: number;
  statusBarHeight: number;
  system: string;
  version: any;
  windowHeight: number;
  safeArea: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  },
  menuButton: MenuButton;
}


export interface MenuButton {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}

//用户基本信息
export interface User {
  //头像
  avatar: string;
  //生日
  birthday: string;
  //名片竞争力
  cardCompetitiveness: string;
  // 城市
  city: string;
  //公司
  company: string;
  //创建时间
  createTime: string;
  //录音时长
  voiceDuration:number;
  //详细地址
  detailAddress: string;
  //教育经历-学历
  educationBackground: string;
  //邮箱
  email: string;
  //企业logo地址
  enterpriseLogo: string;
  //企业名称
  enterpriseName: string;
  //企业视频地址
  enterpriseVideo: string;
  //企业官网地址
  enterpriseWebsite: string;
  //用户的商品列表
  goodsList: Goods[],
  //名片引导语
  guideLanguage: string;
  //家乡城市
  hometownCity: string;
  //家乡省份
  hometownProvince: string;
  //用户id
  id: number;
  //行业
  industry: string;
  villagerGreeting: string;
  schoolfellowGreeting: string;
  //标签列表(json数组)
  labelArray: string[];
  latitude: number;
  longitude: number;
  //登录时间
  loginTime: string;
  //真实姓名
  name: string;
  //昵称
  nickname: string;
  //微信授权的openid
  openId: string;
  //手机号
  phone: string;
  //我的照片(json数组)
  photoUrl: string;
  //职位
  position: string;
  //教育经历-专业
  profession: string;
  //省份
  province: string;
  //是否开启雷达提醒 1 开启 0 关闭
  radarRemind: number;
  //教育经历-学校
  school: string;
  //教育经历-在校时间-结束
  schoolTimeEnd: string;
  //教育经历-在校时间-开始
  schoolTimeStart: string;
  //自我描述
  selfDescription: string;
  //性别 0 未知 1 男 2 女
  sex: number;
  //名片上是否显示邮箱 1 显示 0 不显示
  showEmail: number;
  //是否在名片上显示手机号 1 显示 0 不显示
  showPhone: number;
  //令牌
  token: string;
  //更新时间
  updateTime: string;
  //我的视频
  videoUrl: string;
  //我的语音
  voiceUrl: string;
  //微信账号
  wechat: string;
  //微信二维码地址
  wechatUrl: string;
}

//商品
export interface Goods {
  //轮播图地址(json数组) ,
  carouselUrl: string;
  //创建时间
  createTime: string;
  //详情图片URL(json数组)
  detailUrl: string;
  //商品id
  id: number;
  //商品简介
  introduction: string;
  //商品名称
  name: string;
  //商品价格
  price: number;
  //是否置顶(在首页显示) 1 置顶 0 取消置顶
  showHomepage: number;
  //商品状态 -1 删除 0 下架 1 上架
  status: number;
  //更新时间
  updateTime: string;
  //商品所属用户id
  userId: number;
}


export enum Enum {
  TOKEN = 'token'
}

export interface IndustryModel {
  name: string;
  children: { name: string; }[];
}

export interface TaskModel {
  createTime: string;
  date: string;
  id: number;
  remark: string;
  status: number;
  theme: string;
  updateTime: string;
  userId: number;
  userIds: string;
  userList: []
}


export interface CustomerModel {
  avatar: string,
  city: string,
  company: string,
  detailAddress: string,
  id: number,
  intentionGrade: string,
  label: string,
  name: string,
  phone: string,
  position: string,
  province: string,
  recentDate: string,
  sex: number,
  source: string,
  type: number,
  userId: number
}

export interface CustomerDetailModel {
  aboutUrl: string;
  avatar: string;
  birthday: string;
  city: string;
  company: string;
  createTime: string;
  customerUserId: number;
  detailAddress: string;
  email: string;
  id: number;
  industry: string;
  intentionGrade: string;
  label: string;
  name: string;
  phone: string;
  position: string;
  province: string;
  remark: string;
  sex: number;
  type: number;
  updateTime: string;
  userId: number;
  wechat: string;
}

export interface FlowUpListModel {
  createTime: string;
  customerTbId: number;
  customerUserId: number;
  followUpContent: string;
  id: number;
  userId: number;
}


export interface CollectItemModel {
  avatar: string;
  collectTime: string;
  company: string;
  name: string;
  position: string;
  userId: number;
}

export interface VisitorRecordModel {
  cardCount: number;
  companyCount: number;
  createTime: string;
  goodsCount: number;
  id: number;
  lastVisitTime: string;
  userId: number;
  visitCount: number;
  visitor: Visitor;
  visitorUserId: number;
}

export interface Visitor {
  avatar: string;
  name: string;
  phone: string;
  sex: number;
  source: string;
  userId: number;
  wechat: string;
}

//雷达
export interface RadarModel {
  attributes: string;
  behaviorTraceUser: BehaviorTraceUser;
  behaviorType: string;
  createTime: string;
  duration: number;
  goodsId: number;
  id: number;
  lastVisitTime: string;
  time: number;
  traceUserId: number;
  userId: number;
}

export interface BehaviorTraceUser {
  avatar: string;
  city: string;
  company: string;
  detailAddress: string;
  lastVisitTime: string;
  name: string;
  phone: string;
  position: string;
  province: string;
  sex: number;
  source: string;
  type: number;
  userId: number;
  wechat: string;
}

export interface SettlementStats {
  date: string;
  totalIncome: number;
  totalSale: number;
}

export interface CustomerRecord {
  avatar: string;
  bindTime: string;
  customerUserId: number;
  id: number;
  name: string;
  type: string;
  userId: number;
}

export interface TiXianRecord {
  afterMoney: number;
  beforeMoney: number;
  createTime: string;
  dealTime: string;
  id: number;
  money: number;
  remark: string;
  status: number;
  transactionId: string;
  userId: number;
  wechatpayAccount: string;
}

export interface BehaviorTrace {
  attributes: string;
  behaviorType: string;
  createTime: string;
  duration: number;
  goodsId: number;
  id: number;
  time: string;
  traceUserId: number;
  userId: number;
}

export let BaseCoin = 100;

export enum Orientation {
  up,
  down,
  left,
  right
}

export let operateMap = {};

operateMap['view_card'] = '查看名片';
operateMap['share_card'] = '分享名片';
operateMap['collect_card'] = '收藏名片';
operateMap['put_in_address_book'] = '存入通讯录';
operateMap['call_up'] = '打电话';
operateMap['copy_wechat'] = '复制微信号';
operateMap['copy_email'] = '复制邮箱号';
operateMap['navigation_company'] = '导航到公司地址';
operateMap['play_your_voice'] = '播放你的语音';
operateMap['villager'] = '同乡';
operateMap['schoolfellow'] = '校友';
operateMap['play_company_video'] = '播放企业宣传视频';
operateMap['view_your_photos'] = '浏览你的照片';
operateMap['play_your_video'] = '播放你的视频';
operateMap['view_goods'] = '浏览商品';
operateMap['view_enterprise_website'] = '浏览企业官网';


export let timeMap = {};

timeMap['seven_days'] = '7天试用';
timeMap['quarter'] = '1季度';
timeMap['half_a_year'] = '半年';
timeMap['one_year'] = '1年';
