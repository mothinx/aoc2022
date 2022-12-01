import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputModified = input.split("\n\n");

  let mostCalories = 0;
  inputModified.forEach((element) => {
    const sumElfCalories = element
      .split("\n")
      .map((calorie) => Number(calorie))
      .reduce((a, b) => a + b, 0);
    if (sumElfCalories > mostCalories) {
      mostCalories = sumElfCalories;
    }
  });
  return mostCalories.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const inputModified = input.split("\n\n");

  const elfsCalories: number[] = [];

  inputModified.forEach((element) => {
    const sumElfCalories = element
      .split("\n")
      .map((calorie) => Number(calorie))
      .reduce((a, b) => a + b, 0);

    elfsCalories.push(sumElfCalories);
  });

  elfsCalories.sort((a, b) => b - a);

  console.log(elfsCalories);

  return (elfsCalories[0] + elfsCalories[1] + elfsCalories[2]).toString();
};

run({
  part1: {
    tests: [
      {
        input: `
          1000
          2000
          3000

          4000

          5000
          6000

          7000
          8000
          9000

          10000
        `,
        expected: "24000",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          1000
          2000
          3000

          4000

          5000
          6000

          7000
          8000
          9000

          10000
        `,
        expected: "45000",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
