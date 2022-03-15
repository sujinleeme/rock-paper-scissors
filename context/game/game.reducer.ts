import { GameState, Mode } from '@types'

type ActionMap<M> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum GameAction {
  startGame = 'START_GAME',
  endGame = 'END_GAME',
  selectPlayMode = 'SELECT_PLAY_MODE',
  selectPlayRound = 'SELECT_PLAY_ROUND',
}

type GamePayload = {
  [GameAction.startGame]: undefined
  [GameAction.endGame]: undefined
  [GameAction.selectPlayMode]: Mode
  [GameAction.selectPlayRound]: number
}

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>]

export const gameReducer = (state: GameState, action: GameActions) => {
  switch (action.type) {
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
      return {
        ...state,
        mode: action.payload,
      }
    case GameAction.selectPlayRound:
      return {
        ...state,
        totalRounds: action.payload,
      }
    default:
      return state
  }
}
