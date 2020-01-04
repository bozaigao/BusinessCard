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
  //标签列表(json数组)
  label: string;
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
