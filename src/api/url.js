/**
 * 登录
 */
export const api_login = '/h5/login';

/**
 * 所有商品分类(暂时使用)
 */
export const api_category_all = '/api/v2/category/list';

/**
 * 热门商品推荐列表(暂时使用)
 */
export const api_hot_product_all = '/api/v2/product/list';

/**
 * 根据分类商品列表
 */
export const api_category_product = '/api/v2/category/product/list';

/**
 * 获取用户详情(暂时使用)
 */
export const api_user_details = '/api/v2/user/get';
export const api_user_get = '/api/v2/user/details';
export const api_user_products = '/api/v2/user/details/products';
export const api_user_comments = '/api/v2/user/details/comments';
export const api_user_comment_num = '/api/v2/user/details/comment-num';

/**
 * 当前用户最近一笔未完成订单
 * @type {string}
 */
export const api_user_unfinishedorder = '/api/v2/order/unfinishedorder';

/**
 * 获取技能详情(暂时使用)
 */
export const api_product_details = '/api/v2/product/details';

/**
 * 获取陪玩师所有的技能评论标签
 * @type {string}
 */
export const api_allcommentstag_byserver = '/api/v2/user/comment/byserver/allcommentstag';


/**
 * 获取用户评论列表(暂时使用)
 */
export const api_user_comment_byserver = '/api/v2/user/comment/byserver';

/**
 * 下单界面商品详情(暂时使用)
 */
export const api_product_simple_details = '/api/v2/product/simple/details';

/**
 * 下单时选择可用优惠券(暂时使用)
 */
export const api_order_enable_coupon = '/api/v2/coupon/user';

/**
 * 获取sessionKey
 */
export const api_sessionKey = '/api/v2/global/form/sessionkey';

/**
 * 查询订单详情
 */
export const api_order_details = '/api/v2/order/details';

/**
 * 订单支付
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=407
 */
export const api_order_pay = '/api/v2/order/pay';

/**
 * 订单提交
 * @param params
 */
export const api_order_submit = '/api/v2/order/submit';

/**
 * 订单列表
 * @param params
 */
export const api_order_list = '/api/v2/order/list';

/**
 * 提醒接单(此功能不开发)
 */
export const api_order_reminding = `/api/v2/order/remind/receive-order`;

/**
 * 提醒开始服务
 */
export const api_start_order = `/api/v2/order/remind/start-order`;

/**
 * 获取评论标签列表
 */
export const api_category_tag_list = `/api/v2/category/tag/list`;

/**
 * 用户评价陪玩师
 */
export const api_user_comment = `/api/v2/user/comment/save`;

/**
 * 优惠券列表
 */
export const api_coupon_list = `/api/v2/coupon/list`;

/**
 * 优惠兑换
 */
export const api_coupon_exchange = `/api/v2/coupon/exchange`;

/**
 * 文件上传
 */
export const api_upload = `/api/v2/global/upload`;

/**
 * 意见反馈
 */
export const api_advice_add = `/api/v2/user/advice/add`;

/**
 * 根据im查询用户信息
 */
export const api_get_im_info = `/api/v2/user/im/get`;

/**
 * 保存im
 */
export const api_save_user_im = `/api/v2/user/im/save`;

/**
 *  im消息推送
 */
export const api_im_push = `/api/v2/wxtemplate/push`;

/**
 * im消息日志
 */
export const api_im_log = `/api/v2/imlog/collect`;

/**
 * 短信验证码
 */
export const api_send_sms = '/mobile/sms/send';

/**
 * 用户提交(完成)验收订单
 */
export const api_order_user_verify = `/api/v2/order/user/verify`;

/**
 * 查询订单评论
 */
export const api_get_order_comment = '/api/v2/order/comment/get';

/**
 * 提醒接单
 * @param params
 */
export const api_remind_receive_order = '/api/v2/order/remind/receive-order';

/**
 * 用户取消订单
 */
export const api_user_cancel_order = '/api/v2/order/user/cancel';

/**
 * 用户提交协商订单
 */
export const api_user_consult_order = '/api/v2/order/user/consult';

/**
 * 协商详情
 */
export const api_consult_details = '/api/v2/order/event';

/**
 * 取消协商
 */
export const api_consult_cancel = '/api/v2/order/user/consult-cancel';

/**
 * 申请客服仲裁
 */
export const api_user_appeal = '/api/v2/order/user/appeal';

/**
 * 绑定手机号
 */
export const api_user_bind_mobile = '/api/v2/user/mobile/bind/new';

/**
 * 微信公众号支付需要授权上报code
 */
export const api_user_weixin_bind_code = '/api/v1/thundermp/user/auth';

/**
 * 订单留言
 */
export const api_order_leave_msg = '/api/v1/order/leave-msg';

/**
 * 获取用户钱包详情
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=436
 */

export const api_balance_details = '/api/v2/user/balance/get';

/**
 *
 * 前三名排行榜接口
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=479
 */
export const api_topuser_top3list = '/api/v2/topuser/top3list';

/**
 *
 * 显示前20名榜单
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=480
 */
export const api_topuser_toplist = '/api/v2/topuser/toplist';

/**
 * 获取用户获得礼物列表
 * @type {string}
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=481
 */
export const api_user_receive = '/api/v2/topuser/getreceive';

/**
 * 获取礼物列表
 * @type {string}
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=482
 */
export const api_getvirtualproduct_list = '/api/v2/topuser/getvirtualproduct';

/**
 * 赠送礼物
 * @type {string}
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=483
 */
export const api_gift_send = '/api/v2/topuser/send';

/**
 * 充值钻石
 * @type {string}
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=486
 */
export const api_recharge_diamond = '/api/v2/pay/recharge';

/**
 * 充值订单详情
 * @type {string}
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=488
 */
export const api_virtual_order_details = '/api/v2/pay/queryvirtualpayorder';

/**
 * h5首页查询活动接口
 * @type {string}
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=484
 */
export const api_activity_getactivity = '/api/v2/activity/getactivity';

/**
 * 参加活动
 * @type {string}
 * @link http://showdoc.wzpeilian.com/web/#/1?page_id=485
 */
export const api_activity_join = '/api/v2/activity/join';

/**
 * 是否参加过活动
 * @type {string}
 */
export const api_activity_checkuserjoin = '/api/v2/activity/checkuserjoin';


/**
 * 验证token是否有效
 * @type {string}
 */
export const api_checktoken = '/h5/checktoken';