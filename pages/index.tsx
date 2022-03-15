import type { NextPage } from 'next'
import Head from 'next/head'

import { Button } from '@chakra-ui/react'
import { RadioCardGroup } from '@components/radio-card-group'
import { GameAction, useGameContext } from '@context/game'
import { Mode } from '@types'

const modeOptions = [
  {
    label: 'Human vs Human',
    value: Mode.humans,
  },
  {
    label: 'Human vs Computer',
    value: Mode.humanVsComputer,
  },
  {
    label: 'Computer vs Computer',
    value: Mode.computers,
  },
]

const Home: NextPage = () => {
  const { state, dispatch } = useGameContext()
  const { possibleRounds, currentRound, mode } = state
  const roundOptions = possibleRounds.map((round) => ({
    label: `${round} rounds`,
    value: round,
  }))

  const handleModeOptionClick = (value: string) =>
    dispatch({
      type: GameAction.selectPlayMode,
      payload: Number(value),
    })

  const handleRoundOptionClick = (value: string) =>
    dispatch({
      type: GameAction.selectPlayRound,
      payload: Number(value),
    })

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>Select play mode</div>
        <RadioCardGroup
          options={modeOptions}
          onChange={handleModeOptionClick}
          value={mode}
        />
        <div>How many rounds would you like to play?</div>
        <RadioCardGroup
          options={roundOptions}
          onChange={handleRoundOptionClick}
          value={currentRound}
        />
        <Button
          colorScheme="teal"
          disabled={!currentRound || !mode}
          variant="solid"
        >
          Start
        </Button>
      </main>
    </div>
  )
}

export default Home
