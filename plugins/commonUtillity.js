import { USER_ROLE } from './const.js';

/**
 * Vuexに格納されたターム期間の合計を算出する
 * @param  {Number} store Vuexのストア
 * @param  {Number} term 現在コース期間
 * @return {Number} ターム期間の合計
 */
const sumPeriod = (store,term) => {
  if(term === 0) {
    return "期間未定"
  }
  const courceTerm = store.map((obj) => Number(obj.term));
  const termSum = 
    courceTerm.reduce( (oldValue, newValue) => oldValue + newValue, 0);
  return termSum;
}

/**
 * ユーザ権限から権限名称を取得する
 * @param  {Number} role ユーザ権限
 * @return {String} 権限名称
 */
const getRoleName = (role) => {
  var name = '';
  Object.keys(USER_ROLE).forEach(function(key) {
    if (this[key].code === role) {
      name = this[key].name;
      return;
    }
  }, USER_ROLE);

  return name;
}

export default ({}, inject) => {
  inject('sumPeriod', sumPeriod)
  inject('getRoleName', getRoleName)
}
