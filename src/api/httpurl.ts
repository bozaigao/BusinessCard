//内网测试地址
let StagingUrl = 'https://api.rczhizhi.com/';
//线上发布地址
// let ProductionUrl = 'http://api-test.rczhizhi.com/';

const BASE_URL = StagingUrl,
  //网络请求返回状态码
  NetworkState = {
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
    //更新用户信息
    update: BASE_URL + 'user/update',
  },
  //数据字典
  DictController = {
    //根据字典code查询字典数据列表 dictCode取值如下 education_background 查询学历 industry 查询行业
    getDictItemList: BASE_URL + 'dict/getDictItemList',
    //查询省份和城市信息
    getProvinceCity: BASE_URL + 'dict/getProvinceCity',
    //查询行业信息
    getIndustryList: BASE_URL + 'dict/getIndustryList',
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
  BusinessCardManage
};
