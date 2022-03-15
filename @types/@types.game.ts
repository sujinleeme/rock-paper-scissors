export enum Choice {
  rock = 1,
  paper = 2,
  scissors = 3,
}

export enum Mode {
  humans = 1,
  humanVsComputer = 2,
  computers = 3,
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
  currentRound?: number
  totalRounds?: number
  possibleRounds: number[]
  mode?: Mode
  players: { p1: Player; p2: Player }
  winner?: Winner
}
