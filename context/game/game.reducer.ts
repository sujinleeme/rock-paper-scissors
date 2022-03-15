import { getFrequent, getMostFrequent, getPlayerNames, getWinner } from 'utils'

import { Choice, GameState, Mode } from '@types'

import { initialState } from './game.context'

type ActionMap<M> = {
  [key in keyof M]: M[key] extends undefined
    ? {
        type: key
      }
    : {
        type: key
        payload: M[key]
      }
}

export enum GameAction {
  initGame = 'INIT_GAME',
  startGame = 'START_GAME',
  endGame = 'END_GAME',
  selectPlayMode = 'SELECT_PLAY_MODE',
  selectPlayRound = 'SELECT_PLAY_ROUND',
  moveToNextRound = 'MOVE_TO_NEXT_ROUND',
  selectPlayerChoice = 'SELECT_PLAYER_CHOICE',
  setCurrentRoundScore = 'SET_CURRENT_ROUND_SCORE',
  tryAgain = 'TRY_AGAIN',
}

type GamePayload = {
  [GameAction.initGame]: undefined
  [GameAction.startGame]: undefined
  [GameAction.endGame]: undefined
  [GameAction.selectPlayMode]: Mode
  [GameAction.selectPlayRound]: number
  [GameAction.moveToNextRound]: undefined
  [GameAction.setCurrentRoundScore]: undefined
  [GameAction.selectPlayerChoice]: {
    player: 'p1' | 'p2'
    choice: Choice
  }
  [GameAction.tryAgain]: undefined
}

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>]

export type GameReducer = (state: GameState, action: GameActions) => GameState

export const gameReducer: GameReducer = (state, action) => {
  const { players, currentRound, totalRounds } = state

  switch (action.type) {
    case GameAction.initGame:
      return initialState
    case GameAction.startGame:
      return {
        ...state,
        isPlaying: true,
      }
    case GameAction.endGame:
      return {
        ...state,
        isPlaying: false,
      }
    case GameAction.selectPlayMode:
      const mode = action.payload
      const names = getPlayerNames(mode)
      const nextPlayer = {
        p1: {
          ...players.p1,
          name: names.p1,
        },
        p2: {
          ...players.p2,
          name: names.p2,
        },
      }
      return {
        ...state,
        mode: action.payload,
        players: nextPlayer,
      }
    case GameAction.selectPlayerChoice:
      const { player, choice } = action.payload
      const choices = [...players[player].choices]
      choices[currentRound - 1] = choice
      return {
        ...state,
        players: {
          ...state.players,
          [player]: {
            ...state.players[player],
            choices,
          },
        },
      }
    case GameAction.setCurrentRoundScore:
      if (currentRound > totalRounds) return state
      const { p1, p2 } = players
      const p1Choice = p1.choices[currentRound - 1]
      const p2Choice = p2.choices[currentRound - 1]
      const currentRoundWinner = getWinner(p1Choice, p2Choice)
      const record = [...state.record]
      record[currentRound - 1] = currentRoundWinner
      const nextScore = getFrequent(record)
      const winner = getMostFrequent(nextScore)
      return {
        ...state,
        record,
        winner,
        score: nextScore,
        isFinished: currentRound === totalRounds,
      }
    case GameAction.selectPlayRound:
      return {
        ...state,
        totalRounds: action.payload,
      }
    case GameAction.moveToNextRound:
      const nextRound = Math.min(totalRounds - 1, currentRound) + 1
      return {
        ...state,
        currentRound: nextRound,
      }
    case GameAction.tryAgain:
      const nextState = {
        ...state,
        isFinished: false,
        record: [],
        players: {
          p1: {
            ...players.p1,
            choices: [],
          },
          p2: {
            ...players.p2,
            choices: [],
          },
        },
        mode: state.mode,
        currentRound: 1,
      }
      return nextState
    default:
      return state
  }
}
