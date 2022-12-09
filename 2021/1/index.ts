export function part1(input: string) {
  const data = input.split("\n");

  return (
    data
      .map((x, index, array) => {
        const now = parseInt(x);
        const prev = parseInt(array[index - 1]) || 0;

        return now > prev;
      })
      // return only trues
      .filter((x) => x).length - 1
  );
}

export function part2(input: string) {
  const data = input.split("\n");
  return (
    data
      .map((x, index, array) => {
        const now = [
          parseInt(x),
          parseInt(array[index + 1]),
          parseInt(array[index + 2]),
        ].reduce((a, b) => a + b, 0);
        // sum array

        const prev = [
          parseInt(array[index + 1]) || 0,
          parseInt(array[index + 2]) || 0,
          parseInt(array[index + 3]) || 0,
        ].reduce((a, b) => a + b, 0);

        // console.log(now, prev);

        return now < prev;
      })
      // return only trues
      .filter((x) => x).length
  );
}
