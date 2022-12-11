import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

interface Monkey {
  items: number[];
  operation: string;
  test: number;
  trueMonkey: number;
  falseMonkey: number;
}

const inputToMonkey = (input: string[]) => {
  return input.map(data => {
    const d = data.split("\n");
    return {
      items: d[1].split(":")[1].split(",").map(x => parseInt(x)),
      operation: d[2].split(":")[1].replace("new", "newVal"),
      test: parseInt(d[3].split("by")[1]),
      trueMonkey: parseInt(d[4].split("monkey ")[1]),
      falseMonkey: parseInt(d[5].split("monkey ")[1])
    }
  })
}

const getWorriedLevel = (value: number, withMod: boolean, monkeys: Monkey[]) => {
  if(!withMod) {
    return Math.floor(value / 3);
  }
  const mod = monkeys.reduce((a, b) => a * b.test, 1);
  return value % mod;
}

const monkeyBusinessLevel = (monkeys: Monkey[], roundsCount: number, withMod: boolean): number => {
  let counts = new Array(monkeys.length).fill(0);
  
  for(let i = 0; i < roundsCount; i++) {
    for(let j = 0; j < monkeys.length; j++) {
      for(let k = 0; k < monkeys[j].items.length; k++) {
        let newVal = 0;
        let old = monkeys[j].items[k];
        eval(monkeys[j].operation);
        monkeys[j].items[k] = getWorriedLevel(newVal, withMod, monkeys);    
        counts[j]++;
      }

      for (const item of monkeys[j].items) {
				if (item % monkeys[j].test === 0) {
					monkeys[monkeys[j].trueMonkey].items.push(item);
				} else {
					monkeys[monkeys[j].falseMonkey].items.push(item);
				}
			}

			monkeys[j].items = [];
    }
  }  
  counts.sort((a, b) => b - a); 
  return counts[0] * counts[1];
}
 
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n\n");

  const monkeys = inputToMonkey(input);
  
	return monkeyBusinessLevel(monkeys, 20, false);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n\n");

  const monkeys = inputToMonkey(input);
  
	return monkeyBusinessLevel(monkeys, 10000, true);
};

run({
  part1: {
    tests: [
      {
        input: `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
        `,
        expected: 10605
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
        `,
        expected: 2713310158
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
