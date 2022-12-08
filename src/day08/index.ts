import run from "aocrunner";


const parseInput = (rawInput: string) => rawInput;

const isEdgeTree = (
  rowIndex: number,
  colIndex: number,
  trees: number[][],
) => (
  (!rowIndex || rowIndex === trees.length - 1) ||
  (!colIndex || colIndex === trees[rowIndex].length - 1)
);

const beforeTrees = (rowOrColumn: number[], index: number) => (
  rowOrColumn.slice(0, index).reverse()
);

const afterTrees = (rowOrColumn: number[], index: number) => (
  rowOrColumn.slice(index + 1)
);

const isShorterThan = (value: number) => (tree: number) => tree < value;

const neighborsShortThan = (neighbors: number[][], tree: number) => (
  neighbors.some((row) => row.every(isShorterThan(tree)))
);

const rotateClockwise = <T>(matrix: T[][]) => (
  matrix[0].map((_value, index) => (
    matrix.map((row) => row[index]).reverse()
  ))
);

const getRowNeighbors = (
  row: number[],
  index: number,
) => [beforeTrees(row, index), afterTrees(row, index)];

const getColumnNeighbors = (
  column: number[],
  index: number,
) => getRowNeighbors(column, (column.length - index) - 1);

const getVisibleTrees = (trees: number[][]) => {

  let visible = 0;

  const columns = rotateClockwise(trees);
  
  trees.forEach((row, rowIndex) => {
    row.forEach((tree, colIndex) => {
      if (isEdgeTree(rowIndex, colIndex, trees)) return visible += 1;

      const neighbors = [
        ...getRowNeighbors(row, colIndex),
        ...getColumnNeighbors(
          columns[colIndex],
          rowIndex,
        ),
      ];
      if (neighborsShortThan(neighbors, tree)) return visible += 1;
    });
  });
  return visible;
};


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const forest = input.split("\n")
    .map(rows => rows.split('')
      .map(Number));

  const visibleTrees = getVisibleTrees(forest);

  return visibleTrees.toString();
};

const visibleNeighborTrees = (neighbors: number[], tree: number) => (
  neighbors.slice(0, neighbors.findIndex((neighbor) => neighbor >= tree))
    .length + 1
);

const multiply = (first: number, second: number) => first * second;

const descending = (previous: number, next: number) => next - previous;

const getHighestScenicScore = (trees: number[][]) => {
  const scenicScores: number[] = [];
  const columns = rotateClockwise(trees);

  trees.forEach((row, rowIndex) => {
    row.forEach((tree, colIndex) => {
      if (isEdgeTree(rowIndex, colIndex, trees)) return;

      const score = [
        ...getRowNeighbors(row, colIndex),
        ...getColumnNeighbors(
          columns[colIndex],
          rowIndex,
        ),
      ]
        .map((neighbors) => visibleNeighborTrees(neighbors, tree))
        .reduce(multiply);

      scenicScores.push(score);
    });
  });
  return scenicScores.sort(descending).shift()!;
};


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const forest = input.split("\n")
    .map(rows => rows.split('')
      .map(Number));

  const highestScenicScore = getHighestScenicScore(forest)

  return highestScenicScore.toString();
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
