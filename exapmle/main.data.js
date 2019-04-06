module.exports.maintestdata = [
  {
    description: '测试用例1',
    input: [
      1,
      2,
    ],
    output: {
      isError: false,
      returnvalue: 4,
    },
    submock: {
      isCalled: true,
      expectParam: [
        1,
        2,
      ],
      mockasfunc: () => 3,
    }
  },
  {
    description: '测试用例1 异常',
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