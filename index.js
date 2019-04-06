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

function commonErrorCheck(actualError, expectOutput) {
  expect(true).toBe(expectOutput.isError);
  if (expectOutput.errMsg) {
    expect(actualError.message).toBe(expectOutput.errMsg);
  }
}

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
        throw new Error(`invalid type: ${typeof expectvalue}`)
    }
  }
}

function commonReturnValueCheck(isNormal, actualResult, expectOutput) {
  if (isNormal) {
    expect(false).toBe(expectOutput.isError);
    check(actualResult, expectOutput.returnvalue);
  }
}

// expectMock =>
// {
// isCalled: true/false
// expectParam: [
// param1,
// param2,
// ]
// }
function commonMockFunCheck(mockFunc, expectMock) {
  if (expectMock.isCalled) {
    expect(mockFunc).toHaveBeenCalled();
    expect(
      mockFunc.mock.calls[0],
    ).toEqual(expect.arrayContaining(expectMock.expectParam));
  } else {
    expect(mockFunc).not.toHaveBeenCalled();
  }
}

module.exports.commonErrorCheck = commonErrorCheck;
module.exports.commonReturnValueCheck = commonReturnValueCheck;
module.exports.commonMockFunCheck = commonMockFunCheck;
