import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react'

import { GameState, Player } from '@types'

import { GameActions, gameReducer } from './game.reducer'

const initialPlayer: Player = {
  choices: [],
  record: [],
  score: 0,
  isWinner: false,
}

const initialState: GameState = {
  isPlaying: false,
  currentRound: undefined,
  totalRounds: undefined,
  possibleRounds: [1, 3, 5],
  mode: undefined,
  players: {
    p1: initialPlayer,
    p2: initialPlayer,
  },
  winner: undefined,
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
