import { Choice, Mode, Winner } from '../@types'

type GetWinner = (p1: Choice, p2: Choice) => Winner

type GetRandomChoice = () => number

type GetFrequent = <T>(arr: T[]) => Map<T, number>

type GetMostFrequent = <T>(map: Map<T, number>) => T

type GetPlayerName = (mode: Mode) => { p1: string; p2: string }

export const getWinner: GetWinner = (p1, p2) => {
  // The player2 wins if move is one grater than player1
  if ((p1 + 1) % 3 === p2) return Winner.p2
  // It draws because both players have the same move
  if (p1 === p2) return Winner.draw
  // The player1 wins because it's not a draw and that player 2 didn't win
  return Winner.p1
}

export const getRandomChoice: GetRandomChoice = () => {
  const max = Object.keys(Choice).filter(
    (i) => isNaN(Number(i)) === true
  ).length
  return Math.floor(Math.random() * max + 1)
}

export const getFrequent: GetFrequent = (arr) =>
  arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())

export const getMostFrequent: GetMostFrequent = (map) => {
  const max = [...map.entries()].reduce((a, e) => (e[1] > a[1] ? e : a))
  return max[0]
}

export const getPlayerNames: GetPlayerName = (mode) => {
  const name = {
    [Mode.humanVsComputer]: {
      p1: 'You',
      p2: 'Computer 2',
    },
    [Mode.computers]: {
      p1: 'Computer 1',
      p2: 'Computer 2',
    },
  }
  return name[mode]
}
