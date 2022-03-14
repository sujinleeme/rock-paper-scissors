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

export enum Game {
  start = 'START_GAME',
  end = 'END_GAME',
  selectMode = 'SELECT_PLAY_MODE',
}

type GamePayload = {
  [Game.start]: true
  [Game.end]: false
  [Game.selectMode]: Mode
}

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>]

export const gameReducer = (
  state: GameState,
  { type, payload }: GameActions
) => {
  switch (type) {
    case Game.start:
      return {
        ...state,
        isPlaying: payload,
      }
    case Game.end:
      return {
        ...state,
        isPlaying: payload,
      }
    case Game.selectMode:
      return {
        ...state,
        mode: payload,
      }
    default:
      return state
  }
}
