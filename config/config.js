// https://umijs.org/config/
import path from 'path';
import pageRoutes from './router.config';

export default {
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
          webpackChunkName: true,
        },
        title: {
          defaultTitle: '次元饭',
        },
        dll: false,
        pwa: false,
        hd: false,
        routes: {
          exclude: [],
        },
        hardSource: false,
      },
    ],
  ],
  exportStatic: true,
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less
  theme: {
    'brand-primary': '#00CC99',
    'brand-primary-tap': '#00CC66',
  },
  //   ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 9,
    ios: 12,
  },
  outputPath: './deploy/dist',
  hash: true,
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  // base: 'dist',
  devServer: {
    proxy: {
      '/api/**': {
        'target': 'http://api.acgnfuns.com',
        'changeOrigin': true,
        'pathRewrite': { '^/api' : '' }
      }
    }
  }
};
