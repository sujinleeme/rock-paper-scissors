import { Choice, FinalWinner, Mode, Winner } from '../@types'

type GetWinner = (p1: Choice, p2: Choice) => Winner

type GetRandomChoice = () => number

type GetFrequent = <T>(arr: T[]) => Map<T, number>

type GetFinalWinner = (map: Map<Winner | string, number>) => Winner

type GetPlayerName = (mode: Mode) => { p1: string; p2: string }

type GetPlayerRoundResult = (
  player: 'p1' | 'p2',
  winner?: Winner
) => string | undefined

export const getWinner: GetWinner = (p1, p2) => {
  const winner = (3 + p1 - p2) % 3
  const players = [Winner.draw, Winner.p1, Winner.p2]
  return players[winner]
}

export const getRandomChoice: GetRandomChoice = () => {
  const max = Object.keys(Choice).filter(
    (i) => isNaN(Number(i)) === true
  ).length
  return Math.floor(Math.random() * max + 1)
}

export const getFrequent: GetFrequent = (arr) =>
  arr.reduce((map, key) => map.set(key, (map.get(key) || 0) + 1), new Map())

export const getFinalWinner: GetFinalWinner = (map) => {
  const obj = Object.fromEntries([...map])
  const { p1 = 0, p2 = 0 } = { ...obj }
  if (p1 === p2) return Winner.draw
  return p1 > p2 ? Winner.p1 : Winner.p2
}

export const getPlayerNames: GetPlayerName = (mode) => {
  const name = {
    [Mode.humanVsComputer]: {
      p1: 'You',
      p2: 'Computer 1',
    },
    [Mode.computers]: {
      p1: 'Computer 1',
      p2: 'Computer 2',
    },
  }
  return name[mode]
}

export const getPlayerRoundResult: GetPlayerRoundResult = (player, winner) => {
  if (!winner) return undefined
  if (winner === 'draw') return 'Draw 🤭'
  return winner === player ? 'Win 🤩' : 'Lost 😭'
}

type GetGameResultText = (finalWinner?: FinalWinner) => string | undefined

export const getGameResultText: GetGameResultText = (finalWinner) => {
  if (!finalWinner) return undefined
  const { isDraw, name } = { ...finalWinner }
  if (isDraw) return `It's a tie game. Both of all are winners! 🍻`
  if (name) return `${name} won the game! 🎉`
}
