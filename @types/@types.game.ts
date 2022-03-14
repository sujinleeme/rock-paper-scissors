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
  record: boolean[]
  score: number
  isWinner: boolean
}

export interface GameState {
  isPlaying: boolean
  currentRound: number
  totalRounds: number
  possibleRounds: number[]
  mode: Mode
  players: { p1: Player; p2: Player }
  winner?: Winner
}
