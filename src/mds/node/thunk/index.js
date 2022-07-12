const fs = require("fs");

// 将一个函数转换为 Thunk 函数
function toThunk(fn) {
    return (...rest) => {
      return (callback) => {
        fn.apply(null, [...rest, callback]);
      };
    };
}

  // 如果 error 存在, 就 reject
function isError(error, reject) {
    if (error) {
      reject(error);
      return false;
    }
    return true;
}

// 将 JSON 转为对象
function toObject(data) {
    let res = {};
    try {
      res = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
    return res;
}

// 超简版 co 实现, 用于 Generator 的流程控制
function co(gen) {
    return new Promise((resolve, reject) => {
      const args = Array.prototype.slice.call(arguments, 1);
      const g = gen.apply(this, args);
      next();
  
      function next(path) {
        const value = g.next(path);
        if (value.done) return resolve(value.value);
  
        value.value((error, data) => {
          if (isError(error, reject)) {
            data = toObject(data);
            next(data.path);
          }
        });
      }
    });
}

const readFileThunk = toThunk(fs.readFile);

const gen = function* generator(path) {
    const fileA = yield readFileThunk(path);
    const fileB = yield readFileThunk(fileA);
    const fileC = yield readFileThunk(fileB);
  
    return fileC;
};

co(gen, 'a.json')
  .then((res) => {
    console.log("res ->", res);
  })
  .catch((err) => {
    console.log("err ->", err);
  });