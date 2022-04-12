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
  isPlaying: false,
  currentRound: 0,
  totalRounds: 0,
  isFinished: false,
  possibleRounds: [1, 3, 5],
  mode: undefined,
  players: {
    p1: {
      name: undefined,
      color: '#FC8181', // Red 300
      choices: [],
      record: [],
    },
    p2: {
      name: undefined,
      color: '#F687B3', // Orange 300
      choices: [],
      record: [],
    },
  },
  score: undefined,
  winners: [],
  winnerOfRound: undefined,
  finalWinner: undefined,
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
