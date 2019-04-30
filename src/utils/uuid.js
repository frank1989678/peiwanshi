/**
 * 生成唯 UUID
 *  @link https://www.cnblogs.com/snandy/p/3261754.html
 * @returns {string}
 */
let getUuid = function () {
  /**
   * @return {string}
   */
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

export default getUuid