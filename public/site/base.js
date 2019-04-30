/**
 * todo token问题处理,因为token带有特殊字符 # ，容易导致单页应用路由问题，因此在存储和获取时需处理一下
 */
window.getToken = function () {
  var getStorageToken = decodeURIComponent(localStorage.getItem('token'));
  return ['undefined', 'null'].indexOf(getStorageToken) === -1 ? getStorageToken : null
};

/**
 * 获取token
 * @param token {string}
 */
window.setToken = function (token) {
  // 只保留一个token，删除第三方登陆时的token
  localStorage.removeItem('token_redirect');
  return localStorage.setItem('token', encodeURIComponent(token))
};

/**
 * 获取url中第三方登陆的参数
 */
window.getVendorLoginUrlParams = function (url) {
  var url_params_format = window.CHANNEL_INFO.author.params;
  url = url || window.location.href;
  var api_login_params = {};
  var get_request_url_params = window.getRequestUrlParam(url);
  for (var params_key in  url_params_format) {
    api_login_params[url_params_format[params_key]] = get_request_url_params[params_key]
  }
  return api_login_params
};

/**
 * 获取url中第三方授权参数的对象
 */
window.getVendorAuthorUrlParams = function (url) {
  var url_params_format = window.CHANNEL_INFO.author.params;
  url = url || window.location.href;
  var author_params = {};
  var get_request_url_params = window.getRequestUrlParam(url);
  for (var params_key in  url_params_format) {
    author_params[params_key] = get_request_url_params[params_key]
  }
  return author_params
};

/**
 * 获取请求的url所有参数(包含search，和 hash)
 * @param url {string} [window.location.href]
 */
window.getRequestUrlParam = function (url) {
  var urlHashSearchStr = getUrlHashSearchStr(url);
  var hash_str = urlHashSearchStr.hash_str;
  var search_str = urlHashSearchStr.search_str;
  var hash_str_params_index = hash_str.indexOf('?');
  hash_str = hash_str_params_index !== -1 ? hash_str.substr(hash_str_params_index + 1) + '&' : '';
  var search_str_params_index = search_str.indexOf('?');
  if (search_str_params_index !== -1) {
    search_str = search_str.substr(search_str_params_index + 1);
  }
  var getRequestUrlParams = {};
  if (hash_str_params_index !== -1 || search_str_params_index !== -1) {
    var params_format_url = (hash_str + search_str).split("&");
    for (var i = 0; i < params_format_url.length; i++) {
      var param = params_format_url[i].split("=");
      if (param[0]) {
        var _value = '';
        try {
          _value = decodeURIComponent(param[1]);
        } catch (e) {
          _value = param[1];
        }
        getRequestUrlParams[param[0]] = _value;
      }
    }
  }
  return getRequestUrlParams;

};

/**
 * 获取url的hash和search值
 * @param url
 */
window.getUrlHashSearchStr = function (url) {
  var hash_str = window.location.hash;
  var search_str = window.location.search;
  if (url) {
    var url_hash_index = url.indexOf('#');
    var url_search_index = url.indexOf('?');
    hash_str = url_hash_index !== -1 ? url.substr(url_hash_index) : '';
    if (url_search_index < url_hash_index || (url_search_index !== -1 && url_hash_index === -1)) {
      var length = url_search_index < url_hash_index ? url_hash_index - url_search_index : url.length;
      search_str = url.substr(url_search_index, length);
    } else {
      search_str = ''
    }
  }
  return {
    hash_str: hash_str,
    search_str: search_str
  };
};

/**
 * 将JSON对象拼接成GET URL形式参数
 * @param params
 * @returns {string}
 */
window.getStitchingUrlParams = function (params) {
  var strParams = '';
  for (var keyItem in params) {
    var value = params[keyItem];
    if (value !== '') {
      strParams += keyItem + '=' + encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : value) + '&';
    }
  }
  return strParams ? strParams.substr(0, strParams.length - 1) : ""
};

/**
 * 获取url的的不包含问号之前的值
 * @param url
 */
window.getRequestUrlPath = function (url) {
  url = url || window.location.href;
  url = window.getHttpUrlFormat(url);
  var url_params_index = url.indexOf('?');
  return url.substr(0, url_params_index !== -1 ? url_params_index : redirect_url.length);
};

/**
 * 格式化非法的正常的url 如 http://xxx.xx.com/?code=abcdefs#/
 * @returns {string}
 */
window.getHttpUrlFormat = function (url) {
  var url_params = window.getRequestUrlParam(url);
  var urlHashSearchStr = getUrlHashSearchStr(url);
  var hash_str = urlHashSearchStr.hash_str;
  var hash_str_params = hash_str.indexOf('?');
  url = url || window.location.href;
  // url是否有特殊类型的设定,如 http://xxx.xx.com/?code=abcdefs#/order?orderNo=123 需要重定向设置一下
  // 建议在跳转的时候，请采用  window.location.replace 的形式，这样可以删除当前无用的历史记录
  // 有 #/ 并且在之前有 ？号的情况下 就要重新格式化
  if (hash_str && urlHashSearchStr.search_str) {
    var url_params_str = window.getStitchingUrlParams(url_params);
    url_params_str = url_params_str ? (url_params_str.indexOf('?') !== -1 ? '&' : '?') + url_params_str : '';
    return window.location.origin + '/' + hash_str.substr(0, hash_str_params !== -1 ? hash_str_params : hash_str.length) + url_params_str;
  }
  return url
};

/**
 * 获取 hash 类型 url path  路径
 * @param url {string} [url=window.location.href]
 * @returns {*}
 */
window.getRequestHashPath = function (url) {
  var hash_search = getUrlHashSearchStr(getHttpUrlFormat(url || window.location.href));
  var hash_str = hash_search.hash_str;
  if (hash_str) {
    var params_index = hash_str.indexOf('?');
    return hash_str.substr(0, params_index !== -1 ? params_index : hash_str.length)
  }
  return ''
};

/**
 * 处理第三方授权url
 * @param url {string} [url=window.location.href]
 * @returns {*}
 */
window.get_vendor_author_url = function (url) {
  var format_url = window.getHttpUrlFormat(url);
  var url_params = getRequestUrlParam(format_url);
  var author_url_params = getRequestUrlParam(window.CHANNEL_INFO.author.url.replace('{{%url%}}', ''));
  var url_params_format = window.CHANNEL_INFO.author.params;
  url_params_format = Object.assign({}, author_url_params, url_params_format);
  // 删除已经存在的授权参数,防止重复获取
  for (var params_key in  url_params_format) {
    delete url_params[params_key]
  }
  // 获取纯粹的路径的url
  if (format_url.indexOf('?') !== -1) {
    format_url = format_url.substr(0, format_url.indexOf('?'));
  }
  // 当前url不包含backurl参数 并且传入的hash url和当前地址栏hash url也不一样，就需要进行添加
  var is_add_back_url_params = getRequestHashPath(format_url) !== getRequestHashPath(window.location.href);
  if (is_add_back_url_params && !url_params.back_url) {
    url_params['back_url'] = encodeURIComponent(window.location.href);
  }

  // 针对不带 #/ 的url加上 hash 标识
  if (format_url.indexOf('#') === -1) {
    format_url = format_url + '#/';
  }

  var stitching_url_params = getStitchingUrlParams(url_params);

  format_url = format_url + (stitching_url_params ? '?' + stitching_url_params : '');

  // 测试环境下直接获取自定义的授权参数
  if (window.author_params) {
    return format_url + (format_url.indexOf('?') !== -1 ? '&' : "") + window.author_params;
  }

  return window.CHANNEL_INFO.author.url.replace('{{%url%}}', encodeURIComponent(format_url));
};

/**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
 * @param func 执行函数
 * @param wait 时间间隔
 * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
 *                如果你想禁用最后一次执行的话，传递{trailing: false}
 * @returns {Function}
 */
window.throttle = function (func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

/**
 * 支付方式字典信息
 * @type {{}}
 */
window.payType = {
  /**
   * 数据
   */
  list: {1: '微信支付', 3: '支付宝', 5: '分期乐'},

  /**
   * 格式化列表
   * @param format {object}
   * @param ary {array} --是否有指定数据源格式化
   * @example=>{key,value}
   */
  formatList: function (format, ary) {
    var result = [];
    var source = this.list;
    for (var key in source) {
      var item = {};
      item[format.key || 'label'] = source[key];
      item[format.value || 'value'] = key;
      if (Object.prototype.toString.call(ary) === '[object Array]') {
        for (var i = 0; i < ary.length; i++) {
          if (key == ary[i]) {
            result.push(item);
          }
        }
      } else {
        result.push(item);
      }
    }
    return result;
  },

  /**
   * 验证是否是有效的支付方式
   * @param payment
   * @returns {*|string}
   */
  isValidate: function (payment) {
    return this.list[payment] || '';
  },

  isWeixin: function (payment) {
    return payment == 1;
  },

  isFenqile: function (payment) {
    return payment == 5;
  },

  isAlipay: function (payment) {
    return payment == 3;
  },

  isVendorPayment: function (payment) {
    return payment != 3 && payment != 1;
  },

  weixin: 1,

  alipay: 3,

  fenqile: 5,
};

/**
 * 事件绑定回调
 */
window.iPhoneXScrollHackBind = function () {
  throttle(function () {
    var scale = window.innerWidth / window.screen.width
    if (window.screen.height - window.innerHeight / scale < 100) {
      html.classList.add('fix-iphonex-bottom')
    } else {
      html.classList.remove('fix-iphonex-bottom')
    }
  }, 200)
};

/**
 * iphone 手机底部导航兼容,在滑动时
 */
if (DEVICE.iphoneX) {
  window.addEventListener('scroll', window.iPhoneXScrollHackBind, false);
}

/**
 * 开启debug开关 ,连续单击30次,且时间间隔小于1s 就显示debug视图
 * 连续双击页面30次就可以出现debug模式
 */
(function () {

  /**
   * 动态添加js
   * @param id {string}
   * @param url {string}
   * @param callback {function} - 加载完成之后的回调
   */
  function loadJs(id, url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.id = id;
    script.onload = script.onreadystatechange = function () {
      if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') return;
      script.onreadystatechange = script.onload = null;
      if (callback) callback();
    };
    document.body.appendChild(script);
  }

  var timeStamp = 0;
  var maxClickNum = 30;
  var VConsoleSpeedClickNum = 0;

  /**
   * 空白处回调
   * @param e
   */
  function touchstartDebugHandle(e) {
    if (timeStamp === 0) {
      timeStamp = e.timeStamp;
    }
    if ((e.timeStamp - timeStamp) < 1000) {
      timeStamp = e.timeStamp;
      VConsoleSpeedClickNum += 1;
    } else {
      VConsoleSpeedClickNum = 0;
      timeStamp = e.timeStamp;
    }
    if (VConsoleSpeedClickNum === maxClickNum) {
      window.removeEventListener('touchstart', touchstartDebugHandle);
      loadJs('vconsole', 'vconsole.min.js', function () {
        var vConsole = new VConsole();
      })
    }
  }

  window.addEventListener('touchstart', touchstartDebugHandle, false);
}());
