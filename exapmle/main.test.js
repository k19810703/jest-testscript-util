// 引入测试util
const { TestUtil } = require('../index');

// 引入测试数据
const {
  maintestdata,
} = require('./main.data')

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
        const testuitl = new TestUtil(testdata.description)
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
