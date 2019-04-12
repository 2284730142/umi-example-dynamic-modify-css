import themeConfig from './config/theme.config';
import webpackPlugin from './config/plugin.config';

const { primaryColor } = themeConfig;

const plugin = [ 'umi-plugin-react', {
  antd: true,
  // 配置dva内容项
  dva: {
    // 启用简化reducer编写
    immer: true,
    // 启用热重载
    hmr: true,
    // 启用按需加载
    dynamicImport: true,
  },
  // 实现路由级的动态加载（code splitting）
  dynamicImport: {
    // 指定加载时的组件路径
    // loadingComponent:'',
    // 是否通过 webpackChunkName 实现有意义的异步文件名
    webpackChunkName: true,
    // 指定按需加载的路由等级
    level: 3,
  },
  // 开启页面标题
  title: {
    // 默认标题
    defaultTitle: 'demo3',
    // 是否使用多语言
    useLocale: true,
  },
  // 为打包提供便利
  dll: true,
  // 国际化，默认配置
  locale: {
    enable: true,
    default: 'zh-CN',
    baseNavigator: true,
  },
  // 路由配置
  routes: {
    // 不自动引入如下内容
    exclude: [
      /models\//,
      /services\//,
      /model\.(t|j)sx?$/,
      /service\.(t|j)sx?$/,
      /components\//,
      /theme\//,
    ],
  },
  // 底层库
  // library: 'react',
  // Webpack缓存
  // hardSource: true,
  // PWA全称Progressive Web App，即渐进式WEB应用。
  // pwa: true,
  // 开启高清方案，会变成手机端
  // hd: true,
  // 优化移动端点击效果
  fastClick: true,
  // chunks打包提取
  // chunks: [ 'vendors', 'umi' ],
  // 一些引入,在umijs后面
  scripts: [],
  headScripts: [],
  metas: [],
  links: [],
} ];

export default {
  // 插件配置
  plugins: [ plugin ],
  // 配置浏览器最低版本
  targets: {
    // 兼容ie11
    ie: 11,
    // 默认配置
    chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10,
  },
  // 禁用路由的redirect的上提
  disableRedirectHoist: true,
  // 配置history类型（同react-router4的类型），browser默认值
  // history: 'browser',
  // 打包输出路径,默认'./dist'
  // outputPath: './dist',
  // 指定 react-router 的 base，部署到非根目录时需要配置。
  base: '/',
  // 指定 webpack 的 publicPath，指向静态资源文件所在的路径。
  publicPath: '/',
  // 为 CSS 指定额外的 publicPath 。
  cssPublicPath: false,
  // 值为 true 时使用 HTML 里指定的 window.publicPath。
  runtimePublicPath: false,
  // 指定 react app 渲染到的 HTML 元素 id。
  mountElementId: 'root',
  // js压缩方式
  // minimizer: 'uglifyjs',
  // 是否开启hash文件后缀
  // hash: false,
  // 配置全局 context，会覆盖到每个 pages 里的 context。
  // context: {},
  // 是否导出为纯静态页面
  // exportStatic: {
  //   // 启用 .html 后缀。
  //   htmlSuffix: false,
  //   // 部署到任意路径。
  //   dynamicRoot: false,
  // },
  // 如果设为 true，启用单数模式的目录。(所有的目录需要变成单数)
  singular: false,
  // 主题配置
  theme: {
    'primary-color': primaryColor,
  },
  // 控制gzip后大小
  treeShaking: true,
  // 定义一些内容
  // define:{
  //   "process.env.TEST": 1,
  //   USE_COMMA: 2,
  // }
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    localIdentName: '[local]',
  },
  chainWebpack: webpackPlugin,
};
