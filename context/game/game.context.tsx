import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react'

import { GameState, Mode, Player } from '@types'

import { GameActions, gameReducer } from './game.reducer'

const initialPlayer: Player = {
  choices: [],
  record: [],
  score: 0,
  isWinner: false,
}

const initialState: GameState = {
  isPlaying: false,
  currentRound: 0,
  totalRounds: 2,
  possibleRounds: [0, 2, 4],
  mode: Mode.computers,
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

export function useGameContext() {
  return useContext(GameContext)
}

export const GameProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}
