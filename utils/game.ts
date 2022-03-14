import { Choice, Winner } from '../@types'

type GetWinner = (p1: Choice, p2: Choice) => Winner

type GetRandomChoice = () => number

export const getWinner: GetWinner = (p1, p2) => {
  // The player2 wins if move is one grater than player1
  if ((p1 + 1) % 3 === p2) return Winner.p2
  // It draws because both players have the same move
  if (p1 === p2) return Winner.draw
  // The player1 wins because it's not a draw and that player 2 didn't win
  return Winner.p1
}

export const getRandomChoice: GetRandomChoice = () => {
  const choices = Object.values(Choice).length
  const max = choices - 1
  return Math.floor(Math.random() * (max + 1))
}
