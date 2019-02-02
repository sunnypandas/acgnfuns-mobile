export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './index/index', title: '次元饭' },

      { path: '/animationBangumiList', component: './animationBangumiList/index', title: '次元饭' },
      { path: '/comicMangaList', component: './comicMangaList/index', title: '次元饭' },
      { path: '/gameGeimuList', component: './gameGeimuList/index', title: '次元饭' },
      { path: '/novelNoberuList', component: './novelNoberuList/index', title: '次元饭' },

      { path: '/animationBangumi', component: './animationBangumi/index', title: '次元饭' },
      { path: '/comicManga', component: './comicManga/index', title: '次元饭' },
      { path: '/gameGeimu', component: './gameGeimu/index', title: '次元饭' },
      { path: '/novelNoberu', component: './novelNoberu/index', title: '次元饭' },

      { path: '/mediaSearchList', component: './mediaSearchList/index', title: '次元饭' },
      {
        path: '/exception',
        component: '../layouts/ExceptionLayout',
        routes: [
          { path: '/exception/403', title: '无权限', component: './exception/403' },
          { path: '/exception/500', title: '服务器出错了', component: './exception/500' },
        ],
      },
      { component: '404', title: '页面没找到' },
    ],
  },
];
