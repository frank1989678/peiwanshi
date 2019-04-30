/**
 * 正则表达式
 * @type {{phone: RegExp}}
 */
//手机
export const phone = /^[1][3,4,5,7,8][0-9]{9}$/;
//qq
export const qq = /^[1-9]\d{4,13}$/;
//邮箱
export const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//身份证号
export const identity_card = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//银行卡号
export const bank_card = /^([1-9])(\d{12}|\d{15}|\d{18})$/;