import { useCallback } from 'react'
import type { NextPage } from 'next'
import {
  ActionMeta,
  GroupBase,
  OptionBase,
  Select,
  SingleValue,
} from 'chakra-react-select'

import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Box, Container, HStack, Tooltip, VStack } from '@chakra-ui/react'
import { Avatar, LinkButton } from '@components'
import { GameAction, useGameContext } from '@context/game'
import { Mode } from '@types'

import Paper from '../images/paper.svg'
import Rock from '../images/rock.svg'
import Scissors from '../images/scissors.svg'

const modeOptions = [
  {
    label: 'You vs Computer',
    value: Mode.humanVsComputer,
  },
  {
    label: 'Computer vs Computer',
    value: Mode.computers,
  },
]

interface ModeOption extends OptionBase {
  label: string
  value: Mode
}

interface RoundOption extends OptionBase {
  label: string
  value: number
}

const Home: NextPage = () => {
  const { state, dispatch } = useGameContext()
  const { possibleRounds, totalRounds, players, mode } = state
  const { p1, p2 } = players
  const isReadyToStart = !!totalRounds && !!mode

  const roundOptions = possibleRounds.map((round) => ({
    label: `${round} ${round === 1 ? 'round' : 'rounds'}`,
    value: round,
  }))

  const handleModeOptionClick = useCallback(
    (
      newValue: SingleValue<ModeOption | RoundOption>,
      actionMeta: ActionMeta<ModeOption | RoundOption>
    ) => {
      if (!newValue) return
      console.log(newValue)
      switch (actionMeta.name) {
        case 'mode':
          dispatch({
            type: GameAction.selectPlayMode,
            payload: Number(newValue.value),
          })
          break
        case 'rounds':
          dispatch({
            type: GameAction.selectPlayRound,
            payload: Number(newValue.value),
          })
          break
        default:
          return
      }
    },
    [dispatch]
  )

  const handleStartButtonClick = useCallback(
    () =>
      isReadyToStart &&
      dispatch({
        type: GameAction.startGame,
      }),
    [dispatch, isReadyToStart]
  )

  return (
    <div>
      <Container maxW="lg" height="100vh" centerContent justifyContent="center">
        <Box width="xs" textAlign="right">
          <Tooltip
            color="gray.400"
            aria-label="how to play"
            borderWidth="1px"
            borderRadius={8}
            borderColor="gray.300"
            bg="white"
            p={4}
            mb={1}
            label="If you choose Rock, you will win against Scissors but lose against Paper.
            If you choose Scissors, you will win against Paper but lose against Rock.
            If you choose Paper, you will win against Rock but lose against Scissors."
            placement="top"
          >
            <InfoOutlineIcon color="gray.400" />
          </Tooltip>
        </Box>
        <HStack mb={8} spacing={-14}>
          <Rock />
          <Paper />
          <Scissors />
        </HStack>
        <VStack spacing={6}>
          <Box width="xs">
            <Select<ModeOption, false, GroupBase<ModeOption>>
              instanceId="mode"
              id="mode"
              name="mode"
              value={mode && modeOptions[mode - 1]}
              onChange={handleModeOptionClick}
              focusBorderColor="purple"
              placeholder="Select play mode"
              selectedOptionColor="purple"
              options={modeOptions}
            />
          </Box>
          <Box width="xs">
            <Select<RoundOption, false, GroupBase<RoundOption>>
              instanceId="rounds"
              id="rounds"
              value={roundOptions[possibleRounds.indexOf(totalRounds)]}
              name="rounds"
              onChange={handleModeOptionClick}
              focusBorderColor="purple"
              placeholder="Select rounds"
              selectedOptionColor="purple"
              options={roundOptions}
            />
          </Box>
        </VStack>
        <Box mt={14}>
          <Avatar name={p1.name} bg={p1.color} />
          <LinkButton
            mx={2}
            onClick={handleStartButtonClick}
            disabled={!isReadyToStart}
            variant="secondary"
            href="/play"
          >
            Start
          </LinkButton>
          <Avatar name={p2.name} bg={p2.color} />
        </Box>
      </Container>
    </div>
  )
}

export default Home
