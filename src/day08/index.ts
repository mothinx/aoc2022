import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const countEdgesTrees = (rows: string[]) => {
  return (rows[0].length) * 2 + (rows.length - 2) * 2;
}



const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let visibleTreesCount = 0;

  const rows = input.split("\n");

  // Count tree at edges (always visible)
  visibleTreesCount += countEdgesTrees(rows);
    
  // Count interior trees visibles
  const forest: number[][] = [];
  
  for(let row of rows) {
    const rowAr = row.split("");
    console.log(rowAr);
    
  }
  
  console.log(forest);
  

  console.log(visibleTreesCount);
  
  return visibleTreesCount.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
     {
      input: `
30373
25512
65332
33549
35390
`,
expected: "21"
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
  onlyTests: true,
});
