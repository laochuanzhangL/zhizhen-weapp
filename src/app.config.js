export default {
  pages: [

    'pages/login/login/index',
    'pages/index/xinguan/index',

    'pages/index/index',
    'pages/login/getInfo/index',


    'pages/inquiry/intel/index',
    'pages/inquiry/person/index',
    'pages/inquiry/detail/index',
    'pages/inquiry/pie/index',

    'pages/mine/index',

    'pages/index/healthy/index',
    'pages/index/recipe/index',
    'pages/index/serve/index',

    'pages/mine/feedback/index',
    'pages/mine/collection/index',
    'pages/mine/ownRecipe/index',
    'pages/mine/record/index',
    'pages/mine/item/index',
    'pages/mine/userInfo/index',

    'pages/components/essayDetails/index',

    // 'pages/mine/index',
    

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#626567",
    selectedColor: "orange",
    backgroundColor: "#FBFBFB",
    borderStyle: "white",
    list: [{
      pagePath: 'pages/index/index',
      text: "智诊首页",
      iconPath: "pages/assets/index.png",
      selectedIconPath: 'pages/assets/indexed.png',
    },
    {
      pagePath: 'pages/mine/index',
      text: "个人中心",
      iconPath: "pages/assets/mine.png",
      selectedIconPath: "pages/assets/mined.png"
    },]
  },

  // 地理位置授权
  // "permission":{
  //   "scope.userLocation":{
  //     "desc": "获取地理位置信息的用途描述"
  //   }
  // }  
}
