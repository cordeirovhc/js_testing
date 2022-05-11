class Fibonacci {
  *execute(input, current = 0, next = 1) {
    // generator function

    if (input === 0) {
      return 0;
    }

    // retorna valor sob demanda
    yield current;

    // delega a fn mas não retorna valor
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;
