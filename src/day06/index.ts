import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getMarkerPosition = (input: string[], sequenceSize: number) => {
    return input.map((_ : string, index: number) => input.slice(index, index + 4)).findIndex((a : string[])=>(new Set(a)).size==a.length)+sequenceSize;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArray = input.split("");

  const result = getMarkerPosition(inputArray, 4);
  return result.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArray = input.split("");

  const result = getMarkerPosition(inputArray, 14); 
  return result.toString();
};

run({
  part1: {
    tests: [
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: "10"
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: "5"
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
