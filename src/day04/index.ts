import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sections = input.split(/\r?\n/);

  let overlaps = 0;
  let partialOverlaps = 0;

  for (const section of sections) {
    const pair = section.split(",");
    const a = pair[0].split("-");
    const b = pair[1].split("-");

    const [as, ae, bs, be] = [+a[0], +a[1], +b[0], +b[1]];

    if ((as <= bs && ae >= be) || (as >= bs && ae <= be)) overlaps++;
    if (ae >= bs && be >= as) partialOverlaps++;

  }
  return overlaps.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sections = input.split(/\r?\n/);

  let overlaps = 0;
  let partialOverlaps = 0;

  for (const section of sections) {
    const pair = section.split(",");
    const a = pair[0].split("-");
    const b = pair[1].split("-");

    const [as, ae, bs, be] = [+a[0], +a[1], +b[0], +b[1]];

    if ((as <= bs && ae >= be) || (as >= bs && ae <= be)) overlaps++;
    if (ae >= bs && be >= as) partialOverlaps++;

  }
  return partialOverlaps.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
            2-4,6-8
            2-3,4-5
            5-7,7-9
            2-8,3-7
            6-6,4-6
            2-6,4-8
            `,
        expected: "2"
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
            2-4,6-8
            2-3,4-5
            5-7,7-9
            2-8,3-7
            6-6,4-6
            2-6,4-8
            `,
        expected: "4"
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
