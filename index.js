/* eslint-env jest */

const Log = require('log');
const request = require('supertest');

const log = new Log('Info');

function check(actualvalue, expectvalue) {
  if (expectvalue) {
    switch (typeof expectvalue) {
      case 'string':
        expect(actualvalue).toBe(expectvalue);
        break;
      case 'boolean':
        expect(actualvalue).toBe(expectvalue);
        break;
      case 'number':
        expect(actualvalue).toBe(expectvalue);
        break;
      case 'object':
        if (expectvalue instanceof Array) {
          expect(actualvalue).toEqual(expect.arrayContaining(expectvalue));
        } else {
          expect(actualvalue).toEqual(expect.objectContaining(expectvalue));
        }
        break;
      default:
        throw new Error(`invalid type: ${typeof expectvalue}`);
    }
  }
}
// expectOutput =>
// 异常
// output: {
//   isError: true,
//   errMsg: '未指定schema',
// },
// 正常
// output: {
//   isError: false,
//   returnvalue: { a: 1 },
// },
class TestUtil {
  constructor(description) {
    this.description = description || '';
  }

  commonErrorCheck(actualError, expectOutput) {
    try {
      expect(true).toBe(expectOutput.isError);
    } catch (error) {
      log.error(this.description, 'expected to be a normal case, but caught an error', error);
      throw error;
    }
    if (expectOutput.errMsg) {
      try {
        expect(actualError.message).toBe(expectOutput.errMsg);
      } catch (error) {
        log.error(this.description, `expected error ${expectOutput.errMsg} , but got ${actualError.message}`);
        throw error;
      }
    }
  }

  commonReturnValueCheck(isNormal, actualResult, expectOutput) {
    if (isNormal) {
      try {
        expect(false).toBe(expectOutput.isError);
      } catch (error) {
        log.error(this.description, 'expected to be a error case, but did not caught an error');
        throw error;
      }
      try {
        check(actualResult, expectOutput.returnvalue);
      } catch (error) {
        log.error(this.description, `expect return ${expectOutput.returnvalue} | actual return ${actualResult}`);
        throw error;
      }
    }
  }

  // expectMock =>
  // {
  // isCalled: true/false
  // expectParam: [
  //  param1,
  //  param2,
  // ]
  // }
  commonMockFunCheck(mockFunc, expectMock) {
    if (expectMock.isCalled) {
      try {
        expect(mockFunc).toHaveBeenCalled();
      } catch (error) {
        log.error(this.description, `${mockFunc.name} was not called as expected`);
        throw error;
      }
      try {
        expect(
          mockFunc.mock.calls[0],
        ).toEqual(expect.arrayContaining(expectMock.expectParam));
      } catch (error) {
        log.error(this.description, `${mockFunc.name} was called with params [${mockFunc.mock.calls[0]}] while expect params should be [${expectMock.expectParam}]`);
        throw error;
      }
    } else {
      try {
        expect(mockFunc).not.toHaveBeenCalled();
      } catch (error) {
        log.error(this.description, `${mockFunc.name} should not be called`);
        throw error;
      }
    }
  }

  commonRouteTest(response, testdata) {
    try {
      expect(response.statusCode).toBe(testdata.expect.statusCode);
    } catch (error) {
      log.error(this.description, `actual status code ${response.statusCode} expect status code ${testdata.expect.statusCode}`);
      throw error;
    }
    if (testdata.expect.response && testdata.expect.response.text) {
      try {
        expect(response.text).toBe(testdata.expect.response.text);
      } catch (error) {
        log.error(this.description, `actual response ${response.text} expect response ${testdata.expect.response.text}`);
        throw error;
      }
    }
    if (testdata.expect.response && testdata.expect.response.data) {
      try {
        expect(response.body).toEqual(expect.objectContaining(testdata.expect.response.data));
      } catch (error) {
        log.error(this.description, `actual response ${response.body} expect response ${testdata.expect.response.data}`);
        throw error;
      }
    }
  }
}

module.exports.TestUtil = TestUtil;