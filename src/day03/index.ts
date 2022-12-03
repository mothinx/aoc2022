import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;


const getRucksacks = ( input: string ) => {
  return input.split("\n");
}

const getCompartments = (rucksack: string) => {
  const part1 =  rucksack.substring(0, rucksack.length / 2)
  const part2 =  rucksack.substring(rucksack.length / 2, rucksack.length)
  return [part1, part2];
}

const getCommonCharacter = (input1: string, input2: string, inputs: string[]) => {

    const occurenceCountToFound = inputs.length;
    const ordered = inputs.map(input => [...input].sort().join(''));
    console.log(ordered);
    




    const set1 = new Set(input1);
    const set2 = new Set(input2);
    for(let i of set1) {
      if(set2.has(i)) {
        return i;
      }
    }
}

const getPriority = (charachter: string) => {
  // Lowercase
  if(charachter.toLocaleLowerCase() === charachter) {
    return charachter.charCodeAt(0) - 96;
  }
  // Uppercase
  return charachter.toLowerCase().charCodeAt(0) - 96 + 26;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rucksacks = getRucksacks(input);

  let sum = 0;
  rucksacks.forEach(rucksack => {
    const compartments = getCompartments(rucksack);
    const commonCharacter = getCommonCharacter(compartments[0], compartments[1], compartments)
    sum += getPriority(commonCharacter!);
  })
  return sum.toString();
};

const getGroups = (all: string[], groupeSize: number) => {
  if(all.length % groupeSize !== 0) {
    console.error("cannot be divided exactly");
  }

  const groups: string[][] = []
  
  for(let i = 0; i < all.length; i = i +3) {
    let newGroup = all.slice(i, i+3);
    groups.push(newGroup);
  }
  return groups;  
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rucksacks = getRucksacks(input);
  const groups =getGroups(rucksacks, 3);
  
  const badges: string[] = [];
  console.log("Groups");
  console.log(groups);
  
  
  groups.forEach(group => {
    

    console.log("Group: " + group);
    
    // Take the smallest stack
    const smallest = group.reduce((a,b) => a.length <= b.length ? a : b);
    console.log("smallest: " + smallest);
    
    const others = group.filter(stack => stack !== smallest);
    console.log("others: " + others);
    // For each letter of the smallest stack
    const lettersAlreadyCheck: string[] = [];
    [...smallest].forEach(letter => {
      // Check if others stack has the letter. 
      console.log(lettersAlreadyCheck);
      console.log(letter);
      
      if(lettersAlreadyCheck.includes(letter)) {
        return;
      }
      if(others[0].includes(letter) && others[1].includes(letter)) {
        badges.push(letter);
      }
      lettersAlreadyCheck.push(letter);
    })
  })
  
  
  let sum = 0;
  badges.forEach(badge => {
    sum += getPriority(badge);
  })
  




  return sum.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: "157"
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: "70"
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
