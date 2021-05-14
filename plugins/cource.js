const sumPeriod = (store,term) => {
  if(term === 0) {
    return "期間未定"
  }
  const courceTerm = store.map((obj) => Number(obj.term));
  const termSum = 
    courceTerm.reduce( (oldValue, newValue) => oldValue + newValue, 0);
  return Math.ceil( termSum / 4 );
}


export default ({}, inject) => {
  inject('sumPeriod', sumPeriod);
}
