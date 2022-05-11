const sinon = require("sinon");
const Fibonacci = require("./fibonacci");
const assert = require("assert");

// Fibonacci: o próximo valor corresponde a soma dos dois valores anteriores
(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const n = 50;

    // generators retornam iterators, podem ser acessados com:
    // .next, for of, rest/spread
    const sequence = [...fibonacci.execute(n)].join(",");

    const expectedCallCount = n + 1;
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const [...results] = fibonacci.execute(5);

    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1, next = 2
    // [3] input = 2, current = 2, next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0, STOP

    const { args, ...otherStuff } = spy.getCall(2);

    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
})();
