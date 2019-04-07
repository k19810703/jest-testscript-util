const { subfunc } = require('./sub');

function mainfunc(param1, param2) {
  const addresult = subfunc(param1, param2);
  return param1 + addresult;
}

module.exports.mainfunc = mainfunc;
