import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;






function move(stacks: string[][], from: number, to: number, count: number, shouldStayInOrder: boolean) {
  
  
  if(!shouldStayInOrder) {
    for(let i = 0; i < count; i++) {
      const letter = stacks[from].pop();
      if(letter) {
        stacks[to].push(letter);
      }    
    }
  } else {
    console.log(from);
    
    const letters = stacks[from].splice(stacks[from].length - count);
    console.log(letters);
    
    if(letters) {
      stacks[to].push(...letters);
    }
    
  }
  
}



const part1 = (rawInput: string) => {
  const stacks = ["FHBVRQDP", "LDZQWV", "HLZQGRPC", "RDHFJVB", "ZWLC", "JRPNTGVM", "JRLVMBS", "DPJ", "DCNWV"]
.map(c => c.split(""));
  const input = parseInput(rawInput);

  const moves = input.split("\n\n")[1].split("\n");
  

  let regex = /move (\d+) from (\d+) to (\d+)/;
  for (let instruction of moves) {
    let match = regex.exec(instruction);
    if (match) {    
      const [_, count, from, to] = match.map((x) => parseInt(x));
      move(stacks, from -1, to -1, count, false);
    }
  }
  let result = "";

  for(let stack of stacks) {
    result += stack.pop();
  }

  return result;
};

const part2 = (rawInput: string) => {
  const stacks = ["FHBVRQDP", "LDZQWV", "HLZQGRPC", "RDHFJVB", "ZWLC", "JRPNTGVM", "JRLVMBS", "DPJ", "DCNWV"]
.map(c => c.split(""));
  const input = parseInput(rawInput);

  const moves = input.split("\n\n")[1].split("\n");
  

  
  let regex = /move (\d+) from (\d+) to (\d+)/;
  for (let instruction of moves) {
    console.log(instruction);
    
    let match = regex.exec(instruction);
    if (match) {    
      const [_, count, from, to] = match.map((x) => parseInt(x));
      move(stacks, from -1, to -1, count, true);
    }
  }
  let result = "";

  for(let stack of stacks) {
    result += stack.pop();
  }

  return result;
};

run({
  part1: {
    tests: [
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
  trimTestInputs: false,
  onlyTests: false,
});
