import themeConfig from '../../config/theme.config';
import { message } from 'antd';

const { primaryColor } = themeConfig;

let lessNodesAppended;
const updateTheme = primaryColor => {
  console.log(primaryColor);
  if (!primaryColor){
    return;
  }
  console.log(window.less);
  const hideMessage = message.loading('正在编译主题！', 0);
  function buildIt() {
    if (!window.less) {
      return;
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor,
        })
        .then(() => {
          hideMessage();
        })
        .catch(() => {
          message.error('Failed to update theme');
          hideMessage();
        });
    }, 200);
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/color.less');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
};

export default {
  namespace: 'theme',
  state: {
    primaryColor: primaryColor,
  },
  reducers: {
    changeTheme (state, { payload }){
      const urlParams = new URL(window.location.href);
      Object.keys(themeConfig).forEach(key => {
        if (urlParams.searchParams.has(key)){
          urlParams.searchParams.delete(key);
        }
      });
      Object.keys(payload).forEach(key => {
        let value = payload[ key ];
        if (state.primaryColor!==value){
          urlParams.searchParams.set(key, value);
        }
      });
      if (state.primaryColor!==payload.primaryColor){
        updateTheme(payload.primaryColor);
      }
      window.history.replaceState(null, '调整颜色', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
