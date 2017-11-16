/**
 * Improved stringify which overcomes 'TypeError: cyclic object value'
 * @param object to stringify
 */
export function stringify(object: any) {
  let seen = [];

  return JSON.stringify(object, function (key, val) {
    if (val != null && typeof val === 'object') {
      if (seen.indexOf(val) >= 0) {
        return;
      }
      seen.push(val);
    }
    return val;
  });
}
