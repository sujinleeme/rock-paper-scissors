import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getRandomChoice } from 'utils'

import { Button } from '@chakra-ui/react'
import { getOptions, RadioCardGroup } from '@components/radio-card-group'
import { GameAction, useGameContext } from '@context/game'
import { Choice, Mode, Winner } from '@types'

const Play: NextPage = () => {
  const router = useRouter()
  const { state, dispatch } = useGameContext()
  const {
    mode,
    isPlaying,
    currentRound,
    players,
    isFinished,
    record,
    winner,
    totalRounds,
  } = state
  const [isOpenResult, setIsOpenResult] = useState<boolean>(false)
  const round = currentRound - 1

  const { p1, p2 } = players
  const winnerOfRound = record[round]
  const p1Choice = Choice[p1.choices[round]]
  const p2Choice = Choice[p2.choices[round]]
  const currentChoice = players.p1.choices[round]

  const handleNextButtonClick = useCallback(() => {
    dispatch({
      type: GameAction.moveToNextRound,
    }),
      setIsOpenResult(false)
  }, [dispatch])

  const handleChoiceButtonClick = (value: string) =>
    dispatch({
      type: GameAction.selectPlayerChoice,
      payload: {
        player: 'p1',
        choice: Number(value),
      },
    })

  const setOppenantChoice = useCallback(
    () =>
      dispatch({
        type: GameAction.selectPlayerChoice,
        payload: {
          player: 'p2',
          choice: getRandomChoice(),
        },
      }),
    [dispatch]
  )

  useEffect(() => {
    !isPlaying && router.push('./')
    handleNextButtonClick()
    setOppenantChoice()
  }, [handleNextButtonClick, setOppenantChoice, isPlaying, router])

  const handleResultButtonClick = () => {
    dispatch({
      type: GameAction.setCurrentRoundScore,
    })
    setIsOpenResult(true)
  }

  const handleTryButtonClick = () => {
    dispatch({
      type: GameAction.tryAgain,
    })
    setOppenantChoice()
    setIsOpenResult(false)
  }

  const choiceOptions = getOptions(Choice)

  const getWinnerMessage = (winner: Winner) => {
    if (winner === Winner.draw) return `It's draw.`
    if (mode === Mode.humanVsComputer) {
      return winner !== Winner.p1 ? 'You lost.' : 'You win!'
    }
    const name = players[winner].name
    return `${name} won the game.`
  }

  return (
    <div>
      {currentRound} of {totalRounds} rounds
      <RadioCardGroup
        isDisabled={isOpenResult}
        onChange={handleChoiceButtonClick}
        value={currentChoice}
        options={choiceOptions}
      />
      <div>Your choice {p1Choice}</div>
      <div>Computer choice {p2Choice}</div>
      <div>Winner: {winnerOfRound}</div>
      {!isFinished && (
        <div>
          {isOpenResult ? (
            <Button onClick={handleNextButtonClick}>Go to next round</Button>
          ) : (
            <Button disabled={!currentChoice} onClick={handleResultButtonClick}>
              See result
            </Button>
          )}
        </div>
      )}
      {isFinished && winner && (
        <div>
          <div>{getWinnerMessage(winner)}</div>
          <Button onClick={handleTryButtonClick}>Try again?</Button>
          <Link href="/" passHref>
            <Button>Go to main</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Play
