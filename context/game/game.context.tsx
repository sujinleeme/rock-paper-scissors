import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react'

import { GameState } from '@types'

import { GameActions, gameReducer } from './game.reducer'

export const initialState: GameState = {
  isPlaying: true,
  currentRound: 0,
  totalRounds: 1,
  isFinished: false,
  possibleRounds: [1, 3, 5],
  mode: undefined,
  record: [],
  players: {
    p1: {
      name: undefined,
      choices: [],
    },
    p2: {
      name: undefined,
      choices: [],
    },
  },
  score: undefined,
}

export const GameContext = createContext<{
  state: GameState
  dispatch: Dispatch<GameActions>
}>({
  state: initialState,
  dispatch: () => null,
})

type AppProviderProps = {
  children: ReactNode
}

export const useGameContext = () => useContext(GameContext)

export const GameProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}
