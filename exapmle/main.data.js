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