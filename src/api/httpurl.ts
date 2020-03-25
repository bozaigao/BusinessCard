//内网测试地址
let StagingUrl = 'https://api.rczhizhi.com/';

//线上发布地址
// let ProductionUrl = 'http://api-test.rczhizhi.com/';
export let cloudBaseUrl = 'cloud://business-card-8687h.6275-business-card-8687h-1301418170/assets/';

const BASE_URL = StagingUrl,
  //网络请求返回状态码
  NetworkState = {
    //操作失败
    FAIL: 0,
    //返回成功
    SUCCESS: 1,
    //需要登录
    NEED_LOGIN: 401,
    //用户不存在
    USER_NO_EXIT: -1
  },
  //用户登录模块
  UserController = {
    //用户登录
    login: BASE_URL + 'user/login',
    //获取用户详细信息
    getUserInfo: BASE_URL + 'user/getUserInfo',
    //根据用户id获取用户详细信息
    getUserInfoById: BASE_URL + 'user/getUserInfoById',
    //更新用户信息
    update: BASE_URL + 'user/update',
    //反馈建议
    suggestionAdd: BASE_URL + 'suggestion/add',
    //人脉推荐行业和兴趣设置
    recommendSetting: BASE_URL + 'user/recommendSetting',
    //人脉推荐行业和兴趣设置查询
    getRecommendSetting: BASE_URL + 'user/getRecommendSetting',
    //人脉推荐是否设置
    recommendSettingStatus: BASE_URL + 'user/recommendSettingStatus',
    //人脉推荐
    getRecommend: BASE_URL + 'user/recommend',
    //解密微信小程序手机号
    decryptPhone: BASE_URL + 'utils/decryptPhone',
    //查询用户访客和收藏数
    getCardHolderVisitorCount: BASE_URL + 'user/getCardHolderVisitorCount',
    //查询用户访客和收藏数以及浏览用户信息
    getCardHolderVisitorRecord: BASE_URL + 'user/getCardHolderVisitorRecord',
    //更新用户的设置信息
    userSettingUpdate: BASE_URL + 'userSetting/update',
  },
  //数据字典
  DictController = {
    //查询行业信息
    getIndustryList: BASE_URL + 'dict/getIndustryList',
    //人脉推荐查询二级行业信息
    getIndustryTags: BASE_URL + 'dict/getIndustryListV2',
    //查询各种信息
    getDictItemList: BASE_URL + 'dict/getDictItemList',
    //创建小程序码
    wxacode: BASE_URL + 'utils/wxacode',
  },
  //文件上传
  FileController = {
    //上传图片
    uploadPicture: BASE_URL + 'file/upload/picture',
    //上传视频
    uploadVideo: BASE_URL + 'file/upload/video',
    //上传声音
    uploadVoice: BASE_URL + 'file/upload/voice',
  },
  //用户商品
  GoodsController = {
    //添加商品
    addGoods: BASE_URL + 'goods/add',
    //查询单个商品信息[最好使用本地商品列表数据不单独走查询接口]
    getGoods: BASE_URL + 'goods/get',
    //分页查询商品列表
    getGoodsList: BASE_URL + 'goods/list',
    //更新商品
    updateGoods: BASE_URL + 'goods/update',
  },
  //任务模块
  TaskController = {
    //添加任务
    addTask: BASE_URL + 'task/add',
    //查询单个任务信息
    getTask: BASE_URL + 'task/get',
    //分页查询任务列表
    getTaskList: BASE_URL + 'task/list',
    //更新任务
    updateTask: BASE_URL + 'task/update',
  },
//客户管理
  CustomerController = {
    //添加系统用户为客户
    addCustomer: BASE_URL + 'customer/add',
    //添加客户跟进信息
    addFollowUp: BASE_URL + 'customer/addFollowUp',
    //手动录入客户
    addPrivateCustomer: BASE_URL + 'customer/addPrivateCustomer',
    //为系统客户添加详情备注
    addRemark: BASE_URL + 'customer/addRemark',
    //删除系统客户
    deleteCustomer: BASE_URL + 'customer/delete',
    //查询客户跟进信息记录
    followUpList: BASE_URL + 'customer/followUpList',
    //客户列表
    getCustomerList: BASE_URL + 'customer/list',
    //更新手动录入客户的资料
    updatePrivateCustomer: BASE_URL + 'customer/updatePrivateCustomer',
    //获取客户详细资料
    getCustomerDetail: BASE_URL + 'customer/get',
  },
  //名片管理
  BusinessCardManage = {
    //获取我收藏的名片列表
    myCollectList: BASE_URL + 'cardholder/list',
    //更新我收藏的名片
    updateMyCollect: BASE_URL + 'cardholder/update',
  },
  //访客管理
  VisitorManage = {
    //查询我的访客列表
    getVisitorList: BASE_URL + 'visitor/list',
    //添加访客记录
    addVisitor: BASE_URL + 'visitor/add',
  },
  //雷达模块
  RadarManage = {
    //新增行为轨迹
    addRadarTrace: BASE_URL + 'behaviorTrace/add',
    //雷达AI分析 兴趣和行为占比
    interestBehaviorRate: BASE_URL + 'behaviorTrace/interestBehaviorRate',
    //查询我的雷达数据列表
    getTraceList: BASE_URL + 'behaviorTrace/list',
    //雷达AI分析-客户活跃度
    traceActive: BASE_URL + 'behaviorTrace/traceActive',
    //雷达详情访问轨迹
    traceList: BASE_URL + 'behaviorTrace/traceList',
  },
  //分销中心
  DistributionManage = {
    //我的客户列表
    myCustomerList: BASE_URL + 'distribution/myCustomerList',
    //数据中心
    settlementRecord: BASE_URL + 'distribution/settlementRecord',
    //分销中心主页-我的收益
    userIncome: BASE_URL + 'distribution/userIncome',
    //申请提现
    withdraw: BASE_URL + 'distribution/withdraw',
    //提现记录
    withdrawList: BASE_URL + 'distribution/withdrawList',
    //我的新增客户数量
    myCustomerCount: BASE_URL + 'distribution/myCustomerCount',
  },
  //特区中心
  TeQuanManage = {
    //查询套餐信息
    packageList: BASE_URL + 'privilege/packageList',
    //购买套餐
    purchasePackage: BASE_URL + 'privilege/purchasePackage',
  };


export {
  BASE_URL,
  NetworkState,
  UserController,
  TaskController,
  DictController,
  FileController,
  GoodsController,
  CustomerController,
  BusinessCardManage,
  VisitorManage,
  RadarManage,
  DistributionManage,
  TeQuanManage
};
