export enum Choice {
  rock = 1,
  paper = 2,
  scissors = 3,
}

export enum Mode {
  humanVsComputer = 1,
  computers = 2,
}

export enum Winner {
  p1 = 'p1',
  p2 = 'p2',
  draw = 'draw',
}

export enum Record {
  win = 1,
  lose = 2,
  draw = 3,
}

export interface Player {
  name?: string
  choices: Choice[]
}

export type HashMap<T> = {
  [key in keyof T]: number
}
export interface GameState {
  isPlaying: boolean
  currentRound: number
  totalRounds: number
  isFinished: boolean
  possibleRounds: number[]
  mode?: Mode
  players: { p1: Player; p2: Player }
  record: Winner[]
  score?: Map<Winner, number>
  winner?: Winner
}
