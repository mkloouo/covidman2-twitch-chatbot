module.exports.utils = {
  sumUpTo: (n) => {
    let sum = 0;
    for (let i = 0; i < n + 1; i++) {
      sum += i;
    }
    return sum;
  },
};
