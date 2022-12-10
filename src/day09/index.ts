import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  const input = parseInput(rawInput);

  const lines = input.split("\n");

  const visited = new Set<string>();
  visited.add(`${tail.x},${tail.y}`);

  for (const line of lines) {
    const parts = line.split(' ');
    const dir = parts[0] as 'L' | 'R' | 'U' | 'D';
    const steps = parseInt(parts[1]);

    for (let i = 0; i < steps; ++i) {
      switch (dir) {
        case 'L':
          --head.x;
          break;
        case 'R':
          ++head.x;
          break;
        case 'U':
          ++head.y;
          break;
        case 'D':
          --head.y;
          break;
      }

      const xDist = Math.abs(head.x - tail.x);
      const yDist = Math.abs(head.y - tail.y);
      const manDist = xDist + yDist;

      const moveX = xDist >= 2 || manDist >= 3;
      const moveY = yDist >= 2 || manDist >= 3;

      if (moveX) {
        tail.x += head.x > tail.x ? 1 : -1;
      }
      if (moveY) {
        tail.y += head.y > tail.y ? 1 : -1;
      }

      visited.add(`${tail.x},${tail.y}`);
    }
  }

  return visited.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  const _head = { x: 0, y: 0 };
const _tail = { x: 0, y: 0 };

const rope = [
    _head,
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    _tail,
];

const visited = new Set<string>();
visited.add(`${_tail.x},${_tail.y}`);

for (const line of lines) {
    const parts = line.split(' ');
    const dir = parts[0] as 'L' | 'R' | 'U' | 'D';
    const steps = parseInt(parts[1]);

    for (let i = 0; i < steps; ++i) {
        switch (dir) {
            case 'L':
                --_head.x;
                break;
            case 'R':
                ++_head.x;
                break;
            case 'U':
                ++_head.y;
                break;
            case 'D':
                --_head.y;
                break;
        }

        for (let j = 0; j < 9; ++j) {
            const pairTail = rope[j + 1];
            const pairHead = rope[j];

            const xDist = Math.abs(pairHead.x - pairTail.x);
            const yDist = Math.abs(pairHead.y - pairTail.y);
            const manDist = xDist + yDist;

            const moveX = xDist >= 2 || manDist >= 3;
            const moveY = yDist >= 2 || manDist >= 3;

            if (moveX) {
                pairTail.x += pairHead.x > pairTail.x ? 1 : -1;
            }
            if (moveY) {
                pairTail.y += pairHead.y > pairTail.y ? 1 : -1;
            }
        }

        visited.add(`${_tail.x},${_tail.y}`);
    }
}
  return visited.size;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
