export enum Choice {
  rock = 0,
  paper = 1,
  scissors = 2,
}

export enum Mode {
  solo = 'solo',
  humanVsComputer = 'humanVsComputer',
  computers = 'machines',
}

export enum Winner {
  p1 = 'p1',
  p2 = 'p2',
  draw = 'draw',
}

export interface Player {
  choices: Choice[]
  progress: boolean[]
  score: number
  isWinner: boolean
}

export interface Game {
  isPlaying: boolean
  currentRound: number
  totalRounds: number
  possibleRounds: [1, 3, 5]
  mode: Mode
  players: { p1: Player; p2: Player }
  winner: Winner
}
