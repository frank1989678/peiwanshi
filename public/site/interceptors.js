/**
 * ================ 站点拦截器 ================
 */


/**
 * 是否符合正确格式的url链接，不符合的话，就进行replace替换
 */
var httpUrlFormat = getHttpUrlFormat();
if (httpUrlFormat !== window.location.href) {
  window.location.replace(httpUrlFormat);
}


/**
 * url参数
 */
var request_url_params = window.getRequestUrlParam();
var token = request_url_params.token;

/**
 * 进入的页面需要授权登陆，并且是第三方授权形式的，而且url中未携带token
 */
// 不需要授权的页面路径配置
var none_author_paths = [
  '/lotteryPage',
  '/user/detail',
  '/ranking',
  '/locked',
  '/webview',
  '/author/error'
];