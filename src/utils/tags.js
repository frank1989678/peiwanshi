/**
 * 获取段位、官方标签、个人标签并最多显示3个
 * @param  {object} obj 
 * @param  {number} max 最多显示标签数，默认3个
 * @param  {string} key1 官方标签
 * @param  {string} key2 个人标签
 */
export function getGameTags(obj, max, key1, key2) {
  // 防止返回字段为null导致js报错
  [key1, key2].forEach( key => {
      if (!obj[key]) {
          obj[key] = [];
      }
  })
  obj['dan'] && obj[key1].unshift(obj['dan']);
  const count = max - obj[key1].length;
  obj[key1] = obj[key1].slice(0, max);
  obj[key2] = count > 0 ? obj[key2].slice(0, count) : [];
}
