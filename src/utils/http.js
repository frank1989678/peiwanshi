/*
 * axios response 拦截
 * 防止页面异步请求中没有 reject 错误，因此这里兜底处理 catch
 * @param requestPromise
 * @returns {Promise<any>}
 */
export const responsePromiseInterceptors = requestPromise => {
    return new Promise(resolve => {
        requestPromise.then(data => {
            resolve(data)
        }, err => {
            /**
             * 服务器错误异常处理
             * @param err
             */
            if (process.env.NODE_ENV !== 'production') {
                console.log(err.response);
                console.info('%c [axios catch error]:', "color:#F56C6C;font-weight:bold", err)
            }
        }).catch()
    })
}

/**
 * 忽略promise的reject，由此方法catch一场
 * @param requestPromise {Promise<any>}
 * @param isShowToast {boolean}
 * @returns {Promise<any>}
 */
export const ignorePromiseReject = (requestPromise, isShowToast) => {
    return new Promise(resolve => {
        requestPromise.then(data => {
            resolve(data)
        }, err => {
            if (isShowToast !== false) {
                err && (weui.toast(err.msg || typeof err === 'object' ? JSON.stringify(err) : err, { className: 'ui-toast' }))
            }
        }).catch()
    })
};

/**
 * 验证接口返回的res是否成功
 * @param res {object|[]}
 * @param isShowToastMsg {boolean} 是否显示错误信息
 * @returns {boolean}
 */
export const isResSuccess = (res, isShowToastMsg) => {
    /**
     * 验证res是否有效
     * @param res
     * @param isShowToastMsg
     * @returns {boolean}
     */
    function is_validate_res(res, isShowToastMsg) {
        let data = res.data || {};
        if ((res.status !== 200) || data.errcode) {
            // 是否提示toast信息
            isShowToastMsg !== false && weui.toast(res.msg, { className: 'ui-toast' });
            return false;
        }
        return true;
    }

    if (Object.prototype.toString.call(res) === '[object Array]') {
        for (let i = 0; i < res.length; i++) {
            return is_validate_res(res[i], isShowToastMsg);
        }
    } else {
        return is_validate_res(res, isShowToastMsg)
    }
};

/**
 * 获取请求的url所有参数(包含search，和 hash)
 * @param url
 * @returns {*}
 */
export let getRequestUrlParam = window.getRequestUrlParam;

// 将JSON对象拼接成GET URL形式参数
export let getStitchingUrlParams = window.getStitchingUrlParams;

// 判定地址栏是否有第三方授权的登录参数
export let isRequestUrlVendorLoginParams = window.isRequestUrlVendorLoginParams;

// 第三方参数授权
export let get_vendor_author_url = window.get_vendor_author_url;
