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
  // 传入数组性测试数据集
  describe.each(maintestdata)(
    // 测试描述
    'mainfunc测试',
    (testdata) => {
      // 准备工作，此处mock子程序
      beforeEach(() => {
        subfunc.mockImplementation(testdata.submock.mockasfunc);
      });

      test(testdata.description, async () => {
        // 创建测试util实例
        const testuitl = new TestUtil(testdata.description);
        let normalcase = false;
        let result;
        try {
          // 使用测试数据的参数.input，调用测试函数
          result = mainfunc(...testdata.input);
          normalcase = true;
        } catch (error) {
          // 调用标准的异常验证
          testuitl.commonErrorCheck(error, testdata.output);
        }
        // 调用标准的返回值验证
        testuitl.commonReturnValueCheck(normalcase, result, testdata.output);
        // 调用标准的mock函数验证
        testuitl.commonMockFunCheck(subfunc, testdata.submock);
      });
    },
  );
});
