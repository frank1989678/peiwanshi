import utils from 'utils'

/**
 * 微信授权回调url
 * @param redirect_uri {string} 授权回调的url
 * @returns {string}
 * 1、以snsapi_base为scope发起的网页授权，是用来获取进入页面的用户的openid的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）
 * 2、以snsapi_userinfo为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。
 */
export const getRedirectWeiXinCodeUrl = (redirect_uri = window.location.href) => {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.VUE_APP_WEIXIN_MP_APPID}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
};


/**
 * 跨域微信授权回调url
 * @remark 当前支付的域名未在公众号绑定，因此只能去绑定的微信公众号公共授权页面授权回来
 * @param url {string} 授权回调的url,默认为当前url
 * @returns {string}
 */
export const crossRedirectWeiXinCodeUrl = function (url) {
  // 获取 URL 参数
  let url_params = utils.http.getRequestUrlParam(url);
  // 移除需要与微信授权同名的参数
  delete url_params.code;
  url_params['token'] = encodeURIComponent(getToken());
  url_params['cross_mp_author'] = 1;
  // 在授权成功的页面返回的使用
  // 当前url不包含backurl参数 并且传入的hash url和当前地址栏hash url也不一样，就需要进行添加
  let is_add_back_url_params = window.getRequestHashPath(url) !== window.getRequestHashPath(window.location.href);
  if (is_add_back_url_params && !url_params.back_url) {
    url_params['back_url'] = encodeURIComponent(window.location.href);
  }
  let question_mark_index = url.indexOf('?');
  // 去掉问号之后的链接
  url = url.substr(0, question_mark_index === -1 ? url.length : question_mark_index);
  url = encodeURIComponent(url + '?' + utils.http.getStitchingUrlParams(url_params));
  return process.env.VUE_APP_WEIXIN_MP_CODE_URL + '?channel_redirect_uri=' + url;
};