import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;


enum Moves {
  SCISSORS = "C",
  ROCK = "A",
  PAPER = "B"
}

const winningEncryptedAssociations = new Map<string, string>([
  ["Z", Moves.PAPER],
  ["X", Moves.SCISSORS],
  ["Y", Moves.ROCK],
]);

const winningAssociations = new Map<string,string> ([
  [Moves.PAPER, Moves.ROCK],
  [Moves.ROCK, Moves.SCISSORS],
  [Moves.SCISSORS, Moves.PAPER]
])

const losingAssociations = new Map<string,string> ([
  [Moves.ROCK, Moves.PAPER],
  [Moves.SCISSORS, Moves.ROCK],
  [Moves.PAPER, Moves.SCISSORS]
])

const encryptedMoveScore = new Map<string, number>([
  ["Z", 3],
  ["X", 1],
  ["Y", 2],
]);

const encryptedMove = new Map<string, string>([
  ["Z", Moves.SCISSORS],
  ["X", Moves.ROCK],
  ["Y", Moves.PAPER],
]);

enum ResultScores {
  WON = 6,
  DRAW = 3,
  LOST = 0
}

const moveScore = new Map<string, number>([
  ["C", 3],
  ["A", 1],
  ["B", 2],
]);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rounds = input.split("\n");
  let totalScore: number = 0;
  
  rounds.forEach(round => {
    
    const [opponentMove, myMove] = round.split(" ");
    
    let scoreRound = 0;
    // Determine result
    if(encryptedMove.get(myMove) === opponentMove) {
      scoreRound += ResultScores.DRAW;
    }
    if(winningEncryptedAssociations.get(myMove) === opponentMove) {
      scoreRound += ResultScores.WON;
    }

    // Add move Score
    scoreRound += Number(encryptedMoveScore.get(myMove));

    totalScore += scoreRound;
  })  
  return totalScore.toString();
};

const part2 = (rawInput: string) => {

  const howItNeedToEndScore = new Map<string, number>([
    ["X" ,ResultScores.LOST],
    ["Y" , ResultScores.DRAW],
    ["Z" ,ResultScores.WON]
  ]
  );

  const input = parseInput(rawInput);

  const rounds = input.split("\n");
  let totalScore: number = 0;

  rounds.forEach(round => {
    let roundScore = 0;
    
    const [opponentMove, howItNeedToEnd] = round.split(" ");

    roundScore += howItNeedToEndScore.get(howItNeedToEnd)!;

    // Define my move
    let myMove = "";
    if(roundScore === ResultScores.DRAW) {
        myMove = opponentMove;
        
    }
    if(roundScore === ResultScores.WON) {
      myMove = losingAssociations.get(opponentMove)!;
    }
    if(roundScore === ResultScores.LOST) {
      myMove = winningAssociations.get(opponentMove)!;
    }
    
    roundScore += moveScore.has(myMove) ? moveScore.get(myMove)! : 0;
    

    totalScore += roundScore;
  })

  return totalScore.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: "15"
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: "12"
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
