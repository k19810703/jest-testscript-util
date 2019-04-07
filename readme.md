# jest测试脚本util

##  方便编写jest测试脚本的几个函数

####  install
```
npm install --save @cic-digital/jest-testscript-util
```

####  用法
这里的example可以在example目录下找到

假设我们有一个子程序 sub.js
``` javascript
function subfunc(param1, param2) {
  return param1 + param2;
}
module.exports.subfunc = subfunc;
```

和一个主程序main.js
``` javascript
const { subfunc } = require('./sub');

function mainfunc(param1, param2) {
  const addresult = subfunc(param1, param2);
  return param1 + addresult;
}

module.exports.mainfunc = mainfunc;
```

测试数据main.data.js
``` javascript
module.exports.maintestdata = [
  {
    description: '测试用例1',
    // 定义被测函数传入参数
    input: [
      1,
      2,
    ],
    // 定义被测函数输出
    output: {
      isError: false,
      returnvalue: 4,
    },
    // 定义被mock函数状态
    submock: {
      // 被mock的函数预计是否会被调用
      isCalled: true,
      // 被mock的函数被调用时的参数
      expectParam: [
        1,
        2,
      ],
      // 定义被mock函数的mock实现
      mockasfunc: () => 3,
    }
  },
  {
    description: '测试用例2 异常',
    input: [
      1,
      2,
    ],
    output: {
      isError: true,
      returnvalue: 4,
    },
    submock: {
      isCalled: true,
      expectParam: [
        1,
        2,
      ],
      mockasfunc: () => { 
        throw new Error('error');
      },
    }
  },
];
```

测试脚本
``` javascript
/* eslint-env jest */

// 引入测试util
const { TestUtil } = require('../index');

// 引入测试数据
const {
  maintestdata,
} = require('./main.data');

// 引入被测方法
const {
  mainfunc,
} = require('./testmodule/main');

// 引入需要mock的方法
const { subfunc } = require('./testmodule/sub');
// 用jest进行mock
jest.mock('./testmodule/sub');

describe('测试', () => {
  describe.each(maintestdata)(
    'mainfunc测试',
    (testdata) => {
      beforeEach(() => {
        subfunc.mockImplementation(testdata.submock.mockasfunc);
      });

      test(testdata.description, async () => {
        const testuitl = new TestUtil(testdata.description);
        let normalcase = false;
        let result;
        try {
          result = mainfunc(...testdata.input);
          normalcase = true;
        } catch (error) {
          testuitl.commonErrorCheck(error, testdata.output);
        }
        testuitl.commonReturnValueCheck(normalcase, result, testdata.output);
        testuitl.commonMockFunCheck(subfunc, testdata.submock);
      });
    },
  );
});
```

利用supertest来做route的测试时，可以使用标准结果验证函数commonRouteTest来验证状态码和返回值
``` javascript
const response = await request(testdata.routemodule).post(testdata.routeinfo.url).send(testdata.routeinfo.data);
testuitl.commonRouteTest(response, testdata);

// testdata需要包含
// expect: {
//   statusCode: 200,
//   response下text data 需要定义其中一个
//   response: {
//     text: 'response string',
//     data: { responsedata: 'aaa' },
//   },
// },
```