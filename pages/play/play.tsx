import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getPlayerRoundResult, getRandomChoice } from 'utils'

import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react'
import { Button, PlayerCard } from '@components'
import { GameAction, useGameContext } from '@context/game'
import { Mode } from '@types'

import { GameResultBox } from './components'

const Play: NextPage = () => {
  const router = useRouter()
  const { state, dispatch } = useGameContext()
  const {
    mode,
    isPlaying,
    winnerOfRound,
    currentRound,
    finalWinner,
    players,
    isFinished,
    totalRounds,
  } = state
  const [isOpenRoundResult, setIsOpenRoundResult] = useState<boolean>(false)
  const roundIdx = currentRound - 1
  const { p1, p2 } = players
  const [p1Choice, p2Choice] = [
    players.p1.choices[roundIdx],
    players.p2.choices[roundIdx],
  ]

  const setOppenantChoice = useCallback(() => {
    dispatch({
      type: GameAction.selectPlayerChoice,
      payload: {
        player: 'p2',
        choice: getRandomChoice(),
      },
    })
    mode === Mode.computers &&
      dispatch({
        type: GameAction.selectPlayerChoice,
        payload: {
          player: 'p1',
          choice: getRandomChoice(),
        },
      })
  }, [dispatch, mode])

  const handleNextButtonClick = useCallback(() => {
    dispatch({
      type: GameAction.moveToNextRound,
    }),
      setIsOpenRoundResult(false)
  }, [dispatch])

  useEffect(() => {
    currentRound === 0 && handleNextButtonClick()
  }, [currentRound, handleNextButtonClick])

  useEffect(() => {
    setOppenantChoice()
  }, [currentRound, setOppenantChoice])

  useEffect(() => {
    !isPlaying && router.push('./')
  }, [isPlaying, router])

  const handleCardOnChange = useCallback(
    (value: string) =>
      dispatch({
        type: GameAction.selectPlayerChoice,
        payload: {
          player: 'p1',
          choice: Number(value),
        },
      }),
    [dispatch]
  )
  const handleResultButtonClick = useCallback(() => {
    dispatch({
      type: GameAction.setCurrentRoundScore,
    })
    setIsOpenRoundResult(true)
  }, [dispatch])

  const handleTryButtonClick = useCallback(() => {
    dispatch({
      type: GameAction.startGame,
    })
    setIsOpenRoundResult(false)
  }, [dispatch])

  const isFinalWinner = (type: 'p1' | 'p2') => {
    const isVisible = isFinished && isOpenRoundResult
    if (!isVisible) return false
    return finalWinner?.type === type
  }

  if (!isPlaying) return <Box />

  return (
    <Container maxW="lg" height="100vh" justifyContent="center">
      <VStack spacing={10} mt="25vh">
        <Text>
          {currentRound} of {totalRounds}
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" w="sm">
          <PlayerCard
            player={{ ...p1, type: 'p1' }}
            isFinalWinner={isFinalWinner('p1')}
            isDisabled={mode === Mode.computers || isOpenRoundResult}
            isVisibleCard={isOpenRoundResult}
            selectedCard={p1Choice}
            onChangeCard={handleCardOnChange}
            result={getPlayerRoundResult('p1', winnerOfRound)}
          />
          <PlayerCard
            player={{ ...p2, type: 'p2' }}
            isFinalWinner={isFinalWinner('p2')}
            selectedCard={p2Choice}
            isDisabled={true}
            isVisibleCard={isOpenRoundResult}
            result={getPlayerRoundResult('p2', winnerOfRound)}
          />
        </Grid>
        {!isFinished && (
          <Box>
            {isOpenRoundResult ? (
              <Button variant="secondary" onClick={handleNextButtonClick}>
                Go to next round
              </Button>
            ) : (
              <Button
                variant="secondary"
                disabled={!p1Choice}
                onClick={handleResultButtonClick}
              >
                See result
              </Button>
            )}
          </Box>
        )}
        <GameResultBox onClickTryAgainButton={handleTryButtonClick} />
      </VStack>
    </Container>
  )
}

export default Play
