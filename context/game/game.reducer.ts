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
  [GameAction.startGame]: true
  [GameAction.endGame]: false
  [GameAction.selectPlayMode]: Mode
  [GameAction.selectPlayRound]: number
}

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>]

export const gameReducer = (
  state: GameState,
  { type, payload }: GameActions
) => {
  switch (type) {
    case GameAction.startGame:
      return {
        ...state,
        isPlaying: payload,
      }
    case GameAction.endGame:
      return {
        ...state,
        isPlaying: payload,
      }
    case GameAction.selectPlayMode:
      return {
        ...state,
        mode: payload,
      }
    case GameAction.selectPlayRound:
      return {
        ...state,
        currentRound: payload,
      }
    default:
      return state
  }
}
